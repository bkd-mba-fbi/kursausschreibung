import { Promise } from 'rsvp';
import storage from './storage';
import appConfig from './app-config';
import { getParameterByName } from './url-helpers';
import { getLanguage } from './translate';

// stripped down version of the CLX framework code

// return true if there is a valid token in the localStorage
function isLoggedIn() {
  let accessToken = storage.access_token();
  let tokenExpire = storage.token_expire();

  if (accessToken === null || (tokenExpire !== null && Date.now() >= tokenExpire)) {
    return false;
  }

  let payload = parseJWT(accessToken);

  // only return true if instanceId and culture are correct
  return appConfig.instanceId === payload.instance_id && payload.culture_info === getLanguage();
}

// parse and return the JWT payload
function parseJWT(accessToken) {
  return JSON.parse(atob(accessToken.split('.')[1]));
}

// save the OAuth token if there is one in the URL
export function checkToken() {
  let token = getParameterByName('access_token');

  if (token !== null) {
    // redirect from OAuth Server -> store token, refresh token and expiration
    let refreshToken = getParameterByName('refresh_token');
    let expire = parseInt(getParameterByName('expires_in'));
    let date = Date.now() + expire * 1000;

    storage.access_token(token);
    storage.refresh_token(refreshToken);
    storage.token_expire(date);

    history.replaceState(null, null, location.href.split('?')[0]);
  }
}

// return resolved promise if there is a valid token
// redirect to OAuth server otherwise
export function autoCheckForLogin() {
  if (isLoggedIn()) {
    return Promise.resolve();
  }

  // save URL to set it again when the module reloads
  storage.localStoreItem('kursausschreibung.initialURL', location.href);

  let params = [
    { name: 'clientId', value: appConfig.clientId },
    { name: 'redirectUrl', value: encodeURIComponent(appConfig.webBaseUrl) },
    { name: 'culture_info', value: getLanguage() },
    { name: 'application_scope', value: appConfig.applicationScope }
  ]
    .map(item => `${item.name}=${item.value}`)
    .join('&');

  let url = `${appConfig.oauthUrl}/Authorization/${
    appConfig.instanceId
    }/Token?${params}`;

  location.replace(url);

  return new Promise(() => { }); // never resolve so no error-message gets shown
}
