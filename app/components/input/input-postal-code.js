import Component from '@glimmer/component';
import { modifier } from 'ember-modifier';
import { debounce } from '@ember/runloop';
import { getPostalCodes } from 'kursausschreibung/framework/api';
import jQuery from 'jquery';

export default class InputPostalCodeComponent extends Component {
  setupTypeahead = modifier((element) => {
    const fetchPostalCodes = (query, asyncResults) => {
      getPostalCodes(query).then((response) => asyncResults(response));
    };

    let $typeahead = jQuery(element);
    let $locationFields = $typeahead
      .closest('fieldset')
      .find('input[name="Location"]');

    $typeahead.typeahead(
      {
        hint: true,
        highlight: true,
        minLength: 2,
      },
      {
        async: true,
        limit: 10,
        source: (query, _syncResults, asyncResults) => {
          debounce(null, fetchPostalCodes, query, asyncResults, 200);
        },
        displayKey: 'Code',
        templates: {
          suggestion: (object) =>
            `<div>${object.Code} ${object.Location}</div>`,
        },
      }
    );

    let handleSelect = (_event, suggestion) =>
      $locationFields.val(suggestion.Location);
    $typeahead.on('typeahead:select', handleSelect);

    return () => {
      $typeahead.off('typeahead:select', handleSelect);
      $typeahead.typeahead('destroy');
    };
  });
}
