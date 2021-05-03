/* loosely based on the CLX framework */

import parseISO from 'date-fns/parseISO';
import format from 'date-fns/format';
import de from 'date-fns/locale/de';
import fr from 'date-fns/locale/fr';
import { getLanguage } from './translate';

// longDateFormats from moment.js
const formats = {
  'de-CH': {
    LT: 'HH:mm',
    LTS: 'HH:mm:ss',
    L: 'dd.MM.yyyy',
    LL: 'EEEEEE, d. MMMM yyyy',
    LLL: 'EEEEEE, d. MMMM yyyy HH:mm',
    LLLL: 'EEEE, d. MMMM yyyy HH:mm'
  },

  'fr-CH': {
    LT: 'HH:mm',
    LTS: 'HH:mm:ss',
    L: 'dd.MM.yyyy',
    LL: 'EEEEEE, d MMMM yyyy',
    LLL: 'EEEEEE, d MMMM yyyy HH:mm',
    LLLL: 'EEEE d MMMM yyyy HH:mm'
  }
};

const language = getLanguage();
const locale = language === 'de-CH' ? de : fr;

/**
 * format a date
 * @param {date|string|number|null} date the date to format
 * @param {string} formatString format or longDateFormat from moment.js
 */
export function formatDate(date, formatString = '') {
  if (date === null)
    return null;

  if (typeof date === 'string')
    date = parseISO(date);

  formatString = formatString in formats[language] ?
    formats[language][formatString] : formatString;

  return format(date, formatString, { locale });
}

/**
 * returns true when the current Date is between
 * SubscriptionDateFrom/SubscriptionTimeFrom and
 * SubscriptionDateTo/SubscriptionTimeTo
 * @param {object} event the event to check
 */
export function isInSubscriptionRange(event) {
  let now = new Date();

  if (event.SubscriptionFrom === null)
    return now.getTime() < event.SubscriptionTo.getTime();

  return event.SubscriptionFrom.getTime() < now.getTime() &&
    now.getTime() < event.SubscriptionTo.getTime();
}

/**
 * return true if DateFrom is greater than or equal
 * to the current date
 * @param {object} event event to check
 */
export function eventStarted(event) {
  let now = new Date();
  if (event.DateFrom === null) {
    return true;
  }
  return parseISO(event.DateFrom).getTime() >= now.getTime();
}

/**
 * return true if DateTo is smaller than or equal
 * to the current date
 * @param {object} event event to check
 */
export function eventEnded(event) {
  let now = new Date();
  if (event.DateTo === null) {
    return true;
  }
  return parseISO(event.DateTo).getTime() <= now.getTime();
}

/**
 * combine a date and a time to a single date object
 * this returns null when it fails
 * @param {string} dateString a string containing the date
 * @param {string} timeString a string containing the time in the format hh:mm
 */
export function combineDate(dateString, timeString) {
  try {
    let [hours, minutes] = timeString.split(':').map(str => parseInt(str));
    let date = parseISO(dateString);
    date.setHours(hours, minutes);
    return date;
  } catch (exception) {
    return null;
  }
}

/**
 * return timeString in format 00:00 if it has the format hh:mm:ss
 * @param {string} timeString the string to remove the time from
 */
export function removeMinutes(timeString) {
  return timeString.replace(/^(\d\d:\d\d):\d\d$/g, '$1');
}

/**
 * returns true if the format is DD.MM.YYYY
 * @param {string} dateString the date to check
 */
function isDMY(dateString) {
  return /^[0-9]{2}.[0-9]{2}.[0-9]{4}$/.test(dateString);
}

/**
 * returns dateString in the format DD.MM.YYYY
 * @param {string} dateString the date to convert
 */
export function getDMY(dateString) {
  return isDMY(dateString) ? dateString : formatDate(dateString, 'L');
}

/**
 * returns dateString in the format YYYY-MM-DD
 * @param {string} dateString the date to convert
 */
export function getYMD(dateString) {
  return isDMY(dateString) ? dateString.split('.').reverse().join('-') : formatDate(dateString, 'yyyy-MM-dd');
}

/**
 * returns dateString in from format yyyy-mm-ddThh:mm:ss to yyyy\mm\dd hh:mm:ss
 * @param {string} dateString the date to convert
 */
export function getDateTimeForIcs(dateString) {
  return dateString.replace(new RegExp('-', 'g'), '/').replace(new RegExp('T', 'g'), ' ');
}

/**
 * returns true if date > now
 * @param {string} dateString YYYY-MM-DD
 */

export function dateGreaterNow(date){
    return parseISO(date) > Date.now() ? true : false;
}
