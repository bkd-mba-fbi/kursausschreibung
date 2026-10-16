import Route from '@ember/routing/route';
import { underscore } from '@ember/string';
import { getEventById } from 'kursausschreibung/framework/store';
import { service } from '@ember/service';

export default class event extends Route {
  @service router;
  model(params) {
    let event = getEventById(params.event_id);

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
}
