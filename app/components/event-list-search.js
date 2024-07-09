import Component from '@ember/component';
import { oneWay } from '@ember/object/computed';
import { observer } from '@ember/object';
import { setParameterByName, getParameterByName } from 'kursausschreibung/framework/url-helpers';
import { sortAs } from '../framework/gui-helpers';
import { getSortAs } from '../framework/storage';
import settings from '../framework/settings';
import { getString } from '../framework/translate';
import { htmlSafe } from '@ember/string';

// tests if a query matches a value
function match(value, query) {
  
  if (typeof value === 'object' && value !== null) {
    value = Object.values(value).join('|');
  } 
    
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
    //only on first page. filter eventcode
    if  (this.get('parentView').page === 1){
      this.send('queryChanged');
    }
    
    let options = '';
    if(settings.sortOptions === undefined) {
      options = '<option value=error>configure key sortoptions array in settings</option>';
    } else {
      settings.sortOptions.forEach(option => {
        options = options + '<option value='+option+'>'+getString("sort"+option)+'</option>';
      }); 
    }
    this.set('sortOptions',htmlSafe(options));
  }, 

  didRender() {
    document.getElementById('sortList').value = getSortAs();
  },

  filteredEvents: oneWay('events'),

  keyUp(){
    setParameterByName('search',this.get('query'));
  },

  actions: {
    clearSearch() {
      this.set('query','');
      setParameterByName('search','');
    },

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
    },
    sortBy(value) {
      sortAs(value);
    }
  },

});
