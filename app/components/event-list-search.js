import Component from '@ember/component';
import { oneWay } from '@ember/object/computed';

// tests if a query matches a value
function match(value, query) {
  return (
    typeof value === 'string' &&
    value.toLowerCase().indexOf(query) !== -1
  );
}

export default Component.extend({
  query: '',
  filteredEvents: oneWay('events'),

  actions: {
    queryChanged() {
      let query = this.get('query').toLowerCase();

      this.set('filteredEvents', this.get('events')
        // search the query string in event-properties and memo-texts
        .filter(event => (
            Object.keys(event).some(key => match(event[key], query)) ||
            event.texts.some(text => match(text.memo, query))
        ))
      );

      this.get('queryChanged')(query);
    }
  }
});
