import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { getString } from 'kursausschreibung/framework/translate';
import {
  removeFile,
  vssDependency,
} from 'kursausschreibung/framework/form-helpers';
import Cropper from 'cropperjs';
import uikit from 'uikit';

function getInputFile(fieldId) {
  let elementIdFile = getElementIdFile(fieldId);
  return document.getElementById(elementIdFile).files[0];
}

function getElementIdFile(fieldId) {
  return 'file' + fieldId;
}

function getPreviewElement(fieldId) {
  return document.getElementById('imgCrop' + fieldId);
}

function destroyCropper(component) {
  if (component.cropper) {
    component.cropper.destroy();
    component.cropper = null;
  }
}

function resetImageUi(fieldId) {
  let previewContainer = document.getElementById('img' + fieldId);
  let previewImage = getPreviewElement(fieldId);
  let finalImage = document.getElementById('imgDev' + fieldId);

  previewContainer?.classList.add('uk-hidden');
  finalImage?.classList.add('uk-hidden');

  if (previewImage) {
    previewImage.removeAttribute('src');
  }
}

export default class InputFileComponent extends Component {
  cropper = null;
  previewUrl = null;
  @tracked isUploadControlVisible = true;
  @tracked isCropModalOpen = false;
  @tracked isCropCanvasVisible = false;
  @tracked isUploadConfirmVisible = false;

  @action
  handleChange() {
    let field = this.args.field;
    let elementIdFile = getElementIdFile(field.id);
    let inputFile = getInputFile(field.id);

    if (!inputFile) {
      return;
    }

    inputFile.imgDev = null;
    let maxFileSizeMB = (field.maxFileSize / (1024 * 1024)).toFixed(2);

    if (inputFile.size > field.maxFileSize && maxFileSizeMB !== '0.00') {
      uikit.modal.alert(getString('FileSizeTooBig') + maxFileSizeMB + 'MB');
      removeFile(elementIdFile);
    } else if (
      field.acceptFileType.indexOf(inputFile.type) === -1 ||
      inputFile.type === ''
    ) {
      uikit.modal.alert(getString('FileTypeNotAccept') + field.acceptFileType);
      removeFile(elementIdFile);
    } else {
      field.fileTypeLabel = inputFile.name;
      field.fileObject = inputFile;

      let buttonClass = document.getElementById('fileBt' + field.id);
      buttonClass?.classList.remove('required');
      let buttonClassDel = document.getElementById('fileBtDel' + field.id);
      buttonClassDel.classList.remove('uk-hidden');

      const reader = new FileReader();
      let data;

      // Note: reading file is async
      reader.onload = () => {
        data = reader.result;
        field.fileObject.data = data;
      };

      if (inputFile) {
        reader.readAsDataURL(inputFile);
      }

      let acceptsJpeg = (field.acceptFileType || '').includes('image/jpeg');

      if (acceptsJpeg && inputFile.type === 'image/jpeg') {
        let fieldId = field.id;
        this.isUploadConfirmVisible = true;
        this.isCropCanvasVisible = true;
        this.isCropModalOpen = true;

        let previewImage = getPreviewElement(fieldId);

        if (this.previewUrl) {
          URL.revokeObjectURL(this.previewUrl);
        }

        destroyCropper(this);

        this.previewUrl = URL.createObjectURL(inputFile);
        previewImage.src = this.previewUrl;

        previewImage.addEventListener(
          'load',
          () => {
            // https://fengyuanchen.github.io/cropperjs/api/
            this.cropper = new Cropper(previewImage, {
              template: `
                <cropper-canvas>
                  <cropper-image rotatable scalable translatable></cropper-image>
                  <cropper-shade hidden></cropper-shade>
                  <cropper-handle action="select" plain></cropper-handle>
                  <cropper-selection initial-coverage="0.80" aspect-ratio="0.75" movable resizable>
                    <cropper-grid role="grid" bordered covered></cropper-grid>
                    <cropper-crosshair centered></cropper-crosshair>
                    <cropper-handle action="move" theme-color="rgba(255, 255, 255, 0.35)"></cropper-handle>
                    <cropper-handle action="n-resize"></cropper-handle>
                    <cropper-handle action="e-resize"></cropper-handle>
                    <cropper-handle action="s-resize"></cropper-handle>
                    <cropper-handle action="w-resize"></cropper-handle>
                    <cropper-handle action="ne-resize"></cropper-handle>
                    <cropper-handle action="nw-resize"></cropper-handle>
                    <cropper-handle action="se-resize"></cropper-handle>
                    <cropper-handle action="sw-resize"></cropper-handle>
                  </cropper-selection>
                </cropper-canvas>
              `,
            });
          },
          { once: true }
        );
      }

      uikit.notification({
        message: getString('UploadErfolgreich') + inputFile.name,
        pos: 'bottom-right',
        status: 'success',
      });

      vssDependency(inputFile, field);
    }
  }

  @action
  deleteFile(event) {
    event?.preventDefault();
    event?.stopPropagation();

    let field = this.args.field;
    let fieldId = field.id;
    let elementIdFile = getElementIdFile(fieldId);
    let buttonClassDel = document.getElementById('fileBtDel' + fieldId);
    buttonClassDel.classList.add('uk-hidden');

    if (field.options?.required) {
      let buttonClass = document.getElementById('fileBt' + field.id);
      buttonClass?.classList.add('required');
    }

    this.isUploadControlVisible = true;
    this.isCropCanvasVisible = false;
    this.isUploadConfirmVisible = false;
    this.isCropModalOpen = false;

    let imgFielDev = document.getElementById('imgDev' + fieldId);
    imgFielDev.classList.add('uk-hidden');
    removeFile(elementIdFile);
    field.fileTypeLabel = field.fileLabelBevorFileChoose;

    if (this.previewUrl) {
      URL.revokeObjectURL(this.previewUrl);
      this.previewUrl = null;
    }

    destroyCropper(this);

    resetImageUi(fieldId);
  }

  @action
  cancelCrop(event) {
    event?.preventDefault();
    event?.stopPropagation();

    this.deleteFile();
  }

  @action
  async uploadImage(event) {
    event?.preventDefault();
    event?.stopPropagation();

    let fieldId = this.args.field.id;
    let inputFile = getInputFile(fieldId);

    if (!inputFile || !this.cropper) {
      return;
    }

    let cropperSelection = this.cropper.getCropperSelection();

    if (!cropperSelection) {
      return;
    }

    let canvas = await cropperSelection.$toCanvas({
      width: 300,
      height: 400,
    });

    let base64 = canvas.toDataURL('image/jpeg');

    inputFile.imgDev = base64;

    let imgFielDev = document.getElementById('imgDev' + fieldId);
    imgFielDev.src = base64;
    imgFielDev.classList.remove('uk-hidden');

    this.isUploadControlVisible = false;
    this.isUploadConfirmVisible = false;
    this.isCropCanvasVisible = false;
    this.isCropModalOpen = false;

    if (this.previewUrl) {
      URL.revokeObjectURL(this.previewUrl);
      this.previewUrl = null;
    }

    destroyCropper(this);
  }
}
