import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { getOwner } from '@ember/owner';
import {
  LATEST_VERSION_URL,
  cleanVersion,
  isNewerVersion,
  loadLatestVersion,
} from 'kursausschreibung/framework/version';
import settings from 'kursausschreibung/framework/settings';
import { getLanguage } from 'kursausschreibung/framework/translate';

const FOOTER_TARGET_ID = 'kursausschreibung-version';

// fallback if a school still has locale files without these keys
const FALLBACK = {
  'de-CH': 'Neue Version {0} verfügbar',
  'fr-CH': 'Nouvelle version {0} disponible',
};

export default class VersionFooterComponent extends Component {
  @tracked latest = null;

  constructor(owner, args) {
    super(owner, args);

    // the version is written into app.js by the build (ember-cli-app-version)
    this.installed = cleanVersion(getOwner(this).application?.version);

    // if the page has a footer with this element, the version is shown there,
    // otherwise it is shown as the last line of the module (e.g. in the portal iframe)
    this.target = document.getElementById(FOOTER_TARGET_ID);

    // settings.latestVersionUrl can point to another version.json (e.g. for tests)
    loadLatestVersion(settings.latestVersionUrl || LATEST_VERSION_URL).then(
      (latest) => {
        if (
          !this.isDestroyed &&
          latest !== null &&
          isNewerVersion(latest.version, this.installed)
        ) {
          this.latest = latest;
        }
      }
    );
  }

  get newVersionText() {
    let language = getLanguage();
    let locale = window.kursausschreibung?.locale?.[language] || {};
    let custom = window.kursausschreibung?.localeCustom?.[language] || {};
    let text =
      custom.newVersionAvailable ||
      locale.newVersionAvailable ||
      FALLBACK[language] ||
      FALLBACK['de-CH'];

    return text.replace('{0}', this.latest?.version);
  }
}
