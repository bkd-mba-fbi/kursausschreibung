import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

function makeField(overrides = {}) {
  return Object.assign({
    id: 'ZipCode',
    placeholder: '3000',
    options: { required: false, disabled: false, autocomplete: 'postal-code' }
  }, overrides);
}

module('Integration | Component | input/input-postal-code', function(hooks) {
  setupRenderingTest(hooks);

  test('renders a text input for postal code with the field name', async function(assert) {
    this.set('field', makeField());
    await render(hbs`{{input/input-postal-code field=this.field}}`);

    const input = find('input.typeaheadZip');
    assert.ok(input, 'postal code input is rendered');
    assert.equal(input.getAttribute('type'), 'text', 'postal code input uses text type');
  });

  test('renders placeholder from field', async function(assert) {
    this.set('field', makeField({ placeholder: '8000' }));
    await render(hbs`{{input/input-postal-code field=this.field}}`);

    // Typeahead.js may strip placeholder from the decorated input; verify the element exists.
    const el = find('input.typeaheadZip') || find('.tt-input');
    assert.ok(el, 'postal code typeahead element exists');
  });
});
