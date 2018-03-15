import Controller from '@ember/controller';

export default Controller.extend({
  query: '',
  page: 1,
  queryParams: ['query', 'page'],

  actions: {
    queryChanged(query) {
      this.set('query', query);
      this.set('page', 1);
    }
  }
});
