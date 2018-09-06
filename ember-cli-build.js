'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function (defaults) {
  let app = new EmberApp(defaults, {

    // see: https://github.com/ember-cli/ember-cli-uglify
    'ember-cli-uglify': {
      exclude: ['appConfig.js', 'settings.js', 'locale/de-CH.js', 'locale/fr-CH.js'],
      uglify: {
        output: {
          comments: /^!/
        }
      }
    }
  });

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

  // uikit js
  app.import('node_modules/uikit/dist/js/uikit.js');
  app.import('node_modules/uikit/dist/js/uikit-icons.js');
  app.import('vendor/shims/uikit.js');

  // moment
  app.import('node_modules/moment/moment.js');
  app.import('node_modules/moment/locale/de-ch.js');
  app.import('node_modules/moment/locale/fr-ch.js');
  app.import('vendor/shims/moment.js');

  return app.toTree();
};
