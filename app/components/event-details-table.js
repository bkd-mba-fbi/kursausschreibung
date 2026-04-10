import Component from '@glimmer/component';
import { action } from '@ember/object';
import settings from 'kursausschreibung/framework/settings';
import { getString } from 'kursausschreibung/framework/translate';
import { camelize } from '@ember/string';
import { getIcsFileFromEvent } from 'kursausschreibung/framework/ics-file';

const FIELDS = settings.eventDetailsFields.map((key) => ({
  name: getString(camelize(key)),
  key,
}));

export default class EventDetailsTableComponent extends Component {
  title = settings.eventDetailsTitle;
  showEventText = settings.showEventText;
  fields = FIELDS;

  @action
  downloadIcs(event) {
    event.preventDefault();
    getIcsFileFromEvent(this.args.event);
  }
}
