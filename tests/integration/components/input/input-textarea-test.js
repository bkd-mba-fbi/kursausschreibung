import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

function makeField(overrides = {}) {
  return Object.assign({
    id: 'Remarks',
    placeholder: '',
    options: { required: false, disabled: false, autocomplete: 'off' }
  }, overrides);
}

module('Integration | Component | input/input-textarea', function(hooks) {
  setupRenderingTest(hooks);

  test('renders a textarea with the field name', async function(assert) {
    this.set('field', makeField());
    await render(hbs`{{input/input-textarea field=this.field}}`);

    const ta = find('textarea');
    assert.ok(ta, 'textarea is rendered');
    assert.equal(ta.getAttribute('name'), 'Remarks', 'name matches field id');
  });

  test('renders as disabled when field.options.disabled is true', async function(assert) {
    this.set('field', makeField({ options: { required: false, disabled: true, autocomplete: 'off' } }));
    await render(hbs`{{input/input-textarea field=this.field}}`);

    assert.ok(find('textarea:disabled'), 'textarea is disabled');
  });
});
