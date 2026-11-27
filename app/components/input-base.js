import Component from '@glimmer/component';

import InputCheckbox from './input/input-checkbox';
import InputDate from './input/input-date';
import InputDropdown from './input/input-dropdown';
import InputEmail from './input/input-email';
import InputFile from './input/input-file';
import InputFreeformDropdown from './input/input-freeform-dropdown';
import InputNumber from './input/input-number';
import InputPostalCode from './input/input-postal-code';
import InputString from './input/input-string';
import InputTelephone from './input/input-telephone';
import InputTextarea from './input/input-textarea';

// Explicit map from the `dataType` configured in settings.js (formFields) to
// the component that renders it. Embroider resolves components statically at
// build time, so a name assembled from a string (`input/input-${dataType}`)
// can no longer be used (see #236).
const COMPONENTS_BY_DATA_TYPE = {
  checkbox: InputCheckbox,
  date: InputDate,
  dropdown: InputDropdown,
  email: InputEmail,
  file: InputFile,
  'freeform-dropdown': InputFreeformDropdown,
  number: InputNumber,
  'postal-code': InputPostalCode,
  string: InputString,
  telephone: InputTelephone,
  textarea: InputTextarea,
};

export default class InputBaseComponent extends Component {
  get componentClass() {
    const field = this.args.field;
    let dataType = field?.dataType;

    // provide typeahead functionality for postal codes (see issue #75)
    // change the type of the fields here so there is no need to change any settings
    if (field?.id === 'Zip') {
      dataType = 'postal-code';
    }

    const component = COMPONENTS_BY_DATA_TYPE[dataType];

    if (component === undefined) {
      throw new Error(
        `Unknown dataType "${dataType}" for field "${field?.id}" (check formFields in settings.js)`,
      );
    }

    return component;
  }
}
