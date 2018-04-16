import Controller from '@ember/controller';
import { setLanguage } from '../framework/translate';
import settings from '../framework/settings';

export default Controller.extend({
  showLanguageButton: settings.showLanguageButton,
  logoImage: settings.logoImage,
  logoLink: settings.logoLink,
  showContact: settings.showContact,
  twitterHandle: settings.twitterHandle,

  actions: {
    setLanguage(language) {
      setLanguage(language);
    }
  }
});
