import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, findAll } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

function makeEvent(overrides = {}) {
  return Object.assign(
    {
      displayData: {
        Designation: 'Schulung Test',
        DateFrom: '01.04.2024',
        DateTo: '02.04.2024',
        Leadership: 'Max Muster',
        BuildingAddress: 'Musterweg 1',
        Price: '120 CHF',
      },
      texts: [{ label: 'Hinweis', memo: 'Bitte pünktlich erscheinen' }],
      lessonsCollaps: false,
    },
    overrides
  );
}

module('Integration | Component | event-details-table', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function () {
    window.kursausschreibung = window.kursausschreibung || {};
    window.kursausschreibung.settings = window.kursausschreibung.settings || {};
    Object.assign(window.kursausschreibung.settings, {
      eventDetailsFields: [
        'DateFrom',
        'DateTo',
        'Leadership',
        'BuildingAddress',
        'Price',
      ],
      eventDetailsTitle: 'Designation',
      showEventText: true,
    });
  });

  test('renders detail rows from configured event fields', async function (assert) {
    this.set('event', makeEvent());

    await render(hbs`{{event-details-table event=this.event}}`);

    let rows = findAll('table.details-table tr');
    assert.ok(rows.length > 0, 'renders at least one detail row');
    assert.ok(
      this.element.textContent.includes('Max Muster'),
      'leadership value is rendered'
    );
    assert.ok(
      this.element.textContent.includes('120 CHF'),
      'price value is rendered'
    );
  });

  test('renders event text rows when event texts are present', async function (assert) {
    this.set(
      'event',
      makeEvent({
        texts: [{ label: 'Wichtig', memo: 'Unterlagen mitbringen' }],
      })
    );

    await render(hbs`{{event-details-table event=this.event}}`);

    assert.ok(
      this.element.textContent.includes('Wichtig'),
      'text label is rendered'
    );
    assert.ok(
      this.element.textContent.includes('Unterlagen mitbringen'),
      'text memo is rendered'
    );
  });
});
