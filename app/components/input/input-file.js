import Component from '@glimmer/component';
import { action } from '@ember/object';
import { getString } from 'kursausschreibung/framework/translate';
import {
  removeFile,
  vssDependency,
} from 'kursausschreibung/framework/form-helpers';
import uikit from 'uikit';
import jQuery from 'jquery';

function getInputFile(fieldId) {
  let elementIdFile = getElementIdFile(fieldId);
  return document.getElementById(elementIdFile).files[0];
}

function getElementIdFile(fieldId) {
  return 'file' + fieldId;
}

export default class InputFileComponent extends Component {
  @action
  handleChange() {
    let field = this.args.field;
    let elementIdFile = getElementIdFile(field.id);
    let inputFile = getInputFile(field.id);
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

        var basic = jQuery('#img' + field.id).croppie({
          viewport: { width: 300, height: 400 },
          boundary: { width: 350, height: 450 },
        });

        basic.croppie('bind', {
          url: URL.createObjectURL(inputFile),
        });
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

    jQuery('#img' + field.id).croppie('destroy');
  }

  @action
  uploadImage() {
    let fieldId = this.args.field.id;
    //on button click
    let basic = jQuery('#img' + fieldId);
    let inputFile = getInputFile(fieldId);
    basic
      .croppie('result', {
        type: 'base64',
        format: 'jpeg',
        size: { width: '300', height: '400' },
      })
      .then(function (base64) {
        // html is div (overflow hidden)
        // with img positioned inside.
        inputFile.imgDev = base64;

        let imgFielDev = document.getElementById('imgDev' + fieldId);
        imgFielDev.src = base64;
        imgFielDev.classList.remove('uk-hidden');
        let imgClassUp = document.getElementById('fileBtUpload' + fieldId);
        imgClassUp.classList.add('uk-hidden');
        let imgClassDel = document.getElementById('img' + fieldId);
        imgClassDel.classList.add('uk-hidden');

        jQuery('#img' + fieldId).croppie('destroy');
      });
  }
}
