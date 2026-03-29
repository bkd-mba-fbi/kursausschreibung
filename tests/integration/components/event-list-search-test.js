import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, fillIn, triggerKeyEvent, findAll } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

function makeEvent(overrides = {}) {
  return Object.assign({
    title: 'Schulung Grundlagen',
    texts: [{ memo: 'Einführungskurs' }]
  }, overrides);
}

module('Integration | Component | event-list-search', function(hooks) {
  setupRenderingTest(hooks);

  test('yields all events when query is empty', async function(assert) {
    this.set('events', [
      makeEvent({ title: 'Schulung Grundlagen' }),
      makeEvent({ title: 'Führung Intensiv' })
    ]);
    this.set('onQueryChanged', () => {});

    await render(hbs`
      {{#event-list-search events=this.events queryChanged=this.onQueryChanged as |filteredEvents|}}
        {{#each filteredEvents as |event|}}
          <div class="result-item">{{event.title}}</div>
        {{/each}}
      {{/event-list-search}}
    `);

    assert.equal(findAll('.result-item').length, 2, 'all events are yielded initially');
  });

  test('filters yielded events when typing a search query', async function(assert) {
    this.set('events', [
      makeEvent({ title: 'Schulung Grundlagen' }),
      makeEvent({ title: 'Führung Intensiv' })
    ]);
    this.set('onQueryChanged', () => {});

    await render(hbs`
      {{#event-list-search events=this.events queryChanged=this.onQueryChanged as |filteredEvents|}}
        {{#each filteredEvents as |event|}}
          <div class="result-item">{{event.title}}</div>
        {{/each}}
      {{/event-list-search}}
    `);

    await fillIn('#searchEvents', 'führung');
    await triggerKeyEvent('#searchEvents', 'keyup', 70);

    assert.equal(findAll('.result-item').length, 1, 'only one matching event remains');
    assert.ok(this.element.textContent.includes('Führung Intensiv'), 'matching event is rendered');
  });

  test('shows empty-state message when nothing matches', async function(assert) {
    this.set('events', [makeEvent({ title: 'Schulung Grundlagen' })]);
    this.set('onQueryChanged', () => {});

    await render(hbs`
      {{#event-list-search events=this.events queryChanged=this.onQueryChanged as |filteredEvents|}}
        {{#each filteredEvents as |event|}}
          <div class="result-item">{{event.title}}</div>
        {{/each}}
      {{/event-list-search}}
    `);

    await fillIn('#searchEvents', 'xyz-not-found');
    await triggerKeyEvent('#searchEvents', 'keyup', 88);

    assert.equal(findAll('.result-item').length, 0, 'no result items are yielded');
    assert.ok(this.element.textContent.includes('Keine'), 'empty-state text is rendered');
  });
});
