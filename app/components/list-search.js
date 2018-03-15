import Component from '@ember/component';
import { observer, computed } from "@ember/object";
import { throttle } from '@ember/runloop';

// context for throttle
let myContext = { name: 'throttle' };

export default Component.extend({
  // the idea is this:
  // when the user types something, the input changes
  // inputChanged observes this and calls queryChanged
  // throttled. queryChanged changes the query string
  // (Actions up, Data down)
  input: '',
  query: '',

  inputChanged: observer('input', function () {
    throttle(myContext, () => {
      this.get('queryChanged')(this.get('input'));
    }, 200, false);
  }),

  filteredItems: computed('items', 'query', function () {
    let query = this.get('query');
    return this.get('items').filter((event) =>
      event.Designation.toLowerCase()
        .indexOf(this.get('query').toLowerCase()) !== -1
    );
  }),

});
