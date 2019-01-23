import { A } from '@ember/array';
import EmberObject, { computed } from '@ember/object';
import $ from 'jquery';
import { getEvents, getEvent, getLessons, getEventLocations, getEventTexts } from './api';
import { isGreen, isYellow, isRed } from './status';
import ObjectProxy from '@ember/object/proxy';
import { formatDate, combineDate, isInSubscriptionRange, removeMinutes } from './date-helpers';
import { all } from 'rsvp';
import settings from './settings';
import { getLanguage } from './translate';

let initialized = false;

/**
 * this returns true if init completed successfully
 */
export function isInitialized() {
  return initialized;
}

// group events by areaOfEducation, EventCategory and Id
let eventsByArea = { areas: {}, areaKeys: [] };
let eventsById = [];

/**
 * get all events grouped by areaOfEducation
 */
export function getAllEvents() {
  return eventsByArea;
}

/**
 * get an event by id
 * @param {number} id the id of the event
 */
export function getEventById(id) {
  if (eventsById.hasOwnProperty(id)) {
    return eventsById[id];
  }

  return undefined;
}

/**
 * this function initializes the store by:
 *  + fetching and storing events, lessons locations and texts
 *  + filtering and sorting events
 *  + adding properties to events
 */
export function init() {
  let language = getLanguage() === 'fr-CH' ? 'en-US' : 'de-CH';

  // fetch all events
  return all([
    getEvents(),
    getLessons(),
    getEventLocations(),
    getEventTexts(language)
  ]).then(function ([events, lessons, eventLocations, eventTexts]) {

    // filter events
    events = filterEvents(events, language);

    // sort events
    if (settings.sortEventList !== null) {
      events = A(events).sortBy(settings.sortEventList);
    }

    // prepare events
    events.forEach(prepareEvent);

    // add lessons to events
    addLessonsToEvents(lessons);

    // add eventLocations to events
    addLocationsToEvents(eventLocations);

    // add texts to events
    addTextsToEvents(eventTexts, language);

    // sort areaKeys
    eventsByArea.areaKeys = Object.keys(eventsByArea.areas).sort();

    // sort categoreKeys
    eventsByArea.areaKeys.forEach(area =>
      eventsByArea.areas[area].categoryKeys = Object.keys(eventsByArea.areas[area].categories).sort()
    );

    initialized = true;
  });
}

/**
 * add texts to events
 * @param {object[]} eventTexts eventTexts returned by the API
 * @param {string} language the active language
 */
function addTextsToEvents(eventTexts, language) {
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
}

/**
 * add loactions to events
 * @param {object[]} eventLocations eventLocations returned by the API
 */
function addLocationsToEvents(eventLocations) {
  eventLocations.forEach(function (location) {
    let eventId = location.EventId;

    if (!eventsById.hasOwnProperty(eventId)) {
      return;
    }

    // don't overwrite the event-Id
    delete location.Id;
    eventsById[eventId] = $.extend(eventsById[eventId], location);
  });
}

/**
 * add lessons to events
 * @param {object[]} lessons lessons returned by the API
 */
function addLessonsToEvents(lessons) {
  lessons.forEach(function (lesson) {
    if (!eventsById.hasOwnProperty(lesson.EventId)) {
      return;
    }

    // make DateFrom and DateTo human-readable
    lesson.DateFrom = formatDate(lesson.DateTimeFrom, 'LLL');
    lesson.TimeTo = formatDate(lesson.DateTimeTo, 'LT');

    eventsById[lesson.EventId].lessons.push(lesson);
  });
}

/**
 * filter out events based on settings
 * @param {object[]} events events returned by the API
 * @param {string} language the active language
 */
