import Component from '@ember/component';
import { computed } from '@ember/object';
import settings from 'kursausschreibung/framework/settings';

// pages to show before and after the current page
let n = 2;

export default Component.extend({
  lastPage: computed('items', function () {
    return Math.ceil(this.get('items').length / settings.itemsPerPage);
  }),

  isFirstPage: computed('page', function () {
    return this.get('page') === 1;
  }),

  isLastPage: computed('page', 'lastPage', function () {
    return this.get('page') === this.get('lastPage');
  }),

  nextPage: computed('page', function () {
    return this.get('page') + 1;
  }),

  previousPage: computed('page', function () {
    return this.get('page') - 1;
  }),

  showFirst: computed('page', function () {
    return this.get('page') > 1 + n;
  }),

  showLast: computed('page', 'lastPage', function () {
    return this.get('page') < this.get('lastPage') - n;
  }),

  showLeftDots: computed('page', function () {
    return this.get('page') > n + 2;
  }),

  showRightDots: computed('page', 'lastPage', function () {
    return this.get('page') < this.get('lastPage') - (n + 1);
  }),

  pages: computed('page', 'lastPage', function () {
    let page = this.get('page');
    let lastPage = this.get('lastPage');

    let min = page - n >= 1 ? page - n : 1;
    let max = page + n <= lastPage ? page + n : lastPage;

    let pages = [];

    for (let i = min; i <= max; i++) {
      pages.push({ page: i, active: i === page });
    }

    return pages;
  }),

  itemsOnCurrentPage: computed('items', 'page', function () {
    let page = this.get('page');

    return this.get('items').slice(settings.itemsPerPage * (page - 1), settings.itemsPerPage * page);
  })
});
