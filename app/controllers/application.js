import Controller from '@ember/controller';
import { setLanguage } from '../framework/translate';

export default Controller.extend({
  actions: {
    setLanguage(language) {
      setLanguage(language);
    }
  }
});
