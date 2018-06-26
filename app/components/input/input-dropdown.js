import Component from '@ember/component';
import { computed } from '@ember/object';
import { getDropDownItems } from 'kursausschreibung/framework/api';

export default Component.extend({
  tagName: 'div',
  classNames: 'uk-width-1-1',

  options: computed('field.options.dropdownItems', function() {
    return getDropDownItems(this.get('field.options.dropdownItems'));
  })
});
