import Application from 'kursausschreibung/app';
import config from 'kursausschreibung/config/environment';
import * as QUnit from 'qunit';
import { setApplication } from '@ember/test-helpers';
import { setup } from 'qunit-dom';
import { start } from 'ember-qunit';

// Classic ember-cli: load test modules via the AMD require global (loader.js).
// ember-qunit/test-loader cannot be bundled through webpack in classic builds.
// eslint-disable-next-line no-undef
Object.keys(requirejs.entries).forEach((key) => {
  if (key.startsWith('kursausschreibung/tests/') && key.endsWith('-test')) {
    requirejs(key);
  }
});

setApplication(Application.create(config.APP));

setup(QUnit.assert);

start();
