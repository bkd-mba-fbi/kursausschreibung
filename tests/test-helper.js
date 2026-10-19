import Application from 'kursausschreibung/app';
import config from 'kursausschreibung/config/environment';
import * as QUnit from 'qunit';
import { setApplication } from '@ember/test-helpers';
import { setup } from 'qunit-dom';
import { start as qunitStart, setupEmberOnerrorValidation } from 'ember-qunit';

// The test modules are imported by tests/index.html (import.meta.glob)
// before start() is called.
export function start() {
  setApplication(Application.create(config.APP));

  setup(QUnit.assert);

  setupEmberOnerrorValidation();

  qunitStart();
}
