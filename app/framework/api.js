/* loosely based on the CLX framework */

import $ from 'jquery';
import appConfig from './app-config';
import { getAccessToken } from './storage';
import { Promise } from 'rsvp';

let accessToken = null;

/**
 * do a call to the API-server
 * @param {string} method the HTTP method for the call
 * @param {string} relativeUrl the URL relative to the apiUrl
 * @param {boolean} readableError pass false to get the initial exception
 * @param {object} data data for POST and PUT calls
 */
function ajax(method, relativeUrl, readableError = true, data = null) {
  if (accessToken === null)
    accessToken = getAccessToken();

  let promise = $.ajax({
    method: method,
    dataType: 'json',
    processData: false,
    data: data !== null ? JSON.stringify(data, null, '\t') : undefined,
    url: appConfig.apiUrl + '/' + relativeUrl,

    // convert empty response to valid JSON
    dataFilter: data => data === '' ? 'null' : data,

    headers: {
      'CLX-Authorization': `token_type=${appConfig.tokenType}, access_token=${accessToken}`
    }
  });

  if (readableError) {
    promise = promise.catch(() => {
      throw new Error(`${method}-request to ${relativeUrl} failed`); // human-readable error
    });
  }

  return promise;
}

function post(relativeUrl, data) {
  return ajax('POST', relativeUrl, false, data);
}

function put(relativeUrl, data) {
  return ajax('PUT', relativeUrl, false, data);
}

function get(relativeUrl, readableError) {
  return ajax('GET', relativeUrl, readableError);
}

/**
 * get UserSettings
 */
export function getUserSettings() {
  return get('UserSettings/');
}

/**
 * get all events
 */
export function getEvents() {
  return get('Events/');
}

/**
 * get an Event
 * @param {number} eventId the id of the event
 */
export function getEvent(eventId) {
  return get('Events/' + eventId);
}

/**
 * get the lessons for all events
 */
export function getLessons() {
  return get('Lessons/');
}

/**
 * get the locations for all events
 */
export function getEventLocations() {
  return get('EventLocations/');
}

/**
 * get subscriptionDetails of an event
 * @param {number} eventId the id of the event
 */
export function getSubscriptionDetails(eventId) {
  return get('Events/' + eventId + '/SubscriptionDetails');
}

/**
 * get all eventTexts
 * @param {string} cultureInfo 'de-CH' for german and 'en-US' for french
 */
export function getEventTexts(cultureInfo) {
  return get('EventTexts/?cultureInfo=' + cultureInfo);
}

let dropDownItems = {};

/**
 * get available options for dropdown menu
 * @param {string} type type of the items
 */
export function getDropDownItems(type) {
  if (dropDownItems.hasOwnProperty(type)) {
    return Promise.resolve(dropDownItems[type]);
  }

  return get('DropDownItems/' + type).then(
    response => (dropDownItems[type] = response)
  );
}

/**
 * post a new person
 * @param {object} data data of the person
 */
export function postPerson(data) {
  return post('Persons/', data);
}

/**
 * update an existing person
 * @param {object} data data of the person
 * @param {number} personId id of the person
 */
export function putPerson(data, personId) {
  return put('Persons/' + personId, data);
}

/**
 * post a new address
 * @param {object} data data of the address
 */
export function postAddress(data) {
  return post('Addresses/', data);
}

/**
 * post a new subscription
 * @param {object} data data of the subscription
 */
export function postSubscription(data) {
  return post('Subscriptions/', data);
}
