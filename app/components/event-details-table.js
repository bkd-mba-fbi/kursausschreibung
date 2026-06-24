import Component from '@glimmer/component';
import { action } from '@ember/object';
import settings from 'kursausschreibung/framework/settings';
import { getString } from 'kursausschreibung/framework/translate';
import { camelize } from '@ember/string';
import { getIcsFileFromEvent } from 'kursausschreibung/framework/ics-file';

export default class EventDetailsTableComponent extends Component {
  get title() {
    return settings.eventDetailsTitle;
  }
  get showEventText() {
    return settings.showEventText;
  }
  get fields() {
    return settings.eventDetailsFields.map((key) => ({
      name: getString(camelize(key)),
      key,
    }));
  }

  @action
  downloadIcs(event) {
    event.preventDefault();
    getIcsFileFromEvent(this.args.event);
  }
}
