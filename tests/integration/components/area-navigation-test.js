import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find, findAll } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

function makeArea(overrides = {}) {
  return Object.assign({
    categoryKeys: ['cat-1', 'cat-2'],
    categories: {
      'cat-1': { name: 'Informatik' },
      'cat-2': { name: 'Führung' }
    }
  }, overrides);
}

module('Integration | Component | area-navigation', function(hooks) {
  setupRenderingTest(hooks);

  test('renders the category heading', async function(assert) {
    this.set('area', makeArea());

    await render(hbs`{{area-navigation this.area}}`);

    assert.ok(find('h3#header-naviagtion-area'), 'heading element is rendered');
    assert.ok(
      this.element.textContent.includes('Kategorie'),
      'heading shows translated "kursCategoryHeader" text'
    );
  });

  test('renders the overview link', async function(assert) {
    this.set('area', makeArea());

    await render(hbs`{{area-navigation this.area}}`);

    const links = findAll('ul.uk-nav a');
    assert.ok(links.length > 0, 'nav contains at least one link');
    assert.ok(
      links[0].textContent.includes('Übersicht'),
      'first link is the translated overview link'
    );
  });

  test('renders one link per category', async function(assert) {
    this.set('area', makeArea());

    await render(hbs`{{area-navigation this.area}}`);

    const links = findAll('ul.uk-nav a');
    // first link is "overview", then one per category
    assert.equal(links.length, 3, 'renders overview + 2 category links');
    assert.ok(links[1].textContent.includes('Informatik'), 'first category name appears');
    assert.ok(links[2].textContent.includes('Führung'), 'second category name appears');
  });

  test('hides heading when hideHeading is true', async function(assert) {
    this.set('area', makeArea());

    await render(hbs`{{area-navigation this.area hideHeading=true}}`);

    assert.notOk(find('h3'), 'heading is not rendered when hideHeading is true');
    assert.ok(find('ul.uk-nav'), 'nav list is still rendered');
  });

  test('renders only overview link when area has no categories', async function(assert) {
    this.set('area', makeArea({ categoryKeys: [], categories: {} }));

    await render(hbs`{{area-navigation this.area}}`);

    const links = findAll('ul.uk-nav a');
    assert.equal(links.length, 1, 'only the overview link renders when there are no categories');
  });
});
