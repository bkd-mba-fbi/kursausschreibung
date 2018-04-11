import Route from '@ember/routing/route';

export default Route.extend({
  beforeModel() {
    let eventsByArea = this.modelFor('application');
    let firstKey = Object.keys(eventsByArea)[0];

    this.replaceWith('list', firstKey);
  }
});
