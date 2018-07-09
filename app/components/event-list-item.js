import Component from '@ember/component';
import settings from 'kursausschreibung/framework/settings';
import { getString } from 'kursausschreibung/framework/translate';
import { camelize } from "@ember/string";

export default Component.extend({
  tagName: 'li',

  title: settings.eventListTitle,

  fields: settings.eventListFields.map(key => ({
    name: getString(camelize(key)), key
  }))
});
