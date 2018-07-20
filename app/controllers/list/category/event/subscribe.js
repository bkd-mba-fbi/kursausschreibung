import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    subscriptionFinished() {
      this.transitionToRoute('list.category.event.confirmation');
    }
  }
});
