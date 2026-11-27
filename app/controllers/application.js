import Controller from '@ember/controller';
import { action } from '@ember/object';
import { setLanguage } from 'kursausschreibung/framework/translate';
import settings from 'kursausschreibung/framework/settings';

export default class ApplicationController extends Controller {
  showLanguageButton = settings.showLanguageButton;
  logoImage = settings.logoImage;
  logoLink = settings.logoLink;
  showContact = settings.showContact;
  twitterHandle = settings.twitterHandle;
  eventCategoryDropdown = settings.eventCategoryDropdown;

  // read on access, settings from WebM_SchoolAppNavigation are loaded after this file
  get rightWidth() {
    return settings.displayRightSide ? 'uk-width-1-4@l' : 'uk-width-1-1';
  }

  @action
  setLanguage(language, event) {
    event?.preventDefault();
    setLanguage(language);
  }
}
