import Route from '@ember/routing/route';

export default class ListCategoryEventIndexRoute extends Route {
  model() {
    return this.modelFor('list.category.event');
  }
}
