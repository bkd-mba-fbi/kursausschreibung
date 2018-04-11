import Controller from '@ember/controller';
import { setLanguage } from '../framework/translate';
import settings from '../framework/settings';

export default Controller.extend({
  twitterHandle: settings.twitterHandle,
  logoImage: settings.logoImage,
  logoLink: settings.logoLink,

  actions: {
    setLanguage(language) {
      setLanguage(language);
    }
  }
});
