import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

function makeField(overrides = {}) {
  return Object.assign(
    {
      id: 'FirstName',
      placeholder: '',
      options: { required: false, disabled: false, autocomplete: 'given-name' },
    },
    overrides
  );
}

module('Integration | Component | input/input-string', function (hooks) {
  setupRenderingTest(hooks);

  test('renders a text input with the field name', async function (assert) {
    this.set('field', makeField());
    await render(hbs`{{input/input-string field=this.field}}`);

    const input = find('input[type="text"]');
    assert.ok(input, 'text input is rendered');
    assert.equal(
      input.getAttribute('name'),
      'FirstName',
      'name matches field id'
    );
  });

  test('renders placeholder when field.placeholder is set', async function (assert) {
    this.set('field', makeField({ placeholder: 'Max' }));
    await render(hbs`{{input/input-string field=this.field}}`);

    assert
      .dom('input[type="text"]')
      .hasAttribute('placeholder', 'Max', 'placeholder is rendered');
  });

  test('renders as disabled when field.options.disabled is true', async function (assert) {
    this.set(
      'field',
      makeField({
        options: { required: false, disabled: true, autocomplete: 'off' },
      })
    );
    await render(hbs`{{input/input-string field=this.field}}`);

    assert.dom('input[type="text"]').isDisabled('input is disabled');
  });
});
