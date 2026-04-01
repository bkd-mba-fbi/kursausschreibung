import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

function makeField(overrides = {}) {
  return Object.assign({
    id: 'AcceptTerms',
    options: { required: false, disabled: false, autocomplete: 'off' }
  }, overrides);
}

module('Integration | Component | input/input-checkbox', function(hooks) {
  setupRenderingTest(hooks);

  test('renders a checkbox input with the field name', async function(assert) {
    this.set('field', makeField());
    await render(hbs`{{input/input-checkbox field=this.field}}`);

    const input = find('input[type="checkbox"]');
    assert.ok(input, 'checkbox input is rendered');
    assert.equal(input.getAttribute('name'), 'AcceptTerms', 'name matches field id');
  });

  test('renders as disabled when field.options.disabled is true', async function(assert) {
    this.set('field', makeField({ options: { required: false, disabled: true, autocomplete: 'off' } }));
    await render(hbs`{{input/input-checkbox field=this.field}}`);

    assert.ok(find('input[type="checkbox"]:disabled'), 'checkbox is disabled');
  });

  test('renders as required when field.options.required is true', async function(assert) {
    this.set('field', makeField({ options: { required: true, disabled: false, autocomplete: 'off' } }));
    await render(hbs`{{input/input-checkbox field=this.field}}`);

    assert.ok(find('input[type="checkbox"][required]'), 'checkbox is required');
  });
});
