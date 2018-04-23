import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | list/category/event/index', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:list/category/event/index');
    assert.ok(route);
  });
});
