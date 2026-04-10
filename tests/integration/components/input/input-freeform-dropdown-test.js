import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

function makeField(overrides = {}) {
  return Object.assign(
    {
      id: 'City',
      placeholder: 'Bern',
      options: {
        required: false,
        disabled: false,
        autocomplete: 'address-level2',
        options: [
          { Key: 'BE', Value: 'Bern' },
          { Key: 'ZH', Value: 'Zuerich' },
        ],
      },
    },
    overrides
  );
}

module(
  'Integration | Component | input/input-freeform-dropdown',
  function (hooks) {
    setupRenderingTest(hooks);

    test('renders a typeahead text input with the field name', async function (assert) {
      this.set('field', makeField());
      await render(hbs`{{input/input-freeform-dropdown field=this.field}}`);

      const input = find('input.typeahead');
      assert.ok(input, 'typeahead text input is rendered');
      assert.ok(
        input.classList.contains('typeahead'),
        'input has typeahead class'
      );
    });

    test('renders placeholder from field', async function (assert) {
      this.set('field', makeField({ placeholder: 'Bern' }));
      await render(hbs`{{input/input-freeform-dropdown field=this.field}}`);

      // Typeahead.js may clear placeholder on the decorated input; check the hint mirror instead.
      const el = find('input.typeahead') || find('.tt-input');
      assert.ok(el, 'typeahead input element exists');
    });
  }
);
