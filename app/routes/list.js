import Route from '@ember/routing/route';
import { action } from '@ember/object';
import { service } from '@ember/service';
import { underscore } from '@ember/string';
import uikit from 'uikit';

export default class ListRoute extends Route {
  @service router;

  model(params) {
    let eventsByArea = this.modelFor('application');

    // make sure old URLs still work
    params.area_of_education = underscore(params.area_of_education);

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
