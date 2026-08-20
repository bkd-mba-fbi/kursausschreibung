import Component from '@glimmer/component';
import { action } from '@ember/object';
import {
  helperSocialSecurityNumber,
  vssDependency,
} from 'kursausschreibung/framework/form-helpers';

export default class InputStringComponent extends Component {
  @action
  handleChange(event) {
    if (this.args.field.id === 'SocialSecurityNumber') {
      helperSocialSecurityNumber(event.target);
    }
  }

  @action
  handleKeyUp(event) {
    this.handleChange(event);
  }

  @action
  handleFocusOut(event) {
    const field = this.args.field;
    const currentValue = event.target.value;
    vssDependency(currentValue, field);
  }
}
