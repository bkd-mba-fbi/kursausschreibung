import $ from 'jquery';
import appConfig from './app-config';
import storage from './storage';

// not using the framework-version for now
// because it seems to be missing almost every call
// this modules needs

function ajax(options, relativeUrl) {
  return $
    .ajax(
      $.extend(options, {
        dataType: 'json',
        url: appConfig.apiUrl + '/' + relativeUrl,

        headers: {
          'CLX-Authorization': `token_type=${
            appConfig.tokenType
            }, access_token=${storage.access_token()}`
        }
      })
    )
    .catch(() => {
      throw new Error(`${options.method}-request to ${relativeUrl} failed`); // human-readable error
    });
}

function post(relativeUrl, data) {
  return ajax({ method: 'POST', processData: false, data: JSON.stringify(data, null, '\t') }, relativeUrl);
}

function put(relativeUrl, data) {
  return ajax({ method: 'PUT', processData: false, data: JSON.stringify(data, null, '\t') }, relativeUrl);
}

function get(relativeUrl) {
  return ajax({ method: 'GET' }, relativeUrl);
}

export function getEvents() {
  return get('Events/');
}

export function getEvent(eventId) {
  return get('Events/' + eventId);
}

export function getLessons() {
  return get('Lessons/');
}

export function getEventLocations() {
  return get('EventLocations/');
}

export function getSubscriptionDetails(eventId) {
  return get('Events/' + eventId + '/SubscriptionDetails');
}

export function getEventTexts(cultureInfo) {
  cultureInfo = cultureInfo === 'fr-CH' ? 'en-US' : 'de-CH';
  return get('EventTexts/?cultureInfo=' + cultureInfo);
}

let dropDownItems = {};

export function getDropDownItems(type) {
  if (dropDownItems.hasOwnProperty(type)) {
    return Promise.resolve(dropDownItems[type]);
  }

  return get('DropDownItems/' + type).then(
    response => (dropDownItems[type] = response)
  );
}

export function postPerson(data) {
  return post('Persons/', data);
}

export function putPerson(data, personId) {
  return put('Persons/' + personId, data);
}

export function postAddress(data) {
  return post('Addresses/', data);
}

export function postSubscription(data) {
  return post('Subscriptions/', data);
}
