import Route from '@ember/routing/route';
import { getEventById } from 'kursausschreibung/framework/store';

export default Route.extend({
  model(params) {
    const event = getEventById(params.event_id);

    // redirect to event if it exists
    if (event !== undefined) {
      this.replaceWith('list.category.event', event.areaKey, event.categoryKey, event.Id);
    } else {
      this.replaceWith('');
    }
  }
});
