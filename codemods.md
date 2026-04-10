# Codemod Runbook (Ember 3.28 -> 4.12)

## Goal
This runbook documents which codemods we apply for the Ember 4 migration, why each codemod is useful, where its behavior is documented, and which commit contains the change.

## How We Apply Codemods
1. Run one codemod at a time.
2. Run tests after each codemod.
3. Commit each codemod separately (even if no-op, we note it here).
4. If a codemod introduces regressions, revert that codemod commit only.

## Current Status
- Branch: `ember-upgrade`
- All planned codemods applied. See commit tracking table below.

## Codemod Inventory For Ember 4

### 1) ember-qunit-codemod
- Why apply:
  - Modernizes older QUnit module/setup patterns to current `ember-qunit` style.
  - Reduces manual test maintenance and aligns with modern Ember test conventions.
- Typical scope:
  - `tests/**/*.js`
- Command:
  - `npx ember-qunit-codemod convert-module-for-to-setup-test ./tests/**/*.js`
- Source/docs:
  - https://github.com/ember-codemods/ember-qunit-codemod
- Commit:
  - `90764a3`
- Notes:
  - In this repo, this codemod changed test formatting/module wrappers and required a helper import fix in `tests/helpers/index.js`.

### 2) ember-test-helpers-codemod
- Why apply:
  - Updates test helper APIs/usages to modern `@ember/test-helpers` style.
  - Helps remove legacy helper patterns that create friction in newer Ember versions.
- Typical scope:
  - `tests/integration`, `tests/acceptance`
- Commands:
  - `npx ember-test-helpers-codemod integration tests/integration`
  - `npx ember-test-helpers-codemod acceptance tests/acceptance`
- Source/docs:
  - https://github.com/ember-codemods/ember-test-helpers-codemod
- Commit:
  - `08c1dc3` (no-op — tests already used modern helpers)

### 3) ember-modules-codemod
- Why apply:
  - Converts old global/classic imports to ES module imports.
  - Good foundation for later Octane-oriented refactors.
- Typical scope:
  - app + tests JS files
- Command:
  - `npx ember-modules-codemod`
- Source/docs:
  - https://github.com/ember-cli/ember-modules-codemod
- Commit:
  - `cf4b8bc` (cosmetic import reformatting in 2 files; 3 files skipped due to optional-chaining syntax newer than bundled babylon parser)
- Notes:
  - Skipped files (`form-helpers.js`, `list-pagination.js`, `status-lamp-test.js`) already use explicit imports — no action needed.

### 4) ember-angle-brackets-codemod
- Why apply:
  - Migrates classic invocation syntax to angle-bracket components in templates.
  - Improves readability and gets templates closer to modern Octane style.
- Typical scope:
  - `app/templates`
- Command:
  - `npx ember-angle-brackets-codemod app/templates`
- Source/docs:
  - https://github.com/ember-codemods/ember-angle-brackets-codemod
- Commit:
  - `ac889f0` (no-op — all invocations use positional parameters which the codemod cannot auto-convert)
- Notes:
  - Medium risk; should be validated template-by-template with tests.
  - All `{{translate}}` and `{{area-navigation}}` usages were skipped — manual migration needed.

### 5) ember-3x-codemods (targeted transforms)
These codemods address specific deprecated API patterns.

#### 5a) cp-property
- Why apply:
  - Updates computed-property macro usage that changed over Ember 3.x/4.x evolution.
- Command:
  - `npx ember-3x-codemods cp-property app/**/*.js`
- Source/docs:
  - https://github.com/ember-codemods/ember-3x-codemods
- Commit:
  - `615cacd` (cosmetic whitespace fix in vendored `ics-file.js`)

#### 5b) cp-property-map
- Why apply:
  - Modernizes map-related computed patterns.
- Command:
  - `npx ember-3x-codemods cp-property-map app/**/*.js`
- Source/docs:
  - https://github.com/ember-codemods/ember-3x-codemods
- Commit:
  - `6f3598e` (no-op)

#### 5c) cp-volatile
- Why apply:
  - Removes/replaces volatile CP patterns deprecated over time.
- Command:
  - `npx ember-3x-codemods cp-volatile app/**/*.js`
