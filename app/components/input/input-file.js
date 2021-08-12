import Component from '@ember/component';
import { getString } from 'kursausschreibung/framework/translate';
import { resolutionImageValid, removeFile } from 'kursausschreibung/framework/form-helpers';
import uikit from 'uikit';

export default Component.extend({
  change() {

    let elementIdFile = 'file' + this.field.id;
    let inputFile = document.getElementById(elementIdFile).files[0];
    let maxFileSizeMB = (this.get('field.maxFileSize') / (1024 * 1024)).toFixed(2);
    let resolution = this.get('field.acceptFileType') === 'image/jpeg' ? resolutionImageValid(inputFile, 300, 400) : true;

    if (inputFile.size > this.get('field.maxFileSize') && maxFileSizeMB !== '0.00') {
      uikit.modal.alert(getString('FileSizeTooBig') + maxFileSizeMB + 'MB');
      removeFile(elementIdFile);
    }
    else if (this.get('field.acceptFileType').indexOf(inputFile.type) === -1 || inputFile.type === "") {
      uikit.modal.alert(getString('FileTypeNotAccept') + this.get('field.acceptFileType'));
      removeFile(elementIdFile);
    }
    else if (!resolution) {
      removeFile(elementIdFile);
    }
    else {

      this.set('field.fileLabelBevorFileChoose', this.get('field.fileTypeLabel'));
      this.set('field.fileTypeLabel', inputFile.name);
      this.set('field.fileObject', inputFile);

      let buttonClass = document.getElementById('fileBt' + this.field.id);
      buttonClass.classList.remove('required');
      let buttonClassDel = document.getElementById('fileBtDel' + this.field.id);
      buttonClassDel.classList.remove('uk-hidden');

      const reader = new FileReader();
      let data;

      // Note: reading file is async
      reader.onload = () => {
        data = reader.result;
        this.set('field.fileObject.data', data);

      };

      if (inputFile) {
        reader.readAsDataURL(inputFile);
      }

      uikit.modal.alert(getString('UploadErfolgreich') + inputFile.name);
    }
  },
  click() {
    let elementIdFile = 'file' + this.field.id;
    let buttonClassDel = document.getElementById('fileBtDel' + this.field.id);
    buttonClassDel.classList.add('uk-hidden');
    this.set('field.fileTypeLabel', this.get('field.fileLabelBevorFileChoose'));
    removeFile(elementIdFile);
  }
});
