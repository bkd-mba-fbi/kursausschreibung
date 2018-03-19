import Component from '@ember/component';
import { oneWay } from '@ember/object/computed';

export default Component.extend({
  value: '',
  filteredItems: oneWay('items'),

  actions: {
    handleFilterEntry() {
      let query = this.get('value');

      this.set('filteredItems', this.get('items').filter((event) =>
        event.Designation.toLowerCase()
          .indexOf(query.toLowerCase()) !== -1
      ));

      this.get('queryChanged')(query);
    }
  }
});
