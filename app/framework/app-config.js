import { fetchJSON } from './ajax-helpers';

let appConfig = {};

export function init() {
  // fetch appConfig
  return fetchJSON('appConfig.json', appConfig);
}

export default appConfig;
