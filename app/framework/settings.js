import { fetchJSON } from './ajax-helpers';

let settings = {};

export function init() {
  // fetch settings
  return fetchJSON('settings.json', settings);
}

export default settings;