- Source/docs:
  - https://github.com/ember-codemods/ember-3x-codemods
- Commit:
  - `42ad8d9` (no-op)

#### 5d) deprecate-merge
- Why apply:
  - Replaces deprecated `merge` usage with supported alternatives.
- Command:
  - `npx ember-3x-codemods deprecate-merge app/**/*.js`
- Source/docs:
  - https://github.com/ember-codemods/ember-3x-codemods
- Commit:
  - `79f5ddb` (no-op)

#### 5e) deprecate-router-events
- Why apply:
  - Updates deprecated router event hooks/patterns.
- Command:
  - `npx ember-3x-codemods deprecate-router-events app/**/*.js`
- Source/docs:
  - https://github.com/ember-codemods/ember-3x-codemods
- Commit:
  - `4bd9d8f` (no-op)

#### 5f) fpe-on / fpe-observes / fpe-computed
- Why apply:
  - Migrates function-prototype extension dependent patterns.
  - Useful when old `.on()`, `.observes()`, `.property()` chains exist.
- Commands:
  - `npx ember-3x-codemods fpe-on app/**/*.js`
  - `npx ember-3x-codemods fpe-observes app/**/*.js`
  - `npx ember-3x-codemods fpe-computed app/**/*.js`
- Source/docs:
  - https://github.com/ember-codemods/ember-3x-codemods
- Commits:
  - fpe-on: `1f6b6ad` (no-op)
  - fpe-observes: `982cc9c` (no-op)
  - fpe-computed: `9a8b8c6` (no-op)

### 6) qunit-dom-codemod
- Why apply:
  - Migrates assertion style to modern `qunit-dom` assertions.
  - Improves readability and consistency in integration tests.
- Typical scope:
  - `tests`
- Command:
  - `npx jscodeshift -t https://raw.githubusercontent.com/simplabs/qunit-dom-codemod/master/qunit-dom-codemod.js ./tests`
- Source/docs:
  - https://github.com/mainmatter/qunit-dom-codemod
- Commit:
  - `29d3e65` (20 test files updated with modern `assert.dom()` assertions)
- Notes:
  - Repo was moved from `simplabs` to `mainmatter`; remote URL in manifest is stale (404).
  - Transform was saved locally as `tmp-qunit-dom-codemod.js` and deleted after use.

## About `ember-cli-update --run-codemods`
- We attempted manifest-driven codemod execution and repeatedly hit remote fetch failures (`404: Not Found`) in temporary jscodeshift transforms.
- Because of this, we run codemods explicitly command-by-command and commit each step.

## Commit Tracking Table
| Codemod | Status | Commit | Notes |
|---|---|---|---|
| ember-qunit-codemod | done | `90764a3` | Applied + helper wrapper import alias fix |
| ember-test-helpers-codemod (integration) | done | `08c1dc3` | No-op — already modern |
| ember-test-helpers-codemod (acceptance) | n/a | — | No acceptance tests in repo |
| ember-modules-codemod | done | `cf4b8bc` | Cosmetic import formatting in 2 files; 3 files skipped (optional chaining) |
| ember-angle-brackets-codemod | done | `ac889f0` | No-op — all templates use positional params; manual migration needed |
| ember-3x-codemods: cp-property | done | `615cacd` | Trivial whitespace fix in vendored file |
| ember-3x-codemods: cp-property-map | done | `6f3598e` | No-op |
| ember-3x-codemods: cp-volatile | done | `42ad8d9` | No-op |
| ember-3x-codemods: deprecate-merge | done | `79f5ddb` | No-op |
| ember-3x-codemods: deprecate-router-events | done | `4bd9d8f` | No-op |
| ember-3x-codemods: fpe-on | done | `1f6b6ad` | No-op |
| ember-3x-codemods: fpe-observes | done | `982cc9c` | No-op |
| ember-3x-codemods: fpe-computed | done | `9a8b8c6` | No-op |
| qunit-dom-codemod | done | `29d3e65` | 20 test files updated; transform fetched locally (mainmatter repo) |

## Decision Rule Per Codemod
- Keep codemod commit if:
  - tests pass, and
  - no functional regression observed.
- Revert codemod commit if:
  - it introduces breakage that outweighs migration value for now.
