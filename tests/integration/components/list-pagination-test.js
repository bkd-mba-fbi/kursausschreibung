import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, findAll, find } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

function makeItems(count) {
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    title: `Event ${i + 1}`,
    codes: null,
    allfilterCodes: [],
  }));
}

module('Integration | Component | list-pagination', function (hooks) {
  setupRenderingTest(hooks);

  test('yields first page items according to settings.itemsPerPage', async function (assert) {
    this.set('items', makeItems(12));
    this.set('page', 1);
    this.set('route', 'index');

    await render(hbs`
      {{#list-pagination items=this.items page=this.page route=this.route as |eventsOnCurrentPage|}}
        {{#each eventsOnCurrentPage as |event|}}
          <li class="page-item">{{event.title}}</li>
        {{/each}}
      {{/list-pagination}}
    `);

    assert
      .dom('.page-item')
      .exists({ count: 10 }, 'first page yields 10 items');
    assert.dom('.uk-pagination').exists('pagination controls are rendered');
  });

  test('yields second page remainder items', async function (assert) {
    this.set('items', makeItems(12));
    this.set('page', 2);
    this.set('route', 'index');

    await render(hbs`
      {{#list-pagination items=this.items page=this.page route=this.route as |eventsOnCurrentPage|}}
        {{#each eventsOnCurrentPage as |event|}}
          <li class="page-item">{{event.title}}</li>
        {{/each}}
      {{/list-pagination}}
    `);

    assert
      .dom('.page-item')
      .exists({ count: 2 }, 'second page yields remaining 2 items');
  });
});
