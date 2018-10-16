import Route from '@ember/routing/route';
import { isInitialized } from 'kursausschreibung/framework/store';

export default Route.extend({
  beforeModel() {
    let applicationModel = this.modelFor('application');

    if (applicationModel.areaKeys === undefined || applicationModel.areaKeys.length === 0) {
      if (isInitialized()) {
        // proceed to the index route
        return;
      }

      throw new Error( 'there most likely is an issue with the config or the api server.');
    }

    this.replaceWith('list', applicationModel.areaKeys[0]);
  }
});
