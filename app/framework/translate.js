import $ from 'jquery';
import storage from './storage';
import appConfig from './app-config';

let language = detectLanguage();
let locale = window.kursausschreibung.locale[language];

export function getLanguage() {
  return language;
}

export function setLanguage(newLanguage) {
  storage.userSettings.uiCulture(newLanguage);

  if (newLanguage !== getLanguage()) {
    window.location.assign(appConfig.webBaseUrl);
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

function detectLanguage() {
  // first priority: html lang attribute
  let htmlLang = $('html').attr('lang');

  if (htmlLang === 'de') {
    return 'de-CH';
  }

  if (htmlLang === 'fr') {
    return 'fr-CH';
  }

  // second priority: uiCulture in localStorage
  let localStorageLanguage = storage.userSettings.uiCulture();

  if (localStorageLanguage !== null) {
    return localStorageLanguage;
  }

  // third priority: browser-language
  let navigatorLanguage = navigator.language;

  if (navigatorLanguage.split('-')[0] === 'fr') {
    return 'fr-CH';
  }
  // default to de-CH
  return 'de-CH';
}
