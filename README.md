# kursausschreibung

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

## Configuration (appconfig, settings, local)

* **appconfig:** The basic configuration for the module must be stored in appconfig. Example: apiUrl, webBaseUrl, oauthUrl, instanceId, clientId, applicationScope
* **seetings:** In this file you will find all seetings for the module.
* **local:** In the 'local' folder you will find every translation for the module that does not come from Evento (e.g. labels, status, process...).

## Last build

In the lastbuild folder is the last build of the module. You can use it directly, after you did according to configuration section.

## Integration

For the integration into the html page you need a simple html configuration in the header and body of the page in which you want to publish the module. See the section `MODUL head configuration` and `MODUL MAIN APPLICATION` in `lastBuild/index.html`.
