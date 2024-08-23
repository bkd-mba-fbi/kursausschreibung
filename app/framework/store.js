import { A } from '@ember/array';
import { underscore } from '@ember/string';
import EmberObject, { computed } from '@ember/object';
import $ from 'jquery';
import { getEvents, getEvent, getLessons, getEventLocations, getEventTexts, getEventCodes } from './api';
import { isGreen, isChartreuse, isYellow, isRed } from './status';
import ObjectProxy from '@ember/object/proxy';
import { formatDate, combineDate, isInSubscriptionRange, removeMinutes, eventStarted, eventEnded } from './date-helpers';
import { all } from 'rsvp';
import settings from './settings';
import { getLanguage, getString } from './translate';
import { getSortAs } from './storage';
import format from 'date-fns/format';

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
    getEventTexts(language),
    getEventCodes()
  ]).then(function ([events, lessons, eventLocations, eventTexts, eventCodes]) {   

     // filter events
    events = filterEvents(events, language, eventCodes);

    // sort events
    var sortAs = getSortAs();
    if(sortAs === null) {
      if (settings.sortEventList !== null) {
        events = A(events).sortBy(settings.sortEventList);
      }
    } else {
      events = A(events).sortBy(sortAs);
    }

    // prepare events
    events.forEach(prepareEvent);

    // add lessons to events
    addLessonsToEvents(lessons);

    // add eventLocations to events
    addLocationsToEvents(eventLocations);

    // add texts to events
    addTextsToEvents(eventTexts, language);

    // add codes to events (it's important to filter)
    addCodesToEvents(eventCodes);

    // sort areaKeys
    eventsByArea.areaKeys = Object.keys(eventsByArea.areas).sort();

    // sort categoryKeys
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

  // if the 13th event text is an url it is used to subscribe to the event
  // see: https://github.com/bkd-mba-fbi/kursausschreibung/issues/67
  eventsById.forEach(event => {
    if (event.texts.length >= 14 && /^https?:\/\/[^ ]+$/.test(event.texts[13].memo)) {
      event.externalSubscriptionURL = event.texts[13].memo;
      event.texts[13].memo = null;
    } else {
      event.externalSubscriptionURL = null;
    }
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
 * add locations to events
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
    if (eventsById[lesson.EventId].lessons.length > settings.howManyLessonsShow) {
      eventsById[lesson.EventId].lessonsCollaps = true;
    } else {
      eventsById[lesson.EventId].lessonsCollaps = false;
    }
    
  });
}


/**
 * add Codes to events
 * @param {object[]} eventCodes eventCodes returned by the API
 */
 function addCodesToEvents(eventCodes) {

  // add all codes to event
  let prefix = 'FilterTag';
  let filterCodes = [];
  let codeIds = [];
  eventCodes.forEach(function (code) {

    if (codeIds.find(ids => ids === code.CodeId) === undefined) {
      codeIds.push(code.CodeId);
      let codeName = getString(prefix+code.CodeId).indexOf('<span style="color:red;">Key not found:') >= 0 ? code.Code : getString(prefix+code.CodeId);
      filterCodes.push({id: code.CodeId, Code: codeName }); 
    }  

  });

  eventCodes.forEach(function (code) {
    
    if (!eventsById.hasOwnProperty(code.EventId)) {
      return;
    }
    // add codes-array
    if (eventsById[code.EventId].codes === undefined) {
      eventsById[code.EventId].codes = [];
    }
    
    eventsById[code.EventId].codes.push(code);

    // adds filter tag
    let filter = eventsById[code.EventId].filter;
    eventsById[code.EventId].filter = filter === undefined ? 'tag'+code.CodeId : filter + ' tag'+code.CodeId;
    eventsById[code.EventId].allfilterCodes = filterCodes;

  });

}

/**
 * filter out events based on settings
 * @param {object[]} events events returned by the API
 * @param {string} language the active language
 */
function filterEvents(events, language, eventCodes) {
  // filter out events with undesired parameters

  // backwards compatibility fallback for single hostId filter
  if (settings.hostIds instanceof Array) {
    events = events.filter(event => settings.hostIds.indexOf(event.HostId) !== -1);
  }
  // or use initialListFilters array
  else if (settings.initialListFilters instanceof Object) {
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
    
    if (settings.initialListFilters.codeIds instanceof Array) {
      eventCodes = eventCodes.filter(code => settings.initialListFilters.codeIds.indexOf(code.CodeId) !== -1);
      let codes = [];
      eventCodes.forEach(eventcode => {
        codes.push(eventcode.EventId);
      });  
      events = events.filter(event => codes.indexOf(event.Id) !== -1);
    }
    
  }

  // filter out events with non-matching LanguageOfInstruction
  if (settings.languageOfInstructionFilter) {
    events = events.filter(event => event.LanguageOfInstruction === 'Bilingue' ||
      (event.LanguageOfInstruction === "1" && language === 'de-CH') ||
      (event.LanguageOfInstruction === 'Deutsch' && language === 'de-CH') ||
      (event.LanguageOfInstruction === "2" && language === 'en-US') ||
      (event.LanguageOfInstruction === 'Französisch' && language === 'en-US'));
  }

  if (settings.showStartedEvents) {
    // Filter out events which have not ended yet
    events = events.filter(event => !eventEnded(event));
  } else {
    // Default behaviour, filter out events which have started
    events = events.filter(event => eventStarted(event));
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

  // set LanguageOfInstruction, if int to string translate value
  setLanguageEventFromIntToString(event);

  // create proxy for human-readable values
  addDisplayData(event);

  //settings subscriptionWithLoginURL
  event.subscriptionWithLoginURL = settings.subscriptionWithLoginURL === null ? null : encodeURI(settings.subscriptionWithLoginURL+'/'+event.EventCategory+'/'+event.Id+'/subscribe');

  //event subtitle when > inside string
  let eventSubtitle = event.Designation.split(settings.eventSubtitle);
  event.Designation = eventSubtitle.length > 1  ? eventSubtitle[0] : event.Designation;
  event.subtitle = eventSubtitle.length > 1 ? eventSubtitle[1] : null;

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
  let areaKey = event.areaKey = underscore(areaName);

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
  let categoryKey = event.categoryKey = underscore(categoryName);

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

      if (isChartreuse(this, isInSubscriptionRange)) {
        return 'chartreuse';
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

    Price: event.Price === 0.0000 || event.Price === null ? null : 'CHF ' + event.Price
  });
}

/**
 * adds empty arrays for lessons, texts and codes and adds properties SubscriptionFrom,
 * SubscriptionTo, From, To, Time
 * @param {object} event event returned by the API
 */
function addPropertiesToEvent(event) {
  // add lessons-array
  event.lessons = [];

  // add texts-array
  event.texts = [];

  // fill empty Date properties in event object
  fillEmptyDates(event);

  // combine date and time
  event.SubscriptionFrom = event.SubscriptionDateFrom === null ? null : combineDate(event.SubscriptionDateFrom, event.SubscriptionTimeFrom);
  event.SubscriptionTo = event.SubscriptionDateTo === null ? null : combineDate(event.SubscriptionDateTo, event.SubscriptionTimeTo);
  event.From = event.DateFrom === null ? null : combineDate(event.DateFrom, event.TimeFrom);
  event.To = event.DateTo === null ? null : combineDate(event.DateTo, event.TimeTo);

  event.SubscriptionDateFrom = event.SubscriptionDateFromIsNull ? null : event.SubscriptionDateFrom;
  event.SubscriptionDateTo = event.SubscriptionDateToIsNull ? null : event.SubscriptionDateTo;

  // add event.Time
  if (typeof event.TimeFrom === 'string' && typeof event.TimeTo === 'string') {
    event.Time = `${removeMinutes(event.TimeFrom)} - ${removeMinutes(event.TimeTo)}`;
  }
}
/**
 * if one of the Date or Time property is null get default value
 *
 * SubscriptionDateFrom is null => now - 1 day
 * SubscriptionDateTo is null => now + 7 day
 * DateFrom is null => now + 7 day
 * DateTo is null => now + 7 day
 * SubscriptionTimeFrom is null => '00:00:01'
 * SubscriptionTimeTo is null => '23:59:59'
 * @param {object} event event returned by the API
 */
function fillEmptyDates(event) {

  let now = new Date();
  let yesterday = new Date().setDate(now.getDate() - 1);
  let datePast = format(yesterday, 'yyyy-MM-dd');
  now.setDate(now.getDate() + 7);
  let dateNow = format(now, 'yyyy-MM-dd');

  event.SubscriptionDateFromIsNull = event.SubscriptionDateFrom === null ? true : false;
  event.SubscriptionDateFrom = event.SubscriptionDateFrom || datePast;
  event.SubscriptionDateToIsNull = event.SubscriptionDateTo === null ? true : false;
  event.SubscriptionDateTo = event.SubscriptionDateTo || dateNow;
  event.SubscriptionTimeFrom = event.SubscriptionTimeFrom || '00:00:01';
  event.SubscriptionTimeTo = event.SubscriptionTimeTo || '23:59:59';

}

/**
 * if LanguageOfInstruction is a number translate it
 * @param {object} event event returned by the API
 */
function setLanguageEventFromIntToString(event) {

  if (event.LanguageOfInstruction === '2') {
    event.LanguageOfInstruction = getString('french');
  } else if (event.LanguageOfInstruction === '1') {
    event.LanguageOfInstruction = getString('german');
  } else if (event.LanguageOfInstruction === '133') {
    event.LanguageOfInstruction = getString('english');
  } else if (event.LanguageOfInstruction === '284') {
    event.LanguageOfInstruction = getString('italian');
  } else if (event.LanguageOfInstruction === '285') {
    event.LanguageOfInstruction = getString('spain');
  }
}
