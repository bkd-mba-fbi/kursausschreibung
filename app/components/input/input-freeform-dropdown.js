import Component from '@glimmer/component';
import { action } from '@ember/object';
import { modifier } from 'ember-modifier';
import { vssDependency } from 'kursausschreibung/framework/form-helpers';
import jQuery from 'jquery';

export default class InputFreeformDropdownComponent extends Component {
  setupTypeahead = modifier((element) => {
    let options = this.args.field.options.options.map((option) => option.Value);
    let $element = jQuery(element);

    $element.typeahead(
      {
        hint: true,
        highlight: true,
        minLength: 0,
      },
      {
        limit: 10,
        source: (query, callback) => {
          query = query.trim().toLowerCase();

          callback(
            options.filter(
              (option) => option.toLowerCase().indexOf(query) !== -1
            )
          );
        },
      }
    );

    return () => {
      $element.typeahead('destroy');
    };
  });

  @action
  handleFocusOut(event) {
    let field = this.args.field;
    let currentValue = event.target.value;
    vssDependency(currentValue, field);
  }
}
