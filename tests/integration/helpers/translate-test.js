import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Helper | translate', function(hooks) {
  setupRenderingTest(hooks);

  test('renders translated value for known key', async function(assert) {
    this.set('inputValue', 'overview');

    await render(hbs`{{translate inputValue}}`);

    assert.ok(this.element.textContent.toLowerCase().includes('bersicht'), 'known key is translated');
  });

  test('renders key-not-found marker for unknown key', async function(assert) {
    this.set('inputValue', 'unknownTranslationKeyForTest');

    await render(hbs`{{translate inputValue}}`);

    assert.ok(this.element.textContent.includes('Key not found'), 'fallback marker is rendered');
  });
});
