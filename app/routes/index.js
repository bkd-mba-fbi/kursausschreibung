import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { isInitialized } from 'kursausschreibung/framework/store';

export default class permalink extends Route {
  @service router;
  beforeModel() {
    let applicationModel = this.modelFor('application');

    if (applicationModel.areaKeys === undefined || applicationModel.areaKeys.length === 0) {
      if (isInitialized()) {
        // proceed to the index route
        return;
      }

      throw new Error('failed to load.');
    }

    this.router.transitionTo('list', applicationModel.areaKeys[0]);
  }
}
