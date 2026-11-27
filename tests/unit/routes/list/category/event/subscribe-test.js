import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import {
  getAccessToken,
  setAccessToken,
  getTokenExpire,
  setTokenExpire,
} from 'kursausschreibung/framework/storage';
import appConfig from 'kursausschreibung/framework/app-config';
import settings from 'kursausschreibung/framework/settings';
import { getLanguage } from 'kursausschreibung/framework/translate';
import { SUBSCRIPTION_DETAIL_INVOICE_ADRESS } from 'kursausschreibung/framework/api';

const EVENT_ID = 15571;

// fake a valid login, so autoCheckForLogin() does not reload the page
function fakeLogin() {
  let payload = btoa(
    JSON.stringify({
      instance_id: appConfig.instanceId,
      culture_info: getLanguage(),
    }),
  );
  setAccessToken(`header.${payload}.signature`);
  setTokenExpire(Date.now() + 60000);
}

// a subscription detail as the API delivers it
function makeDetail(vssId, vssInternet) {
  return {
    VssId: vssId,
    VssInternet: vssInternet,
    VssDesignation: 'Detail ' + vssId,
    VssType: 'ShortText',
    VssStyle: null,
    Sort: 1,
  };
}

// IdPerson 0 means a subscription without login (public scope)
function stubFetch(subscriptionDetails) {
  let original = window.fetch;

  window.fetch = (url) => {
    let body = '[]';

    if (url.endsWith('/UserSettings/')) {
      body = JSON.stringify({ IdPerson: 0 });
    } else if (url.endsWith('/SubscriptionDetails')) {
      body = JSON.stringify(subscriptionDetails);
    }

    return Promise.resolve(new Response(body, { status: 200 }));
  };

  return { restore: () => (window.fetch = original) };
}

const COMPANY_FIELDS = [
  { id: 'Company', dataType: 'string', options: { required: true } },
  { id: 'Zip', dataType: 'string', options: { required: true } },
];

function setFormFields(companyFields) {
  settings.formFields = {
    default: {
      addressFields: [
        { id: 'FirstName', dataType: 'string', options: { required: true } },
      ],
      companyFields,
    },
  };
}

// run model() + setupController() and report what the template gets
async function resolveCompanyAddress(
  owner,
  subscriptionDetails,
  companyFields,
) {
  setFormFields(companyFields);

  let route = owner.lookup('route:list/category/event/subscribe');
  let controller = owner.lookup('controller:list/category/event/subscribe');

  route.modelFor = () => ({
    Id: EVENT_ID,
    EventTypeId: 1,
    EventCategoryId: 1,
    externalSubscriptionURL: null,
    canDoSubscription: true,
  });

  let fetch = stubFetch(subscriptionDetails);
  let model;

  try {
    model = await route.model({}, { abort: () => {} });
  } finally {
    fetch.restore();
  }

  route.setupController(controller, model);

  return {
    enableInvoiceAddress: controller.enableInvoiceAddress,
    showCompanyButtonOnly: controller.showCompanyButtonOnly,
    companyFields: controller.companyFields,
  };
}

module('Unit | Route | list/category/event/subscribe', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let route = this.owner.lookup('route:list/category/event/subscribe');
    assert.ok(route);
  });

  // 33645: the invoice address button needs an editable AD 10895 on the event
  module('33645 company address visibility', function (hooks) {
    let saved;

    hooks.beforeEach(function () {
      saved = {
        formFields: settings.formFields,
        token: getAccessToken(),
        expire: getTokenExpire(),
      };
      fakeLogin();
    });

    hooks.afterEach(function () {
      settings.formFields = saved.formFields;
      setAccessToken(saved.token);
      setTokenExpire(saved.expire);
    });

    test('shows the button when AD 10895 is editierbar', async function (assert) {
      let result = await resolveCompanyAddress(
        this.owner,
        [makeDetail(SUBSCRIPTION_DETAIL_INVOICE_ADRESS, 'E')],
        COMPANY_FIELDS,
      );

      assert.true(result.enableInvoiceAddress, 'invoice address is enabled');
      assert.true(result.showCompanyButtonOnly, 'button is shown');
    });

    test('shows the button when AD 10895 is editierbar (Mussfeld)', async function (assert) {
      let result = await resolveCompanyAddress(
        this.owner,
        [makeDetail(SUBSCRIPTION_DETAIL_INVOICE_ADRESS, 'M')],
        COMPANY_FIELDS,
      );

      assert.true(result.enableInvoiceAddress, 'invoice address is enabled');
      assert.true(result.showCompanyButtonOnly, 'button is shown');
    });

    test('hides the button when AD 10895 is nicht sichtbar', async function (assert) {
      let result = await resolveCompanyAddress(
        this.owner,
        [makeDetail(SUBSCRIPTION_DETAIL_INVOICE_ADRESS, 'H')],
        COMPANY_FIELDS,
      );

      assert.false(result.enableInvoiceAddress, 'invoice address is disabled');
      assert.false(result.showCompanyButtonOnly, 'button is hidden');
    });

    test('hides the button when AD 10895 is not on the event', async function (assert) {
      let result = await resolveCompanyAddress(
        this.owner,
        [makeDetail(10801, 'E')],
        COMPANY_FIELDS,
      );

      assert.false(result.enableInvoiceAddress, 'invoice address is disabled');
      assert.false(result.showCompanyButtonOnly, 'button is hidden');
    });

    test('hides the button when the event has no subscription details', async function (assert) {
      let result = await resolveCompanyAddress(this.owner, [], COMPANY_FIELDS);

      assert.false(result.enableInvoiceAddress, 'invoice address is disabled');
      assert.false(result.showCompanyButtonOnly, 'button is hidden');
    });

    test('passes no company fields when settings.js defines none', async function (assert) {
      let result = await resolveCompanyAddress(
        this.owner,
        [makeDetail(SUBSCRIPTION_DETAIL_INVOICE_ADRESS, 'E')],
        undefined,
      );

      assert.deepEqual(result.companyFields, [], 'template gets no fields');
      assert.true(
        result.enableInvoiceAddress,
        'the AD alone still enables the invoice address',
      );
    });
  });
});
