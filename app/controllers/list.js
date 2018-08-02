import Controller from '@ember/controller';
import settings from 'kursausschreibung/framework/settings';

export default Controller.extend({
  eventCategoryDropdown: settings.eventCategoryDropdown,

  centerWidth: settings.eventCategoryDropdown ? 'uk-width-1-1@m uk-width-3-4@l' : 'uk-width-3-4@m uk-width-1-2@l'
});
