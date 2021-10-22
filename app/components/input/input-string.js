import Component from '@ember/component';
import { helperSocialSecurityNumber, vssDependency } from 'kursausschreibung/framework/form-helpers';

export default Component.extend({
  change() {
    if (this.field.id === 'SocialSecurityNumber') {
      helperSocialSecurityNumber(this.element.children[0]);
    }
  },
  keyUp() {
    this.change();
  },
  focusOut() {
    let field = this.get('field');
    let currentValue = document.getElementById('vss'+field.id).value;
    vssDependency(currentValue,field);
}
});
