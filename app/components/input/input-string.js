import Component from '@ember/component';
import { helperSocialSecurityNumber } from 'kursausschreibung/framework/form-helpers';

export default Component.extend({
  change() {
    if (this.field.id === 'SocialSecurityNumber') {
      helperSocialSecurityNumber(this.element.children[0]);
    }

  },
  keyUp() {
    if (this.field.id === 'SocialSecurityNumber') {
      helperSocialSecurityNumber(this.element.children[0]);
    }
  }
});
