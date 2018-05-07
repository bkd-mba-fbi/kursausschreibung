import storage from './storage';
import appConfig from './app-config';
import { getParameterByName } from './url-helpers';
import { getLanguage } from './translate';

// stripped down version of the CLX framework code
// (not yet complete)
// TODO: refresh (also save filled out forms)

function isLoggedIn() {
  let loggedToken = storage.access_token();

  if (loggedToken !== null) {
    let expire = storage.token_expire();
    if (expire) {
      if (Date.now() >= expire) {
        return false;
      }
    }
    return true;
  } else {
    return false;
  }
}

function checkToken() {
  let token = getParameterByName('access_token');

  if (token) {
    // redirect from OAuth Server -> store token, refresh token and expiration
    let refreshToken = getParameterByName('refresh_token');
    let expire = parseInt(getParameterByName('expires_in'));
    let date = Date.now() + expire * 1000;

    storage.access_token(token);
    storage.refresh_token(refreshToken);
    storage.token_expire(date);

    location.replace(location.href.split('?')[0]);
  }
}

export function autoCheckForLogin() {
  checkToken();

  if (!isLoggedIn()) {
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
  }
}
