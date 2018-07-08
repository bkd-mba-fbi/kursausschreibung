import Route from '@ember/routing/route';

export default Route.extend({
  beforeModel() {
    let applicationModel = this.modelFor('application');

    if (applicationModel.areaKeys === undefined || applicationModel.areaKeys.length === 0) {
      throw new Error('no events are available. there most likely is an issue with the config or the api server.');
    }

    this.replaceWith('list', applicationModel.areaKeys[0]);
  }
});
