/* loosely based on the CLX framework */

/**
 * stores an object serialized as JSON
 * @param {string} key key used to store the object
 * @param {object} value the value to store
 */
function setItem(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

/**
 * reads and deserializes an object from the localStorage
 * @param {string} key key used to store the object
 */
function getItem(key) {
  let item = localStorage.getItem(key);

  return item !== undefined ? JSON.parse(item) : null;
}

// export getters and setters for all the values
let [
  [getCulture, setCulture],
  [getAccessToken, setAccessToken],
  [getRefreshToken, setRefreshToken],
  [getTokenExpire, setTokenExpire],
  [getDataToSubmit, setDataToSubmit]
] = [
  'uiCulture',
  'CLX.LoginToken',
  'CLX.RefreshToken',
  'CLX.TokenExpire',
  'kursausschreibung.dataToSubmit'
].map(key => [getItem.bind(null, key), setItem.bind(null, key)]);

export {
  getCulture, setCulture,
  getAccessToken, setAccessToken,
  getRefreshToken, setRefreshToken,
  getTokenExpire, setTokenExpire,
  getDataToSubmit, setDataToSubmit
};
