import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    subscribe() {
      this.transitionToRoute('list.category.event.confirmation');
    }
  }
});
