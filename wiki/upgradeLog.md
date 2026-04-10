# Upgrade Log

## Upgrade to V4

[Commit](https://github.com/bkd-mba-fbi/kursausschreibung/commit/cb103a84c981b57c127b2b51ff51307528846164)

```{ handler: 'throw', matchId: 'ember-global' },```
- [Link](https://deprecations.emberjs.com/id/ember-global)
- Some errors about ember-global usage in vendor.js

We see in vendor.js:
"Using the globals resolver is deprecated. Use the ember-resolver package instead. See https://deprecations.emberjs.com/v3.x#toc_ember-deprecate-globals-resolver"

So it's important to throw the deprecations in correct order, or at least quickly skim through their docs to know which order makes the most sense.

```{ handler: 'silence', matchId: 'ember.globals-resolver' },```
- [Link](https://deprecations.emberjs.com/id/ember-globals-resolver)
- We already use Ember CLI to build our app - so there must be an error
- In index.html was an old config blob hardcoded. Because of that config\environment.js was not respected.
- I removed this: ```<meta name="kursausschreibung/config/environment" content="%7B%22modulePrefix%22%3A%22kursausschreibung%22%2C%22environment%22%3A%22development%22%2C%22rootURL%22%3A%22%22%2C%22locationType%22%3A%22hash%22%2C%22EmberENV%22%3A%7B%22FEATURES%22%3A%7B%7D%2C%22EXTEND_PROTOTYPES%22%3A%7B%22Date%22%3Afalse%7D%7D%2C%22APP%22%3A%7B%22rootElement%22%3A%22%23kursausschreibung-root%22%2C%22name%22%3A%22kursausschreibung%22%2C%22version%22%3A%223.3.1%2Bfeef2e77%22%7D%2C%22exportApplicationGlobal%22%3Atrue%7D" />```
- This package is not needed if we don't need ember global exports. So we uninstall it with: ```npm uninstall ember-export-application-global```
- Now we have a problem with https://github.com/ember-cli/ember-cli-shims. We can uninstall it because it was a compatiblity add-on that allowed to use module imports before they were available.
- Now a new problem: Error: htmlSafe is not implemented in the `@ember/string` package. Please import from `@ember/template` instead.
  - For that we just make the correct imports

```{ handler: 'throw', matchId: 'deprecated-run-loop-and-computed-dot-access' },```
- [Link](https://deprecations.emberjs.com/id/deprecated-run-loop-and-computed-dot-access)
- Didn't throw at all. Maybe because we uninstalled ember-cli-shims

```{ handler: 'silence', matchId: 'this-property-fallback' },```
- [Link](https://deprecations.emberjs.com/id/this-property-fallback)
- We add ```this.``` in front of the properties to avoid using "proprety fallback" always and avoid conflicts.
 

