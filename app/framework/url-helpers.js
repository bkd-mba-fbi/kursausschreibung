import appConfig from './app-config';

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

  let params = decodeURI(url).split('?');
  let paramsLength = params.length;
  params = params.length === 3 ? params[1] + '?' + params[2] : params[1];
  
  if(params !== undefined) {

    if(params.indexOf(name) >= 0) {
      params = params.replace(name + '=' + getParameterByName(name,url), name +'='+ value);
    }
    else {
      let newParam = '&';
      if (paramsLength > 2 && params.indexOf('?') > -1) {
        newParam = '&';
      } else if (paramsLength > 2 && params.indexOf('?') === -1) {
        newParam = '?';
      } else if (paramsLength === 2 && params.indexOf('#') > -1) {
        newParam = '?';
      }

      params = params + newParam + name +'='+ value;
    }
     
  } else {
    params = name +'='+ value;
  }

  window.location.href =  encodeURI(url.split('?')[0] + '?' + params); 
}

/**
 * It checks if the url starts with "http". If true change url to relative url
 * @param {string} url location url
 */
export function getCorrectApiUrl(url){
  if(url.indexOf('http') === 0) {
    var apiUriSplitLength = appConfig.apiUrl.split('/').length;
    var getIndex = url.split('/')[apiUriSplitLength];
    return url.substring(url.indexOf(getIndex),url.length); 
  } else {
    return url;
  }
} 
