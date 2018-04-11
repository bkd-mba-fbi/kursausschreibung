// store an item in the local storage
export function storeItem(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

// get an item from the local storage
export function getItem(key) {
  let item = localStorage.getItem(key);

  if (item !== undefined) {
    return JSON.parse(item);
  }

  return null;
}
