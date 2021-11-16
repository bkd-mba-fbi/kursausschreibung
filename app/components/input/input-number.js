import Component from '@ember/component';
import { vssDependency } from 'kursausschreibung/framework/form-helpers';

export default Component.extend({
    focusOut() {
        let field = this.get('field');
        let currentValue = document.getElementById('vss'+field.id).value;
        vssDependency(currentValue,field);
      }
});
