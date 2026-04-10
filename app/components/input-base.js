import Component from '@glimmer/component';

export default class InputBaseComponent extends Component {
  get componentType() {
    const field = this.args.field;
    let dataType = field?.dataType;

    // provide typeahead functionality for postal codes (see issue #75)
    // change the type of the fields here so there is no need to change any settings
    if (field?.id === 'Zip') {
      dataType = 'postal-code';
    }

    return `input/input-${dataType}`;
  }
}
