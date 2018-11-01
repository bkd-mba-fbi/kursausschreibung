import Route from '@ember/routing/route';
import uikit from 'uikit';
import $ from 'jquery';
import { init as translateInit } from 'kursausschreibung/framework/translate';
import { init as storeInit, getAllEvents, getEventById } from 'kursausschreibung/framework/store';
import storage from 'kursausschreibung/framework/storage';
import { autoCheckForLogin } from 'kursausschreibung/framework/login-helpers';

export default Route.extend({
  beforeModel() {
    // set uikit scope
    uikit.container = '.uk-scope';

    // initialization
    translateInit();
    return autoCheckForLogin() // get a valid access_token if we don't have one
      .then(storeInit)
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
  },

  afterModel() {
    // go back to initialURL if there is one
    let initialURL = storage.localStoreItem('kursausschreibung.initialURL');

    if (initialURL !== null) {
      storage.localStoreItem('kursausschreibung.initialURL', null);
      location.replace(initialURL);
    }
  }
});
