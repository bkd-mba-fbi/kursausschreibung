import Route from '@ember/routing/route';
import { init as settingsInit } from '../framework/settings';
import { init as appConfigInit } from '../framework/app-config';
import { init as translateInit } from '../framework/translate';
import { init as storeInit, getAllEvents } from '../framework/store';
import { all } from 'rsvp';
import uikit from 'uikit';
import $ from 'jquery';

export default Route.extend({
  beforeModel() {
    // set uikit scope
    uikit.container = '.uk-scope';

    // initialize appconfig, config and translation
    // this is loosely based on
    // https://github.com/emberjs/ember.js/issues/11247#issuecomment-118143934
    return all([
      all([appConfigInit(), settingsInit()]).then(storeInit), // store relies on settings and appConfig
      translateInit()
    ]);
  },

  model() {
    // remove loader
    $('#kursausschreibung-loading').remove();

    return getAllEvents();
  }
});
