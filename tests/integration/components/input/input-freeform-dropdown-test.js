import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import {
  render,
  find,
  findAll,
  fillIn,
  focus,
  triggerKeyEvent,
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
          { Key: 'BI', Value: 'Biel' },
        ],
      },
    },
    overrides
  );
}

function suggestionTexts() {
  return findAll('.freeform-combobox__option').map((option) =>
    option.textContent.trim()
  );
}

module(
  'Integration | Component | input/input-freeform-dropdown',
  function (hooks) {
    setupRenderingTest(hooks);

    test('renders a typeahead text input with the field name', async function (assert) {
      this.set('field', makeField());
      await render(hbs`<Input::InputFreeformDropdown @field={{this.field}} />`);

      const input = find('input.typeahead');
      assert.ok(input, 'typeahead text input is rendered');
      assert.dom(input).hasAttribute('name', 'City');
    });

    test('renders placeholder from field', async function (assert) {
      this.set('field', makeField({ placeholder: 'Bern' }));
      await render(hbs`<Input::InputFreeformDropdown @field={{this.field}} />`);

      assert.dom('input.typeahead').hasAttribute('placeholder', 'Bern');
    });

    test('shows no suggestion list before interaction', async function (assert) {
      this.set('field', makeField());
      await render(hbs`<Input::InputFreeformDropdown @field={{this.field}} />`);

      assert.dom('.freeform-combobox__list').doesNotExist();
    });

    // minLength was 0 before the ember upgrade (see issue #222)
    test('shows all options on focus with an empty input', async function (assert) {
      this.set('field', makeField());
      await render(hbs`<Input::InputFreeformDropdown @field={{this.field}} />`);
      await focus('input.typeahead');

      assert.deepEqual(suggestionTexts(), ['Bern', 'Zuerich', 'Biel']);
    });

    test('filters suggestions while typing', async function (assert) {
      this.set('field', makeField());
      await render(hbs`<Input::InputFreeformDropdown @field={{this.field}} />`);
      await fillIn('input.typeahead', 'bi');

      assert.deepEqual(suggestionTexts(), ['Biel']);
    });

    test('filters case insensitively and matches anywhere in the value', async function (assert) {
      this.set('field', makeField());
      await render(hbs`<Input::InputFreeformDropdown @field={{this.field}} />`);
      await fillIn('input.typeahead', 'ERN');

      assert.deepEqual(suggestionTexts(), ['Bern']);
    });

    test('hides the list when nothing matches', async function (assert) {
      this.set('field', makeField());
      await render(hbs`<Input::InputFreeformDropdown @field={{this.field}} />`);
      await fillIn('input.typeahead', 'xyz');

      assert.dom('.freeform-combobox__list').doesNotExist();
    });

    test('limits the list to 10 suggestions', async function (assert) {
      const options = Array.from({ length: 25 }, (unused, index) => ({
        Key: `K${index}`,
        Value: `Option ${index}`,
      }));

      this.set(
        'field',
        makeField({
          options: {
            required: false,
            disabled: false,
            autocomplete: 'address-level2',
            options,
          },
        })
      );
      await render(hbs`<Input::InputFreeformDropdown @field={{this.field}} />`);
      await focus('input.typeahead');

      assert.strictEqual(findAll('.freeform-combobox__option').length, 10);
    });

    test('applies a suggestion when it is clicked', async function (assert) {
      this.set('field', makeField());
      await render(hbs`<Input::InputFreeformDropdown @field={{this.field}} />`);
      await fillIn('input.typeahead', 'b');
      await triggerEvent(
        '.freeform-combobox__option[data-suggestion-index="1"]',
        'mousedown'
      );

      assert.dom('input.typeahead').hasValue('Biel');
      assert.dom('.freeform-combobox__list').doesNotExist();
    });

    test('applies a suggestion via arrow keys and enter', async function (assert) {
      this.set('field', makeField());
      await render(hbs`<Input::InputFreeformDropdown @field={{this.field}} />`);
      await fillIn('input.typeahead', 'b');
      await triggerKeyEvent('input.typeahead', 'keydown', 'ArrowDown');
      await triggerKeyEvent('input.typeahead', 'keydown', 'Enter');

      assert.dom('input.typeahead').hasValue('Bern');
      assert.dom('.freeform-combobox__list').doesNotExist();
    });

    test('closes the list on escape without changing the value', async function (assert) {
      this.set('field', makeField());
      await render(hbs`<Input::InputFreeformDropdown @field={{this.field}} />`);
      await fillIn('input.typeahead', 'b');
      await triggerKeyEvent('input.typeahead', 'keydown', 'Escape');

      assert.dom('.freeform-combobox__list').doesNotExist();
      assert.dom('input.typeahead').hasValue('b');
    });

    // free text must survive, this is a combobox and not a plain dropdown
    test('keeps a value that is not part of the options', async function (assert) {
      this.set('field', makeField());
      await render(hbs`<Input::InputFreeformDropdown @field={{this.field}} />`);
      await fillIn('input.typeahead', 'Freitext');
      await triggerEvent('input.typeahead', 'focusout');

      assert.dom('input.typeahead').hasValue('Freitext');
    });
  }
);
