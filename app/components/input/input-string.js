import Component from '@ember/component';
import { getLocationFromZip, helperSocialSecurityNumber } from 'kursausschreibung/helpers/form';

export default Component.extend({
    focusIn() {
        if (this.field.id === 'Location') {
             getLocationFromZip();
        }
      },
      change() {
          if (this.field.id === 'SocialSecurityNumber') {
            helperSocialSecurityNumber(this.element.children[0]);
          }

      },
      keyUp(){
          if (this.field.id === 'SocialSecurityNumber') {
            helperSocialSecurityNumber(this.element.children[0]);
          }
      }
});
