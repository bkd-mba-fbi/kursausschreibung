import Route from '@ember/routing/route';

export default Route.extend({
  beforeModel() {
    let eventsByArea = this.modelFor('application');
    let firstKey = Object.keys(eventsByArea)[0];

    if (firstKey === undefined) {
      throw new Error('failed to reroute to first areaOfEducation. no areaOfEducation was found.');
    }

    this.replaceWith('list', firstKey);
  }
});
