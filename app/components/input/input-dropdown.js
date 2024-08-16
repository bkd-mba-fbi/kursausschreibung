import Component from '@ember/component';
import { vssDependency } from 'kursausschreibung/framework/form-helpers';
import { htmlSafe } from '@ember/string';

export default Component.extend({
    willRender() {    
        let options = this.get('field.options.options');
        let dropdownOptions = '';
        options.forEach(option => {
            dropdownOptions = dropdownOptions + '<option value='+option.Key+'>'+option.Value+'</option>';
          }); 
        this.set('dropdownOptions',htmlSafe(dropdownOptions));     
      }, 

    change(){
        let field = this.get('field');
        let currentValue = null;

        document.getElementById(this.elementId).children[0].classList.remove('required');
    
        document.getElementsByName(field.id).forEach(input => {
            if(field.options.showAsRadioButtons) {
            currentValue = input.checked ? input.value : currentValue;
            } else {
                currentValue = input.value;
            }
        });    
        
        vssDependency(currentValue,field);
    }
});
