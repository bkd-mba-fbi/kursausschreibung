import Route from '@ember/routing/route';
import store from '../../../framework/store';

export default Route.extend({
  model(params) {
    console.log(params.event_id);
    let event = store.getEventById(47710);

    return event;
  }
});
