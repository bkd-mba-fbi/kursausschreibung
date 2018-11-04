/**
 * get an URL-parameter
 * taken from https://stackoverflow.com/q/901115#answer-901144
 * @param {string} name the name of the parameter
 * @param {string} url the URL (defaults to current URL)
 */
export function getParameterByName(name, url) {

  if (typeof url !== 'string') {
    url = window.location.href;
  }

  name = name.replace(/[[\]]/g, '\\$&');

  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)');
  var results = regex.exec(url);

  if (!results) {
    return null;
  }

  if (!results[2]) {
    return '';
  }

  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
