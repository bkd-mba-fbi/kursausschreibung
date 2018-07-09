import Controller from '@ember/controller';
import settings from 'kursausschreibung/framework/settings';
import LinkComponent from '@ember/routing/link-component';

export default Controller.extend({
  showBreadcrumbs: settings.showBreadcrumbs,
  badgeFreeSeatsEnabled: typeof settings.badgeFreeSeats === 'object' && settings.badgeFreeSeats.enabled === true
});

// this allows the tooltip to be set
LinkComponent.reopen({
  attributeBindings: ['data-uk-tooltip']
});
