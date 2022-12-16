import {setListViewGrid, setSortAs} from 'kursausschreibung/framework/storage';

/**
 * sort value set localStroage sortAs and reload
 * @param {string} value 
 */
export function sortAs(value) {
  setSortAs(value);
  window.location.reload();
}


/**
 * display eventlist as grid or list
 * true > grid
 * false > list
 * @param {boolean} bool 
 */
export function displayAsGrid(bool) {
    var list = document.getElementById('list-cards');
    var btGrid = document.getElementById('bt-grid');
    var btList = document.getElementById('bt-list');

    if (typeof bool === "boolean") {
      setListViewGrid(bool);
    } else {
      setListViewGrid(false);
    }
    
    if(bool) {
      list.classList.add('uk-grid');
      list.classList.add('uk-grid-match');
      list.classList.add('uk-grid-stack'); 
      list.classList.add('uk-child-width-1-2@m'); 
      list.classList.add('uk-child-width-1-3@l'); 
      list.classList.remove('uk-list-divider'); 
      list.classList.remove('uk-list'); 
      btGrid.classList.add('active-tab');
      btList.classList.remove('active-tab');
      
    } else {
      list.classList.add('uk-list-divider'); 
      list.classList.add('uk-list'); 
      list.classList.remove('uk-grid');
      list.classList.remove('uk-grid-match');
      list.classList.remove('uk-grid-stack'); 
      list.classList.remove('uk-child-width-1-2@m'); 
      list.classList.remove('uk-child-width-1-3@l'); 
      btList.classList.add('active-tab');
      btGrid.classList.remove('active-tab');
    }
    for (const child of list.children) {

      if(bool) {
        child.classList.add('uk-card');
        child.classList.add('uk-card-body');
        child.classList.add('card-list');
      } else {
        child.classList.remove('uk-card');
        child.classList.remove('uk-card-body');
        child.classList.remove('card-list');
      }
    }
  
  }