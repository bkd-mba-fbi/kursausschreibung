import Route from '@ember/routing/route';

export default class ListIndexRoute extends Route {
  model() {
    return this.modelFor('list');
  }
}
