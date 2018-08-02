import Controller from '@ember/controller';
import { setLanguage } from 'kursausschreibung/framework/translate';
import settings from 'kursausschreibung/framework/settings';

export default Controller.extend({
  showLanguageButton: settings.showLanguageButton,
  logoImage: settings.logoImage,
  logoLink: settings.logoLink,
  showContact: settings.showContact,
  twitterHandle: settings.twitterHandle,
  eventCategoryDropdown: settings.eventCategoryDropdown,

  rightWidth: settings.displayRightSide ? 'uk-width-1-4@l' : 'uk-width-1-1',

  actions: {
    setLanguage(language) {
      setLanguage(language);
    }
  }
});
