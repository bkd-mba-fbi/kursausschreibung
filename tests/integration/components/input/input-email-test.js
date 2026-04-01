import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

function makeField(overrides = {}) {
  return Object.assign({
    id: 'Email',
    options: { required: false, disabled: false, autocomplete: 'email' }
  }, overrides);
}

module('Integration | Component | input/input-email', function(hooks) {
  setupRenderingTest(hooks);

  test('renders an email input with the field name', async function(assert) {
    this.set('field', makeField());
    await render(hbs`{{input/input-email field=this.field}}`);

    const input = find('input[type="email"]');
    assert.ok(input, 'email input is rendered');
    assert.equal(input.getAttribute('name'), 'Email', 'name matches field id');
  });

  test('renders as disabled when field.options.disabled is true', async function(assert) {
    this.set('field', makeField({ options: { required: false, disabled: true, autocomplete: 'email' } }));
    await render(hbs`{{input/input-email field=this.field}}`);

    assert.ok(find('input[type="email"]:disabled'), 'email input is disabled');
  });
});
