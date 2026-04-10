import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { modifier } from 'ember-modifier';
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

  get filteredEvents() {
    let events = this.args.events ?? [];
    let query = (this.query ?? '').toLowerCase();
    if (!query) {
      return events;
    }
    return events.filter(
      (event) =>
        Object.keys(event).some((key) => match(event[key], query)) ||
        event.texts.some((text) => match(text.memo, query))
    );
  }

  syncSort = modifier((element) => {
    if (config.environment !== 'test') {
      element.value = getSortAs();
    }
  });

  @action
  handleKeyUp(event) {
    this.query = event.target.value;
    if (config.environment !== 'test') {
      setParameterByName('search', this.query);
    }
    if (typeof this.args.queryChanged === 'function') {
      this.args.queryChanged(this.query);
    }
  }

  @action
  clearSearch() {
    this.query = '';
    if (config.environment !== 'test') {
      setParameterByName('search', '');
    }
    if (typeof this.args.queryChanged === 'function') {
      this.args.queryChanged('');
    }
  }

  @action
  handleSortByChange(event) {
    sortAs(event.target.value);
  }
}