function filterEvents(events, language) {
  // filter out events with undesired parameters

  // backwards compatibility fallback for single hostId filter 
  if (settings.hostIds instanceof Array) {
    events = events.filter(event => settings.hostIds.indexOf(event.HostId) !== -1);
  }
  // or use initialListFilters array
  else {
    if (settings.initialListFilters.hostIds instanceof Array) {
      events = events.filter(event => settings.initialListFilters.hostIds.indexOf(event.HostId) !== -1);
    }
  
    if (settings.initialListFilters.eventCategoryIds instanceof Array) {
      events = events.filter(event => settings.initialListFilters.eventCategoryIds.indexOf(event.EventCategoryId) !== -1);
    }
  
    if (settings.initialListFilters.eventLevelIds instanceof Array) {
      events = events.filter(event => settings.initialListFilters.eventLevelIds.indexOf(event.EventLevelId) !== -1);
    }
  
    if (settings.initialListFilters.eventTypeIds instanceof Array) {
      events = events.filter(event => settings.initialListFilters.eventTypeIds.indexOf(event.EventTypeId) !== -1);
    }
  
    if (settings.initialListFilters.statusIds instanceof Array) {
      events = events.filter(event => settings.initialListFilters.statusIds.indexOf(event.StatusId) !== -1);
    }
  }

  // filter out events with non-matching LanguageOfInstruction
  if (settings.languageOfInstructionFilter) {
    events = events.filter(event => event.LanguageOfInstruction === 'Bilingue' ||
      (event.LanguageOfInstruction === 'Deutsch' && language === 'de-CH') ||
      (event.LanguageOfInstruction === 'Französisch' && language === 'en-US'));
  }

  return events;
}

/**
 * this function adds properties and the displayObject to every event
 * transforms every event into an ember-object
 * and sorts events by id, area and category
 * @param {object} event event returned by the API
 */
function prepareEvent(event) {

  // add properties to the events
  addPropertiesToEvent(event);

  // create proxy for human-readable values
  addDisplayData(event);

  // create an ember-object of the event
  event = createEmberObject(event);

  // put event into associative arrays
  putIntoAssocArrays(event);
}

/**
 * put an event into associative arrays for the getEventById
 * and getAllEvents functions
 * @param {object} event event returned by the API
 */
function putIntoAssocArrays(event) {
  // id
  eventsById[event.Id] = event;

  // area
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

  // category (in area)
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
}

/**
 * transforms an event into an ember-object with the computed
 * properties status and and canDoSubscription and an update method
 * @param {object} event event returned by the API
 */
function createEmberObject(event) {
  return EmberObject.extend({

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

    canDoSubscription: computed('status', function () {
      let status = this.get('status');
      return (typeof settings.canDoSubscription === 'object' &&
        settings.canDoSubscription[status] === true);
    }),

    update() {
      // only update FreeSeats for now
      let that = this;
      return getEvent(this.get('Id')).then(function (updatedEvent) {
        that.set('FreeSeats', updatedEvent.FreeSeats);
      });
    }
  }).create(event);
}

/**
 * create proxy for human-readable values
 * @param {object} event event returned by the API
 */
function addDisplayData(event) {
  event.displayData = ObjectProxy.create({
    content: event,

    // formatted overwritten properties
    DateFrom: formatDate(event.DateFrom, 'LL'),
    DateTo: formatDate(event.DateTo, 'LL'),

    SubscriptionDateFrom: formatDate(event.SubscriptionDateFrom, 'LL'),
    SubscriptionDateTo: formatDate(event.SubscriptionDateTo, 'LL'),

    From: formatDate(event.From, 'LLL'),
    To: formatDate(event.To, 'LLL'),

    SubscriptionFrom: formatDate(event.SubscriptionFrom, 'LLL'),
    SubscriptionTo: formatDate(event.SubscriptionTo, 'LLL'),

    Price: 'CHF ' + event.Price
  });
}

/**
 * adds empty arrays for lessons and texts and adds properties SubscriptionFrom,
 * SubscriptionTo, From, To, Time
 * @param {object} event event returned by the API
 */
function addPropertiesToEvent(event) {
  // add lessons-array
  event.lessons = [];

  // add texts-array
  event.texts = [];

  // combine date and time
  event.SubscriptionFrom = combineDate(event.SubscriptionDateFrom, event.SubscriptionTimeFrom);
  event.SubscriptionTo = combineDate(event.SubscriptionDateTo, event.SubscriptionTimeTo);
  event.From = combineDate(event.DateFrom, event.TimeFrom);
  event.To = combineDate(event.DateTo, event.TimeTo);

  // add event.Time
  if (typeof event.TimeFrom === 'string' && typeof event.TimeTo === 'string') {
    event.Time = `${removeMinutes(event.TimeFrom)} - ${removeMinutes(event.TimeTo)}`;
  }
}

