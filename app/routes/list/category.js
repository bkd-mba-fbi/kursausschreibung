import Route from '@ember/routing/route';
import { underscore } from '@ember/string';

export default Route.extend({
  model(params) {
    let categories = this.modelFor('list').categories;

    // make sure old URLs still work
    params.category = underscore(params.category);

    // check if category exists
    if (!(categories.hasOwnProperty(params.category))) {
      this.router.transitionTo('list');
      return;
    }

    return categories[params.category];
  }
});
