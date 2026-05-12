import Route from '@ember/routing/route';

export default class ListCategoryIndexRoute extends Route {
  model() {
    return this.modelFor('list.category');
  }
}
