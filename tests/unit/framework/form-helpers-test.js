import { module, test } from 'qunit';
import { removeEmptyHiddenDetails } from 'kursausschreibung/framework/form-helpers';

module('Unit | Framework | form-helpers | hidden details', function () {
  test('an empty hidden required detail is not sent', function (assert) {
    let subscriptionData = {
      EventId: 15571,
      PersonId: 17450,
      SubscriptionDetails: [
        { VssId: 10819, Value: 'Ja' },
        { VssId: 10801, Value: '' },
      ],
    };
    let fields = [
      { id: 10801, dataType: 'date', internetRequired: true }, // hidden, required
      { id: 10802, dataType: 'file', internetRequired: false }, // hidden, optional
      { id: 10819, dataType: 'checkbox', internetRequired: true }, // visible
    ];
    let hidden = [10801, 10802];

    let removedDetails = removeEmptyHiddenDetails(
      subscriptionData,
      fields,
      (field) => hidden.includes(field.id)
    );

    assert.deepEqual(removedDetails, [10801]);
    assert.deepEqual(subscriptionData.SubscriptionDetails, [
      { VssId: 10819, Value: 'Ja' },
    ]);
  });

  test('a hidden required detail that was never filled in is not added', function (assert) {
    let subscriptionData = {
      SubscriptionDetails: [{ VssId: 10819, Value: 'Ja' }],
    };
    let fields = [
      { id: 10801, dataType: 'date', internetRequired: true },
      { id: 10819, dataType: 'checkbox', internetRequired: true },
    ];

    let removedDetails = removeEmptyHiddenDetails(
      subscriptionData,
      fields,
      (field) => field.id === 10801
    );

    assert.deepEqual(removedDetails, [10801]);
    assert.deepEqual(subscriptionData.SubscriptionDetails, [
      { VssId: 10819, Value: 'Ja' },
    ]);
  });

  test('blank values count as empty', function (assert) {
    let subscriptionData = {
      SubscriptionDetails: [{ VssId: 10801, Value: '   ' }],
    };
    let fields = [{ id: 10801, dataType: 'string', internetRequired: true }];

    removeEmptyHiddenDetails(subscriptionData, fields, () => true);

    assert.deepEqual(subscriptionData.SubscriptionDetails, []);
  });

  test('a hidden detail with a value keeps it', function (assert) {
    let subscriptionData = {
      SubscriptionDetails: [{ VssId: 10801, Value: '15.06.2020' }],
    };
    let fields = [{ id: 10801, dataType: 'date', internetRequired: true }];

    let removedDetails = removeEmptyHiddenDetails(
      subscriptionData,
      fields,
      () => true
    );

    assert.deepEqual(removedDetails, []);
    assert.deepEqual(subscriptionData.SubscriptionDetails, [
      { VssId: 10801, Value: '15.06.2020' },
    ]);
  });

  test('changes nothing when no field is hidden', function (assert) {
    let subscriptionData = {
      SubscriptionDetails: [{ VssId: 10801, Value: '' }],
    };
    let fields = [{ id: 10801, dataType: 'date', internetRequired: true }];

    let removedDetails = removeEmptyHiddenDetails(
      subscriptionData,
      fields,
      () => false
    );

    assert.deepEqual(removedDetails, []);
    assert.deepEqual(subscriptionData.SubscriptionDetails, [
      { VssId: 10801, Value: '' },
    ]);
  });
});
