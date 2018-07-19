import { A } from '@ember/array';
import EmberObject, { computed } from '@ember/object';
import $ from 'jquery';
import moment from 'moment';
import { getEvents, getEvent, getLessons, getEventLocations, getEventTexts } from './api';
import { isGreen, isYellow, isRed } from './status';
import ObjectProxy from '@ember/object/proxy';
import { combineDate, isInSubscriptionRange  } from './date-helpers';
import { all } from 'rsvp';
import settings from './settings';
import { getLanguage, getString } from './translate';

// group events by areaOfEducation, EventCategory and Id
let eventsByArea = { areas: {}, areKeys: [] };
let eventsById = [];

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
  let language = getLanguage();

  // helper function to create human-readable dates
  let formatDate = (date, format) => date === null ? getString('notAvailable') : moment(date).format(format);

  // fetch all events
  return all([
    getEvents(),
    getLessons(),
    getEventLocations(),
    getEventTexts(language)
  ]).then(function ([events, lessons, eventLocations, eventTexts]) {
    // filter out events with wrong hostId
    if (settings.hostIds instanceof Array) {
      events = events.filter(
        event => settings.hostIds.indexOf(event.HostId) !== -1
      );
    }

    // sort events
    if (settings.sortEventList !== null)
      events = A(events).sortBy(settings.sortEventList);

    events.forEach(function (event) {
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
        DateFrom: formatDate(event.SubscriptionDateFrom, 'LL'),
        DateTo: formatDate(event.SubscriptionDateFrom, 'LL'),

        SubscriptionDateFrom: formatDate(event.SubscriptionDateFrom, 'LL'),
        SubscriptionDateTo: formatDate(event.SubscriptionDateTo, 'LL'),

        From: formatDate(event.From, 'LLL'),
        To: formatDate(event.To, 'LLL'),

        SubscriptionFrom: formatDate(event.SubscriptionFrom, 'LLL'),
        SubscriptionTo: formatDate(event.SubscriptionTo, 'LLL'),

        Price: 'CHF ' + event.Price
      });

      // create an ember object for the event
      event = EmberObject.extend({
        status: computed('FreeSeats', function () {

          if (isGreen(this, isInSubscriptionRange)) {
            return 'green';
          }

          if (isYellow(this, isInSubscriptionRange)) {
            return 'yellow';
          }

          if (isRed(this, isInSubscriptionRange)) {
            return 'red';
          }

          return 'orange';
        }),

        canDoSubscription: computed('status', function() {
          let status = this.get('status');

          return (typeof settings.canDoSubscription === 'object' &&
                  settings.canDoSubscription[status] === true);
        }),

        update() {
          // only update FreeSeats for now
          let that = this;
          return getEvent(this.get('Id')).then(function(updatedEvent) {
            that.set('FreeSeats', updatedEvent.FreeSeats);
          });

        }
      }).create(event);

      // put event into assoc arrays so no searching is required
      // =======================================================

      // by id
      eventsById[event.Id] = event;

      // by area
      let areaName = event.AreaOfEducation;
      let areaKey = (event.areaKey = areaName.toLowerCase());

      if (!eventsByArea.areas.hasOwnProperty(areaKey)) {
        eventsByArea.areas[areaKey] = {
          name: areaName,
          key: areaKey,
          events: [],
          categories: {},
          categoryKeys: []
        };
      }

      eventsByArea.areas[areaKey].events.push(event);

      // by category (in area)
      let categoryName = event.EventCategory;
      let categoryKey = (event.categoryKey = categoryName.toLowerCase());

      if (!eventsByArea.areas[areaKey].categories.hasOwnProperty(categoryKey)) {
        eventsByArea.areas[areaKey].categories[categoryKey] = {
          name: categoryName,
          key: categoryKey,
          events: []
        };
      }

      eventsByArea.areas[areaKey].categories[categoryKey].events.push(event);
    });

    // add lessons to events
    lessons.forEach(function (lesson) {
      if (!eventsById.hasOwnProperty(lesson.EventId)) {
        return;
      }

      // make DateFrom and DateTo human-readable
      lesson.DateFrom = moment(lesson.DateFrom, 'YYYY-MM-DD HH:mm').format('LLL');
      lesson.TimeTo = moment(lesson.DateTo, 'YYYY-MM-DD HH:mm').format('LT');

      eventsById[lesson.EventId].lessons.push(lesson);
    });

    // add eventLocations to events
    eventLocations.forEach(function (location) {
      let eventId = location.EventId;

      if (!eventsById.hasOwnProperty(eventId)) {
        return;
      }

      // don't overwrite the event-Id
      delete location.Id;

      eventsById[eventId] = $.extend(eventsById[eventId], location);
    });

    // add texts to events
    eventTexts.forEach(function (textItem) {
      if (!eventsById.hasOwnProperty(textItem.EventId)) {
        return;
      }

      // only show texts with the correct cultureInfo
      if (textItem.CultureInfo !== language) {
        return;
      }

      let text = eventsById[textItem.EventId].texts[textItem.Number];

      if (text === undefined) {
        text = eventsById[textItem.EventId].texts[textItem.Number] = {
          label: null,
          memo: null,
          id: textItem.Number
        };
      }

      text[textItem.Type.toLowerCase()] = textItem.Value;
    });

    // remove texts with empty label or memo
    eventsById.forEach(
      event =>
        event.texts = event.texts.filter(
          text => text.label !== null && text.memo !== null
        )
    );

    // sorted keys for display in navigation component
    eventsByArea.areaKeys = Object.keys(eventsByArea.areas).sort();

    for (let area of eventsByArea.areaKeys) {
      eventsByArea.areas[area].categoryKeys = Object.keys(eventsByArea.areas[area].categories).sort();
    }
  });
}
