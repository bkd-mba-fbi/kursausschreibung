import Component from '@glimmer/component';
import { action } from '@ember/object';
import { dateGreaterNow } from 'kursausschreibung/framework/date-helpers';
import {
  formFieldError,
  vssDependency,
} from 'kursausschreibung/framework/form-helpers';

export default class InputDateComponent extends Component {
  @action
  handleChange(event) {
    if (this.args.field.id === 'Birthdate') {
      formFieldError(event.target, dateGreaterNow(event.target.value));
    }
  }

  @action
  handleFocusOut(event) {
    const field = this.args.field;
    const currentValue = event.target.value;
    vssDependency(currentValue, field);
  }
}
