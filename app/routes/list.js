import Route from '@ember/routing/route';
import { action } from '@ember/object';
import { service } from '@ember/service';
import { underscore } from '@ember/string';
import uikit from 'uikit';
import settings from 'kursausschreibung/framework/settings';

export default class ListRoute extends Route {
  @service router;

  model(params) {
    let eventsByArea = this.modelFor('application');

    // make sure old URLs still work
    params.area_of_education = underscore(params.area_of_education);

    // area of education hidden: every area URL shows the merged area
    if (
      settings.showAreaOfEducation === false &&
      eventsByArea.areaKeys.length === 1
    ) {
      return eventsByArea.areas[eventsByArea.areaKeys[0]];
    }

    // check if area of education exists
    if (!eventsByArea.areas.hasOwnProperty(params.area_of_education)) {
      this.router.transitionTo('index');
      return;
    }

    return eventsByArea.areas[params.area_of_education];
  }

  @action
  didTransition() {
    let modal = uikit.modal('#menu-modal');

    if (modal !== undefined) {
      modal.hide();
    }
  }
}
