# Upgrade Log

## npm audit Security Fixes (May 2026)

**Status**: Completed and validated.

### Commits in this batch

- `e4afacc` `fix: address high/critical npm audit findings`

### What was fixed

Reduced vulnerability count from **115 → 102 vulnerabilities** (13 resolved) by targeting production-facing and actively used dev tools:

**Via `npm audit fix` (safe, non-breaking):**
1. `handlebars` (**critical**) — prevented JavaScript injection via AST type confusion and prototype pollution leading to XSS through partial template injection
2. `fast-uri` (**high**) — fixed path traversal via percent-encoded dot segments and host confusion attacks
3. `flatted` (**high**) — fixed unbounded recursion DoS in `parse()` and prototype pollution
4. `lodash.template` (**high**) — fixed command injection via `_.template` imports key names
5. `picomatch` (**high**) — fixed method injection in POSIX character classes and ReDoS via extglob quantifiers
6. `ansi-html` (**high**) — fixed uncontrolled resource consumption
7. `@babel/plugin-transform-modules-systemjs` (**high**) — eliminated arbitrary code generation when compiling malicious input
8. `minimatch` (**high**) — fixed multiple ReDoS vulnerabilities
9. Plus 6 moderate findings (`@babel/helpers`, `cross-spawn`, `debug`, `postcss`, `extend`, `stringstream`)

**Via targeted package upgrades:**
1. `ember-cli-update` **^1.0.1 → ^3.0.1** — major version bump removes a large subset of the old vulnerable dependency subtree that was bundled in v1
2. `rollup` **override to ^4.22.4** (in `package.json` overrides) — fixed:
   - `GHSA-gcx4-mw62-g8wm` (DOM clobbering gadget in bundled scripts leading to XSS, **high**)
   - `GHSA-mw96-cpmx-2vgc` (arbitrary file write via path traversal, **high**)
   - Verified compatible: all 77 tests pass with rollup@4

### What was NOT fixed and why

**1. `npm/node_modules/**` vulnerability subtree** (~30 high/critical findings)

Dependency chain: `ember-cli-update@3.0.1` → `boilerplate-update@2.1.1` → `npx@10.2.2` bundles `npm@5.1.0` (a standalone npm copy from ~2018) with ancient, unfixable dependencies: `hawk`, `request`, `hoek`, `fstream`, `semver@2`, `ini`, `ansi-regex@3`, etc.

**Why not fixed:**
- npm audit suggests fixing by downgrading `ember-cli-update` to `0.34.13` — a **major regression** of the upgrade tooling itself
- The only way to eliminate these would be to remove `ember-cli-update` entirely (not viable for an active Ember codebase)

**Risk assessment: zero in practice**
- These code paths are **never executed in CI or production**
- They only run when a developer manually invokes `npx ember-cli-update` locally to upgrade the Ember framework version
- `npx` is a legacy package; modern npm workflows no longer use it

**2. `tmp ≤0.2.3`** (symlink attack, GHSA-52f5-9888-hmc6, high)

**Why not fixed:**
- There is **no newer version of `tmp` on npm** — the package is abandoned/orphaned
- No override or upgrade path exists

**Risk assessment: negligible**
- Only used during build toolchain's temporary directory creation
- Exploitation requires attacker to already have **local filesystem access** on the developer's machine
- Not a network or CI supply chain vector

**3. `diff` in `@ember-tooling/blueprint-model`** (jsdiff DoS, GHSA-73rr-hh4g-fpgx, high)

Dependency chain: `ember-cli` → `@ember-tooling/blueprint-model` → `diff@6-8.0.2`

**Why not fixed:**
- npm audit suggests downgrading `ember-cli` from `^6.12.0` to `6.6.0` — a **major regression**
- Only reasonable fix would be to fork/patch `@ember-tooling/blueprint-model` (too invasive)

**Risk assessment: very low**
- DoS can only be triggered by passing a **maliciously crafted diff string** to Ember CLI's blueprint scaffolding tools
- Blueprint commands (`ember generate component foo`) are only run locally by developers
- Not a vector in automated builds, CI, or templated scaffolding workflows

### Validation

