/* loosely based on the CLX framework */

import { Promise } from 'rsvp';
import {
  getAccessToken, setAccessToken, getTokenExpire,
  setTokenExpire, setRefreshToken
} from './storage';
import appConfig from './app-config';
import { getParameterByName } from './url-helpers';
import { getLanguage } from './translate';
import $ from 'jquery';

/**
 * return true if there is a valid token in the localStorage
 */
function isLoggedIn() {
  let accessToken = getAccessToken();
  let tokenExpire = getTokenExpire();

  if (accessToken === null || (tokenExpire !== null && Date.now() >= tokenExpire)) {
    return false;
  }

  let payload = parseJWT(accessToken);

  // only return true if instanceId and culture are correct
  return appConfig.instanceId === payload.instance_id && payload.culture_info === getLanguage();
}

/**
 * parse accessToken and return the JWT payload
 * @param {string} accessToken the accessToken
 */
function parseJWT(accessToken) {
  return JSON.parse(atob(accessToken.split('.')[1]));
}

// save the OAuth token if there is one in the URL
export function checkToken() {
  let accessToken = getParameterByName('access_token');

  if (accessToken !== null) {
    // store token, refresh token and expiration
    let refreshToken = getParameterByName('refresh_token');
    let expire = parseInt(getParameterByName('expires_in'));
    let tokenExpire = Date.now() + expire * 1000;

    setAccessToken(accessToken);
    setRefreshToken(refreshToken);
    setTokenExpire(tokenExpire);

    // navigate back to initial url
    history.replaceState(null, null, getParameterByName('moduleRedirectUrl'));
  }
}

/**
 * return resolved promise if there is a valid token
 * get a new accesToken otherwise
 */
export function autoCheckForLogin() {
  if (isLoggedIn()) {
    return Promise.resolve();
  }

  if (appConfig.useAutoLogin) {
    // get a new token from the OAuth server
    let params = $.param({
      clientId: appConfig.clientId,
      redirectUrl: appConfig.webBaseUrl,
      culture_info: getLanguage(),
      application_scope: appConfig.applicationScope,
      moduleRedirectUrl: location.href
    });

    let url = `${appConfig.oauthUrl}/Authorization/${
      appConfig.instanceId}/Token?${params}`;

    location.replace(url);
  } else {
    // let the application which embeds this module get a new token
    location.reload();
  }

  return new Promise(() => { }); // never resolve so no error-message gets shown
}
