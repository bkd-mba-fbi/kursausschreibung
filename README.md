# kursausschreibung

[![Build Status](https://travis-ci.org/erz-mba-fbi/kursausschreibung.svg?branch=master)](https://travis-ci.org/erz-mba-fbi/kursausschreibung)

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/) (with npm)
* [Ember CLI](https://ember-cli.com/)
* [Google Chrome](https://google.com/chrome/)

## Installation

* `git clone https://github.com/erz-mba-fbi/kursausschreibung.git`
* `cd kursausschreibung`
* `npm install`
* `cd node_modules/uikit`
* `npm install`
* `npm run scope` (make sure node is up to date)

## Running / Development

* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).
* Visit your tests at [http://localhost:4200/tests](http://localhost:4200/tests).

### Code Generators

Make use of the many generators for code, try `ember help generate` for more details

### Running Tests (tests not yet implemented)

* `ember test`
* `ember test --server`

### Linting

* `npm run lint:js`
* `npm run lint:js -- --fix`

### Building

* `ember build` (development)
* `ember build --environment production` (production)

## Further Reading / Useful Links

* [ember.js](https://emberjs.com/)
* [ember-cli](https://ember-cli.com/)
* Development Browser Extensions
  * [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  * [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)

## Documentation
Go to [Wiki](https://github.com/erz-mba-fbi/kursausschreibung/wiki)

## Configuration (appconfig, settings, locale)

* **appconfig:** The basic configuration for the module must be stored in appconfig. Example: `apiUrl, webBaseUrl, oauthUrl, instanceId, clientId, applicationScope`
* **settings:** In this file you will find all settings for the module.
* **locale:** In the 'locale' folder you will find every translation for the module that does not come from Evento (e.g. labels, status, process...).

## Latest build

You can download the latest build of the module here: [kursausschreibung.zip](https://erz-mba-fbi.github.io/kursausschreibung/kursausschreibung.zip). To use the module you first have to configure it.

## Integration

For the integration into an html page you need a simple html configuration in header and body of the page in which you want to publish the module. Please see section `MODULE head configuration` and `MODULE MAIN APPLICATION` in `index.html`.

If you want to be sure that after authentication by the module the correct address is always used use `OPTION REDIRECT` in the `index.html`.
