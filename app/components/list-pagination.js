import Component from '@glimmer/component';
import { action } from '@ember/object';
import { modifier } from 'ember-modifier';
import settings from 'kursausschreibung/framework/settings';
import { displayAsGrid } from 'kursausschreibung/framework/gui-helpers';
import { getListViewGrid } from 'kursausschreibung/framework/storage';

// pages to show before and after the current page
let n = 2;

export default class ListPaginationComponent extends Component {
  get lastPage() {
    let filter = this.args.items.filter((item) => item.codes instanceof Array);
    return filter.length > 0
      ? 1
      : Math.ceil(this.args.items.length / settings.itemsPerPage);
  }

  get isFirstPage() {
    return this.args.page === 1;
  }

  get isLastPage() {
    return this.args.page === this.lastPage;
  }

  get nextPage() {
    return this.args.page + 1;
  }

  get previousPage() {
    return this.args.page - 1;
  }

  get showFirst() {
    return this.args.page > 1 + n;
  }

  get showLast() {
    return this.args.page < this.lastPage - n;
  }

  get showLeftDots() {
    return this.args.page > n + 2;
  }

  get showRightDots() {
    return this.args.page < this.lastPage - (n + 1);
  }

  get pages() {
    let page = this.args.page;
    let lastPage = this.lastPage;

    let min = page - n >= 1 ? page - n : 1;
    let max = page + n <= lastPage ? page + n : lastPage;

    let pages = [];

    for (let i = min; i <= max; i++) {
      pages.push({ page: i, active: i === page });
    }

    return pages;
  }

  get itemsOnCurrentPage() {
    let page = this.args.page;
    let filter = this.args.items.filter((item) => item.codes instanceof Array);
    return filter.length > 0
      ? this.args.items
      : this.args.items.slice(
          settings.itemsPerPage * (page - 1),
          settings.itemsPerPage * page
        );
  }

  get filterCodes() {
    let filterCodes = this.itemsOnCurrentPage.filter(
      (item) => item.allfilterCodes instanceof Array
    );
    let eventfilterCodes = [];

    if (filterCodes.length === 0) {
      return null;
    }

    filterCodes.forEach((event) => {
      let existsFilter = filterCodes[0].allfilterCodes.filter(
        (filter) => event.filter.indexOf(filter.id) > -1
      );

      existsFilter.map((filter) => {
        if (eventfilterCodes.includes(filter) === false) {
          eventfilterCodes.push(filter);
        }
      });
    });

    return eventfilterCodes.length === 1 ? null : eventfilterCodes;
  }

  @action
  grid() {
    displayAsGrid(true);
  }

  @action
  list() {
    displayAsGrid(false);
  }

  @action
  cancelNav(e) {
    e?.preventDefault?.();
    e?.stopPropagation?.();
    return false;
  }

  applyGridView = modifier(() => {
    var listViewGrid = getListViewGrid();
    listViewGrid = listViewGrid === null ? settings.displayGrid : listViewGrid;
    displayAsGrid(listViewGrid);
  });
}