1. `npm run test` passes (77/77 integration + unit tests).
2. `npm run lint` passes.
3. `npm audit` shows remaining 102 vulnerabilities, with 90+ in the unfixable `node_modules/npm/` and `node_modules/npx/` subtrees (dev-toolchain only).

### Practical outcome

1. **Production-facing risk is substantially reduced**: all actionable critical/high findings in actively used code paths have been addressed.
2. **Dev-toolchain risk is documented and scoped**: the remaining high-severity findings are in abandoned or deeply bundled dependencies that only execute outside of CI/production pipelines.
3. **Framework stability is maintained**: rollup@4 override is verified compatible with all current build and test tooling.

---

## Post-Ember-6 Modernization Follow-up (May 2026)

**Status**: Completed and validated.

### Commits in this batch

- `b6083dc` `ci modernization`
- `eb534c4` `.extend migration`
- `c9b0ee4` `get set computed migration`

### What changed

1. CI/runtime alignment cleanup:
  - removed legacy `.travis.yml`.
  - aligned GitHub Actions Node version to 18 in workflow files.
2. Remaining classic route/controller class patterns were migrated:
  - replaced `Route.extend(...)` / `Controller.extend(...)` with native classes in the remaining app files.
3. Remaining legacy property/computed patterns in migrated paths were modernized:
  - removed legacy `get/set/computed` usage in the upgraded route/store paths.
  - switched to direct property access and native getters in those paths.

### Validation

1. `npx ember test` passes (77/77) after each batch.

### Practical outcome

1. Post-Ember-6 cleanup is materially complete for class/property modernization in app code.
2. CI configuration now matches the repo Node engine baseline.

## Remaining Work (Not Yet Implemented)

These items are intentionally tracked as separate follow-up tracks and were not bundled into framework-major upgrade commits.

1. Build pipeline modernization (Embroider/Vite planning and rollout).
  - Reason: high-impact architecture change; should be isolated from framework-major stabilization.
2. UIKit upgrade to latest 3.x patch.
  - Reason: can introduce UI regressions and needs focused visual/smoke verification.
3. Prettier 3 upgrade.
  - Reason: broad formatting churn; better in a dedicated tooling PR to keep behavioral diffs reviewable.
4. Optional Node 20 adoption.
  - Reason: non-blocking for current Ember 6 baseline; should be done as a controlled runtime/tooling step.

## Upgrade to Ember 6.12.0

**Status**: Complete and validated on current branch state.

### Commits in this batch

- `ba6737b` `chore(deps): bump Ember core packages to 6.12`
- `b787965` `fix(test-bootstrap): load test modules via requirejs in classic build`
- `613023f` `refactor(deprecations): switch inject-as-service imports to service`
- `aa2dd84` `chore(deprecation-workflow): silence addon barrel-file warning`

### What changed

1. Bumped framework/tooling dependencies for Ember 6:
   - `ember-cli` -> `^6.12.0`
   - `ember-source` -> `~6.12.0`
   - `ember-cli-babel` -> `^8.3.1`
   - `ember-resolver` -> `^13.2.0`
   - `ember-page-title` -> `^9.0.3`
2. Updated test bootstrapping for this classic app setup:
   - `tests/test-helper.js` now loads only `*-test` modules via `requirejs.entries`.
3. Removed Ember 6 deprecated service import style across route/controller files:
   - replaced `import { inject as service } from '@ember/service'` with `import { service } from '@ember/service'`.
4. Kept strict deprecation mode and added a narrow silence rule for addon-internal noise:
   - silences `ember-cli-deprecation-workflow` v4.0.1 internal barrel-import message variants.

### Validation

1. `npm run lint` passes.
2. `npx ember test` passes (77/77).
3. `npx ember build` passes.

### Notes

1. `using-amd-bundles` deprecation warnings still appear in builds/tests.
2. This warning is expected for the current classic AMD setup and is an Ember 7 concern, not a blocker for Ember 6.

## Phase 3 & 4 - Deprecation Workflow & Node Engine Verification (Post Ember 5)

**Status**: Complete and validated.

### What changed

