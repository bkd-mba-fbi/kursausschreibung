// stripped down version of framework storage module

let storage = {
  access_token: function(value) {
    return storage.localStoreItem('CLX.LoginToken', value);
  },
  refresh_token: function(value) {
    return storage.localStoreItem('CLX.RefreshToken', value);
  },
  token_expire: function(value) {
    return storage.localStoreItem('CLX.TokenExpire', value);
  },
  clearTokenInformation: function() {
    localStorage.removeItem('CLX.LoginToken');
    localStorage.removeItem('CLX.RefreshToken');
    localStorage.removeItem('CLX.TokenExpire');
  },

  userSettings: {
    userId: function(value) {
      return storage.localStoreItem('userId', value);
    },
    uiCulture: function(value) {
      return storage.localStoreItem('uiCulture', value);
    },
    applicationScope: function(value) {
      return storage.localStoreItem('applicationScope', value);
    },
    personId: function(value) {
      return storage.localStoreItem('personId', value);
    }
  },

  localStoreItem: function(key, value) {
    if (value !== undefined) {
      localStorage.setItem(key, JSON.stringify(value));
      return value;
    } else {
      let item = localStorage.getItem(key);
      if (item !== undefined) return JSON.parse(item);
      else return null;
    }
  },

  sessionStoreItem: function(key, value) {
    if (value !== undefined) {
      sessionStorage.setItem(key, JSON.stringify(value));
      return value;
    } else {
      let item = sessionStorage.getItem(key);
      if (item !== undefined) {
        return JSON.parse(item);
      }
      return null;
    }
  },

  removeSessionStoreItem: function(key) {
    sessionStorage.removeItem(key);
  }
};

export default storage;
