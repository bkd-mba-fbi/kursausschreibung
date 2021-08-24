import { isInSubscriptionRange } from './date-helpers';
import settings from './settings';

/**
 * return the callback specified in the settings or the
 * default implementation
 * @param {function?} settingsValue a custom implementation
 * @param {function} defaultImplementation the default implementation
 */
function createStatusCallback(settingsValue, defaultImplementation) {
  if (typeof settingsValue === 'function')
    return settingsValue;

  return defaultImplementation;
}

// see "Event Status Definition" in documentation
let isGreen = createStatusCallback(settings.lampIsGreen, function (event) {
  return (
    event.AllowSubscriptionInternetByStatus &&
    event.TypeOfSubscription === 4 &&
    isInSubscriptionRange(event) &&
    ((event.FreeSeats > 0) && ((event.MaxParticipants - event.FreeSeats) < event.MinParticipants) || event.EventTypeId === 1)
  );
});

let isChartreuse = createStatusCallback(settings.lampIsChartreuse, function (event) {
  return (
    event.AllowSubscriptionInternetByStatus &&
    event.TypeOfSubscription === 4 &&
    isInSubscriptionRange(event) &&
    event.FreeSeats > 0 &&
    (event.MaxParticipants - event.FreeSeats) >= event.MinParticipants
  );
});

let isYellow = createStatusCallback(settings.lampIsYellow, function (event) {
  return (
    event.AllowSubscriptionInternetByStatus &&
    event.TypeOfSubscription === 4 &&
    !isInSubscriptionRange(event)
  );
});

let isRed = createStatusCallback(settings.lampIsRed, function (event) {
  return (
    event.AllowSubscriptionInternetByStatus &&
    event.TypeOfSubscription === 4 &&
    event.FreeSeats === 0
  );
});

export { isGreen, isChartreuse, isYellow, isRed };
