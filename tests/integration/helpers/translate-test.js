import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { getLanguage } from 'kursausschreibung/framework/translate';
import { formatDate } from 'kursausschreibung/framework/date-helpers';
import ObjectProxy from '@ember/object/proxy';

module('Integration | Helper | translate', function (hooks) {
  setupRenderingTest(hooks);

  test('renders translated value for known key', async function (assert) {
    this.set('inputValue', 'overview');

    await render(hbs`{{translate this.inputValue}}`);

    assert.ok(
      this.element.textContent.toLowerCase().includes('bersicht'),
      'known key is translated'
    );
  });

  test('renders key-not-found marker for unknown key', async function (assert) {
    this.set('inputValue', 'unknownTranslationKeyForTest');

    await render(hbs`{{translate this.inputValue}}`);

    assert.ok(
      this.element.textContent.includes('Key not found'),
      'fallback marker is rendered'
    );
  });

  test('replaces named event variables and removes missing values', async function (assert) {
    assert.expect(1);
    let locale = window.kursausschreibung.locale[getLanguage()];
    let originalThankYou = locale.thankYou;
    locale.thankYou =
      'Danke {Designation} am {DateFrom} in {Location} ({Number}) [{Room}] {Missing}';
    let formattedDate = formatDate('2024-04-01', 'LL');

    this.set('event', {
      displayData: ObjectProxy.create({
        content: {
          Designation: 'Französisch A2',
          DateFrom: formattedDate,
          Location: 'Bern',
          Number: 123,
          Room: '',
        },
      }),
    });

    try {
      await render(hbs`{{translate key="thankYou" event=this.event}}`);

      assert.strictEqual(
        this.element.textContent,
        `Danke Französisch A2 am ${formattedDate} in Bern (123) [] `
      );
    } finally {
      locale.thankYou = originalThankYou;
    }
  });
});
