import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find, findAll } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

function makeField(overrides = {}) {
  return Object.assign(
    {
      id: 'Salutation',
      options: {
        required: false,
        disabled: false,
        autocomplete: 'honorific-prefix',
        showAsRadioButtons: false,
        options: [
          { Key: 'M', Value: 'Herr' },
          { Key: 'F', Value: 'Frau' },
        ],
      },
    },
    overrides
  );
}

module('Integration | Component | input/input-dropdown', function (hooks) {
  setupRenderingTest(hooks);

  test('renders a select element with the field name', async function (assert) {
    this.set('field', makeField());
    await render(hbs`{{input/input-dropdown field=this.field}}`);

    const select = find('select');
    assert.ok(select, 'select element is rendered');
    assert.equal(
      select.getAttribute('name'),
      'Salutation',
      'name matches field id'
    );
  });

  test('renders radio buttons when showAsRadioButtons is true', async function (assert) {
    this.set(
      'field',
      makeField({
        options: {
          required: false,
          disabled: false,
          autocomplete: 'off',
          showAsRadioButtons: true,
          options: [
            { Key: 'M', Value: 'Herr' },
            { Key: 'F', Value: 'Frau' },
          ],
        },
      })
    );
    await render(hbs`{{input/input-dropdown field=this.field}}`);

    assert.dom('input[type="radio"]').exists({ count: 2 }, 'one radio per option');
    assert.dom('select').doesNotExist('no select element in radio mode');
  });
});
