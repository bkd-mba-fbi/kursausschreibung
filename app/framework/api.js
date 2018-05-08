import $ from 'jquery';
import appConfig from './app-config';
import storage from './storage';

// not using the framework-version for now
// because it seems to be missing almost every call
// this modules needs and it has a lot of calls this
// module doesn't need

function get(relativeUrl) {
  return $.ajax({
    dataType: 'json',
    url: appConfig.apiUrl + '/' + relativeUrl,

    headers: {
      'CLX-Authorization': `token_type=${appConfig.tokenType}, access_token=${storage.access_token()}`
    }
  });
}

export function getEvents() {
  return get('Events/');
}

export function getLessons() {
  return get('Lessons/');
}

export function getEventLocations() {
  return get('EventLocations/');
}

export function getEventTexts(cultureInfo) {
  return get('EventTexts/?cultureInfo=' + cultureInfo);
}
