import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

function makeField(overrides = {}) {
  return Object.assign({
    id: 'NumberOfParticipants',
    placeholder: '',
    options: { required: false, disabled: false, autocomplete: 'off' }
  }, overrides);
}

module('Integration | Component | input/input-number', function(hooks) {
  setupRenderingTest(hooks);

  test('renders a number input with the field name', async function(assert) {
    this.set('field', makeField());
    await render(hbs`{{input/input-number field=this.field}}`);

    const input = find('input[type="number"]');
    assert.ok(input, 'number input is rendered');
    assert.equal(input.getAttribute('name'), 'NumberOfParticipants', 'name matches field id');
  });

  test('renders as required when field.options.required is true', async function(assert) {
    this.set('field', makeField({ options: { required: true, disabled: false, autocomplete: 'off' } }));
    await render(hbs`{{input/input-number field=this.field}}`);

    assert.ok(find('input[type="number"][required]'), 'number input is required');
  });
});
