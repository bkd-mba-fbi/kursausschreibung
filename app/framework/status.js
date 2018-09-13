import { isInSubscriptionRange } from './date-helpers';
import settings from './settings';

// return the callback specified in the settings or the
// default implementation
function createStatusCallback(settingsValue, defaultImplementation) {
  if (typeof settingsValue === 'function')
    return settingsValue;

  return defaultImplementation;
}

// see "Event Status Definition" in documentation
let isGreen = createStatusCallback(settings.lampIsGreen, function (event) {
  return (event.AllowSubscriptionInternetByStatus &&
    isInSubscriptionRange(event) &&
    event.FreeSeats > 0);
});

let isYellow = createStatusCallback(settings.lampIsYellow, function (event) {
  return (
    event.AllowSubscriptionInternetByStatus &&
    !isInSubscriptionRange(event)
  );
});

let isRed = createStatusCallback(settings.lampIsRed, function (event) {
  return (
    event.AllowSubscriptionInternetByStatus &&
    event.FreeSeats === 0
  );
});

export { isGreen, isYellow, isRed };
