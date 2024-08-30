import Component from '@ember/component';
import { vssDependency } from 'kursausschreibung/framework/form-helpers';
import jQuery from 'jquery';

export default Component.extend({
  didInsertElement() {
    this._super(...arguments);

    let options = this.get('field.options').options.map(option => option.Value);

    jQuery('.typeahead').typeahead(
      {
        hint: true,
        highlight: true,
        minLength: 0
      },
      {
        limit: 10,
        source: (query, callback) => {
          query = query.trim().toLowerCase();

          callback(
            options.filter(option => option.toLowerCase().indexOf(query) !== -1)
          );
        }
      });
  },

  willDestroyElement() {
    jQuery('.typeahead').typeahead('destroy');
    this._super(...arguments);
  },

  focusOut() {
    let field = this.get('field');
    let currentValue = document.getElementById('vss'+field.id).value;
    vssDependency(currentValue,field);
  }
});
