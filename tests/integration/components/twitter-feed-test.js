import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | twitter-feed', function (hooks) {
  setupRenderingTest(hooks);

  test('renders a timeline link for the provided username', async function (assert) {
    this.set('username', 'emberjs');

    await render(hbs`{{twitter-feed this.username}}`);

    let link = find('a.twitter-timeline');
    assert.ok(link, 'timeline anchor is rendered');
    assert.equal(
      link.getAttribute('href'),
      'https://twitter.com/emberjs',
      'uses the username in href'
    );
    assert.ok(
      link.textContent.includes('Tweets by emberjs'),
      'link text includes username'
    );
  });

  test('renders the twitter widget script', async function (assert) {
    this.set('username', 'emberjs');

    await render(hbs`{{twitter-feed this.username}}`);

    let script = find('script[src="https://platform.twitter.com/widgets.js"]');
    assert.ok(script, 'twitter widget script is present');
  });
});
