import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  tagName: 'div',
  classNames: 'uk-width-1-1',

  componentType: computed('field.dataType', function() {
    return 'input/input-' + this.get('field.dataType');
  })
});
