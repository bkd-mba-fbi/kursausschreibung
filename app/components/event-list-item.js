import Component from '@ember/component';
import settings from 'kursausschreibung/framework/settings';
import { getString } from 'kursausschreibung/framework/translate';
import { camelize } from '@ember/string';

const FIELDS = settings.eventListFields.map((key) => ({
  name: getString(camelize(key)),
  key,
}));

export default Component.extend({
  tagName: 'li',
  classNames: 'jsfilter',

  title: settings.eventListTitle,
  fields: FIELDS,
});
