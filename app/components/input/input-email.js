import Component from '@ember/component';
import { formFieldError } from 'kursausschreibung/framework/form-helpers';
import jQuery from 'jquery';

export default Component.extend({
  change() {
    // show an error message for duplicate e-mails
    const emailFields = jQuery('#subscriptionForm').closest('form').find('input[type="email"]').toArray();
    const emailFieldValues = emailFields.map(field => field.value);

    emailFields.forEach((field, fieldIndex) => {
      const valueIndex = emailFieldValues.indexOf(field.value);

      if (valueIndex !== -1 && valueIndex < fieldIndex) {
        formFieldError(field, true, 'duplicateEmailError');
      } else {
        formFieldError(field, false);
      }
    });
  },
  keyUp() {
    this.change();
  }
});
