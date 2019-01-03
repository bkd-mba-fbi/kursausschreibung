import $ from 'jquery';
import Application from '@ember/application';
import Resolver from './resolver';
import loadInitializers from 'ember-load-initializers';
import config from './config/environment';
import { checkToken } from 'kursausschreibung/framework/login-helpers';

// restore window.$ and window.jQuery
$.noConflict(true);

// read OAuth token and restore URL
checkToken();

const App = Application.extend({
  modulePrefix: config.modulePrefix,
  podModulePrefix: config.podModulePrefix,
  Resolver
});

loadInitializers(App, config.modulePrefix);

export default App;
