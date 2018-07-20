import Route from '@ember/routing/route';
import { all } from 'rsvp';
import uikit from 'uikit';
import $ from 'jquery';

import { init as settingsInit } from 'kursausschreibung/framework/settings';
import { init as appConfigInit } from 'kursausschreibung/framework/app-config';
import { init as translateInit } from 'kursausschreibung/framework/translate';
import {
  init as storeInit,
  getAllEvents, getEventById
} from 'kursausschreibung/framework/store';
import storage from 'kursausschreibung/framework/storage';
import { autoCheckForLogin } from 'kursausschreibung/framework/login-helpers';

export default Route.extend({
  beforeModel() {
    // set uikit scope
    uikit.container = '.uk-scope';

    // initialize appconfig, config and translation
    // this is loosely based on
    // https://github.com/emberjs/ember.js/issues/11247#issuecomment-118143934
    return all([
      settingsInit(),
      translateInit(),
      appConfigInit().then(autoCheckForLogin) // get a valid access_token if we don't have one
    ])
      .then(storeInit) // store depends on translation, settings, appConfig and access_token
      .then(() => {
        // reroute to the confirmation page if there is data that has to be submitted
        let dataToSubmit = storage.localStoreItem('kursausschreibung.dataToSubmit');

        if (dataToSubmit !== null) {
          let event = getEventById(dataToSubmit.eventId);
          this.replaceWith('list.category.event.confirmation', event.areaKey, event.categoryKey, event.Id);
        }

      })
      .catch(function (error) {
        // only log exceptions thrown here so the route still loads
        // uninitialised modules will throw an error later
        console.error('FATAL error while initializing the module: ', error);
      });
  },

  model() {
    // remove loader
    $('#kursausschreibung-loading').remove();

    return getAllEvents();
  }
});
