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

    assert.ok(find('form#subscriptionForm'), 'subscription form is rendered');
    assert.ok(find('input[type="submit"]'), 'submit button is rendered');
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

    assert.ok(find('fieldset.address-fields'), 'address fieldset is shown');
    assert.equal(
      findAll('fieldset.address-fields .uk-form-label').length,
      1,
      'address field is rendered'
    );
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

    assert.ok(
      find('.uk-text-warning'),
      'login hint is visible for logged-in users'
    );
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
    assert.ok(find('button.uk-button-default'), 'add person button is present');
  });
});
