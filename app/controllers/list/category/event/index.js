import Controller from '@ember/controller';
import settings from 'kursausschreibung/framework/settings';

let badgeFreeSeatsEnabled = typeof settings.badgeFreeSeats === 'object' && settings.badgeFreeSeats.enabled === true;

export default Controller.extend({
  showBreadcrumbs: settings.showBreadcrumbs,
  badgeFreeSeatsEnabled
});