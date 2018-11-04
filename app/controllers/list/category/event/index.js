import Controller from '@ember/controller';
import settings from 'kursausschreibung/framework/settings';
import LinkComponent from '@ember/routing/link-component';

let badgeFreeSeatsEnabled = typeof settings.badgeFreeSeats === 'object' && settings.badgeFreeSeats.enabled === true;

export default Controller.extend({
  showBreadcrumbs: settings.showBreadcrumbs,
  badgeFreeSeatsEnabled
});

// bindings for tooltip and disabled attributes
LinkComponent.reopen({
  attributeBindings: ['data-uk-tooltip', 'disabled']
});
