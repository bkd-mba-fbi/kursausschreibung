import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import {
  getDataToSubmit,
  setDataToSubmit,
  getAccessToken,
  setAccessToken,
  getTokenExpire,
  setTokenExpire,
} from 'kursausschreibung/framework/storage';
import appConfig from 'kursausschreibung/framework/app-config';
import { getLanguage } from 'kursausschreibung/framework/translate';

// fake a valid login, so autoCheckForLogin() does not redirect
function fakeLogin() {
  let payload = btoa(
    JSON.stringify({
      instance_id: appConfig.instanceId,
      culture_info: getLanguage(),
    })
  );
  setAccessToken(`header.${payload}.signature`);
  setTokenExpire(Date.now() + 60000);
}

function dataToSubmit() {
  return {
    personId: 17450,
    subscriptionData: {
      EventId: 15571,
      PersonId: null,
      // 10801 is hidden and required, so it is not part of the request
      SubscriptionDetails: [{ VssId: 10819, Value: 'Ja' }],
    },
    additionalPeople: [],
    tableData: {},
    subscriptionFiles: [],
  };
}

// record every request and answer it with the given responder
function stubFetch(responder) {
  let requests = [];
  let original = window.fetch;
  window.fetch = (url, options) => {
    let request = {
      method: options.method,
      url,
      body: options.body ? JSON.parse(options.body) : null,
    };
    requests.push(request);
    let [status, body] = responder(request);
    return Promise.resolve(
      new Response(status === 204 ? null : body, { status })
    );
  };
  return { requests, restore: () => (window.fetch = original) };
}

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

  module('33707 hidden required details', function (hooks) {
    let saved;

    hooks.beforeEach(function () {
      saved = {
        data: getDataToSubmit(),
        token: getAccessToken(),
        expire: getTokenExpire(),
      };
      fakeLogin();
    });

    hooks.afterEach(function () {
      setDataToSubmit(saved.data);
      setAccessToken(saved.token);
      setTokenExpire(saved.expire);
    });

    function lookupRoute(owner) {
      let route = owner.lookup('route:list/category/event/confirmation');
      route.modelFor = () => ({
        update: () => Promise.resolve(),
        canDoSubscription: true,
        status: 'green',
      });
      return route;
    }

    test('subscribes with one request and without the hidden detail', async function (assert) {
      let route = lookupRoute(this.owner);
      setDataToSubmit(dataToSubmit());
      let fetch = stubFetch(() => [201, '325668']);

      try {
        await route.model();
      } finally {
        fetch.restore();
      }

      let [post] = fetch.requests;
      assert.strictEqual(fetch.requests.length, 1, 'only the POST');
      assert.strictEqual(post.method, 'POST');
      assert.ok(post.url.endsWith('/Subscriptions/'));
      assert.deepEqual(
        post.body.SubscriptionDetails,
        [{ VssId: 10819, Value: 'Ja' }],
        '10801 is not part of the request'
      );
    });

    test('shows an error and does not subscribe again when it fails', async function (assert) {
      assert.expect(3);
      let route = lookupRoute(this.owner);
      setDataToSubmit(dataToSubmit());
      let fetch = stubFetch((request) =>
        request.url.includes('/Subscriptions/')
          ? [409, JSON.stringify({ Issues: [{ Message: 'Fehler' }] })]
          : [201, '17450']
      );

      try {
        await route.model();
        assert.ok(false, 'model() must reject');
      } catch (error) {
        assert.strictEqual(error.message, 'Fehler', 'error is shown');
      } finally {
        fetch.restore();
      }

      let posts = fetch.requests.filter((r) => r.method === 'POST');
      assert.strictEqual(posts.length, 1, 'subscription sent only once');
      assert.strictEqual(getDataToSubmit(), null, 'data cleared, no resend');
    });
  });
});
