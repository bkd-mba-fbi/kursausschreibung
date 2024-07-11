import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    subscribe() {
      this.router.transitionTo('list.category.event.confirmation');
    }
  }
});
