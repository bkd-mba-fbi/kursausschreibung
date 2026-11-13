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
      SubscriptionDetails: [
        { VssId: 10819, Value: 'Ja' },
        { VssId: 10801, Value: '01.01.2000' },
      ],
    },
    additionalPeople: [],
    tableData: {},
    subscriptionFiles: [],
    hiddenDetails: [10801],
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

    test('subscribes with placeholder and clears it with the new id', async function (assert) {
      let route = lookupRoute(this.owner);
      setDataToSubmit(dataToSubmit());
      let fetch = stubFetch((request) =>
        request.method === 'POST' ? [201, '325668'] : [204, null]
      );

      try {
        await route.model();
      } finally {
        fetch.restore();
      }

      let [post, put] = fetch.requests;
      assert.strictEqual(fetch.requests.length, 2, 'one POST, one PUT');
      assert.strictEqual(post.method, 'POST');
      assert.ok(post.url.endsWith('/Subscriptions/'));
      assert.deepEqual(post.body.SubscriptionDetails, [
        { VssId: 10819, Value: 'Ja' },
        { VssId: 10801, Value: '01.01.2000' },
      ]);
      assert.strictEqual(put.method, 'PUT');
      assert.ok(put.url.endsWith('/SubscriptionDetails/325668_10801'));
      assert.deepEqual(put.body, {
        EventId: 15571,
        IdPerson: 17450,
        VssId: 10801,
        Value: '',
      });
    });

    test('sends no PUT when no detail is hidden', async function (assert) {
      let route = lookupRoute(this.owner);
      setDataToSubmit({ ...dataToSubmit(), hiddenDetails: [] });
      let fetch = stubFetch(() => [201, '325668']);

      try {
        await route.model();
      } finally {
        fetch.restore();
      }

      assert.strictEqual(fetch.requests.length, 1, 'only the POST');
    });

    test('shows an error and does not subscribe again when clearing fails', async function (assert) {
      assert.expect(3);
      let route = lookupRoute(this.owner);
      setDataToSubmit(dataToSubmit());
      let fetch = stubFetch((request) =>
        request.method === 'POST'
          ? [201, '325668']
          : [500, JSON.stringify({ Issues: [{ Message: 'Fehler' }] })]
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
