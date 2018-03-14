import Controller from '@ember/controller';
import { computed } from "@ember/object";

export default Controller.extend({
  searchString: '',

  events: computed('model', 'searchString', function () {
    let searchString = this.get('searchString');
    return this.get('model').filter((event) =>
      event.Designation.toLowerCase()
        .indexOf(this.get('searchString').toLowerCase()) !== -1
    );
  })
});
