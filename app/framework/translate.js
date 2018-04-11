import { fetchJSON } from './ajax-helpers';
import storage from './storage';
import moment from 'moment';

let locale = {};
let language;

export function init() {
  language = storage.userSettings.language();

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
  storage.userSettings.language(newLanguage);

  if (newLanguage !== language) {
    window.location.assign('./');
  }
}

export function getString(key, placeholderValues) {
  /// <summary>gets a localized sring with the key. also replaces the placeholders provided</summary>
  /// <param name="key" type="String">the key of the string</param>
  /// <param name="placeholderValues" type="Object">the values to replace the placeholders in the string.
  /// can be a string or an array of strings. placeholders are defined in the format string pattern ({0})</param>

  // translation should never throw an exception. the rest of the application might still run normally
  try {
    var string = locale[key];
    if (string === undefined)
      return '<span style="color:red;">Key not found: ' + key + '</span>';

    if (placeholderValues) {
      if (placeholderValues instanceof Array) {
        for (var i = 0; i < placeholderValues.length; i++) {
          string = string.replace('{' + i + '}', placeholderValues[i]);
        }
      } else {
        string = string.replace('{0}', placeholderValues);
      }
    }

    return string;
  } catch (ex) {
    console.error('translate ERROR: ' + ex);
    return '<span style="color:red;">error in translation.</span>';
  }
}
