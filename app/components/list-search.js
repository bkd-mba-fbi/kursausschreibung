import Component from '@ember/component';
import { oneWay } from '@ember/object/computed';
import { get } from "@ember/object";

export default Component.extend({
  query: '',
  filteredItems: oneWay('items'),

  actions: {
    queryChanged() {
      let query = this.get('query').toLowerCase();

      this.set('filteredItems',
        this.get('items').filter((item) =>

          // test if the query is a part of
          // a property of the item
          Object.keys(item).some(function (key) {
            let value = get(item, key);

            if (typeof value !== 'string') {
              return false;
            }

            return value.toLowerCase().indexOf(query) !== -1;
          })
        )
      );

      this.sendAction('queryChanged', query);
    }
  }
});
