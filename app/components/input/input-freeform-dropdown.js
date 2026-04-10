import Component from '@glimmer/component';
import { action } from '@ember/object';
import { vssDependency } from 'kursausschreibung/framework/form-helpers';

export default class InputFreeformDropdownComponent extends Component {
  get options() {
    return this.args.field?.options?.options ?? [];
  }

  @action
  handleFocusOut(event) {
    let field = this.args.field;
    let currentValue = event.target.value;
    vssDependency(currentValue, field);
  }
}
