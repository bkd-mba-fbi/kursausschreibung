import { module, test } from 'qunit';
import appConfig from 'kursausschreibung/framework/app-config';
import {
  shouldLoadSchoolSettings,
  mergeSchoolSettings,
} from 'kursausschreibung/framework/school-settings';

function createToken(payload) {
  let encode = (object) => btoa(JSON.stringify(object));
  return `${encode({ alg: 'none' })}.${encode(payload)}.signature`;
}

module(
  'Unit | Framework | school-settings | shouldLoadSchoolSettings',
  function (hooks) {
    let original;

    hooks.beforeEach(function () {
      original = appConfig.settingsFromBackendIfConsumer;
    });

    hooks.afterEach(function () {
      appConfig.settingsFromBackendIfConsumer = original;
    });

    test('loads if consumer_id matches', function (assert) {
      appConfig.settingsFromBackendIfConsumer = 'portal';
      assert.true(
        shouldLoadSchoolSettings(createToken({ consumer_id: 'portal' }))
      );
    });

    test('does not load for another consumer (school website)', function (assert) {
      appConfig.settingsFromBackendIfConsumer = 'portal';
      assert.false(
        shouldLoadSchoolSettings(createToken({ consumer_id: 'schulweb' }))
      );
    });

    test('does not load without setting in appConfig', function (assert) {
      appConfig.settingsFromBackendIfConsumer = undefined;
      assert.false(
        shouldLoadSchoolSettings(createToken({ consumer_id: 'portal' }))
      );
      appConfig.settingsFromBackendIfConsumer = '';
      assert.false(
        shouldLoadSchoolSettings(createToken({ consumer_id: 'portal' }))
      );
    });

    test('does not load without or with invalid token', function (assert) {
      appConfig.settingsFromBackendIfConsumer = 'portal';
      assert.false(shouldLoadSchoolSettings(null));
      assert.false(shouldLoadSchoolSettings('not-a-jwt'));
    });
  }
);

module('Unit | Framework | school-settings | mergeSchoolSettings', function () {
  test('entries from the configuration entry take precedence', function (assert) {
    let target = { showStartedEvents: true, itemsPerPage: 10 };
    mergeSchoolSettings(target, { showStartedEvents: false });

    assert.deepEqual(target, { showStartedEvents: false, itemsPerPage: 10 });
  });

  test('nested entries replace the whole entry', function (assert) {
    let target = {
      eventListFields: ['Location'],
      formFields: { a: { required: true }, b: { required: false } },
    };
    mergeSchoolSettings(target, {
      eventListFields: ['SubscriptionFrom', 'Location', 'Price'],
      formFields: { a: { required: false } },
    });

    assert.deepEqual(target.eventListFields, [
      'SubscriptionFrom',
      'Location',
      'Price',
    ]);
    assert.deepEqual(target.formFields, { a: { required: false } });
  });

  test('missing section keeps settings.js', function (assert) {
    assert.expect(5);
    for (let missing of [undefined, null, 'text', 42, ['a']]) {
      let target = { itemsPerPage: 10 };
      mergeSchoolSettings(target, missing);
      assert.deepEqual(target, { itemsPerPage: 10 }, String(missing));
    }
  });

  test('empty section keeps settings.js', function (assert) {
    let target = { itemsPerPage: 10 };
    mergeSchoolSettings(target, {});
    assert.deepEqual(target, { itemsPerPage: 10 });
  });
});
