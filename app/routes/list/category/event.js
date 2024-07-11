import Route from '@ember/routing/route';
import { underscore } from '@ember/string';
import store from 'kursausschreibung/framework/store';

export default Route.extend({
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
      this.replaceWith('list.category');
      return;
    }

    return event;
  }
});
