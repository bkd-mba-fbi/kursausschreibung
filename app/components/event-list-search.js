import Component from '@ember/component';
import { computed, observer } from '@ember/object';
import {
  setParameterByName,
  getParameterByName,
} from 'kursausschreibung/framework/url-helpers';
import { sortAs } from '../framework/gui-helpers';
import { getSortAs } from '../framework/storage';
import settings from '../framework/settings';
import { getString } from '../framework/translate';
import { htmlSafe } from '@ember/template';
import config from '../config/environment';

// tests if a query matches a value
function match(value, query) {
  if (typeof value === 'object' && value !== null) {
    value = Object.values(value).join('|');
  }

  return typeof value === 'string' && value.toLowerCase().indexOf(query) !== -1;
}

export default Component.extend({
  query: getParameterByName('search'),
  didReceiveAttrs() {
    this._super(...arguments);
    this.send('queryChanged');
  },

  // update the filtered events when the events change
  eventsChanged: observer('events', function () {
    this.set('filteredEvents', this.events);
    this.send('queryChanged');
  }),

  sortOptions: computed(function () {
    let options = '';

    if (settings.sortOptions === undefined) {
      options =
        '<option value=error>configure key sortoptions array in settings</option>';
    } else {
      settings.sortOptions.forEach((option) => {
        options =
          options +
          '<option value=' +
          option +
          '>' +
          getString('sort' + option) +
          '</option>';
      });
    }

    return htmlSafe(options);
  }),

  didRender() {
    this._super(...arguments);
    if (config.environment === 'test') {
      return;
    }

    let sortList = document.getElementById('sortList');
    if (sortList) {
      sortList.value = getSortAs();
    }
  },

  filteredEvents: null,

  keyUp() {
    this.set('query', document.getElementById('searchEvents').value);
    if (config.environment !== 'test') {
      setParameterByName('search', this.query);
    }
    this.send('queryChanged');
  },

  actions: {
    clearSearch() {
      this.set('query', '');
      if (config.environment !== 'test') {
        setParameterByName('search', '');
      }
    },

    queryChanged() {
      let query = this.query;
      query = query === null ? '' : query.toLowerCase();
      // don't filter the events when the query is empty
      if (query === '') {
        this.set('filteredEvents', this.events);
        return;
      }

      this.set(
        'filteredEvents',
        this.events
          // search the query string in event-properties and memo-texts
          .filter(
            (event) =>
              Object.keys(event).some((key) => match(event[key], query)) ||
              event.texts.some((text) => match(text.memo, query))
          )
      );

      this.queryChanged(query);
    },
    sortBy(value) {
      sortAs(value);
    },
  },
});
