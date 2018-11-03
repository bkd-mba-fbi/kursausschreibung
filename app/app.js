import Application from '@ember/application';
import Resolver from './resolver';
import loadInitializers from 'ember-load-initializers';
import config from './config/environment';
import storage from 'kursausschreibung/framework/storage';
import { checkToken } from 'kursausschreibung/framework/login-helpers';


// read OAuth token before restoring the URL
checkToken();

// go back to initialURL if there is one
let initialURL = storage.localStoreItem('kursausschreibung.initialURL');

if (initialURL !== null) {
  storage.localStoreItem('kursausschreibung.initialURL', null);
  history.replaceState(null, null, initialURL);
}

const App = Application.extend({
  modulePrefix: config.modulePrefix,
  podModulePrefix: config.podModulePrefix,
  Resolver
});

loadInitializers(App, config.modulePrefix);

export default App;
