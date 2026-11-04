import { module, test } from 'qunit';
import { getLanguage, getString } from 'kursausschreibung/framework/translate';

module('Unit | Framework | translate', function (hooks) {
  let language = getLanguage();
  let otherLanguage = language === 'de-CH' ? 'fr-CH' : 'de-CH';
  let locale = window.kursausschreibung.locale[language];
  let originalCustomLocales;

  hooks.beforeEach(function () {
    originalCustomLocales = window.kursausschreibung.localeCustom;
    window.kursausschreibung.localeCustom = {};
  });

  hooks.afterEach(function () {
    window.kursausschreibung.localeCustom = originalCustomLocales;
    delete locale.translateTestKey;
  });

  test('the custom locale files are loaded and do not replace the default locales', function (assert) {
    assert.expect(4);

    for (let culture of ['de-CH', 'fr-CH']) {
      assert.strictEqual(
        typeof originalCustomLocales[culture],
        'object',
        `${culture}-custom.js is loaded`
      );
      assert.ok(
        window.kursausschreibung.locale[culture].overview,
        `${culture}.js is still complete`
      );
    }
  });

  test('it returns the key of the default locale without a custom locale', function (assert) {
    assert.strictEqual(getString('overview'), locale.overview);

    delete window.kursausschreibung.localeCustom;
    assert.strictEqual(getString('overview'), locale.overview);
  });

  test('it returns the key of the default locale if the custom locale is empty', function (assert) {
    window.kursausschreibung.localeCustom[language] = {};

    assert.strictEqual(getString('overview'), locale.overview);
  });

  test('it prefers the key of the custom locale', function (assert) {
    window.kursausschreibung.localeCustom[language] = { overview: 'custom' };

    assert.strictEqual(getString('overview'), 'custom');
  });

  test('it falls back to the default locale for keys missing in the custom locale', function (assert) {
    window.kursausschreibung.localeCustom[language] = { overview: 'custom' };

    assert.strictEqual(getString('contact'), locale.contact);
    assert.strictEqual(getString('search'), locale.search);
  });

  test('it falls back to the default locale if the custom key is null', function (assert) {
    window.kursausschreibung.localeCustom[language] = { overview: null };

    assert.strictEqual(getString('overview'), locale.overview);
  });

  test('it ignores the custom locale of another language', function (assert) {
    window.kursausschreibung.localeCustom[otherLanguage] = {
      overview: 'custom',
    };

    assert.strictEqual(getString('overview'), locale.overview);
  });

  test('it finds keys which only exist in the custom locale', function (assert) {
    window.kursausschreibung.localeCustom[language] = {
      translateTestKey: 'only custom',
    };

    assert.strictEqual(getString('translateTestKey'), 'only custom');
  });

  test('it replaces placeholders in custom and default strings', function (assert) {
    locale.translateTestKey = 'default {0} {1}';
    assert.strictEqual(
      getString('translateTestKey', ['a', 'b']),
      'default a b'
    );

    window.kursausschreibung.localeCustom[language] = {
      translateTestKey: 'custom {0} {1}',
    };
    assert.strictEqual(getString('translateTestKey', ['a', 'b']), 'custom a b');
  });

  test('it reports keys which are missing in both locales', function (assert) {
    window.kursausschreibung.localeCustom[language] = { overview: 'custom' };

    assert.true(getString('translateTestKey').includes('Key not found'));
  });
});
