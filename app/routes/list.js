import Route from '@ember/routing/route';
import api from '../framework/api';
import ObjectProxy from '@ember/object/proxy';
import moment from 'moment';
import { combineDate } from '../framework/date-helpers';


export default Route.extend({
  model() {
    return api.ember.getEvents().then(function (events) {

      // combine date and time
      events.forEach(function (event) {
        event.SubscriptionFrom = combineDate(event.SubscriptionDateFrom, event.SubscriptionTimeFrom);
        event.SubscriptionTo = combineDate(event.SubscriptionDateTo, event.SubscriptionTimeTo);

        event.From = combineDate(event.DateFrom, event.TimeFrom);
        event.To = combineDate(event.DateTo, event.TimeTo);

        event.displayData = ObjectProxy.create({
          content: event,

          // formatted overwritten properties
          DateFrom: moment(event.SubscriptionDateFrom).format('LL'),
          DateTo: moment(event.SubscriptionDateFrom).format('LL'),

          SubscriptionDateFrom: moment(event.SubscriptionDateFrom).format('LL'),
          SubscriptionDateTo: moment(event.SubscriptionDateTo).format('LL'),

          From: moment(event.From).format('LLL'),
          To: moment(event.To).format('LLL'),

          SubscriptionFrom: moment(event.SubscriptionFrom).format('LLL'),
          SubscriptionTo: moment(event.SubscriptionTo).format('LLL'),

          Price: 'CHF ' + event.Price
        });
      });

      return events;
    });
  }
});
