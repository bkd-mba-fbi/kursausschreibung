import moment from 'moment';

function datesEqual(date1, date2) {
  date1 = this.getDate(date1);
  date2 = this.getDate(date2);
  if (!date1)
    return !date2;
  else if (!date2)
    return false;
  var milli1 = Math.floor(date1.getTime() / (24 * 3600 * 1000));
  var milli2 = Math.floor(date2.getTime() / (24 * 3600 * 1000));
  return milli1 === milli2;
}

function isDateToday(date) {
  if (!date)
    return false;
  var today = new Date();
  return this.datesEqual(date, today);
}

function getDate(date) {
  if (!date)
    return undefined;
  if (!(date instanceof Date)) {
    date = date.replace('.000Z', '');
    date = new Date(date + 'Z');
  }
  return date;
}

// combine date and time
function combineDate(dateString, timeString) {
  let [hours, minutes] = timeString.split(':').map(str => parseInt(str));
  return moment(dateString).hours(hours).minutes(minutes);
}

// returns true when the current Date is between
// SubscriptionDateFrom/SubscriptionTimeFrom and
// SubscriptionDateTo/Subscription  TimeTo
function isInSubscriptionRange(event) {
  return moment().isBetween(event.SubscriptionFrom, event.SubscriptionTo);
}

export { datesEqual, isDateToday, getDate, combineDate, isInSubscriptionRange };

