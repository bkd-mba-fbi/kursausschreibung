import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { vssDependency } from 'kursausschreibung/framework/form-helpers';

// maximum number of suggestions shown at once (see issue #222)
const SUGGESTION_LIMIT = 10;

export default class InputFreeformDropdownComponent extends Component {
  @tracked suggestions = [];
  @tracked isOpen = false;
  @tracked activeIndex = -1;

  get inputId() {
    return `vss${this.args.field.id}`;
  }

  get listId() {
    return `freeform-options-${this.args.field.id}`;
  }

  // the possible values are already present in the field definition,
  // so filtering happens locally without an api call
  get options() {
    return (this.args.field?.options?.options ?? [])
      .map((option) => option.Value)
      .filter((value) => value !== undefined && value !== null);
  }

  get activeSuggestion() {
    return this.suggestions[this.activeIndex] ?? null;
  }

  get activeSuggestionId() {
    return this.activeSuggestion === null
      ? null
      : `${this.listId}-${this.activeIndex}`;
  }

  @action
  isActiveSuggestion(index) {
    return index === this.activeIndex;
  }

  filterOptions(query) {
    let normalizedQuery = String(query ?? '')
      .trim()
      .toLowerCase();

    return this.options
      .filter(
        (option) => String(option).toLowerCase().indexOf(normalizedQuery) !== -1
      )
      .slice(0, SUGGESTION_LIMIT);
  }

  openWith(query) {
    this.suggestions = this.filterOptions(query);
    this.activeIndex = -1;
    this.isOpen = this.suggestions.length > 0;
  }

  @action
  handleInput(event) {
    this.openWith(event.target.value);
  }

  // minLength was 0 before the ember upgrade, so an empty field shows
  // every option as soon as it receives focus
  @action
  handleFocus(event) {
    this.openWith(event.target.value);
  }

  @action
  handleKeyDown(event) {
    if (event.key === 'Escape') {
      event.preventDefault();
      this.closeSuggestions();
      return;
    }

    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();

      if (!this.isOpen) {
        this.openWith(event.target.value);
      }

      if (this.suggestions.length === 0) return;

      if (event.key === 'ArrowDown') {
        this.activeIndex = (this.activeIndex + 1) % this.suggestions.length;
      } else {
        this.activeIndex =
          this.activeIndex <= 0
            ? this.suggestions.length - 1
            : this.activeIndex - 1;
      }

      return;
    }

    if (event.key === 'Enter' && this.activeSuggestion !== null) {
      // prevent the form from being submitted while picking a suggestion
      event.preventDefault();
      this.selectSuggestion(this.activeSuggestion);
    }
  }

  @action
  handleSuggestionMouseDown(event) {
    // keep the focus on the input so focusout doesn't fire before the click
    event.preventDefault();

    let index = Number(event.currentTarget.dataset.suggestionIndex);
    this.selectSuggestion(this.suggestions[index]);
  }

  // the form reads its values straight from the dom on submit, so the
  // value is written to the input element instead of being tracked here
  selectSuggestion(suggestion) {
    if (suggestion === undefined || suggestion === null) return;

    let input = document.getElementById(this.inputId);

    if (input !== null) {
      input.value = suggestion;
      input.focus();
    }

    this.closeSuggestions();
    vssDependency(String(suggestion), this.args.field);
  }

  closeSuggestions() {
    this.isOpen = false;
    this.activeIndex = -1;
  }

  @action
  handleFocusOut(event) {
    this.closeSuggestions();
    vssDependency(event.target.value, this.args.field);
  }
}
