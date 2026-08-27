import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { vssDependency } from 'kursausschreibung/framework/form-helpers';

// same behaviour as the jquery typeahead used before the ember upgrade:
// limit 10, minLength 0, match anywhere, case insensitive (see issue #222)
const LIMIT = 10;

export default class InputFreeformDropdownComponent extends Component {
  @tracked suggestions = [];
  @tracked isOpen = false;
  @tracked activeIndex = -1;

  get options() {
    return (this.args.field?.options?.options ?? []).map(
      (option) => option.Value
    );
  }

  @action
  isActive(index) {
    return index === this.activeIndex;
  }

  open(value) {
    let query = String(value ?? '')
      .trim()
      .toLowerCase();

    this.suggestions = this.options
      .filter((option) => String(option).toLowerCase().indexOf(query) !== -1)
      .slice(0, LIMIT)
      .map((option) => this.highlight(option, query));
    this.activeIndex = -1;
    this.isOpen = this.suggestions.length > 0;
  }

  // split the option so the matching part can be rendered bold
  highlight(option, query) {
    let value = String(option);
    let index = query.length === 0 ? -1 : value.toLowerCase().indexOf(query);

    if (index === -1) {
      return { value, pre: value, match: '', post: '' };
    }

    return {
      value,
      pre: value.slice(0, index),
      match: value.slice(index, index + query.length),
      post: value.slice(index + query.length),
    };
  }

  @action
  handleInput(event) {
    this.open(event.target.value);
  }

  @action
  handleFocus(event) {
    this.open(event.target.value);
  }

  @action
  handleKeyDown(event) {
    if (event.key === 'Escape') {
      this.close();
    } else if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      if (!this.isOpen) this.open(event.target.value);
      if (this.suggestions.length === 0) return;

      let last = this.suggestions.length - 1;
      this.activeIndex =
        event.key === 'ArrowDown'
          ? (this.activeIndex + 1) % this.suggestions.length
          : this.activeIndex <= 0
          ? last
          : this.activeIndex - 1;
    } else if (event.key === 'Enter' && this.activeIndex !== -1) {
      event.preventDefault();
      this.select(this.suggestions[this.activeIndex]?.value);
    }
  }

  @action
  handleSuggestionMouseDown(event) {
    // keep the focus so focusout doesn't close the list before the click lands
    event.preventDefault();
    this.select(
      this.suggestions[Number(event.currentTarget.dataset.index)]?.value
    );
  }

  // the form reads element.value from the dom on submit, so write it there
  select(suggestion) {
    if (suggestion === undefined) return;

    let input = document.getElementById(`vss${this.args.field.id}`);
    if (input) {
      input.value = suggestion;
      input.focus();
    }

    this.close();
    vssDependency(String(suggestion), this.args.field);
  }

  close() {
    this.isOpen = false;
    this.activeIndex = -1;
  }

  @action
  handleFocusOut(event) {
    this.close();
    vssDependency(event.target.value, this.args.field);
  }
}
