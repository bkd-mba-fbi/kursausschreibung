import Component from '@ember/component';
import settings from 'kursausschreibung/framework/settings';
import { getString } from 'kursausschreibung/framework/translate';
import { camelize } from "@ember/string";
import { getIcsFileFromEvent } from "kursausschreibung/framework/ics-file";

export default Component.extend({
  title: settings.eventDetailsTitle,
  showEventText: settings.showEventText,

  fields: settings.eventDetailsFields.map(key => ({
    name: getString(camelize(key)), key
  })),

  actions: {
    getIcsFileFromEvent() {
      getIcsFileFromEvent(this.event);
    }
  }

});
