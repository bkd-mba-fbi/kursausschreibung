import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

function makeField(overrides = {}) {
  return Object.assign(
    {
      id: 'BirthDate',
      options: { required: false, disabled: false, autocomplete: 'bday' },
    },
    overrides
  );
}

module('Integration | Component | input/input-date', function (hooks) {
  setupRenderingTest(hooks);

  test('renders a date input with the field name', async function (assert) {
    this.set('field', makeField());
    await render(hbs`{{input/input-date field=this.field}}`);

    const input = find('input[type="date"]');
    assert.ok(input, 'date input is rendered');
    assert.equal(
      input.getAttribute('name'),
      'BirthDate',
      'name matches field id'
    );
  });

  test('renders as required when field.options.required is true', async function (assert) {
    this.set(
      'field',
      makeField({
        options: { required: true, disabled: false, autocomplete: 'bday' },
      })
    );
    await render(hbs`{{input/input-date field=this.field}}`);

    assert.ok(find('input[type="date"][required]'), 'date input is required');
  });
});
