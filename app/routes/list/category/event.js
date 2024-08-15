import Route from '@ember/routing/route';
import { underscore } from '@ember/string';
import store from 'kursausschreibung/framework/store';
import { inject as service } from '@ember/service';

export default class event extends Route {
  @service router;
  model(params) {
    let event = store.getEventById(params.event_id);

    // check if event exists in area and category
    let areaKey = underscore(this.paramsFor('list').area_of_education);
    let categoryKey = underscore(this.paramsFor('list.category').category);

    if (
      event === undefined ||
      event.areaKey !== areaKey ||
      event.categoryKey !== categoryKey
    ) {
      this.router.transitionTo('list.category');
      return;
    }

    return event;
  }
};
