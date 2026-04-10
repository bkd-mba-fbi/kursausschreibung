import Component from '@ember/component';
import { vssDependency } from 'kursausschreibung/framework/form-helpers';

export default Component.extend({
  change() {
    let field = this.field;
    let currentValue = document.getElementById('vss' + field.id).checked;
    vssDependency(currentValue, field);
  },
});
