import Component from '@glimmer/component';
import { action } from '@ember/object';
import { formFieldError } from 'kursausschreibung/framework/form-helpers';

export default class InputEmailComponent extends Component {
  @action
  handleChange() {
    // show an error message for duplicate e-mails
    const form = document.getElementById('subscriptionForm')?.closest('form');
    if (!form) {
      return;
    }

    const emailFields = Array.from(form.querySelectorAll('input[type="email"]'));
    const emailFieldValues = emailFields.map((field) => field.value);

    emailFields.forEach((field, fieldIndex) => {
      const valueIndex = emailFieldValues.indexOf(field.value);

      if (valueIndex !== -1 && valueIndex < fieldIndex) {
        formFieldError(field, true, 'duplicateEmailError');
      } else {
        formFieldError(field, false);
      }
    });
  }

  @action
  handleKeyUp() {
    this.handleChange();
  }
}
