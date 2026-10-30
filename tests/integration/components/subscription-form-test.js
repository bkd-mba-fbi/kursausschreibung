import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import {
  click,
  fillIn,
  find,
  findAll,
  render,
  select,
  triggerEvent,
} from '@ember/test-helpers';
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

function makeDependencyFields() {
  const categoryField = makeField('Category', 'Kategorie', 'dropdown');
  categoryField.options.options = [
    { Key: 'economy', Value: 'Économie' },
    { Key: 'services', Value: 'Services' },
  ];
  categoryField.options.dependencyItems = [
    {
      IdVss: 'DependentAnswer',
      Operator: 349,
      Values: ['economy'],
      required: false,
    },
  ];

  const dependentField = makeField('DependentAnswer', 'Réponse dépendante');
  dependentField.options.hidden = 'uk-hidden';
  dependentField.options.dependencyItems = [
    {
      IdVss: 'NestedAnswer',
      Operator: 349,
      Values: ['special'],
      required: false,
    },
  ];

  const nestedField = makeField('NestedAnswer', 'Réponse imbriquée');
  nestedField.options.hidden = 'uk-hidden';

  return [categoryField, dependentField, nestedField];
}

async function renderDependencyForm(context) {
  context.set('event', makeEvent());
  context.set('subscribe', () => {});
  context.set('fields', []);
  context.set('companyFields', []);
  context.set('subscriptionDetailFields', makeDependencyFields());
  context.set('additionalPeopleFields', []);
  context.set('userSettings', { IdPerson: null });

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
}

async function enterDependentValuesAndHide() {
  await select('select[name="Category"]', 'economy');
  await fillIn('input[name="DependentAnswer"]', 'special');
  await triggerEvent('input[name="DependentAnswer"]', 'focusout');
  await fillIn('input[name="NestedAnswer"]', 'Verschachtelter Wert');
  await select('select[name="Category"]', 'services');
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

  test('clears dependent and nested values when hidden, and keeps them empty when shown again', async function (assert) {
    await renderDependencyForm(this);

    await select('select[name="Category"]', 'economy');
    assert.dom('#hiddenDependentAnswer').doesNotHaveClass('uk-hidden');
    await fillIn('input[name="DependentAnswer"]', 'special');
    await triggerEvent('input[name="DependentAnswer"]', 'focusout');
    assert.dom('#hiddenNestedAnswer').doesNotHaveClass('uk-hidden');
    await fillIn('input[name="NestedAnswer"]', 'Verschachtelter Wert');
    await select('select[name="Category"]', 'services');

    assert.dom('#hiddenDependentAnswer').hasClass('uk-hidden');
    assert.strictEqual(
      find('input[name="DependentAnswer"]').value,
      '',
      'the dependent value is cleared when its field is hidden'
    );
    assert.dom('#hiddenNestedAnswer').hasClass('uk-hidden');
    assert.strictEqual(
      find('input[name="NestedAnswer"]').value,
      '',
      'clearing a dependent influencer also clears its nested dependent field'
    );

    await select('select[name="Category"]', 'economy');
    assert.dom('#hiddenDependentAnswer').doesNotHaveClass('uk-hidden');
    assert.strictEqual(
      find('input[name="DependentAnswer"]').value,
      '',
      'the dependent field remains empty when shown again'
    );
    assert.dom('#hiddenNestedAnswer').hasClass('uk-hidden');
  });

  test('omits hidden dependent values from the SubscriptionDetails payload', async function (assert) {
    await renderDependencyForm(this);
    await enterDependentValuesAndHide();

    await click('input[type="submit"]');

    const submittedData = window.kursausschreibung.dataToSubmit;
    assert.notOk(
      submittedData.subscriptionData.SubscriptionDetails.some(
        (detail) =>
          detail.VssId === 'DependentAnswer' || detail.VssId === 'NestedAnswer'
      ),
      'neither hidden dependent value is included in subscription details'
    );
  });

  test('omits hidden dependent values from the confirmation table', async function (assert) {
    await renderDependencyForm(this);
    await enterDependentValuesAndHide();

    await click('input[type="submit"]');

    const submittedData = window.kursausschreibung.dataToSubmit;
    assert.notOk(
      submittedData.tableData.subscriptionDetailFields.some(
        (detail) =>
          detail.label === 'Réponse dépendante' ||
          detail.label === 'Réponse imbriquée'
      ),
      'hidden dependent values are omitted from confirmation data'
    );
  });
});
