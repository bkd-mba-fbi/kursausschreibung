import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { debounce } from '@ember/runloop';
import { getPostalCodes } from 'kursausschreibung/framework/api';

export default class InputPostalCodeComponent extends Component {
  @tracked suggestions = [];

  @action
  handleInput(event) {
    const query = event.target.value?.trim() ?? '';

    if (query.length < 2) {
      this.suggestions = [];
      return;
    }

    debounce(this, this.fetchSuggestions, query, 200);
  }

  fetchSuggestions(query) {
    getPostalCodes(query)
      .then((response) => {
        this.suggestions = Array.isArray(response) ? response : [];
      })
      .catch(() => {
        this.suggestions = [];
      });
  }

  @action
  handleChange(event) {
    const code = event.target.value;
    const selected = this.suggestions.find(
      (suggestion) => String(suggestion.Code) === String(code)
    );

    if (!selected) {
      return;
    }

    const fieldset = event.target.closest('fieldset');
    const locationField = fieldset?.querySelector('input[name="Location"]');
    if (locationField) {
      locationField.value = selected.Location;
    }
  }
}
