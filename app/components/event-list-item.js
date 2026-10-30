import Component from '@glimmer/component';
import settings from 'kursausschreibung/framework/settings';
import { getString } from 'kursausschreibung/framework/translate';
import { camelize } from '@ember/string';
import { get } from '@ember/object';

export default class EventListItemComponent extends Component {
  get title() {
    return settings.eventListTitle;
  }
  get fields() {
    return settings.eventListFields.map((key) => ({
      // event texts bring their own (already localized) label, so we can use get() instead of getString()
      name: /^EventText\d+$/.test(key)
        ? get(this.args.event.displayData, key + 'Label')
        : getString(camelize(key)),
      key,
    }));
  }
}
