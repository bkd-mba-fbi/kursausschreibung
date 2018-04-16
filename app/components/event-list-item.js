import Component from '@ember/component';
import { computed } from "@ember/object";
import { isInSubscriptionRange } from '../framework/date-helpers';
import settings from '../framework/settings';
import { getString } from '../framework/translate';
import { camelize } from "@ember/string";

// either eval a callback specified in the settings or
// return the default implementation
function createStatusCallback(settingsValue, defaultImplementation) {
  if (typeof settingsValue === 'string') {
    try {
      // black magic
      return new Function('event', 'isInSubscriptionRange', `return ${settingsValue};`); // jshint ignore:line
    } catch(exception) {
      console.warn('failed to parse statusCallback:', exception);
    }
  }

  return defaultImplementation;
}

// see "Event Status Definition" in documentation
let isGreen = createStatusCallback(settings.lampIsGreen, function(event) {
  return (event.AllowSubscriptionInternetByStatus &&
    isInSubscriptionRange(event) &&
    event.FreeSeats > 0);
});

let isYellow = createStatusCallback(settings.lampIsYellow, function(event) {
  return (
    event.AllowSubscriptionInternetByStatus &&
    !isInSubscriptionRange(event)
  );
});

let isRed = createStatusCallback(settings.lampIsRed, function(event) {
  return (
    event.AllowSubscriptionInternetByStatus &&
    event.FreeSeats === 0
  );
});


export default Component.extend({
  tagName: 'li',
  fields: settings.eventListFields.map(key => ({
    name: getString(camelize(key)), key
  })),

  status: computed('event', function () {
    let event = this.get('event');

    if (isGreen(event, isInSubscriptionRange)) {
      return 'green';
    }

    if (isYellow(event, isInSubscriptionRange)) {
      return 'yellow';
    }

    if (isRed(event, isInSubscriptionRange)) {
      return 'red';
    }

    return 'orange';
  })
});
