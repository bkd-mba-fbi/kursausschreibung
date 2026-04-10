import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

function makeField(overrides = {}) {
  return Object.assign(
    {
      id: 'Attachment',
      acceptFileType: 'application/pdf',
      maxFileSize: 5242880,
      fileTypeLabel: 'Datei auswählen',
      options: { required: false, disabled: false },
    },
    overrides
  );
}

module('Integration | Component | input-file', function (hooks) {
  setupRenderingTest(hooks);

  test('renders file input with correct name attribute', async function (assert) {
    this.set('field', makeField());

    await render(hbs`{{input/input-file field=this.field}}`);

    const input = find('input[type="file"]');
    assert.ok(input, 'file input is rendered');
    assert.equal(
      input.getAttribute('name'),
      'Attachment',
      'name matches field id'
    );
  });

  test('renders a plain upload button when field is not required', async function (assert) {
    this.set(
      'field',
      makeField({ options: { required: false, disabled: false } })
    );

    await render(hbs`{{input/input-file field=this.field}}`);

    const btn = find('button.uk-button-default');
    assert.ok(btn, 'upload button is rendered');
    assert.notOk(
      btn.classList.contains('required'),
      'button has no required class'
    );
  });

  test('renders a required upload button when field is required', async function (assert) {
    this.set(
      'field',
      makeField({ options: { required: true, disabled: false } })
    );

    await render(hbs`{{input/input-file field=this.field}}`);

    const btn = find('button.uk-button-default');
    assert.ok(btn, 'upload button is rendered');
    assert.ok(btn.classList.contains('required'), 'button has required class');
  });
});
