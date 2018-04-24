import Component from '@ember/component';
import settings from '../framework/settings';
import { getString } from '../framework/translate';
import { camelize } from "@ember/string";

export default Component.extend({
  title: settings.eventDetailsTitle,
  showEventText: settings.showEventText,

  fields: settings.eventDetailsFields.map(key => ({
    name: getString(camelize(key)), key
  }))
});
