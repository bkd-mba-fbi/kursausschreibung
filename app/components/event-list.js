import Component from '@glimmer/component';
import { action } from '@ember/object';
import { modifier } from 'ember-modifier';
import {
  getParameterByName,
  setParameterByName,
} from 'kursausschreibung/framework/url-helpers';

function filterParam(getParam) {
  let filters = document.getElementsByClassName('filter-tag');
  let activeClass = 'uk-active';

  if (getParam) {
    let filterValue = getParameterByName('filter');

    for (let item of filters) {
      document.getElementById(item.id).classList.remove(activeClass);
      if (item.id.indexOf('tag' + filterValue) >= 0) {
        document.getElementById(item.id).classList.add(activeClass);
      }
    }
  } else {
    for (let item of filters) {
      if (item.className.indexOf(activeClass) >= 0) {
        setParameterByName('filter', item.id.substring(3, item.id.length));
      }
    }
  }
}

export default class EventListComponent extends Component {
  syncFilter = modifier(() => {
    filterParam(true);
  });

  @action
  handleClick() {
    filterParam(false);
  }

  @action
  handleQueryChanged(query) {
    if (typeof this.args.queryChanged === 'function') {
      this.args.queryChanged(query);
    }
  }
}
