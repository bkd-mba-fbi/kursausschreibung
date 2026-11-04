import { module, test } from 'qunit';
import { filterEvents } from 'kursausschreibung/framework/store';
import settings from 'kursausschreibung/framework/settings';

function makeEvent(id, languageOfInstruction) {
  return {
    Id: id,
    LanguageOfInstruction: languageOfInstruction,
    DateTo: null,
  };
}

module('Unit | Framework | store', function (hooks) {
  hooks.beforeEach(function () {
    Object.assign(settings, {
      hostIds: null,
      initialListFilters: {},
      languageOfInstructionFilter: true,
      showStartedEvents: true,
      bilingualEventIds: [],
    });
  });

  test('filters events by German and English language codes', function (assert) {
    let events = [makeEvent(1, '1'), makeEvent(2, '2')];

    assert.deepEqual(
      filterEvents(events, 'de-CH', []).map((event) => event.Id),
      [1],
      'German language code 1 is shown for de-CH'
    );
    assert.deepEqual(
      filterEvents(events, 'en-US', []).map((event) => event.Id),
      [2],
      'English language code 2 is shown for en-US'
    );
  });

  test('always shows bilingual events', function (assert) {
    let event = makeEvent(1, 'Bilingue');

    assert.strictEqual(
      filterEvents([event], 'de-CH', []).length,
      1,
      'bilingual event is shown for de-CH'
    );
    assert.strictEqual(
      filterEvents([event], 'en-US', []).length,
      1,
      'bilingual event is shown for en-US'
    );
  });

  test('shows configured bilingual event IDs regardless of language', function (assert) {
    settings.bilingualEventIds = [42];

    assert.deepEqual(
      filterEvents([makeEvent(42, '1')], 'en-US', []).map((event) => event.Id),
      [42],
      'configured event is shown despite a language mismatch'
    );
  });
});
