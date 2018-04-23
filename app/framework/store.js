import $ from 'jquery';
import moment from 'moment';
import {
  getEvents,
  getLessons,
  getEventLocations,
  getEventTexts
} from '../framework/api';
import ObjectProxy from '@ember/object/proxy';
import { combineDate } from '../framework/date-helpers';
import { all } from 'rsvp';
import settings from '../framework/settings';

// group events by areaOfEducation, EventCategory and Id
let eventsByArea = {};
let eventsById = {};

// get all events sorted by areaOfEducation
export function getAllEvents() {
  return eventsByArea;
}

// get event by id
export function getEventById(id) {
  if (eventsById.hasOwnProperty(id)) {
    return eventsById[id];
  }

  return undefined;
}

// this function does a few things:
// * fetch and store events, lessons locations and texts
// * filter events by hostId specified in settings.json
// * add properties SubscriptionFrom, SubscriptionTo, From, To
//   to every event
// * add property displayData to every event for human-readable strings
// * add lessons locations and texts to the appropriate event
// * sort events by areaOfEducation, category and Id (for faster access)
export function init() {
  // fetch all events
  return all([
    getEvents(),
    getLessons(),
    getEventLocations(),
    getEventTexts()
  ]).then(function([events, lessons, eventLocations, eventTexts]) {
    // filter out events with wrong hostId
    if (settings.hostIds instanceof Array) {
      events = events.filter(event => settings.hostIds.indexOf(event.HostId) !== -1);
    }

    events.forEach(function(event) {
      // alter the event-object
      // ======================

      // add lessons-array
      event.lessons = [];

      // add texts-array
      event.texts = [];

      // combine date and time
      event.SubscriptionFrom = combineDate(
        event.SubscriptionDateFrom,
        event.SubscriptionTimeFrom
      );
      event.SubscriptionTo = combineDate(
        event.SubscriptionDateTo,
        event.SubscriptionTimeTo
      );

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

      if (!eventsByArea.hasOwnProperty(area)) {
        eventsByArea[area] = {
          name: areaName,
          key: area,
          events: [],
          categories: {}
        };
      }

      eventsByArea[area].events.push(event);

      // by category (in area)
      let categoryName = event.EventCategory;
      let category = categoryName.toLowerCase();

      if (!eventsByArea[area].categories.hasOwnProperty(category)) {
        eventsByArea[area].categories[category] = {
          name: categoryName,
          key: category,
          events: []
        };
      }

      eventsByArea[area].categories[category].events.push(event);
    });

    // add lessons to events
    lessons.forEach(function(lesson) {
      if (!eventsById.hasOwnProperty(lesson.EventId)) {
        return;
      }

      // make DateFrom and DateTo human-readable
      lesson.DateFrom = moment(lesson.DateFrom, 'YYYY-MM-DD HH:mm').format('LLL');
      lesson.DateTo = moment(lesson.DateTo, 'YYYY-MM-DD HH:mm').format('LLL');

      eventsById[lesson.EventId].lessons.push(lesson);
    });

    // add eventLocations to events
    eventLocations.forEach(function(location) {
      let eventId = location.EventId;

      if (!eventsById.hasOwnProperty(eventId)) {
        return;
      }

      eventsById[eventId] = $.extend(eventsById[eventId], location);
    });

    // add texts to events
    eventTexts.forEach(function(textItem) {
      if (!eventsById.hasOwnProperty(textItem.EventId)) {
        return;
      }

      let text = eventsById[textItem.EventId].texts[textItem.Number];

      if (text === undefined) {
        text = eventsById[textItem.EventId].texts[textItem.Number] = {
          label: null,
          memo: null
        };
      }

      text[textItem.Type.toLowerCase()] = textItem.Value;
    });
  });
}
