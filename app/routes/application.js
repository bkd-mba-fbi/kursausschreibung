import Route from '@ember/routing/route';
import { init as appConfigInit } from '../framework/app-config';
import { init as settingsInit, default as settings } from '../framework/settings';
import { init as translateInit } from '../framework/translate';
import moment from 'moment';
import { all } from 'rsvp';
import { getEvents, getLessons, getEventLocations, getEventTexts } from '../framework/api';
import ObjectProxy from '@ember/object/proxy';
import { combineDate } from '../framework/date-helpers';
import EmberObject from "@ember/object";
import { isPresent } from "@ember/utils";

export default Route.extend({
  beforeModel() {
    // initialize appconfig, config and translation
    // this is loosely based on
    // https://github.com/emberjs/ember.js/issues/11247#issuecomment-118143934
    return all([appConfigInit(), settingsInit(), translateInit()]);
  },

  model() {
    // there is probably an elegant ember-data solution
    // that could replace this monster

    // fetch all events
    let promises = [getEvents(), getLessons(), getEventLocations(), getEventTexts()];

    return all(promises).then(function ([events, lessons, eventLocations, eventTexts]) {

      // group events by areaOfEducation, EventCategory and Id
      let eventsByArea = {};
      let eventsById = {};

      // filter out events with wrong hostId
      if (isPresent(settings.hostId)) {
        events = events.filter(event => event.HostId === settings.hostId);
      }

      events.forEach(function (event) {

        // alter the event-object
        // ======================

        // add lessons-array
        event.lessons = [];

        // add texts-array
        event.texts = [];

        // combine date and time
        event.SubscriptionFrom = combineDate(event.SubscriptionDateFrom, event.SubscriptionTimeFrom);
        event.SubscriptionTo = combineDate(event.SubscriptionDateTo, event.SubscriptionTimeTo);

        event.From = combineDate(event.DateFrom, event.TimeFrom);
        event.To = combineDate(event.DateTo, event.TimeTo);

        // proxy for string-representations
        // ================================
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

        // put event into assoc arrays so no searching is required
        // =======================================================

        // by id
        eventsById[event.Id] = event;

        // by area
        let areaName = event.AreaOfEducation;
        let area = areaName.toLowerCase();

        if (!(eventsByArea.hasOwnProperty(area))) {

          eventsByArea[area] = { name: areaName, key: area, events: [], categories: {} };
        }

        eventsByArea[area].events.push(event);

        // by category (in area)
        let categoryName = event.EventCategory;
        let category = categoryName.toLowerCase();

        if (!(eventsByArea[area].categories.hasOwnProperty(category))) {
          eventsByArea[area].categories[category] = { name: categoryName, key: category, events: [] };
        }

        eventsByArea[area].categories[category].events.push(event);
      });

      // add lessons to events
      lessons.forEach(function (lesson) {
        eventsById[lesson.EventId].lessons.push(lesson);
      });

      // add eventLocations to events
      eventLocations.forEach(function (location) {
        let eventId = location.EventId;

        eventsById[eventId] = $.extend(eventsById[eventId], location);
      });

      // add texts to events
      eventTexts.forEach(function (textItem) {
        let text = eventsById[textItem.EventId].texts[textItem.Number];

        if (text === undefined) {
          text = eventsById[textItem.EventId].texts[textItem.Number] = { label: null, memo: null };
        }

        text[textItem.Type.toLowerCase()] = textItem.Value;
      });

      return EmberObject.create({ eventsByArea, eventsById });
    });
  }
});
