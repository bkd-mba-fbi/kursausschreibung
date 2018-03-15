import Controller from '@ember/controller';
import { computed, observer } from "@ember/object";

export default Controller.extend({
  query: '',
  page: 1,

  events: computed('model', 'query', function () {
    let query = this.get('query');
    return this.get('model').filter((event) =>
      event.Designation.toLowerCase()
        .indexOf(this.get('query').toLowerCase()) !== -1
    );
  }),

  // reset page when searching
  queryChanged: observer('query', function() {
    this.set('page', 1);
  }),

  queryParams: ['query', 'page']
});
