import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find, findAll } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

function makeField(overrides = {}) {
  return Object.assign(
    {
      id: 'Attachment',
      acceptFileType: 'application/pdf',
      maxFileSize: 5242880,
      fileTypeLabel: 'Datei auswählen',
      fileLabelBevorFileChoose: 'Datei auswählen',
      options: { required: false, disabled: false },
    },
    overrides
  );
}

module('Integration | Component | input-file', function (hooks) {
  setupRenderingTest(hooks);

  // ── Initial render ──────────────────────────────────────────────────────────

  test('renders file input with correct name attribute', async function (assert) {
    this.set('field', makeField());
    await render(hbs`{{input/input-file field=this.field}}`);

    const input = find('input[type="file"]');
    assert.ok(input, 'file input is rendered');
    assert.strictEqual(
      input.getAttribute('name'),
      'Attachment',
      'name matches field id'
    );
  });

  test('file input accept attribute reflects acceptFileType', async function (assert) {
    this.set('field', makeField({ acceptFileType: 'image/jpeg' }));
    await render(hbs`{{input/input-file field=this.field}}`);

    assert
      .dom('input[type="file"]')
      .hasAttribute('accept', 'image/jpeg', 'accept mirrors acceptFileType');
  });

  test('renders a plain upload button when field is not required', async function (assert) {
    this.set(
      'field',
      makeField({ options: { required: false, disabled: false } })
    );
    await render(hbs`{{input/input-file field=this.field}}`);

    const btn = find('button.uk-button-default');
    assert.ok(btn, 'upload button is rendered');
    assert.dom(btn).hasNoClass('required', 'button has no required class');
  });

  test('renders a required upload button when field is required', async function (assert) {
    this.set(
      'field',
      makeField({ options: { required: true, disabled: false } })
    );
    await render(hbs`{{input/input-file field=this.field}}`);

    const btn = find('button.uk-button-default');
    assert.ok(btn, 'upload button is rendered');
    assert.dom(btn).hasClass('required', 'button has required class');
  });

  test('file input is disabled when field option is disabled', async function (assert) {
    this.set(
      'field',
      makeField({ options: { required: false, disabled: true } })
    );
    await render(hbs`{{input/input-file field=this.field}}`);

    assert.dom('input[type="file"]').isDisabled('input is disabled');
  });

  // ── Initial hidden state ─────────────────────────────────────────────────────

  test('cropper container is hidden on initial render', async function (assert) {
    this.set('field', makeField({ id: 'Photo', acceptFileType: 'image/jpeg' }));
    await render(hbs`{{input/input-file field=this.field}}`);

    assert
      .dom('#imgPhoto')
      .hasClass('uk-hidden', 'cropper container is hidden initially');
  });

  test('final image preview is hidden on initial render', async function (assert) {
    this.set('field', makeField({ id: 'Photo', acceptFileType: 'image/jpeg' }));
    await render(hbs`{{input/input-file field=this.field}}`);

    assert
      .dom('#imgDevPhoto')
      .hasClass('uk-hidden', 'final preview image is hidden initially');
  });

  test('delete button is hidden on initial render', async function (assert) {
    this.set('field', makeField({ id: 'Photo' }));
    await render(hbs`{{input/input-file field=this.field}}`);

    assert
      .dom('#fileBtDelPhoto')
      .hasClass('uk-hidden', 'delete button is hidden initially');
  });

  test('upload confirmation button is hidden on initial render', async function (assert) {
    this.set('field', makeField({ id: 'Photo', acceptFileType: 'image/jpeg' }));
    await render(hbs`{{input/input-file field=this.field}}`);

    assert
      .dom('#fileBtUploadPhoto')
      .hasClass('uk-hidden', 'upload confirmation button is hidden initially');
  });

  // ── Structure ────────────────────────────────────────────────────────────────

  test('renders exactly one file input', async function (assert) {
    this.set('field', makeField());
    await render(hbs`{{input/input-file field=this.field}}`);

    assert.strictEqual(
      findAll('input[type="file"]').length,
      1,
      'exactly one file input is present'
    );
  });

  test('file type label is shown in the button', async function (assert) {
    this.set('field', makeField({ fileTypeLabel: 'Profilfoto hochladen' }));
    await render(hbs`{{input/input-file field=this.field}}`);

    assert
      .dom('button.uk-button-default')
      .hasText('Profilfoto hochladen', 'fileTypeLabel text appears in button');
  });
});
