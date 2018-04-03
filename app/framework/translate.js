import $ from 'jquery';
import { Promise } from 'rsvp';

let locale = {};

export function init() {
  var userLanguage = $('html').attr('lang');

  return new Promise(function (resolve, reject) {
    $.get({
      url: 'locale/de-CH.json',
      dataType: 'json',

      dataFilter(data) {
        // remove comments
        return data.replace(/\/\/.*/g, '');
      },

      success(response) {
        $.extend(locale, response);
        resolve();
      }
    });
  });
}

export function getString(key, placeholderValues) {
  /// <summary>gets a localized sring with the key. also replaces the placeholders provided</summary>
  /// <param name="key" type="String">the key of the string</param>
  /// <param name="placeholderValues" type="Object">the values to replace the placeholders in the string.
  /// can be a string or an array of strings. placeholders are defined in the format string pattern ({0})</param>

  // translation should never throw an exception. the rest of the application might still run normally
  try {
    var string = translate.locale[key];
    if (string === undefined)
      return '<span style="color:red;">Key not found: ' + key + '</span>';

    if (placeholderValues) {
      if (placeholderValues instanceof Array) {
        for (var i = 0; i < placeholderValues.length; i++) {
          string = string.replace('{' + i + '}', placeholderValues[i]);
        }
      } else
        string = string.replace('{0}', placeholderValues);
    }

    return string;
  }
  catch (ex) {
    console.error('translate ERROR: ' + ex);
    return '<span style="color:red;">error in translation.</span>';
  }
}
