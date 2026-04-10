import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find, findAll } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

function makeEvent(overrides = {}) {
  return Object.assign(
    {
      title: 'Schulung Grundlagen',
      texts: [{ memo: 'Einführungskurs' }],
    },
    overrides
  );
}

module('Integration | Component | event-list-search', function (hooks) {
  setupRenderingTest(hooks);

  test('yields all events when query is empty', async function (assert) {
    this.set('events', [
      makeEvent({ title: 'Schulung Grundlagen' }),
      makeEvent({ title: 'Führung Intensiv' }),
    ]);
    this.set('onQueryChanged', () => {});

    await render(hbs`
      {{#event-list-search events=this.events queryChanged=this.onQueryChanged as |filteredEvents|}}
        {{#each filteredEvents as |event|}}
          <div class="result-item">{{event.title}}</div>
        {{/each}}
      {{/event-list-search}}
    `);

    assert.equal(
      findAll('.result-item').length,
      2,
      'all events are yielded initially'
    );
  });

  test('renders search input and sort dropdown', async function (assert) {
    this.set('events', [
      makeEvent({ title: 'Schulung Grundlagen' }),
      makeEvent({ title: 'Führung Intensiv' }),
    ]);
    this.set('onQueryChanged', () => {});

    await render(hbs`
      {{#event-list-search events=this.events queryChanged=this.onQueryChanged as |filteredEvents|}}
        {{#each filteredEvents as |event|}}
          <div class="result-item">{{event.title}}</div>
        {{/each}}
      {{/event-list-search}}
    `);

    assert.ok(find('#searchEvents'), 'search input is rendered');
    assert.ok(find('#sortList'), 'sort dropdown is rendered');
  });

  test('shows empty-state message when no events are provided', async function (assert) {
    this.set('events', []);
    this.set('onQueryChanged', () => {});

    await render(hbs`
      {{#event-list-search events=this.events queryChanged=this.onQueryChanged as |filteredEvents|}}
        {{#each filteredEvents as |event|}}
          <div class="result-item">{{event.title}}</div>
        {{/each}}
      {{/event-list-search}}
    `);

    assert.equal(
      findAll('.result-item').length,
      0,
      'no result items are yielded'
    );
    assert.ok(
      this.element.textContent.toLowerCase().includes('keine kurse'),
      'empty-state text is rendered'
    );
  });
});
