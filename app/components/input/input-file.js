import Component from '@glimmer/component';
import { action } from '@ember/object';
import { getString } from 'kursausschreibung/framework/translate';
import {
  removeFile,
  vssDependency,
} from 'kursausschreibung/framework/form-helpers';
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

function resetImageUi(fieldId) {
  let previewContainer = document.getElementById('img' + fieldId);
  let previewImage = getPreviewElement(fieldId);
  let uploadButton = document.getElementById('fileBtUpload' + fieldId);
  let finalImage = document.getElementById('imgDev' + fieldId);

  previewContainer?.classList.add('uk-hidden');
  uploadButton?.classList.add('uk-hidden');
  finalImage?.classList.add('uk-hidden');

  if (previewImage) {
    previewImage.removeAttribute('src');
  }
}

function cropImageToBase64(imageSource) {
  return new Promise((resolve, reject) => {
    let image = new Image();
    image.onload = () => {
      let canvas = document.createElement('canvas');
      let targetWidth = 300;
      let targetHeight = 400;
      let targetRatio = targetWidth / targetHeight;
      let sourceRatio = image.width / image.height;
      let sourceWidth = image.width;
      let sourceHeight = image.height;
      let sourceX = 0;
      let sourceY = 0;

      if (sourceRatio > targetRatio) {
        sourceWidth = image.height * targetRatio;
        sourceX = (image.width - sourceWidth) / 2;
      } else {
        sourceHeight = image.width / targetRatio;
        sourceY = (image.height - sourceHeight) / 2;
      }

      canvas.width = targetWidth;
      canvas.height = targetHeight;

      let context = canvas.getContext('2d');
      context.drawImage(
        image,
        sourceX,
        sourceY,
        sourceWidth,
        sourceHeight,
        0,
        0,
        targetWidth,
        targetHeight
      );

      resolve(canvas.toDataURL('image/jpeg'));
    };
    image.onerror = reject;
    image.src = imageSource;
  });
}

export default class InputFileComponent extends Component {
  previewUrl = null;

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
      buttonClass.classList.remove('required');
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

      if (field.acceptFileType === 'image/jpeg') {
        let fieldId = field.id;
        let buttonClassUpload = document.getElementById(
          'fileBtUpload' + fieldId
        );
        buttonClassUpload.classList.remove('uk-hidden');

        let imgField = document.getElementById('img' + fieldId);
        imgField.classList.remove('uk-hidden');
        let previewImage = getPreviewElement(fieldId);

        if (this.previewUrl) {
          URL.revokeObjectURL(this.previewUrl);
        }

        this.previewUrl = URL.createObjectURL(inputFile);
        previewImage.src = this.previewUrl;
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
  deleteFile() {
    let field = this.args.field;
    let fieldId = field.id;
    let elementIdFile = getElementIdFile(fieldId);
    let buttonClassDel = document.getElementById('fileBtDel' + fieldId);
    buttonClassDel.classList.add('uk-hidden');

    if (field.options?.required) {
      let buttonClass = document.getElementById('fileBt' + field.id);
      buttonClass.classList.add('required');
    }

    let imgClassDel = document.getElementById('img' + fieldId);
    imgClassDel.classList.add('uk-hidden');
    let imgClassUp = document.getElementById('fileBtUpload' + fieldId);
    imgClassUp.classList.add('uk-hidden');
    let imgFielDev = document.getElementById('imgDev' + fieldId);
    imgFielDev.classList.add('uk-hidden');
    removeFile(elementIdFile);
    field.fileTypeLabel = field.fileLabelBevorFileChoose;

    if (this.previewUrl) {
      URL.revokeObjectURL(this.previewUrl);
      this.previewUrl = null;
    }

    resetImageUi(fieldId);
  }

  @action
  async uploadImage() {
    let fieldId = this.args.field.id;
    let inputFile = getInputFile(fieldId);

    if (!inputFile || !this.previewUrl) {
      return;
    }

    let base64 = await cropImageToBase64(this.previewUrl);
    inputFile.imgDev = base64;

    let imgFielDev = document.getElementById('imgDev' + fieldId);
    imgFielDev.src = base64;
    imgFielDev.classList.remove('uk-hidden');

    let imgClassUp = document.getElementById('fileBtUpload' + fieldId);
    imgClassUp.classList.add('uk-hidden');

    let previewContainer = document.getElementById('img' + fieldId);
    previewContainer.classList.add('uk-hidden');

    if (this.previewUrl) {
      URL.revokeObjectURL(this.previewUrl);
      this.previewUrl = null;
    }
  }
}
