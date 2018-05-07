import Route from '@ember/routing/route';
import { all } from 'rsvp';
import uikit from 'uikit';
import $ from 'jquery';

import { init as settingsInit } from 'kursausschreibung/framework/settings';
import { init as appConfigInit } from 'kursausschreibung/framework/app-config';
import { init as translateInit } from 'kursausschreibung/framework/translate';
import { init as storeInit, getAllEvents } from 'kursausschreibung/framework/store';
import { autoCheckForLogin } from 'kursausschreibung/framework/login-helpers';

export default Route.extend({
  beforeModel() {
    // set uikit scope
    uikit.container = '.uk-scope';

    // initialize appconfig, config and translation
    // this is loosely based on
    // https://github.com/emberjs/ember.js/issues/11247#issuecomment-118143934
    return all([
      all([
        settingsInit(),
        appConfigInit().then(autoCheckForLogin)  // get a valid access_token if we don't have one
      ]).then(storeInit), // store depends on settings, appConfig and access_token
      translateInit()
    ]);
  },

  model() {
    // remove loader
    $('#kursausschreibung-loading').remove();

    return getAllEvents();
  }
});
