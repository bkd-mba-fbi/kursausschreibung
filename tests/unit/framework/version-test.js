import { module, test } from 'qunit';
import {
  cleanVersion,
  isNewerVersion,
  loadLatestVersion,
} from 'kursausschreibung/framework/version';

module('Unit | Framework | version', function () {
  test('cleanVersion removes build metadata and a leading v', function (assert) {
    assert.strictEqual(cleanVersion('3.7.0+484e4d82'), '3.7.0');
    assert.strictEqual(cleanVersion('v3.7.0'), '3.7.0');
    assert.strictEqual(cleanVersion('3.7.0'), '3.7.0');
    assert.strictEqual(cleanVersion(undefined), null);
  });

  test('isNewerVersion compares major, minor and patch', function (assert) {
    assert.true(isNewerVersion('3.7.0', '3.6.4'));
    assert.true(isNewerVersion('3.10.0', '3.9.9'), 'numeric, not text');
    assert.true(isNewerVersion('4.0.0', '3.99.99'));
    assert.true(isNewerVersion('v3.6.5', '3.6.4+abc'));
    assert.false(isNewerVersion('3.6.4', '3.6.4'));
    assert.false(isNewerVersion('3.6.3', '3.6.4'));
    assert.false(isNewerVersion('invalid', '3.6.4'));
    assert.false(isNewerVersion('3.7.0', null));
  });

  test('loadLatestVersion returns null if version.json is not reachable', async function (assert) {
    assert.expect(1);
    let originalFetch = window.fetch;
    window.fetch = () => Promise.reject(new Error('offline'));

    try {
      assert.strictEqual(await loadLatestVersion(), null);
    } finally {
      window.fetch = originalFetch;
    }
  });

  test('loadLatestVersion returns version and url', async function (assert) {
    assert.expect(1);
    let originalFetch = window.fetch;
    window.fetch = () =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            version: '3.7.0',
            url: 'https://github.com/bkd-mba-fbi/kursausschreibung/releases/tag/v3.7.0',
          }),
      });

    try {
      assert.deepEqual(await loadLatestVersion(), {
        version: '3.7.0',
        url: 'https://github.com/bkd-mba-fbi/kursausschreibung/releases/tag/v3.7.0',
      });
    } finally {
      window.fetch = originalFetch;
    }
  });
});
