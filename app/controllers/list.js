import Controller from '@ember/controller';
import settings from 'kursausschreibung/framework/settings';

export default Controller.extend({
  eventCategoryDropdown: settings.eventCategoryDropdown
});
