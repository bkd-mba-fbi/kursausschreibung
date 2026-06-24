import Component from '@glimmer/component';
import settings from 'kursausschreibung/framework/settings';
import { getString } from 'kursausschreibung/framework/translate';
import { camelize } from '@ember/string';

export default class EventListItemComponent extends Component {
  get title() {
    return settings.eventListTitle;
  }
  get fields() {
    return settings.eventListFields.map((key) => ({
      name: getString(camelize(key)),
      key,
    }));
  }
}
