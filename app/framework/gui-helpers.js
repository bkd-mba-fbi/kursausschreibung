import {setListViewGrid} from 'kursausschreibung/framework/storage';

/**
 * 
 * @param {boolean} bool 
 */
export function displayAsGrid(bool) {
    var list = document.getElementById('list-cards');

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
      
    } else {
      list.classList.add('uk-list-divider'); 
      list.classList.add('uk-list'); 
      list.classList.remove('uk-grid');
      list.classList.remove('uk-grid-match');
      list.classList.remove('uk-grid-stack'); 
      list.classList.remove('uk-child-width-1-2@m'); 
      list.classList.remove('uk-child-width-1-3@l'); 
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