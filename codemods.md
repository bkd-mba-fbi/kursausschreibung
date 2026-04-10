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
- First codemod commit completed: `90764a3` (`chore(codemod): apply ember-qunit-codemod`)

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
  - TBD (to be added after run)

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
  - TBD (to be added after run)

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
  - TBD (to be added after run)
- Notes:
  - Medium risk; should be validated template-by-template with tests.

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
  - TBD

#### 5b) cp-property-map
- Why apply:
  - Modernizes map-related computed patterns.
- Command:
  - `npx ember-3x-codemods cp-property-map app/**/*.js`
- Source/docs:
  - https://github.com/ember-codemods/ember-3x-codemods
- Commit:
  - TBD

#### 5c) cp-volatile
- Why apply:
  - Removes/replaces volatile CP patterns deprecated over time.
- Command:
  - `npx ember-3x-codemods cp-volatile app/**/*.js`
- Source/docs:
  - https://github.com/ember-codemods/ember-3x-codemods
- Commit:
  - TBD

#### 5d) deprecate-merge
- Why apply:
  - Replaces deprecated `merge` usage with supported alternatives.
- Command:
  - `npx ember-3x-codemods deprecate-merge app/**/*.js`
- Source/docs:
  - https://github.com/ember-codemods/ember-3x-codemods
- Commit:
  - TBD

#### 5e) deprecate-router-events
- Why apply:
  - Updates deprecated router event hooks/patterns.
- Command:
  - `npx ember-3x-codemods deprecate-router-events app/**/*.js`
- Source/docs:
  - https://github.com/ember-codemods/ember-3x-codemods
- Commit:
  - TBD

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
- Commit:
  - TBD

### 6) qunit-dom-codemod
- Why apply:
  - Migrates assertion style to modern `qunit-dom` assertions.
  - Improves readability and consistency in integration tests.
- Typical scope:
  - `tests`
- Command:
  - `npx jscodeshift -t https://raw.githubusercontent.com/simplabs/qunit-dom-codemod/master/qunit-dom-codemod.js ./tests`
- Source/docs:
  - https://github.com/simplabs/qunit-dom-codemod
- Commit:
  - TBD
- Notes:
  - Remote transform URLs can fail intermittently; pinning local transform files is safer.

## About `ember-cli-update --run-codemods`
- We attempted manifest-driven codemod execution and repeatedly hit remote fetch failures (`404: Not Found`) in temporary jscodeshift transforms.
- Because of this, we run codemods explicitly command-by-command and commit each step.

## Commit Tracking Table
| Codemod | Status | Commit | Notes |
|---|---|---|---|
| ember-qunit-codemod | done | `90764a3` | Applied + helper wrapper fix |
| ember-test-helpers-codemod (integration) | pending | TBD | Run next |
| ember-test-helpers-codemod (acceptance) | pending | TBD | If acceptance tests exist |
| ember-modules-codemod | pending | TBD | Run after test codemods |
| ember-angle-brackets-codemod | pending | TBD | Validate templates carefully |
| ember-3x-codemods: cp-property | pending | TBD | Incremental |
| ember-3x-codemods: cp-property-map | pending | TBD | Incremental |
| ember-3x-codemods: cp-volatile | pending | TBD | Incremental |
| ember-3x-codemods: deprecate-merge | pending | TBD | Incremental |
| ember-3x-codemods: deprecate-router-events | pending | TBD | Incremental |
| ember-3x-codemods: fpe-on | pending | TBD | Incremental |
| ember-3x-codemods: fpe-observes | pending | TBD | Incremental |
| ember-3x-codemods: fpe-computed | pending | TBD | Incremental |
| qunit-dom-codemod | pending | TBD | Prefer pinned local transform |

## Decision Rule Per Codemod
- Keep codemod commit if:
  - tests pass, and
  - no functional regression observed.
- Revert codemod commit if:
  - it introduces breakage that outweighs migration value for now.
