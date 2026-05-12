import Route from '@ember/routing/route';
import uikit from 'uikit';
import {
  init as initStore,
  getAllEvents,
  getEventById,
} from 'kursausschreibung/framework/store';
import { getDataToSubmit } from 'kursausschreibung/framework/storage';
import { autoCheckForLogin } from 'kursausschreibung/framework/login-helpers';
import { setJsonLd } from '../framework/seo';

export default class ApplicationRoute extends Route {
  beforeModel() {
    // set uikit scope
    uikit.container = '.uk-scope';

    // initialization
    return autoCheckForLogin() // get a valid access_token if we don't have one
      .then(initStore)
      .then(() => {
        // reroute to the confirmation page if there is data that has to be submitted
        let dataToSubmit = getDataToSubmit();

        if (dataToSubmit !== undefined) {
          let event = getEventById(dataToSubmit.eventId);
          this.replaceWith(
            'list.category.event.confirmation',
            event.areaKey,
            event.categoryKey,
            event.Id
          );
        }
      })
      .catch((error) => {
        // only log exceptions thrown here so the route still loads
        // uninitialized modules will throw an error later
        console.error('FATAL error while initializing the module: ', error); // eslint-disable-line no-console
      });
  }

  model() {
    // remove loader
    document.getElementById('kursausschreibung-loading')?.remove();
    let allEvents = getAllEvents();
    setJsonLd(allEvents);
    return allEvents;
  }
}
