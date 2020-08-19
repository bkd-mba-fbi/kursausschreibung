import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  tagName: 'div',
  classNames: 'uk-width-1-1',

  componentType: computed('field.dataType', function () {
    let dataType = this.get('field.dataType');

    // provide typeahead functionality for postal codes (see issue #75)
    // change the type of the fields here so there is no need to change
    // any settings
    if (this.get('field.id') === 'Zip') {
      dataType = 'postal-code';
    }

    return 'input/input-' + dataType;
  })
});