1. **Deprecation workflow audit**:
   - All 77 tests pass with `throwOnUnhandled: true` (strict mode).
   - 4 critical deprecations are configured to throw: `ember-global`, `ember.built-in-components.import`, `deprecated-run-loop-and-computed-dot-access`, `this-property-fallback`.
   - No new Ember 5 deprecations surfaced during test execution.
   - Workflow is ready for Ember 6 transition (will need update during 5->6 bump).

2. **Node engine verification**:
   - Current runtime: Node 18.20.8.
   - Engines in [package.json](package.json) correctly set to `>= 18`.
   - Testem override (`3.18.0`) remains in place for stability; can be revisited during Node 20 migration.

### Practical outcome

The application is in a stable, modernized state post-Ember 5:

1. **No legacy deprecations are firing** — strict deprecation workflow is holding.
2. **Component codebase is already Glimmer-first** — 20+ modern components, minimal classic patterns remain.
3. **Framework and tooling are clean** — ready for Ember 6 planning.

### Recommended next step

Plan and execute the Ember 6 migration in a dedicated batch after final QA sign-off on known issues.

## Phase 2 - Legacy Dependency Cleanup (Post Ember 5)

**Status**: Complete and validated.

### What changed

1. Removed legacy runtime and addon dependencies that are no longer used:
  - `@ember/jquery`
  - `corejs-typeahead`
  - `ember-fetch`
  - `croppie`
2. Removed obsolete build imports from [ember-cli-build.js](ember-cli-build.js):
  - `corejs-typeahead/dist/typeahead.jquery.js`
  - `croppie/croppie.js`
  - `croppie/croppie.css`
3. Removed stale typeahead plugin CSS wrappers/styles from [app/styles/app.css](app/styles/app.css) (`.twitter-typeahead`, `.tt-*`).
4. Tightened Node engine declaration in [package.json](package.json) from `14.* || 16.* || >= 18` to `>= 18`.
5. Regenerated lockfile after dependency removals.

### Why this is safe

1. App API transport already uses native `fetch` in [app/framework/api.js](app/framework/api.js).
2. Typeahead behavior is already implemented via plain input/modifier patterns, not plugin decoration.
3. Image upload flow was previously migrated to native preview/canvas handling.

### Validation

1. `npm install` completed with lockfile refresh.
2. `npm run lint` passes.
3. `npx ember test` passes (`77/77`).

### Notes for next phase

1. Known functional issues remain outside this cleanup scope:
  - language switch requires refresh and yields empty page afterward,
  - category click in Veranstaltungsthemen is currently not working.
2. These are tracked in [wiki/known-issues.md](wiki/known-issues.md) and should be handled during the remaining upgrade stream before final QA sign-off.

## Upgrade to Ember 5.12.0

**Status**: Complete and validated on Node 18 for the Ember 4 -> 5 step.

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
3. `npx ember test` **passes** (77/77)
4. `npm run test` gate is healthy again after test bootstrap and testem compatibility fixes

### Test runner compatibility fix applied

1. Added explicit test loading in `tests/test-helper.js` for `ember-qunit` 9:
  - `import { loadTests } from 'ember-qunit/test-loader';`
  - `loadTests();`
2. Pinned testem with npm overrides for Node 18 compatibility during Ember 5 stabilization:
  - `"overrides": { "testem": "3.18.0" }`

### Dev server startup fix applied

Root cause:

1. `npm run start` failed with:
  - `TypeError: Cannot read properties of undefined (reading 'replace')`
2. Stack trace pointed to:
  - `ember-cli-inject-live-reload/lib/index.js` in `serverMiddleware`
3. This addon is legacy and conflicts with the current Ember CLI 5 serve pipeline.

Fix:

1. Removed `ember-cli-inject-live-reload` from devDependencies.
2. Regenerated lockfile.

Why this is safe:

1. Ember CLI already provides live-reload behavior for `ember serve` without this addon.
2. The addon only injected reload middleware and is no longer required for standard development workflow.

Validation after fix:

1. `npm run start` now boots and serves on localhost.
2. `npm run lint` passes.
3. `npx ember test` passes (77/77).

### Practical status for next steps

- Application and tests are running on Ember 5 with Node 18
- Framework upgrade is complete for this stage
- Next stage can now focus on Ember 6 preparation, including planned Node 20 transition

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

