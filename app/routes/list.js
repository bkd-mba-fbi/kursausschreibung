import Route from '@ember/routing/route';

export default Route.extend({
  model(params, transition) {
    let eventsByArea = this.modelFor('application').get('eventsByArea');

    // check if area of education exists
    if (!(eventsByArea.hasOwnProperty(params.area_of_education))) {
      this.replaceWith('/');
      return;
    }

    let activeArea = eventsByArea[params.area_of_education];

    // save the active area on the application model
    // so it can be used for the navigation
    this.modelFor('application').set('activeArea', activeArea);

    return activeArea;
  }
});
