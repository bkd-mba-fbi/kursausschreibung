import moment from 'moment';

// combine date and time
export function combineDate(dateString, timeString) {
  let [hours, minutes] = timeString.split(':').map(str => parseInt(str));
  return moment(dateString)
    .hours(hours)
    .minutes(minutes);
}

// returns true when the current Date is between
// SubscriptionDateFrom/SubscriptionTimeFrom and
// SubscriptionDateTo/Subscription  TimeTo
export function isInSubscriptionRange(event) {
  return moment().isBetween(event.SubscriptionFrom, event.SubscriptionTo);
}
