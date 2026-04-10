import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

function makeEvent(overrides = {}) {
  return Object.assign(
    {
      FreeSeats: 8,
      status: 'green',
      update() {},
    },
    overrides
  );
}

module('Integration | Component | remaining-seats-badge', function (hooks) {
  setupRenderingTest(hooks);

  test('renders visible warning badge for more than five seats', async function (assert) {
    this.set('event', makeEvent({ FreeSeats: 8 }));

    await render(hbs`{{remaining-seats-badge event=this.event}}`);

    let badge = find('.uk-label');
    assert.ok(badge, 'badge is rendered');
    assert.ok(
      badge.classList.contains('uk-label-warning'),
      'badge uses warning variant'
    );
    assert.ok(
      this.element.textContent.includes('8'),
      'badge shows the seat count'
    );
  });

  test('renders danger badge for five seats or fewer', async function (assert) {
    this.set('event', makeEvent({ FreeSeats: 2 }));

    await render(hbs`{{remaining-seats-badge event=this.event}}`);

    let badge = find('.uk-label');
    assert.ok(
      badge.classList.contains('uk-label-danger'),
      'badge uses danger variant'
    );
  });

  test('hides badge when FreeSeats is null', async function (assert) {
    this.set('event', makeEvent({ FreeSeats: null }));

    await render(hbs`{{remaining-seats-badge event=this.event}}`);

    assert.notOk(find('.uk-label'), 'no badge is shown for null FreeSeats');
  });
});
