import Component from '@ember/component';
import { getString } from 'kursausschreibung/framework/translate';
import { removeFile } from 'kursausschreibung/framework/form-helpers';
import uikit from 'uikit';

export default Component.extend({
  change() {

    let elementIdFile = 'file' + this.field.id;
    let inputFile = document.getElementById(elementIdFile).files[0];
    let maxFileSizeMB = (this.get('field.maxFileSize') / (1024 * 1024)).toFixed(2);
    //let resolutionValid = resolutionImageValid(inputFile, this.get('field.acceptFileType'), 300, 400);

    if (inputFile.size > this.get('field.maxFileSize') && maxFileSizeMB !== '0.00') {
      uikit.modal.alert(getString('FileSizeTooBig') + maxFileSizeMB + 'MB');
      removeFile(elementIdFile);
    }
    else if (this.get('field.acceptFileType').indexOf(inputFile.type) === -1 || inputFile.type === "") {
      uikit.modal.alert(getString('FileTypeNotAccept') + this.get('field.acceptFileType'));
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

      if(this.get('field.acceptFileType') === 'image/jpeg') {

        let imgField =  document.getElementById('img'+ this.field.id);
        let fieldId = this.field.id;
        var readerImg = new FileReader();
        //Read the contents of Image File.
        readerImg.readAsDataURL(inputFile);
        readerImg.onload = function (e) {
      
          //Initiate the JavaScript Image object.
          var image = new Image();
      
          //Set the Base64 string return from FileReader as source.
          image.src = e.target.result;
      
          //Validate the File Height and Width.
          image.onload = function () {
            var height = this.height;
            var width = this.width;
            if (width !== 300 || height !== 400) { 
              
              //show width and height to user
              deleteFile(fieldId);
              uikit.modal.alert(getString('FileImageResolution') + width + 'x' + height );
              
            } else {
              imgField.src = URL.createObjectURL(inputFile);
              imgField.classList.remove('uk-hidden');
            }

          };
      };
  
      }
      
      uikit.notification({message: getString('UploadErfolgreich') + inputFile.name, pos: 'bottom-right', status:'success' });
    }
  },
  click() {
    deleteFile( this.field.id);
    this.set('field.fileTypeLabel', this.get('field.fileLabelBevorFileChoose'));
  }
});

function deleteFile(fieldId){
  let elementIdFile = 'file' + fieldId;
  let buttonClassDel = document.getElementById('fileBtDel' + fieldId);
  buttonClassDel.classList.add('uk-hidden');
  let imgClassDel = document.getElementById('img' + fieldId);
  imgClassDel.classList.add('uk-hidden');
  removeFile(elementIdFile);
}
