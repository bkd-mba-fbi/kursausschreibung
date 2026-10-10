import { module, test } from 'qunit';
import { get } from '@ember/object';
import ObjectProxy from '@ember/object/proxy';
import { addEventTextFields } from 'kursausschreibung/framework/store';

// the store copies the event after creating displayData,
// so the content of displayData is not the event itself
function makeEvent(texts) {
  let content = { Id: 1 };

  return { ...content, texts, displayData: ObjectProxy.create({ content }) };
}

// read a value the same way the templates do (through the proxy)
function display(event, key) {
  return get(event.displayData, key);
}

module('Unit | Framework | store', function () {
  test('addEventTextFields adds memo and label by the number of the text', function (assert) {
    // texts are filtered, so the index does not match the number
    let event = makeEvent([
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
    let event = makeEvent([]);

    addEventTextFields(event);

    assert.deepEqual(Object.keys(event.displayData.content), ['Id']);
  });
});
