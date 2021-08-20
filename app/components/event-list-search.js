import Component from '@ember/component';
import { oneWay } from '@ember/object/computed';
import { observer } from '@ember/object';
import { setParameterByName, getParameterByName } from 'kursausschreibung/framework/url-helpers';

// tests if a query matches a value
function match(value, query) {
  return (
    typeof value === 'string' &&
    value.toLowerCase().indexOf(query) !== -1
  );
}

export default Component.extend({
  query: getParameterByName('search'),
  // update the filtered events when the events change
  eventsChanged: observer('events', function () {
    this.send('queryChanged');
  }),
   
  willRender() {
    this.send('queryChanged');
  }, 

  filteredEvents: oneWay('events'),

  keyUp(){
    setParameterByName('search',this.get('query'));
  },

  actions: {
    queryChanged() {
      let query = this.get('query');
      query = query === null ? '' : query.toLowerCase();
      // don't filter the events when the query is empty
      if (query === '') {
        this.set('filteredEvents', this.get('events'));
        return;
      }

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
