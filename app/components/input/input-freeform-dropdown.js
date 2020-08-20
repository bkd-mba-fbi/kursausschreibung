import Component from '@ember/component';

export default Component.extend({
  didInsertElement() {
    this._super(...arguments);

    let options = this.get('field.options').options.map(option => option.Value);

    this.$('.typeahead').typeahead(
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
    this.$('.typeahead').typeahead('destroy');
    this._super(...arguments);
  }
});
