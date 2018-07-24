import $ from 'jquery';
import appConfig from './app-config';
import storage from './storage';

// not using the framework-version for now
// because it seems to be missing almost every call
// this modules needs

function ajax(options, relativeUrl, readableError = true) {
  let promise = $.ajax(
    $.extend(options, {
      dataType: 'json',
      url: appConfig.apiUrl + '/' + relativeUrl,

      headers: {
        'CLX-Authorization': `token_type=${
          appConfig.tokenType
          }, access_token=${storage.access_token()}`
      }
    })
  );

  if (readableError)
    promise = promise.catch(() => {
      throw new Error(`${options.method}-request to ${relativeUrl} failed`); // human-readable error
    });

  return promise;
}

function post(relativeUrl, data, readableError) {
  return ajax({ method: 'POST', processData: false, data: JSON.stringify(data, null, '\t') }, relativeUrl, readableError);
}

function put(relativeUrl, data, readableError) {
  return ajax({ method: 'PUT', processData: false, data: JSON.stringify(data, null, '\t') }, relativeUrl, readableError);
}

function get(relativeUrl, readableError) {
  return ajax({ method: 'GET' }, relativeUrl, readableError);
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
  return post('Persons/', data, false);
}

export function putPerson(data, personId) {
  return put('Persons/' + personId, data, false);
}

export function postAddress(data) {
  return post('Addresses/', data, false);
}

export function postSubscription(data) {
  return post('Subscriptions/', data, false);
}
