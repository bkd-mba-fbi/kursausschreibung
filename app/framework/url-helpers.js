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

  let regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)');
  let results = regex.exec(url);

  if (!results) {
    return null;
  }

  if (!results[2]) {
    return '';
  }

  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

/**
 * set url params by name 
 * @param {string} name the name of the parameter
 * @param {string} value the value of the parameter name
 * @param {string} url the URL (defaults to current URL)
 */
export function setParameterByName(name,value, url) {
  
  if (typeof url !== 'string') {
    url = window.location.href;
  }
  if (value === null) {
    return url;
  }

  let params = decodeURI(url).split('?')[1];
  if(params !== undefined) {
     params = params.replace(name + '=' + getParameterByName(name,url), name +'='+ value);
  } else {
    params = name +'='+ value;
  }
  window.location.href =  encodeURI(url.split('?')[0] + '?' + params);
}
