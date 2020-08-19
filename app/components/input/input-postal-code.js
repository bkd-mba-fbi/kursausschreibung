import Component from '@ember/component';
import { debounce } from '@ember/runloop';
import { getPostalCodes } from 'kursausschreibung/framework/api';


export default Component.extend({
  didInsertElement() {
    this._super(...arguments);

    const fetchPostalCodes = (query, asyncResults) => {
      getPostalCodes(query).then(response => asyncResults(response));
    };

    let $typeahead = this.$('.typeahead');
    let $locationFields = this.$().closest('fieldset').find('input[name="Location"]');

    $typeahead.typeahead(
      {
        hint: true,
        highlight: true,
        minLength: 2
      },
      {
        async: true,
        limit: 10,
        source: (query, _syncResults, asyncResults) => {
          debounce(null, fetchPostalCodes, query, asyncResults, 200);
        },
        displayKey: 'Code',
        templates: {
          suggestion: object => `<div>${object.Code} ${object.Location}</div>`
        }
      });

    $typeahead.bind('typeahead:select', (_event, suggestion) =>
      $locationFields.val(suggestion.Location)
    );
  },

  willDestroyElement() {
    this.$('.typeahead').typeahead('destroy');
    this._super(...arguments);
  }
});
