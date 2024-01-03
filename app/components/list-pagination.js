import Component from '@ember/component';
import { computed } from '@ember/object';
import settings from 'kursausschreibung/framework/settings';
import { displayAsGrid } from 'kursausschreibung/framework/gui-helpers';
import {getListViewGrid} from 'kursausschreibung/framework/storage';

// pages to show before and after the current page
let n = 2;

export default Component.extend({
  lastPage: computed('items', function () {
    let filter = this.get('items').filter(item => item.codes instanceof Array); 
    return filter.length > 0 ?  1 : Math.ceil(this.get('items').length / settings.itemsPerPage);
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
    let filter = this.get('items').filter(item => item.codes instanceof Array);
    return  filter.length > 0 ? this.get('items') : this.get('items').slice(settings.itemsPerPage * (page - 1), settings.itemsPerPage * page);
  }),

  filterCodes: computed('items', function () {

    let filterCodes = this.get('itemsOnCurrentPage').filter(item => item.allfilterCodes instanceof Array);
    let eventfilterCodes = [];
    filterCodes.forEach(event => {

      let existsFilter = filterCodes[0].allfilterCodes.filter(filter => event.filter.indexOf(filter.id) > -1);

      existsFilter.map(filter => {
        if(eventfilterCodes.includes(filter) === false) {
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
    }
  },

  didRender(){
    var listViewGrid = getListViewGrid();
    listViewGrid = listViewGrid === null ? settings.displayGrid : listViewGrid;
    displayAsGrid(listViewGrid);
  }

});
