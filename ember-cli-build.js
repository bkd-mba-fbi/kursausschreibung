'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');
const { compatBuild } = require('@embroider/compat');

module.exports = async function (defaults) {
  const { buildOnce } = await import('@embroider/vite');

  // Bundling (single app.js/app.css, minification, file names) is configured
  // in vite.config.mjs. The former webpack/terser/concat options are gone.
  let app = new EmberApp(defaults, {});

  // Use `app.import` to add additional libraries to the generated
  // output files.
  //
  // If you need to use different assets in different
  // environments, specify an object as the first parameter. That
  // object's keys should be the environment name and the values
  // should be the asset to use in that environment.
  //
  // If the library that you are including contains AMD or ES6
  // modules that you would like to import into your application
  // please specify an object with the list of modules as keys
  // along with the exports of each module as its value.

  // uikit css
  app.import('node_modules/uikit/dist/css/uikit.css');

  // uikit, uikit-icons and date-fns are resolved from `import` statements in
  // the app by ember-auto-import. Importing them here as well would ship them
  // twice and requires AMD shims that Embroider cannot follow (see #236).

  return compatBuild(app, buildOnce);
};
