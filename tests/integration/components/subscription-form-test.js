import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find, findAll } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

function makeField(id, label = id, dataType = 'string') {
  return {
    id,
    label,
    dataType,
    options: {
      required: false,
      disabled: false,
      hidden: '',
    },
  };
}

function makeEvent(overrides = {}) {
  return Object.assign(
    {
      Id: 101,
      FreeSeats: 5,
    },
    overrides
  );
}

module('Integration | Component | subscription-form', function (hooks) {
  setupRenderingTest(hooks);

  test('renders form shell with submit control', async function (assert) {
    this.set('event', makeEvent());
    this.set('subscribe', () => {});
    this.set('fields', []);
    this.set('companyFields', []);
    this.set('subscriptionDetailFields', []);
    this.set('additionalPeopleFields', []);

    await render(hbs`
      {{subscription-form
        event=this.event
        subscribe=this.subscribe
        fields=this.fields
        companyFields=this.companyFields
        subscriptionDetailFields=this.subscriptionDetailFields
        additionalPeopleFields=this.additionalPeopleFields
      }}
    `);

    assert.dom('form#subscriptionForm').exists('subscription form is rendered');
    assert.dom('input[type="submit"]').exists('submit button is rendered');
  });

  test('renders address fields when showAddressInputs is true', async function (assert) {
    this.set('event', makeEvent());
    this.set('subscribe', () => {});
    this.set('fields', [makeField('FirstName', 'Vorname')]);
    this.set('companyFields', []);
    this.set('subscriptionDetailFields', []);
    this.set('additionalPeopleFields', []);

    await render(hbs`
      {{subscription-form
        event=this.event
        subscribe=this.subscribe
        showAddressInputs=true
        fields=this.fields
        companyFields=this.companyFields
        subscriptionDetailFields=this.subscriptionDetailFields
        additionalPeopleFields=this.additionalPeopleFields
      }}
    `);

    assert.dom('fieldset.address-fields').exists('address fieldset is shown');
    assert
      .dom('fieldset.address-fields .uk-form-label')
      .exists({ count: 1 }, 'address field is rendered');
  });

  test('shows login hint when user is logged in', async function (assert) {
    this.set('event', makeEvent());
    this.set('subscribe', () => {});
    this.set('fields', []);
    this.set('companyFields', []);
    this.set('subscriptionDetailFields', []);
    this.set('additionalPeopleFields', []);
    this.set('userSettings', { isLoggedIn: true });

    await render(hbs`
      {{subscription-form
        event=this.event
        subscribe=this.subscribe
        fields=this.fields
        companyFields=this.companyFields
        subscriptionDetailFields=this.subscriptionDetailFields
        additionalPeopleFields=this.additionalPeopleFields
        userSettings=this.userSettings
      }}
    `);

    assert
      .dom('.uk-text-warning')
      .exists('login hint is visible for logged-in users');
  });

  // 33645: the button needs showCompanyButtonOnly and companyFields together
  test('shows company address button when both company fields and the AD are there', async function (assert) {
    this.set('event', makeEvent());
    this.set('subscribe', () => {});
    this.set('fields', []);
    this.set('companyFields', [makeField('Company', 'Firma')]);
    this.set('subscriptionDetailFields', []);
    this.set('additionalPeopleFields', []);

    await render(hbs`
      {{subscription-form
        event=this.event
        subscribe=this.subscribe
        showCompanyButtonOnly=true
        enableInvoiceAddress=true
        fields=this.fields
        companyFields=this.companyFields
        subscriptionDetailFields=this.subscriptionDetailFields
        additionalPeopleFields=this.additionalPeopleFields
      }}
    `);

    assert
      .dom('button[name="useCompanyAddress"]')
      .exists('company address button is shown');
    assert
      .dom('fieldset.company-address-fields')
      .exists('company address fieldset is rendered');
  });

  test('hides company address button without company fields', async function (assert) {
    this.set('event', makeEvent());
    this.set('subscribe', () => {});
    this.set('fields', []);
    this.set('companyFields', []);
    this.set('subscriptionDetailFields', []);
    this.set('additionalPeopleFields', []);

    await render(hbs`
      {{subscription-form
        event=this.event
        subscribe=this.subscribe
        showCompanyButtonOnly=true
        enableInvoiceAddress=true
        fields=this.fields
        companyFields=this.companyFields
        subscriptionDetailFields=this.subscriptionDetailFields
        additionalPeopleFields=this.additionalPeopleFields
      }}
    `);

    assert
      .dom('button[name="useCompanyAddress"]')
      .doesNotExist('no button without company fields');
  });

  test('hides company address button when showCompanyButtonOnly is false', async function (assert) {
    this.set('event', makeEvent());
    this.set('subscribe', () => {});
    this.set('fields', []);
    this.set('companyFields', [makeField('Company', 'Firma')]);
    this.set('subscriptionDetailFields', []);
    this.set('additionalPeopleFields', []);

    await render(hbs`
      {{subscription-form
        event=this.event
        subscribe=this.subscribe
        showCompanyButtonOnly=false
        fields=this.fields
        companyFields=this.companyFields
        subscriptionDetailFields=this.subscriptionDetailFields
        additionalPeopleFields=this.additionalPeopleFields
      }}
    `);

    assert
      .dom('button[name="useCompanyAddress"]')
      .doesNotExist('no button without an editable AD 10895');
  });

  test('shows add person button when allowMultiplePeople is enabled', async function (assert) {
    this.set('event', makeEvent({ FreeSeats: 4 }));
    this.set('subscribe', () => {});
    this.set('fields', []);
    this.set('companyFields', []);
    this.set('subscriptionDetailFields', []);
    this.set('additionalPeopleFields', [makeField('FirstName', 'Vorname')]);

    await render(hbs`
      {{subscription-form
        event=this.event
        subscribe=this.subscribe
        allowMultiplePeople=true
        fields=this.fields
        companyFields=this.companyFields
        subscriptionDetailFields=this.subscriptionDetailFields
        additionalPeopleFields=this.additionalPeopleFields
      }}
    `);

    assert.ok(
      this.element.textContent.includes('Person'),
      'multiple-person area is rendered'
    );
    assert
      .dom('button.uk-button-default')
      .exists('add person button is present');
  });
});
