import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find, findAll } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

// Matches settings.js: eventListTitle = "Designation", eventListFields = [SubscriptionFrom, LanguageOfInstruction, BuildingAddress, Location, Price]
function makeEvent(overrides = {}) {
  return Object.assign({
    Id: 42,
    filter: '',
    status: 'green',
    subtitle: null,
    displayData: {
      Designation: 'Introduction to Testing',
      SubscriptionFrom: '01.03.2024',
      LanguageOfInstruction: 'German',
      BuildingAddress: 'Teststrasse 1',
      Location: 'Bern',
      Price: '120 CHF'
    }
  }, overrides);
}

module('Integration | Component | event-list-item', function(hooks) {
  setupRenderingTest(hooks);

  test('renders the event title in the heading', async function(assert) {
    this.set('event', makeEvent());

    await render(hbs`{{event-list-item event=this.event}}`);

    assert.ok(find('h3'), 'a heading element is rendered');
    assert.ok(
      this.element.textContent.includes('Introduction to Testing'),
      'event title from displayData.Designation appears in the heading'
    );
  });

  test('renders event fields from displayData as table rows', async function(assert) {
    this.set('event', makeEvent());

    await render(hbs`{{event-list-item event=this.event}}`);

    const rows = findAll('table.details-table tr');
    assert.ok(rows.length > 0, 'at least one detail row is rendered');
    assert.ok(
      this.element.textContent.includes('Bern'),
      'Location field value appears in the detail rows'
    );
    assert.ok(
      this.element.textContent.includes('120 CHF'),
      'Price field value appears in the detail rows'
    );
  });

  test('renders subtitle badge when subtitle is present', async function(assert) {
    this.set('event', makeEvent({ subtitle: 'Noch Plätze frei' }));

    await render(hbs`{{event-list-item event=this.event}}`);

    assert.ok(find('.uk-label-warning'), 'subtitle badge element exists');
    assert.ok(
      this.element.textContent.includes('Noch Plätze frei'),
      'subtitle text is rendered inside the badge'
    );
  });

  test('does not render subtitle badge when subtitle is null', async function(assert) {
    this.set('event', makeEvent({ subtitle: null }));

    await render(hbs`{{event-list-item event=this.event}}`);

    assert.notOk(find('.uk-label-warning'), 'no subtitle badge when subtitle is absent');
  });
});
