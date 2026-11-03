import { module, test } from 'qunit';
import format from 'date-fns/format';
import {
  isStillBookable,
  eventEnded,
} from 'kursausschreibung/framework/date-helpers';

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

  test('is bookable when DateFrom is today and SubscriptionDateTo is null', function (assert) {
    assert.true(isStillBookable(makeEvent(daysFromToday(0), null)));
  });

  test('is bookable when DateFrom and SubscriptionDateTo are today', function (assert) {
    assert.true(isStillBookable(makeEvent(daysFromToday(0), daysFromToday(0))));
  });

  test('is bookable when DateFrom is today and SubscriptionDateTo is in the future', function (assert) {
    assert.true(
      isStillBookable(makeEvent(daysFromToday(0), daysFromToday(10)))
    );
  });

  test('is not bookable when DateFrom and SubscriptionDateTo are yesterday', function (assert) {
    assert.false(
      isStillBookable(makeEvent(daysFromToday(-1), daysFromToday(-1)))
    );
  });
});

module('Unit | Framework | date-helpers | eventEnded', function () {
  // DateTo is delivered with time 00:00:00, TimeTo separately
  function makeEndingEvent(dateTo, timeTo) {
    return {
      DateTo: dateTo === null ? null : `${dateTo}T00:00:00`,
      TimeTo: timeTo,
    };
  }

  test('has not ended when it ends today and TimeTo has passed', function (assert) {
    assert.false(eventEnded(makeEndingEvent(daysFromToday(0), '00:00')));
  });

  test('has ended when DateTo was yesterday', function (assert) {
    assert.true(eventEnded(makeEndingEvent(daysFromToday(-1), '23:59')));
  });

  test('has not ended when DateTo is null', function (assert) {
    assert.false(eventEnded(makeEndingEvent(null, null)));
  });

  test('has not ended when DateTo is in the future', function (assert) {
    assert.false(eventEnded(makeEndingEvent(daysFromToday(10), '12:00')));
  });
});
