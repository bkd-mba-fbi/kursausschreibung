# kursausschreibung 3.6.4
[![Build 🏭🚀](https://github.com/bkd-mba-fbi/kursausschreibung/actions/workflows/buildDeploy.yml/badge.svg)](https://github.com/bkd-mba-fbi/kursausschreibung/actions/workflows/buildDeploy.yml)

# Documentation
Go to the [FBI GitBook docs](https://fbi-mba-bkd.gitbook.io/github-docs-public)

# How to implement in your page?

## Configuration (appconfig, settings, locale)

* **appconfig:** The basic configuration for the module must be stored in appconfig. Example: `apiUrl, oauthUrl, instanceId, clientId, applicationScope`
* **settings:** In this file you will find all settings for the module.
* **locale:** In the 'locale' folder you will find every translation for the module that does not come from Evento (e.g. labels, status, process...).

## Builds

You can download releases on the [releases page](https://github.com/bkd-mba-fbi/kursausschreibung/releases) and the latest build of the module here: [kursausschreibung.zip](https://bkd-mba-fbi.github.io/kursausschreibung/kursausschreibung.zip). To use the module you first have to configure it.

## Integration

For the integration into an html page you need a simple html configuration in header and body of the page in which you want to publish the module. Please see section `MODULE head configuration` and `MODULE MAIN APPLICATION` in `index.html`.

If you want to be sure that after authentication by the module the correct address is always used use `OPTION REDIRECT` in the `index.html` [GoTo](https://github.com/bkd-mba-fbi/kursausschreibung/blob/master/app/index.html). Please put script element between head and body of main page (load faster).

# For Development 
## Prerequisites

You will need the following things properly installed on your computer.

* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/) (with npm)
* [Ember CLI](https://cli.emberjs.com/release/)
* [Google Chrome](https://google.com/chrome/)

## Installation

* `git clone https://github.com/bkd-mba-fbi/kursausschreibung.git`
* `cd kursausschreibung`
* `npm install`
* `cd node_modules/uikit`
* `npm install`
* `npm run scope` (make sure node is up to date)

### Problem npm install
For one reason or another, some people can't connect to the registry via HTTPS. This can be fixed by setting the registry to use HTTP instead:

* `npm config set registry http://registry.npmjs.org/`
* `npm config set strict-ssl false`

### Windows (all developers building on Windows)

Without this the build fails with `EPERM: operation not permitted, symlink`. Do it once per machine, administrator rights required:

1. Open PowerShell as administrator (right click → "Run as administrator").
2. Run: `reg add "HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\AppModelUnlock" /t REG_DWORD /f /v AllowDevelopmentWithoutDevLicense /d 1`
   (this is Windows "Developer Mode", same as Settings → For developers → Developer Mode).
3. Open a normal PowerShell and run `npm run build`.

Also required for accounts in the Administrators group: UAC removes the symlink right in normal shells. Sources: [Microsoft: enable Developer Mode via PowerShell](https://learn.microsoft.com/en-us/windows/advanced-settings/developer-mode) (the command above), [Ember CLI Windows appendix](https://cli.emberjs.com/release/appendix/windows/) (why symlinks are needed).

If the build suddenly fails with `Could not find ember-source` or similar, packages in `node_modules` were emptied: run `npm ci`.

## Running / Development

* `npm start` (Vite dev server)
* Visit your app at [http://localhost:4200](http://localhost:4200).
* Visit your tests at [http://localhost:4200/tests](http://localhost:4200/tests).

### Code Generators

Make use of the many generators for code, try `ember help generate` for more details

### Running Tests

* `npm run test:ember` (builds with Vite, then runs the suite in headless Chrome)
* `npm test` (lint + tests, same as CI)

### Linting

* `npm run lint`
* `npm run lint:fix`

### Building

* `npm run build` (production: exactly `dist/assets/app.js` and `dist/assets/app.css`, see `vite.config.mjs`)
* `npx vite build --mode development` (unminified, with tests)

## Further Reading / Useful Links

* [ember.js](https://emberjs.com/)
* [ember-cli](https://cli.emberjs.com/release/)
* Development Browser Extensions
  * [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  * [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)
