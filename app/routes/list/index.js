import Route from '@ember/routing/route';
import { oneWay } from '@ember/object/computed';

export default Route.extend({
  model() {
    return this.modelFor('list');
  }
});
