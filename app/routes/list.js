import Route from '@ember/routing/route';
import api from '../framework/api';

export default Route.extend({
  model() {
    return api.ember.getEvents();
  }
});
