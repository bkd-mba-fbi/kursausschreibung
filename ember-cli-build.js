'use strict';

const homedir = require('os').homedir();
const { existsSync, readFileSync, mkdirSync, copyFileSync } = require('fs');
const { execSync } = require('child_process');
const { join } = require('path');

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function (defaults) {
  let app = new EmberApp(defaults, {

    // see: https://github.com/ember-cli/ember-cli-uglify
    'ember-cli-terser': {
      enabled: true,
      exclude: ['appConfig.js', 'settings.js', 'locale/de-CH.js', 'locale/fr-CH.js'],
      terser: {
        compress: {
          sequences: 50,
        },
        output: {
          semicolons: true,
        },
      },
  
      // Tell broccoli-terser-sourcemap to not add sourcemap URLs
      hiddenSourceMap: false
    }, 
    emberCliConcat: {
      js: {
        concat: true
      },
      css: {
        concat: true
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

  // date-fns
  ['parseISO', 'format', 'locale/de', 'locale/fr'].forEach(module =>
    app.import(`node_modules/date-fns/${module}/index.js`, {
      using: [
        { transformation: 'cjs', as: `date-fns/${module}` }
      ]
    })
  );

  // typeahead.js
  app.import('node_modules/corejs-typeahead/dist/typeahead.jquery.js');

  // Croppie
  app.import('node_modules/croppie/croppie.js');
  app.import('node_modules/croppie/croppie.css');

  return app.toTree();
};
