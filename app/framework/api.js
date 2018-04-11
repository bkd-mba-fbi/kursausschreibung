import $ from 'jquery';
import settings from '../framework/settings';

// not using the framework-version for now
// because it seems to be missing almost every call
// this modules needs and it has a lot of calls this
// module doesn't need

export function get(relativeUrl) {
  return $.getJSON(settings.apiUrl + '/' + relativeUrl);
}

export function getEvents() {
  return get('Events/');
}

export function getLessons() {
  return get('Lessons/');
}

export function getEventLocations() {
  return get('EventLocations/');
}

export function getEventTexts() {
  return get('EventTexts/');
}
