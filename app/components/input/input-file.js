import Component from '@ember/component';
import { getString } from 'kursausschreibung/framework/translate';
import uikit from 'uikit';

export default Component.extend({
    change() {

        let parentElement = document.getElementById(this.elementId).childNodes;
        const inputFile = parentElement[0].childNodes[1].files[0];     
        let maxFileSizeMB = (this.get('field.maxFileSize') / (1024*1024)).toFixed(2);

        if(inputFile.size > this.get('field.maxFileSize') && maxFileSizeMB !== '0.00' ) {
          uikit.modal.alert(getString('FileSizeTooBig') + maxFileSizeMB+'MB');
        }
        else if(this.get('field.acceptFileType').indexOf(inputFile.type) === -1) {
          uikit.modal.alert(getString('FileTypeNotAccept') + this.get('field.acceptFileType') );
        } else {

          this.set('field.fileTypeLabel', inputFile.name);
          this.set('field.fileObject', inputFile);
          let buttonClass = parentElement[0].childNodes[4];
          buttonClass.classList.remove('required');

          const reader = new FileReader();
          let imageData;
          
              // Note: reading file is async
              reader.onload = () => {
                imageData = reader.result;
                this.set('field.fileObject.image', imageData);

              };
          
              if (inputFile) {
                reader.readAsDataURL(inputFile);
              }

          uikit.modal.alert(getString('UploadErfolgreich') + inputFile.name);
        }
       


    }
});
   