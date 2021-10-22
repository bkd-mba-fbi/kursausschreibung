import Component from '@ember/component';
import { vssDependency } from 'kursausschreibung/framework/form-helpers';

export default Component.extend({
    change(){
        let field = this.get('field');
        let currentValue = null;
    
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
