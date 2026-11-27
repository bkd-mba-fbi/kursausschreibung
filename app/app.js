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

export default class App extends Application {
  modulePrefix = config.modulePrefix;
  podModulePrefix = config.podModulePrefix;
  // Embroider has no AMD registry (requirejs.entries) anymore: hand the
  // resolver the statically known modules instead.
  Resolver = Resolver.withModules(compatModules);
  // lets the ember-inspector browser extension find ember-source modules
  // in an embroider build (see @embroider/legacy-inspector-support)
  inspector = setupInspector(this);
}

loadInitializers(App, config.modulePrefix, compatModules);
