import Component from '@glimmer/component';
import { action } from '@ember/object';
import { vssDependency } from 'kursausschreibung/framework/form-helpers';

export default class InputTextareaComponent extends Component {
  @action
  handleFocusOut(event) {
    const field = this.args.field;
    const currentValue = event.target.value;
    vssDependency(currentValue, field);
  }
}
