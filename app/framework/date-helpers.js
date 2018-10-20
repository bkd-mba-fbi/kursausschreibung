import parse from 'date-fns/parse';
import format from 'date-fns/format';
import de from 'date-fns/locale/de';
import fr from 'date-fns/locale/fr';
import { getLanguage, getString } from './translate';

// longDateFormats from moment.js
const formats = {
  'de-CH': {
    LT: 'HH:mm',
    LTS: 'HH:mm:ss',
    L: 'DD.MM.YYYY',
    LL: 'D. MMMM YYYY',
    LLL: 'D. MMMM YYYY HH:mm',
    LLLL: 'dddd, D. MMMM YYYY HH:mm'
  },

  'fr-CH': {
    LT: 'HH:mm',
    LTS: 'HH:mm:ss',
    L: 'DD.MM.YYYY',
    LL: 'D MMMM YYYY',
    LLL: 'D MMMM YYYY HH:mm',
    LLLL: 'dddd D MMMM YYYY HH:mm'
  }
};

const language = getLanguage();
const locale = language === 'de-CH' ? de : fr;

// parse a date
export { parse as parseDate };

// format a date
export function formatDate(date, formatString = '') {
  if (date === null)
    return getString('notAvailable');

  formatString = formatString in formats[language] ?
    formats[language][formatString] : formatString;

  return format(date, formatString, { locale });
}

// returns true when the current Date is between
// SubscriptionDateFrom/SubscriptionTimeFrom and
// SubscriptionDateTo/Subscription  TimeTo
export function isInSubscriptionRange(event) {
  let now = new Date();

  if (event.SubscriptionFrom === null)
    return now.getTime() < parse(event.SubscriptionTo).getTime();

  return parse(event.SubscriptionFrom).getTime() < now.getTime() &&
    now.getTime() < parse(event.SubscriptionTo).getTime();
}

// combine date and time
export function combineDate(dateString, timeString) {
  try {
    let [hours, minutes] = timeString.split(':').map(str => parseInt(str));
    let date = parse(dateString);
    date.setHours(hours, minutes);
    return date;
  } catch (exception) {
    return null;
  }
}

// return timeString in format 00:00 if it has the
// format 00:00:00
export function removeMinutes(timeString) {
  return timeString.replace(/^(\d\d:\d\d):\d\d$/g, '$1');
}

// returns true if the format is DD.MM.YYYY
function isDMY(dateString) {
  return /^[0-9]{2}.[0-9]{2}.[0-9]{4}$/.test(dateString);
}

// returns dateString in the format DD.MM.YYYY
export function getDMY(dateString) {
  return isDMY(dateString) ? dateString : format(dateString, 'L');
}

// returns dateString in the format YYYY-MM-DD
export function getYMD(dateString) {
  return isDMY(dateString) ? dateString.split('.').reverse().join('-') : format(dateString, 'YYYY-MM-DD');
}
