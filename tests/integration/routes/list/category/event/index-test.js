import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import { visit } from '@ember/test-helpers';
import Route from '@ember/routing/route';

function makeEvent(overrides = {}) {
  return Object.assign(
    {
      Id: 1,
      status: 'green',
      TypeOfSubscription: 4,
      canDoSubscription: true,
      FreeSeats: 3,
      subscriptionWithLoginURL: null,
      displayData: {
        Designation: 'Test Event',
      },
      lessons: [],
      texts: [],
    },
    overrides
  );
}

module('Integration | Route | list/category/event/index', function (hooks) {
  setupApplicationTest(hooks);

  hooks.beforeEach(function () {
    Object.defineProperty(window.screen, 'width', {
      configurable: true,
      value: 1200,
    });

    this.owner.register(
      'route:application',
      class extends Route {
        beforeModel() {}

        model() {
          return {};
        }
      }
    );
    this.owner.register(
      'route:list',
      class extends Route {
        model() {
          return {};
        }
      }
    );
    this.owner.register(
      'route:list.category',
      class extends Route {
        model() {
          return {};
        }
      }
    );
  });

  test('subscription type 2: shows only login subscription button when subscriptionWithLoginURL is set', async function (assert) {
    this.owner.register(
      'route:list.category.event',
      class extends Route {
        model() {
          return makeEvent({
            TypeOfSubscription: 2,
            canDoSubscription: false,
            externalSubscriptionURL: 'https://example.test/external',
            subscriptionWithLoginURL: 'https://example.test/login',
          });
        }
      }
    );

    await visit('/area/category/1');

    assert.dom('#subscriptionWithLoginURL').exists();
    assert.dom('#subscribeButton').doesNotExist();
  });

  test('subscription type 2: shows only a disabled subscription button when subscriptionWithLoginURL is not set', async function (assert) {
    this.owner.register(
      'route:list.category.event',
      class extends Route {
        model() {
          return makeEvent({
            TypeOfSubscription: 2,
            canDoSubscription: true,
          });
        }
      }
    );

    await visit('/area/category/1');

    assert.dom('#subscriptionWithLoginURL').doesNotExist();
    assert
      .dom('#subscribeButton')
      .exists('regular subscription button is shown')
      .isDisabled('regular subscription button is disabled');
  });

  test('subscription type 4: shows subscription and login subscription buttons when subscription is available', async function (assert) {
    this.owner.register(
      'route:list.category.event',
      class extends Route {
        model() {
          return makeEvent({
            subscriptionWithLoginURL: 'https://example.test/login',
          });
        }
      }
    );

    await visit('/area/category/1');

    assert
      .dom('#subscribeButton')
      .exists('regular subscription button is shown');
    assert
      .dom('#subscriptionWithLoginURL')
      .exists('login subscription button is shown');
  });

  test('subscription type 4: shows only subscription button when canDoSubscription is true', async function (assert) {
    this.owner.register(
      'route:list.category.event',
      class extends Route {
        model() {
          return makeEvent({
            canDoSubscription: true,
          });
        }
      }
    );

    await visit('/area/category/1');

    assert
      .dom('#subscribeButton')
      .exists('regular subscription button is shown');
    assert.dom('#subscriptionWithLoginURL').doesNotExist();
  });

  test('subscription type 4: shows disabled subscription button when canDoSubscription is false and externalSubscriptionURL is not set', async function (assert) {
    this.owner.register(
      'route:list.category.event',
      class extends Route {
        model() {
          return makeEvent({
            canDoSubscription: false,
            externalSubscriptionURL: null,
          });
        }
      }
    );

    await visit('/area/category/1');
    assert
      .dom('#subscribeButton')
      .exists('regular subscription button is shown')
      .isDisabled('regular subscription button is disabled');
    assert.dom('#subscriptionWithLoginURL').doesNotExist();
  });
});
