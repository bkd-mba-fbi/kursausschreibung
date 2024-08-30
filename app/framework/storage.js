/* loosely based on the CLX framework */

/**
 * stores an object serialized as JSON
 * @param {string} key key used to store the object
 * @param {object} value the value to store
 */
function setItem(key, value) {
  if (key === 'CLX.LoginToken') {
    sessionStorage.setItem(key,JSON.stringify(value));
  } else {
    localStorage.setItem(key, JSON.stringify(value));
  } 
}

/**
 * reads and deserializes an object from the localStorage
 * @param {string} key key used to store the object
 */
function getItem(key) {
  let item = undefined;
  if (key === 'CLX.LoginToken') {
    item = sessionStorage.getItem(key);
  } else {
    item = localStorage.getItem(key);
  }

  if (item && !item.includes('"')) {
    item = `"${item}"`;
  }

  return item !== undefined ? JSON.parse(item) : null;
}

// export getters and setters for all the values
let [
  [getCulture, setCulture],
  [getAccessToken, setAccessToken],
  [getRefreshToken, setRefreshToken],
  [getTokenExpire, setTokenExpire],
  [getListViewGrid, setListViewGrid],
  [getSortAs, setSortAs]
] = [
  'uiCulture',
  'CLX.LoginToken',
  'CLX.RefreshToken',
  'CLX.TokenExpire',
  'listViewGrid',
  'sortAs',
  'kursausschreibung.dataToSubmit',
].map(key => [getItem.bind(null, key), setItem.bind(null, key)]);

export {
  getCulture, setCulture,
  getAccessToken, setAccessToken,
  getRefreshToken, setRefreshToken,
  getTokenExpire, setTokenExpire, 
  getListViewGrid, setListViewGrid,
  getSortAs, setSortAs
};

export function getDataToSubmit(){
  return window.kursausschreibung.dataToSubmit;
}

export function setDataToSubmit(dataToSubmit){
  window.kursausschreibung.dataToSubmit = dataToSubmit;
}