/* loosely based on the CLX framework */

import { get } from '@ember/object';
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
    window.location.reload();
  }
}

/**
 * returns a localized sring
 * @param {string} key the key to localize
 * @param {string[]?} placeholderValues these values replace {0}, {1}, ...
 * @param {object?} namedPlaceholderValues these values replace named placeholders
 */
export function getString(
  key,
  placeholderValues = [],
  namedPlaceholderValues = {}
) {
  try {
    let string = locale[key];

    if (string === undefined || string === null) {
      return '<span style="color:red;">Key not found: ' + key + '</span>';
    }

    placeholderValues.forEach((placeholderValue, i) => {
      string = string.replace('{' + i + '}', placeholderValue);
    });

    string = string.replace(
      /\{([A-Za-z][A-Za-z0-9_]*)\}/g,
      (placeholder, name) => {
        let value = get(namedPlaceholderValues, name);
        return value === undefined || value === null ? '' : value;
      }
    );

    return string;
  } catch (ex) {
    console.error('translate ERROR:', ex); // eslint-disable-line no-console
    return '<span style="color:red;">error in translation.</span>';
  }
}

/**
 * detect the language the module should have
 */
function detectLanguage() {
  // first priority: html lang attribute
  let htmlLang = document.documentElement.lang;

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
