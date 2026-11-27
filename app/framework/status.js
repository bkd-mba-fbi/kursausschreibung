import { isInSubscriptionRange } from './date-helpers';
import settings from './settings';

/**
 * return a function that calls the callback specified in the settings
 * or the default implementation. The settings are read on every call,
 * because settings from WebM_SchoolAppNavigation are loaded after this file
 * @param {string} settingsKey the key of a custom implementation in the settings
 * @param {function} defaultImplementation the default implementation
 */
function createStatusCallback(settingsKey, defaultImplementation) {
  return function (...args) {
    let settingsValue = settings[settingsKey];

    if (typeof settingsValue === 'function') return settingsValue(...args);

    return defaultImplementation(...args);
  };
}

// see "Event Status Definition" in documentation
let isGreen = createStatusCallback('lampIsGreen', function (event) {
  return (
    event.AllowSubscriptionInternetByStatus &&
    event.TypeOfSubscription === 4 &&
    isInSubscriptionRange(event) &&
    ((event.FreeSeats > 0 &&
      event.MaxParticipants - event.FreeSeats < event.MinParticipants) ||
      event.EventTypeId === 1)
  );
});

let isChartreuse = createStatusCallback('lampIsChartreuse', function (event) {
  return (
    event.AllowSubscriptionInternetByStatus &&
    event.TypeOfSubscription === 4 &&
    isInSubscriptionRange(event) &&
    event.FreeSeats > 0 &&
    event.MaxParticipants - event.FreeSeats >= event.MinParticipants
  );
});

let isYellow = createStatusCallback('lampIsYellow', function (event) {
  return (
    event.AllowSubscriptionInternetByStatus &&
    event.TypeOfSubscription === 4 &&
    !isInSubscriptionRange(event)
  );
});

let isRed = createStatusCallback('lampIsRed', function (event) {
  return (
    event.AllowSubscriptionInternetByStatus &&
    event.TypeOfSubscription === 4 &&
    event.FreeSeats === 0
  );
});

export { isGreen, isChartreuse, isYellow, isRed };
