import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | input-base', function (hooks) {
  setupRenderingTest(hooks);

  test('renders a label and matching input component for regular fields', async function (assert) {
    this.set('field', {
      id: 'Email',
      label: 'E-Mail',
      dataType: 'string',
      options: { required: true, disabled: false },
    });

    await render(hbs`{{input-base field=this.field}}`);

    assert
      .dom('label[for="Email"]')
      .exists('label is rendered with matching for attribute');
    assert
      .dom('input[name="Email"]')
      .exists('string input subcomponent is rendered');
  });

  test('renders a legend for legend fields', async function (assert) {
    this.set('field', {
      id: 'LegendOnly',
      label: 'Persönliche Angaben',
      isLegend: true,
      options: {},
    });

    await render(hbs`{{input-base field=this.field}}`);

    assert.dom('legend.uk-legend').exists('legend is rendered');
    assert.dom('input').doesNotExist('no input is rendered for legend entries');
  });
});
