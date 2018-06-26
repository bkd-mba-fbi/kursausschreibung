import moment from 'moment';

// combine date and time
// TODO: remove this
export function combineDate(dateString, timeString) {
  try {
  let [hours, minutes] = timeString.split(':').map(str => parseInt(str));
  return moment(dateString)
    .hours(hours)
    .minutes(minutes);
  } catch(exception) {
    return null;
  }
}

// returns true when the current Date is between
// SubscriptionDateFrom/SubscriptionTimeFrom and
// SubscriptionDateTo/Subscription  TimeTo
export function isInSubscriptionRange(event) {
  if (event.SubscriptionFrom === null)
    return moment().isBefore(event.SubscriptionTo);

  return moment().isBetween(event.SubscriptionFrom, event.SubscriptionTo);
}
