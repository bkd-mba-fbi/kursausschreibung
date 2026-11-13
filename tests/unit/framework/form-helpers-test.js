import { module, test } from 'qunit';
import {
  getPlaceholder,
  addPlaceholders,
} from 'kursausschreibung/framework/form-helpers';

module('Unit | Framework | form-helpers | placeholders', function () {
  test('getPlaceholder returns a value per data type', function (assert) {
    assert.strictEqual(getPlaceholder({ dataType: 'date' }), '01.01.2000');
    assert.strictEqual(getPlaceholder({ dataType: 'number' }), '0');
    assert.strictEqual(getPlaceholder({ dataType: 'checkbox' }), 'Ja');
    assert.strictEqual(getPlaceholder({ dataType: 'file' }), 'platzhalter.pdf');
    assert.strictEqual(getPlaceholder({ dataType: 'string' }), '-');
    assert.strictEqual(getPlaceholder({ dataType: 'textarea' }), '-');
  });

  test('getPlaceholder uses the first dropdown item', function (assert) {
    let field = {
      dataType: 'dropdown',
      options: { options: [{ Key: 'Ja' }, { Key: 'Nein' }] },
    };
    assert.strictEqual(getPlaceholder(field), 'Ja');
    assert.strictEqual(
      getPlaceholder({ dataType: 'freeform-dropdown', options: {} }),
      '-'
    );
  });

  test('addPlaceholders only fills hidden required details', function (assert) {
    let subscriptionData = {
      EventId: 15571,
      PersonId: 17450,
      SubscriptionDetails: [{ VssId: 10819, Value: 'Ja' }],
    };
    let fields = [
      { id: 10801, dataType: 'date', internetRequired: true }, // hidden, required
      { id: 10802, dataType: 'file', internetRequired: false }, // hidden, optional
      { id: 10819, dataType: 'checkbox', internetRequired: true }, // visible
    ];
    let hidden = [10801, 10802];

    let hiddenDetails = addPlaceholders(subscriptionData, fields, (field) =>
      hidden.includes(field.id)
    );

    assert.deepEqual(hiddenDetails, [10801]);
    assert.deepEqual(subscriptionData.SubscriptionDetails, [
      { VssId: 10819, Value: 'Ja' },
      { VssId: 10801, Value: '01.01.2000' },
    ]);
  });

  test('addPlaceholders replaces an old value of a hidden detail', function (assert) {
    let subscriptionData = {
      SubscriptionDetails: [{ VssId: 10801, Value: '15.06.2020' }],
    };
    let fields = [{ id: 10801, dataType: 'date', internetRequired: true }];

    addPlaceholders(subscriptionData, fields, () => true);

    assert.deepEqual(subscriptionData.SubscriptionDetails, [
      { VssId: 10801, Value: '01.01.2000' },
    ]);
  });

  test('addPlaceholders changes nothing when no field is hidden', function (assert) {
    let subscriptionData = {
      SubscriptionDetails: [{ VssId: 10801, Value: '15.06.2020' }],
    };
    let fields = [{ id: 10801, dataType: 'date', internetRequired: true }];

    let hiddenDetails = addPlaceholders(subscriptionData, fields, () => false);

    assert.deepEqual(hiddenDetails, []);
    assert.deepEqual(subscriptionData.SubscriptionDetails, [
      { VssId: 10801, Value: '15.06.2020' },
    ]);
  });
});
