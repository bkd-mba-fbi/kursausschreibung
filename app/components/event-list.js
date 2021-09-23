import Component from '@ember/component';
import {getParameterByName, setParameterByName} from 'kursausschreibung/framework/url-helpers';

function filterParam(getParam) {
  let filters = document.getElementsByClassName('filter-tag');
  let activeClass = 'uk-active';
  

  if(getParam) {
    let filterValue = getParameterByName('filter');

    for (let item of filters) {
      document.getElementById(item.id).classList.remove(activeClass);
      if(item.id.indexOf('tag'+filterValue) >= 0) {
        document.getElementById(item.id).classList.add(activeClass);
      }
    }
  } else {
    for (let item of filters) {
      if(item.className.indexOf(activeClass) >= 0) {
          setParameterByName('filter',item.id.substring(3,item.id.length));
        }
      }     
  }

}

export default Component.extend({
  actions: {
    queryChanged(query) {
      this.get('queryChanged')(query);
    }
  },
  didRender() {
    filterParam(true);
  },
  click() {
    filterParam(false);
  }
});
