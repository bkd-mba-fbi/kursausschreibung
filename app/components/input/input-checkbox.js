import Component from '@glimmer/component';
import { action } from '@ember/object';
import { vssDependency } from 'kursausschreibung/framework/form-helpers';

export default class InputCheckboxComponent extends Component {
  @action
  handleChange(event) {
    const field = this.args.field;
    const currentValue = event.target.checked;
    vssDependency(currentValue, field);
  }
}
