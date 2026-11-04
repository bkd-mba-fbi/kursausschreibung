import { module, test } from 'qunit';
import { get } from '@ember/object';
import ObjectProxy from '@ember/object/proxy';
import {
  addEventTextFields,
  filterEvents,
} from 'kursausschreibung/framework/store';
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

// the store copies the event after creating displayData,
// so the content of displayData is not the event itself
function makeTextEvent(texts) {
  let content = { Id: 1 };

  return { ...content, texts, displayData: ObjectProxy.create({ content }) };
}

// read a value the same way the templates do (through the proxy)
function display(event, key) {
  return get(event.displayData, key);
}

module('Unit | Framework | store | addEventTextFields', function () {
  test('addEventTextFields adds memo and label by the number of the text', function (assert) {
    // texts are filtered, so the index does not match the number
    let event = makeTextEvent([
      { id: 2, label: 'Inhalt', memo: 'Grundlagen' },
      { id: 5, label: 'Durchführung', memo: 'Jahreskurs' },
    ]);

    addEventTextFields(event);

    assert.strictEqual(display(event, 'EventText2'), 'Grundlagen');
    assert.strictEqual(display(event, 'EventText2Label'), 'Inhalt');
    assert.strictEqual(display(event, 'EventText5'), 'Jahreskurs');
    assert.strictEqual(display(event, 'EventText5Label'), 'Durchführung');
    assert.strictEqual(display(event, 'EventText0'), undefined);
    assert.strictEqual(display(event, 'EventText1'), undefined);
  });

  test('addEventTextFields adds nothing to an event without texts', function (assert) {
    let event = makeTextEvent([]);

    addEventTextFields(event);

    assert.deepEqual(Object.keys(event.displayData.content), ['Id']);
  });
});
