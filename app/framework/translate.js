import $ from 'jquery';
import { fetchJSON } from './ajax-helpers';
import { storeItem, getItem } from './storage';
import moment from 'moment';

let locale = {};
let language;

export function init() {
  // detect language
  // first priority: html lang attribute
  let htmlLang = $('html').attr('lang');

  if (htmlLang === 'de') {
    language = 'de-CH';
  } else if (htmlLang === 'fr') {
    language = 'fr-CH';
  }

  // second priority: uiCulture in localStorage
  if (language === undefined) {
    language = getItem('uiCulture');
  }

  // third priority: browser-language
  if (language === undefined) {
    let navigatorLanguage = navigator.language;

    if (navigatorLanguage === undefined) {
      // for IE
      navigatorLanguage = navigator.userLanguage;
    }

    if (navigatorLanguage.split('-')[0] === 'fr') {
      language = 'fr-CH';
    } else {
      // default to de-CH
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
