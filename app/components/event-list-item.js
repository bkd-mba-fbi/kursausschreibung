import Component from '@glimmer/component';
import settings from 'kursausschreibung/framework/settings';
import { getString } from 'kursausschreibung/framework/translate';
import { camelize } from '@ember/string';

const FIELDS = settings.eventListFields.map((key) => ({
  name: getString(camelize(key)),
  key,
}));

export default class EventListItemComponent extends Component {
  title = settings.eventListTitle;
  fields = FIELDS;
}
