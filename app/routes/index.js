import Route from '@ember/routing/route';

export default Route.extend({
  beforeModel() {
    let eventsByArea = this.modelFor('application');
    let firstKey = Object.keys(eventsByArea)[0];

    if (firstKey === undefined) {
      throw new Error('no events are available. there most likely is an issue with the config or the api server.');
    }

    this.replaceWith('list', firstKey);
  }
});
