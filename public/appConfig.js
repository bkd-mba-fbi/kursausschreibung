window.kursausschreibung = window.kursausschreibung || {};
window.kursausschreibung.appConfig = {
  // the token type
  "tokenType": "urn:ietf:params:oauth:token-type:jwt-bearer",
  // API base URL without trailing slash
  "apiUrl": "https://eventotest.api",
  // base Url of the web application without trailing slash (also the redirect url for public clients)
  "webBaseUrl": "https://test.com",
  // base url of the CLX.Evento OAuth Server.
  "oauthUrl": "https://eventotest.oauth",
  // the instance id for this application.
  "instanceId": "testInstanz",
  // the client id for this application.
  "clientId": "testClientId",
  // set this to true if you want to use autologin on your page
  "useAutoLogin": true,
  // the scope of the application
  "applicationScope": "Public"
};
