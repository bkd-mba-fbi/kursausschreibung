import Component from '@ember/component';
import { computed } from '@ember/object';
import { equal } from '@ember/object/computed';
import settings from 'kursausschreibung/framework/settings';
import { displayAsGrid } from 'kursausschreibung/framework/gui-helpers';
import { getListViewGrid } from 'kursausschreibung/framework/storage';

// pages to show before and after the current page
let n = 2;

export default Component.extend({
  lastPage: computed('items.length', function () {
    let filter = this.items.filter((item) => item.codes instanceof Array);
    return filter.length > 0
      ? 1
      : Math.ceil(this.items.length / settings.itemsPerPage);
  }),

  isFirstPage: equal('page', 1),

  isLastPage: computed('page', 'lastPage', function () {
    return this.page === this.lastPage;
  }),

  nextPage: computed('page', function () {
    return this.page + 1;
  }),

  previousPage: computed('page', function () {
    return this.page - 1;
  }),

  showFirst: computed('page', function () {
    return this.page > 1 + n;
  }),

  showLast: computed('page', 'lastPage', function () {
    return this.page < this.lastPage - n;
  }),

  showLeftDots: computed('page', function () {
    return this.page > n + 2;
  }),

  showRightDots: computed('page', 'lastPage', function () {
    return this.page < this.lastPage - (n + 1);
  }),

  pages: computed('page', 'lastPage', function () {
    let page = this.page;
    let lastPage = this.lastPage;

    let min = page - n >= 1 ? page - n : 1;
    let max = page + n <= lastPage ? page + n : lastPage;

    let pages = [];

    for (let i = min; i <= max; i++) {
      pages.push({ page: i, active: i === page });
    }

    return pages;
  }),

  itemsOnCurrentPage: computed('items', 'page', function () {
    let page = this.page;
    let filter = this.items.filter((item) => item.codes instanceof Array);
    return filter.length > 0
      ? this.items
      : this.items.slice(
          settings.itemsPerPage * (page - 1),
          settings.itemsPerPage * page
        );
  }),

  filterCodes: computed('items', 'itemsOnCurrentPage', function () {
    let filterCodes = this.itemsOnCurrentPage.filter(
      (item) => item.allfilterCodes instanceof Array
    );
    let eventfilterCodes = [];
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
  }),

  actions: {
    grid() {
      displayAsGrid(true);
    },
    list() {
      displayAsGrid(false);
    },
    cancelNav(e) {
      e?.preventDefault?.();
      e?.stopPropagation?.();
      return false;
    },
  },

  didRender() {
    this._super(...arguments);
    var listViewGrid = getListViewGrid();
    listViewGrid = listViewGrid === null ? settings.displayGrid : listViewGrid;
    displayAsGrid(listViewGrid);
  },
});
