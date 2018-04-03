import Route from '@ember/routing/route';

export default Route.extend({
  model(params) {
    let categories = this.modelFor('list').categories;

    // check if category exists
    if (!(categories.hasOwnProperty(params.category))) {
      this.replaceWith('/');
      return;
    }

    return categories[params.category];
  }
});
