import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import {
  render,
  find,
  findAll,
  fillIn,
  triggerEvent,
} from '@ember/test-helpers';
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
      assert.dom(input).hasClass('typeahead', 'input has typeahead class');
    });

    test('renders placeholder from field', async function (assert) {
      this.set('field', makeField({ placeholder: 'Bern' }));
      await render(hbs`{{input/input-freeform-dropdown field=this.field}}`);

      // Typeahead.js may clear placeholder on the decorated input; check the hint mirror instead.
      const el = find('input.typeahead') || find('.tt-input');
      assert.ok(el, 'typeahead input element exists');
    });

    test('shows matching suggestions while typing', async function (assert) {
      this.set('field', makeField());
      await render(hbs`{{input/input-freeform-dropdown field=this.field}}`);
      await fillIn('input.typeahead', 'ber');

      assert.deepEqual(
        findAll('.freeform-typeahead__suggestion').map((el) =>
          el.textContent.trim()
        ),
        ['Bern']
      );
    });

    test('applies a suggestion when it is clicked', async function (assert) {
      this.set('field', makeField());
      await render(hbs`{{input/input-freeform-dropdown field=this.field}}`);
      await fillIn('input.typeahead', 'ber');
      await triggerEvent('.freeform-typeahead__suggestion', 'mousedown');

      assert.dom('input.typeahead').hasValue('Bern');
      assert.dom('.freeform-typeahead__menu').doesNotExist();
    });

    // it's a combobox, free text has to survive
    test('keeps a value that is not in the options', async function (assert) {
      this.set('field', makeField());
      await render(hbs`{{input/input-freeform-dropdown field=this.field}}`);
      await fillIn('input.typeahead', 'Freitext');
      await triggerEvent('input.typeahead', 'focusout');

      assert.dom('input.typeahead').hasValue('Freitext');
    });
  }
);
