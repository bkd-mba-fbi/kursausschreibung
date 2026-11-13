import { module, test } from 'qunit';
import appConfig from 'kursausschreibung/framework/app-config';
import { getCorrectApiUrl } from 'kursausschreibung/framework/url-helpers';

module('Unit | Framework | url-helpers | getCorrectApiUrl', function (hooks) {
  let originalApiUrl;

  hooks.beforeEach(function () {
    originalApiUrl = appConfig.apiUrl;
  });

  hooks.afterEach(function () {
    appConfig.apiUrl = originalApiUrl;
  });

  test('relative location works with apiUrl on /restApi', function (assert) {
    appConfig.apiUrl = 'https://eventoapp-test.apps.be.ch/restApi';
    let relative = getCorrectApiUrl('/restApi/files/0e722e36');

    assert.strictEqual(relative, 'files/0e722e36');
    assert.strictEqual(
      `${appConfig.apiUrl}/${relative}`,
      'https://eventoapp-test.apps.be.ch/restApi/files/0e722e36'
    );
  });

  test('relative location works with apiUrl on /api', function (assert) {
    appConfig.apiUrl = 'https://a4o-evt26-dev-apps.k8s.infra.be.ch/api';
    let relative = getCorrectApiUrl('/restApi/files/0e722e36');

    assert.strictEqual(
      `${appConfig.apiUrl}/${relative}`,
      'https://a4o-evt26-dev-apps.k8s.infra.be.ch/api/files/0e722e36'
    );
  });

  test('relative location without /restApi is kept', function (assert) {
    appConfig.apiUrl = 'https://a4o-evt26-dev-apps.k8s.infra.be.ch/api';
    assert.strictEqual(getCorrectApiUrl('/files/0e722e36'), 'files/0e722e36');
  });

  test('absolute location keeps working', function (assert) {
    appConfig.apiUrl = 'https://eventoapp-test.apps.be.ch/restApi';
    assert.strictEqual(
      getCorrectApiUrl(
        'https://eventoapp-test.apps.be.ch/restApi/files/0e722e36'
      ),
      'files/0e722e36'
    );
  });
});
