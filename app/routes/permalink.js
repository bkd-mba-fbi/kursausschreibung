import Route from '@ember/routing/route';
import { getEventById } from 'kursausschreibung/framework/store';
import { inject as service } from '@ember/service';

export default class permalink extends Route {
  @service router;

  model(params) {
    const event = getEventById(params.event_id);

    // redirect to event if it exists
    if (event !== undefined) {
      this.router.transitionTo('list.category.event', event.areaKey, event.categoryKey, event.Id);
    } else {
      this.router.transitionTo('');
    }
  }
};
