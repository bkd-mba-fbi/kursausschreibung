import $ from 'jquery';

// fetches JSON-file with `url` from server and merges
// its values with `object`
// (also removes comments)
export function fetchJSON(url, object) {
  return $.getJSON({
    url,

    dataFilter(data) {
      // remove comments
      return data.replace(/^((([^"\n]*)"([^"\n]*)")*?([^"\n]*?))\/\/.*/gm, '$1');
    }
  }).then(function (response) {
    $.extend(object, response);
  }).catch(function() {
    throw new Error(`there was an error while loading and parsing ${url}.`); // human-readable error
  });
}
