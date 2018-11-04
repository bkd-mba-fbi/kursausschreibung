/* loosely based on the CLX framework */

import $ from 'jquery';
import { getCulture, setCulture } from './storage';
import appConfig from './app-config';

let language = detectLanguage();
let locale = window.kursausschreibung.locale[language];

/**
 * get the current language
 */
export function getLanguage() {
  return language;
}

/**
 * set a new language
 * this reloads the module
 * @param {string} newLanguage the new language
 */
export function setLanguage(newLanguage) {
  setCulture(newLanguage);

  if (newLanguage !== getLanguage()) {
    window.location.assign(appConfig.webBaseUrl);
  }
}

/**
 * returns a localized sring
 * @param {string} key the key to localize
 */
export function getString(key) {
  let string = locale[key];

  if (string === undefined) {
    return `<span style="color:red;">key not found: ${key}</span>`;
  }

  return string;
}

/**
 * detect the language the module should have
 */
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
  let culture = getCulture();

  if (culture !== null) {
    return culture;
  }

  // third priority: browser-language
  let navigatorLanguage = navigator.language;

  if (navigatorLanguage.split('-')[0] === 'fr') {
    return 'fr-CH';
  }
  // default to de-CH
  return 'de-CH';
}
