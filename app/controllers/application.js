import Controller from '@ember/controller';
import { setLanguage } from 'kursausschreibung/framework/translate';
import settings from 'kursausschreibung/framework/settings';

let rightWidth = settings.displayRightSide ? 'uk-width-1-4@l' : 'uk-width-1-1';

export default Controller.extend({
  showLanguageButton: settings.showLanguageButton,
  logoImage: settings.logoImage,
  logoLink: settings.logoLink,
  showContact: settings.showContact,
  twitterHandle: settings.twitterHandle,
  eventCategoryDropdown: settings.eventCategoryDropdown,
  rightWidth,

  actions: {
    setLanguage(language) {
      setLanguage(language);
    }
  }
});
