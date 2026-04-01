import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

function makeField(overrides = {}) {
  return Object.assign({
    id: 'Phone',
    options: { required: false, disabled: false, autocomplete: 'tel' }
  }, overrides);
}

module('Integration | Component | input/input-telephone', function(hooks) {
  setupRenderingTest(hooks);

  test('renders a tel input with the field name', async function(assert) {
    this.set('field', makeField());
    await render(hbs`{{input/input-telephone field=this.field}}`);

    const input = find('input[type="tel"]');
    assert.ok(input, 'telephone input is rendered');
    assert.equal(input.getAttribute('name'), 'Phone', 'name matches field id');
  });

  test('renders as disabled when field.options.disabled is true', async function(assert) {
    this.set('field', makeField({ options: { required: false, disabled: true, autocomplete: 'tel' } }));
    await render(hbs`{{input/input-telephone field=this.field}}`);

    assert.ok(find('input[type="tel"]:disabled'), 'telephone input is disabled');
  });
});
