'use strict';

const homedir = require('os').homedir();
const { existsSync, readFileSync, mkdirSync, copyFileSync } = require('fs');
const { execSync } = require('child_process');
const { join } = require('path');

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function (defaults) {

  // build scoped uikit
  if ('TRAVIS' in process.env) {
    const packageLockFile = JSON.parse(readFileSync('package-lock.json'));
    const uikitVersion = packageLockFile.dependencies.uikit.version;
    const uikitCacheDir = join(homedir, 'uikit-build-cache');
    const uikitCacheFile = join(uikitCacheDir, 'uikit' + uikitVersion + '.css');
    const uikitUsedFile = './node_modules/uikit/dist/css/uikit.css';

    if (!existsSync(uikitCacheFile)) {
      // the file is not yet in the cache so we have to create it
      console.log('scoped uikit.css not found in cache, let\'s build it'); // eslint-disable-line no-console
      execSync('npm install && npm run scope', {
        cwd: './node_modules/uikit'
      });

      if (!existsSync(uikitCacheDir)) {
        mkdirSync(uikitCacheDir);
      }
      copyFileSync(uikitUsedFile, uikitCacheFile);
    } else {
      // copy the file from the cache
      console.log('scoped uikit.css found in cache'); // eslint-disable-line no-console
      copyFileSync(uikitCacheFile, uikitUsedFile);
    }
  }

  // create app
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

  // date-fns
  ['parseISO', 'format', 'locale/de', 'locale/fr'].forEach(module =>
    app.import(`node_modules/date-fns/${module}/index.js`, {
      using: [
        { transformation: 'cjs', as: `date-fns/${module}` }
      ]
    })
  );

  return app.toTree();
};
