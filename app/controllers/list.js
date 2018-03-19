import Controller from '@ember/controller';

export default Controller.extend({
  page: 1,
  queryParams: ['page'],

  actions: {
    queryChanged(query) {
      this.set('page', 1);
    }
  }
});
