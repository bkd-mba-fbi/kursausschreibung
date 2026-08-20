import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { debounce } from '@ember/runloop';
import { getPostalCodes } from 'kursausschreibung/framework/api';

export default class InputPostalCodeComponent extends Component {
  @tracked query = '';
  @tracked suggestions = [];
  @tracked isOpen = false;
  @tracked activeIndex = -1;

  requestToken = 0;
  lastSelectedCode = null;

  get inputId() {
    return `vss${this.args.field.id}`;
  }

  get listId() {
    return `postal-code-options-${this.args.field.id}`;
  }

  get activeSuggestion() {
    return this.suggestions[this.activeIndex] ?? null;
  }

  get activeSuggestionId() {
    return this.activeSuggestion ? `${this.listId}-${this.activeIndex}` : null;
  }

  @action
  isActiveSuggestion(index) {
    return index === this.activeIndex;
  }

  @action
  handleInput(event) {
    this.query = event.target.value ?? '';
    this.lastSelectedCode = null;
    this.setLocationFieldValue('');

    const query = this.query.trim();

    if (query.length < 2) {
      this.suggestions = [];
      this.isOpen = false;
      this.activeIndex = -1;
      return;
    }

    this.isOpen = true;
    debounce(this, this.fetchSuggestions, query, 200);
  }

  fetchSuggestions(query) {
    const requestToken = ++this.requestToken;

    getPostalCodes(query)
      .then((response) => {
        if (requestToken !== this.requestToken) {
          return;
        }

        this.suggestions = Array.isArray(response) ? response : [];
        this.activeIndex = this.suggestions.length > 0 ? 0 : -1;
        this.isOpen = this.suggestions.length > 0;
      })
      .catch(() => {
        if (requestToken !== this.requestToken) {
          return;
        }

        this.suggestions = [];
        this.activeIndex = -1;
        this.isOpen = false;
      });
  }

  @action
  handleChange(event) {
    this.query = event.target.value ?? '';
    this.applyExactMatch(this.query);
  }

  @action
  handleKeyDown(event) {
    if (this.suggestions.length === 0) {
      if (event.key === 'Escape') {
        this.closeSuggestions();
      }

      return;
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      this.isOpen = true;
      this.activeIndex = (this.activeIndex + 1) % this.suggestions.length;
      return;
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      this.isOpen = true;
      this.activeIndex =
        this.activeIndex <= 0
          ? this.suggestions.length - 1
          : this.activeIndex - 1;
      return;
    }

    if (event.key === 'Enter') {
      if (this.activeSuggestion) {
        event.preventDefault();
        this.selectSuggestion(this.activeSuggestion);
      }

      return;
    }

    if (event.key === 'Escape') {
      event.preventDefault();
      this.closeSuggestions();
    }
  }

  @action
  handleFocus() {
    if (this.suggestions.length > 0 && this.query.trim().length >= 2) {
      this.isOpen = true;
    }
  }

  @action
  handleBlur() {
    this.closeSuggestions();
    this.applyExactMatch(this.query);
  }

  @action
  handleSuggestionMouseDown(event) {
    event.preventDefault();

    const index = Number(event.currentTarget.dataset.suggestionIndex);
    this.selectSuggestion(this.suggestions[index]);
  }

  selectSuggestion(suggestion) {
    if (!suggestion) {
      return;
    }

    this.query = String(suggestion.Code ?? '');
    this.lastSelectedCode = this.query;
    this.setLocationFieldValue(suggestion.Location ?? '');
    this.closeSuggestions();
  }

  applyExactMatch(value) {
    const trimmedValue = String(value ?? '').trim();

    if (trimmedValue === '' || trimmedValue === this.lastSelectedCode) {
      return;
    }

    const selected = this.suggestions.find(
      (suggestion) => String(suggestion.Code) === trimmedValue
    );

    if (!selected) {
      this.lastSelectedCode = null;
      this.setLocationFieldValue('');
      return;
    }

    this.query = String(selected.Code ?? '');
    this.lastSelectedCode = this.query;
    this.setLocationFieldValue(selected.Location ?? '');
  }

  closeSuggestions() {
    this.isOpen = false;
    this.activeIndex = -1;
  }

  getLocationField() {
    const input = document.getElementById(this.inputId);
    const fieldset = input?.closest('fieldset');

    return fieldset?.querySelector('input[name="Location"]');
  }

  setLocationFieldValue(value) {
    const locationField = this.getLocationField();

    if (!locationField) {
      return;
    }

    locationField.value = value;
    locationField.dispatchEvent(new Event('input', { bubbles: true }));
    locationField.dispatchEvent(new Event('change', { bubbles: true }));
  }
}
