import Component from '@ember/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
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

export default class EventListSearchComponent extends Component {
  @tracked query = getParameterByName('search');
  @tracked filteredEvents = null;

  get sortOptions() {
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
  }

  didReceiveAttrs() {
    super.didReceiveAttrs(...arguments);
    this.filteredEvents = this.events;
    this.updateFilteredEvents();
  }

  didRender() {
    super.didRender(...arguments);
    if (config.environment === 'test') {
      return;
    }

    let sortList = document.getElementById('sortList');
    if (sortList) {
      sortList.value = getSortAs();
    }
  }

  @action
  handleKeyUp(event) {
    this.query = event.target.value;
    if (config.environment !== 'test') {
      setParameterByName('search', this.query);
    }
    this.updateFilteredEvents();
  }

  @action
  clearSearch() {
    this.query = '';
    if (config.environment !== 'test') {
      setParameterByName('search', '');
    }
    this.updateFilteredEvents();
  }

  @action
  handleSortByChange(event) {
    sortAs(event.target.value);
  }

  updateFilteredEvents() {
    let query = this.query;
    query = query === null ? '' : query.toLowerCase();
    // don't filter the events when the query is empty
    if (query === '') {
      this.filteredEvents = this.events;
    } else {
      this.filteredEvents = this.events
        // search the query string in event-properties and memo-texts
        .filter(
          (event) =>
            Object.keys(event).some((key) => match(event[key], query)) ||
            event.texts.some((text) => match(text.memo, query))
        );
    }

    if (typeof this.queryChanged === 'function') {
      this.queryChanged(query);
    }
  }
}
