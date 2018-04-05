import Route from '@ember/routing/route';
import { init as appConfigInit } from '../framework/app-config';
import { init as settingsInit, default as settings } from '../framework/settings';
import { init as translateInit } from '../framework/translate';
import moment from 'moment';
import { all } from 'rsvp';
import api from '../framework/api';
import ObjectProxy from '@ember/object/proxy';
import { combineDate } from '../framework/date-helpers';
import EmberObject from "@ember/object";
import { isPresent } from "@ember/utils";

export default Route.extend({
  beforeModel() {
    // initialize language
    // TODO: either use framework initialization
    // or create initializer
    moment.locale('de-ch');

    // initialize appconfig, config and translation
    // this is loosely based on
    // https://github.com/emberjs/ember.js/issues/11247#issuecomment-118143934
    return all([appConfigInit(), settingsInit(), translateInit()]);
  },

  model() {
    // TODO: also fetch these
    // https://b17eb32d-b72d-4238-a677-74639b5dbf20.mock.pstmn.io/Lessons/
    // https://b17eb32d-b72d-4238-a677-74639b5dbf20.mock.pstmn.io/EventLocations/
    // https://b17eb32d-b72d-4238-a677-74639b5dbf20.mock.pstmn.io/EventTexts/

    return api.ember.getEvents().then(function (events) {

      if (isPresent(settings.hostId)) {
        events = events.filter(event => event.HostId === settings.hostId);
      }

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

      // group events by areaOfEducation, EventCategory and Id
      let eventsByArea = {};
      let eventsById = {};

      events.forEach(function (event) {
        eventsById[event.Id] = event.Id;

        let areaName = event.AreaOfEducation;
        let area = areaName.toLowerCase();

        let categoryName = event.EventCategory;
        let category = categoryName.toLowerCase();

        if (!(eventsByArea.hasOwnProperty(area))) {

          eventsByArea[area] = { name: areaName, key: area, events: [], categories: {} };
        }

        eventsByArea[area].events.push(event);

        if (!(eventsByArea[area].categories.hasOwnProperty(category))) {
          eventsByArea[area].categories[category] = { name: categoryName, key: category, events: [] };
        }

        eventsByArea[area].categories[category].events.push(event);
      });

      return EmberObject.create({ eventsByArea, eventsById });
    });
  }
});
