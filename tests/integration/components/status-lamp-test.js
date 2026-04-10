import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | status-lamp', function (hooks) {
  setupRenderingTest(hooks);

  test('applies classes and tooltip for known status', async function (assert) {
    this.set('status', 'green');

    await render(hbs`{{status-lamp status=this.status}}`);

    let lamp = find('span.status-lamp');
    assert.ok(lamp, 'status lamp element is rendered');
    assert.ok(
      lamp.classList.contains('lamp-green'),
      'green status adds lamp-green class'
    );
    assert.ok(
      lamp.getAttribute('data-uk-tooltip')?.length > 0,
      'tooltip attribute is set'
    );
    assert.equal(
      lamp.getAttribute('uk-icon'),
      'pencil',
      'green status sets expected icon'
    );
  });

  test('updates classes when status changes', async function (assert) {
    this.set('status', 'yellow');

    await render(hbs`{{status-lamp status=this.status}}`);

    this.set('status', 'red');

    let lamp = find('span.status-lamp');
    assert.ok(
      lamp.classList.contains('lamp-red'),
      'status change updates class to lamp-red'
    );
    assert.equal(
      lamp.getAttribute('uk-icon'),
      'close',
      'status change updates icon'
    );
  });
});
