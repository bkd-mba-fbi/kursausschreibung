import { fetchJSON } from './ajax-helpers';
import { storeItem, getItem } from './storage';
import moment from 'moment';

let locale = {};
let language;

export function init() {
  language = getItem('uiCulture');

  if (language === null) {
    let navigatorLanguage = navigator.language;

    if (navigatorLanguage === undefined) {
      // for IE
      navigatorLanguage = navigator.userLanguage;
    }

    if (navigatorLanguage.split('-')[0] === 'fr') {
      language = 'fr-CH';
    } else {
      language = 'de-CH';
    }
  }

  // set locale for moment.js
  moment.locale(language);

  // fetch translations
  return fetchJSON(`locale/${language}.json`, locale);
}

export function getLanguage() {
  return language;
}

export function setLanguage(newLanguage) {
  storeItem('uiCulture', newLanguage);

  if (newLanguage !== language) {
    window.location.assign('./');
  }
}

// returns a localized sring
export function getString(key) {
  let string = locale[key];

  if (string === undefined) {
    return `<span style="color:red;">key not found: ${key}</span>`;
  }

  return string;
}
