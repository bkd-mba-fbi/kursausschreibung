import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

function makeEvent(overrides = {}) {
  return Object.assign(
    {
      Id: 1,
      status: 'green',
      filter: '',
      subtitle: null,
      codes: null,
      texts: [{ memo: '' }],
      displayData: {
        Designation: 'Test Event',
        SubscriptionFrom: '01.01.2025',
        LanguageOfInstruction: 'Deutsch',
        BuildingAddress: 'Teststrasse 1',
        Location: 'Bern',
        Price: '100 CHF',
      },
    },
    overrides
  );
}

module('Integration | Component | event-list', function (hooks) {
  setupRenderingTest(hooks);

  test('renders search and sort controls', async function (assert) {
    this.set('events', []);
    this.set('page', 1);
    this.set('route', 'list.index');
    this.set('queryChanged', () => {});

    await render(hbs`
      {{event-list
        events=this.events
        page=this.page
        route=this.route
        queryChanged=this.queryChanged
      }}
    `);

    assert.dom('#searchEvents').exists('search input is rendered');
    assert.dom('#sortList').exists('sort dropdown is rendered');
  });

  test('renders titles for each event on the first page', async function (assert) {
    this.set('events', [
      makeEvent({
        Id: 11,
        displayData: {
          Designation: 'Kurs Alpha',
          SubscriptionFrom: '01.01.2025',
          LanguageOfInstruction: 'Deutsch',
          BuildingAddress: 'A',
          Location: 'Bern',
          Price: '100 CHF',
        },
      }),
      makeEvent({
        Id: 12,
        displayData: {
          Designation: 'Kurs Beta',
          SubscriptionFrom: '02.01.2025',
          LanguageOfInstruction: 'Deutsch',
          BuildingAddress: 'B',
          Location: 'Bern',
          Price: '120 CHF',
        },
      }),
    ]);
    this.set('page', 1);
    this.set('route', 'list.index');
    this.set('queryChanged', () => {});

    await render(hbs`
      {{event-list
        events=this.events
        page=this.page
        route=this.route
        queryChanged=this.queryChanged
      }}
    `);

    assert.ok(
      this.element.textContent.includes('Kurs Alpha'),
      'first event title is rendered'
    );
    assert.ok(
      this.element.textContent.includes('Kurs Beta'),
      'second event title is rendered'
    );
  });
});
