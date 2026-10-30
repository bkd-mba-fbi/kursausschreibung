
window.kursausschreibung = window.kursausschreibung || {};
window.kursausschreibung.appConfig = {
  // API base URL without trailing slash
	  "apiUrl": "https://eventoapp-test.apps.be.ch/restApi",
  // base Url of the web application without trailing slash (also the redirect url for public clients)
  "webBaseUrl": location.href ,
  // base url of the CLX.Evento OAuth Server.
  "oauthUrl": "https://eventoapp-test.apps.be.ch/OAuth",
  // the instance id for this application.
  "instanceId": "GymBivo",
  // the client id for this application.
  "clientId": "dev4200",
  // set this to true if you want to use autologin on your page. If "false" the authorization must be done by the application, that module does not perform authorization. If false and no token found in the local storage (CLX.LoginToken) the "kursausschreibung" application only refresh the actual url. The application must be redirect user to login form.
  "useAutoLogin": true,
  // the scope of the application
  "applicationScope": "Public"
};
