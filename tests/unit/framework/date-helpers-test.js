import { module, test } from 'qunit';
import format from 'date-fns/format';
import { isStillBookable } from 'kursausschreibung/framework/date-helpers';

// date string (yyyy-MM-dd) relative to today, as delivered by the API
function daysFromToday(days) {
  let date = new Date();
  date.setDate(date.getDate() + days);
  return format(date, 'yyyy-MM-dd');
}

function makeEvent(dateFrom, subscriptionDateTo) {
  return { DateFrom: dateFrom, SubscriptionDateTo: subscriptionDateTo };
}

module('Unit | Framework | date-helpers | isStillBookable', function () {
  test('is bookable when DateFrom is null', function (assert) {
    assert.true(isStillBookable(makeEvent(null, daysFromToday(-10))));
  });

  test('is bookable when DateFrom is in the future', function (assert) {
    assert.true(
      isStillBookable(makeEvent(daysFromToday(10), daysFromToday(-10)))
    );
  });

  test('is bookable when DateFrom is past but late registration is open', function (assert) {
    assert.true(
      isStillBookable(makeEvent(daysFromToday(-10), daysFromToday(10)))
    );
  });

  test('is not bookable when DateFrom and SubscriptionDateTo are past', function (assert) {
    assert.false(
      isStillBookable(makeEvent(daysFromToday(-10), daysFromToday(-5)))
    );
  });
});
