import Application from '@ember/application';
import Resolver from './resolver';
import loadInitializers from 'ember-load-initializers';
import config from './config/environment';
import { checkToken } from 'kursausschreibung/framework/login-helpers';
import './deprecation-workflow';

import setupInspector from '@embroider/legacy-inspector-support/ember-source-4.12';
import compatModules from '@embroider/virtual/compat-modules';

// read OAuth token and restore URL
checkToken();

const App = Application.extend({
  modulePrefix: config.modulePrefix,
  podModulePrefix: config.podModulePrefix,
  // Embroider has no AMD registry (requirejs.entries) anymore: hand the
  // resolver the statically known modules instead.
  Resolver: Resolver.withModules(compatModules),
});

loadInitializers(App, config.modulePrefix, compatModules);

export default App;
