import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import {
  getDataToSubmit,
  setDataToSubmit,
} from 'kursausschreibung/framework/storage';

module('Unit | Route | list/category/event/confirmation', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let route = this.owner.lookup('route:list/category/event/confirmation');
    assert.ok(route);
  });

  test('redirects when registration data is missing', function (assert) {
    assert.expect(2);
    let route = this.owner.lookup('route:list/category/event/confirmation');
    let originalData = getDataToSubmit();
    let transitionTo = route.router.transitionTo;
    route.modelFor = () => ({});
    route.router.transitionTo = (routeName) => {
      assert.strictEqual(routeName, 'list.category.event');
    };

    setDataToSubmit(undefined);

    try {
      assert.strictEqual(route.model(), undefined);
    } finally {
      setDataToSubmit(originalData);
      route.router.transitionTo = transitionTo;
    }
  });
});
