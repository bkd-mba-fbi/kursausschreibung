import { Promise } from 'rsvp';
import appConfig from './app-config';
import settings from './settings';
import { getAccessToken } from './storage';
import { parseJWT } from './login-helpers';
import { getSchoolAppNavigation } from './api';

/**
 * return true if the settings of the school should be loaded from the
 * configuration entry WebM_SchoolAppNavigation. This is the case if
 * appConfig.settingsFromBackendIfConsumer matches consumer_id in the token
 * (e.g. 'portal' in the Evento-Portal)
 * @param {string?} accessToken the access token
 */
export function shouldLoadSchoolSettings(accessToken) {
  let consumer = appConfig.settingsFromBackendIfConsumer;

  if (typeof consumer !== 'string' || consumer === '' || !accessToken) {
    return false;
  }

  try {
    return parseJWT(accessToken).consumer_id === consumer;
  } catch (_error) {
    return false;
  }
}

/**
 * every entry of schoolSettings replaces the entry with the same name
 * in target as a whole (e.g. the whole formFields), missing entries stay
 * @param {object} target the settings from settings.js
 * @param {object?} schoolSettings the section kursausschreibung of the configuration entry
 */
export function mergeSchoolSettings(target, schoolSettings) {
  if (
    schoolSettings === null ||
    typeof schoolSettings !== 'object' ||
    Array.isArray(schoolSettings)
  ) {
    return target;
  }

  Object.keys(schoolSettings).forEach((key) => {
    if (schoolSettings[key] !== undefined) {
      target[key] = schoolSettings[key];
    }
  });

  return target;
}

/**
 * load the section kursausschreibung from the configuration entry
 * WebM_SchoolAppNavigation and merge it into the settings.
 * Never rejects: if anything fails the values from settings.js are used.
 */
export function loadSchoolSettings() {
  if (!shouldLoadSchoolSettings(getAccessToken())) {
    return Promise.resolve();
  }

  return getSchoolAppNavigation()
    .then((configuration) => {
      mergeSchoolSettings(settings, configuration?.kursausschreibung);
    })
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.warn(
        'could not load settings from WebM_SchoolAppNavigation, using settings.js',
        error
      );
    });
}
