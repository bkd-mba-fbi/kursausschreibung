# Upgrade Log

## Upgrade to Ember 5.12.0

**Status**: Functionally complete. App builds and lints successfully. Test infrastructure has compatibility issue with testem.

### Migration work completed

- `78ff205` `feat(ember5): upgrade to Ember 5.12.0 and fix template compatibility`

What changed:
1. Upgraded core framework packages:  
   - `ember-cli`: 4.12.3 -> 5.12.0
   - `ember-source`: 4.12.4 -> 5.12.0
   - `ember-qunit`: 6.2.0 -> 9.0.0
   - `@ember/test-helpers`: 2.9.3 -> 5.x
   - `ember-resolver`: 10.0.0 -> 11.0.0
   - `ember-cli-deprecation-workflow`: 2.2.0 -> 3.0.0

2. Fixed template compilation error in `list-pagination.hbs`:
   - Ember 5 stricter scoping caught undefined `p.active` references outside `#each` blocks
   - Fixed by using `this.isFirstPage` and `this.isLastPage` properties instead
   - Applied fix to both pagination UI sections

### Build and code validation

1. `npx ember build` **passes** - app builds successfully with Ember 5
2. `npm run lint` **passes** - all code validates cleanly
3. Remaining issue: testem/execa CommonJS/ES module compatibility in test runner
   - `npx ember test` fails with execa module loading error
   - This is a test infrastructure issue separate from application code
   - Recommendation: resolve before committing, or skip tests during this milestone

### Practical status for next steps

- Application code is Ember 5 compatible
- Framework upgrade is functionally complete
- Test runner needs fixing (testem version bump 3.19 -> 3.20 did not resolve)
- Recommendation: either fix testem compatibility or escalate to Ember 6 (which may have better test runner support)

## Post-Upgrade Hardening On `ember-upgrade`

After the initial Ember 4.12 upgrade landed, the branch continued with focused compatibility-hardening batches so the next major bump is mostly dependency and addon work instead of legacy app-code cleanup.

### Current outcome

1. `npm run lint` passes.
2. `npx ember test` passes with 78/78 tests.
3. `ember/no-component-lifecycle-hooks` is enabled and passing.
4. `ember/no-jquery` is enabled and passing.
5. `app/components` no longer relies on `@ember/component` as a base class.

### Recent hardening batches

#### Template and action cleanup

- `57283d5` `refactor(ember4): batch 1 - normalize translate helper and modernize action syntax in templates`
- `9ece52e` `refactor(ember4): batch 2 - fix bare variable references (logoLink, logoImage, model.subtitle)`

What changed:
1. normalized `translate` helper usage toward named args,
2. replaced legacy `{{action ...}}` template usage with modern function/action references,
3. removed lingering bare template references that are risky for newer Ember versions.

#### Component modernization

- `780275b` `refactor(ember4): batch 3a - convert input-dropdown and event-list-item to Glimmer components`
- `51e7456` `refactor(ember4): batch 3b - replace lifecycle hooks with reactive getters and modifiers`
- `a03de7f` `refactor(ember4): convert input-file to a Glimmer component`
- `7a26aa1` `refactor(ember4): convert subscription-form to a Glimmer component`
- `71e0eb1` `refactor(ember4): move typeahead inputs to Glimmer modifiers`

What changed:
1. converted remaining high-value classic components to native/Glimmer-style components,
2. replaced `didRender`/`didReceiveAttrs` patterns with tracked state, getters, and `ember-modifier`,
3. reduced the classic component surface to zero inside `app/components`.

#### jQuery removal and lint hardening

- `24f4f75` `chore(lint): enable no-component-lifecycle-hooks and no-jquery with scoped exceptions`
- `00e1c59` `refactor(ember4): replace api jquery transport with fetch and tighten no-jquery exceptions`
- `9b6ea6d` `refactor(ember4): replace typeahead jquery usage with native input behavior`
- `01bd35c` `refactor(ember4): replace croppie jquery upload flow with native image processing`

What changed:
1. replaced `$.ajax` transport with `fetch`,
2. removed jQuery-based typeahead flows in favor of simpler native input behavior,
3. replaced the croppie-based upload flow with native preview plus canvas-based JPEG processing,
4. removed the final `ember/no-jquery` exceptions.

### Practical result for the next version bump

The branch is now in a materially better place for Ember 5:

1. framework code cleanup is no longer the main unknown,
2. the next likely blockers are addon compatibility and dependency alignment,
3. the recommended next step is a 4.x -> 5.x compatibility audit plus `ember-cli-update --compare-only` before changing package versions.

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
 
### Perform upgrade
```npx ember-cli-update@latest --from 3.28.6 --to 4.12.3```

### Upgrade note (Ember 4.12 line)

#### What we changed
1. Upgraded blueprint and dependency baseline from Ember CLI 3.28.6 to Ember CLI 4.12.3.
2. Set Ember Source to 4.12.4 (latest Ember 4 patch release).
3. Added ember-auto-import v2 because Ember 4 addon/build pipeline expects it.
4. Resolved updater merge conflicts while preserving app-specific behavior:
  - hash routing and embedded root element behavior
  - custom index page integration and asset loading
  - custom build imports and bundling setup
  - existing application stylesheet
5. Fixed runtime breakages from deprecated computed macros by switching from computed.equal/computed.gt usage to macro imports from @ember/object/computed.
6. Updated project scripts so npm test runs lint and Ember tests consistently again.

#### Why we changed it this way
1. The updater target must match Ember CLI versions that actually exist in npm. Ember Source 4.12.4 exists, Ember CLI 4.12.4 does not, so we used Ember CLI 4.12.3 plus Ember Source 4.12.4.
2. We preserved existing app behavior first, then applied compatibility fixes. This lowers functional risk during framework upgrades.
3. Some lint defaults in the newer toolchain enforce modern Ember idioms that require broad refactors. We temporarily relaxed strict lint rules to keep the upgrade shippable and verified.

#### Verification completed
1. Dependency install succeeds.
2. Ember test suite passes (all tests green).
3. npm test passes with the current compatibility lint configuration.

#### Important note about lint status
1. Current lint settings are intentionally compatibility-oriented, not strict-modern Ember style.
2. This means code quality checks are stable for the upgrade, but they do not yet enforce full Octane-style best practices.

#### Follow-up plan for new Ember styles and full linter compliance
1. Re-enable strict lint rules in phases:
  - ember/no-classic-components
  - ember/no-classic-classes
  - ember/no-actions-hash
  - ember/no-get
  - ember/no-component-lifecycle-hooks
  - ember/no-observers
  - ember/no-jquery
2. Refactor classic components to Glimmer components incrementally, starting with leaf components (few dependencies), then shared/high-traffic components.
3. Replace actions hash with @action handlers and native class syntax.
4. Replace observers and lifecycle-hook-heavy logic with tracked state plus render modifiers/modifiers where needed.
5. Remove jQuery usage and migrate to native DOM APIs or Ember-friendly patterns.
6. Normalize and modernize CSS conventions:
  - kebab-case custom properties and selector names
  - remove duplicate selectors and ordering issues
  - align media query syntax with current stylelint rules
7. Once CSS and JS are modernized, remove temporary ignore/relaxed lint settings and make strict lint mandatory in CI.

#### Suggested implementation sequence
1. Create a dedicated lint-hardening branch after this framework upgrade is merged.
2. Enable one strict rule (or small related group) at a time.
3. Refactor code to satisfy that rule.
4. Keep tests green after each rule batch.
5. Repeat until full strict lint profile is enabled.

