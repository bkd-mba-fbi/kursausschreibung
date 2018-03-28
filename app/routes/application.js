import Route from '@ember/routing/route';
import { init as appConfigInit } from '../framework/app-config';
import { init as settingsInit } from '../framework/settings';
import { init as translateInit } from '../framework/translate';
import moment from 'moment';
import { all } from 'rsvp';

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
  }
});
