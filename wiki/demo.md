# Upgrade Summary (Demo)

In short:
- Upgrade is done
- Short demo of results, especially behavior changes
  - old
  ```
  cd C:\repos\kursausschreibung-ember3
  ember serve
  ```
  - new
  ```
  cd C:\repos\kursausschreibung
  npm run start
  ```
- How can we  have a review and merge into dev?
- Build tool modernization is open
- renovate & dependabot: How can one of this tools help staying current? Which fits better?

## What I did
- Followed the upgrade process in [upgrade.md](upgrade.md):
  - Write tests
  - Keep tests green
  - Fix deprecations via deprecation workflow
  - Upgrade
  - Repeat
- Logged progress in [upgradeLog.md](upgradeLog.md).
- Kept commits small for traceability.

## Stability
- Ran `npm audit`.
- Checked Walid's modernization checklist.
- Re-ran Ember tests after each migration batch.
- Documented remaining "unfixable" audit findings in [upgradeLog.md](upgradeLog.md).

## Behavior changes
- Typeahead plugin behavior was removed. PLZ field now uses a custom Glimmer combobox: debounced async lookup, keyboard-navigable dropdown, fills both PLZ and Ort on selection. No addon dependency.
- Image clipper flow (Croppie / jQuery) was removed and replaced with Cropper.js v2: web-component based crop modal that opens on JPEG selection, supports resize/move, and produces a canvas-processed result. Non-JPEG files skip the modal entirely.
  - Why do we crop and why do we only support jp?
- Related regressions found during upgrade were fixed (language switch reliability and category filter clicks).

## Developer-facing changes
- Tip: Work through an Ember 6 tutorial
- [behavior-change-test-guide.md](behavior-change-test-guide.md)
- Framework jump: Ember 3.28.6 -> Ember 6.12.x.
- Added npm scripts to not rely on ember installed globally. Run dev serve with `npm run start`
- Implemented tests. Run them with `npm run test`.
- Core modernization completed:
  - 0 remaining Route/Controller `.extend` definitions in app code.
  - 0 remaining legacy `get/set/computed` patterns in migrated route/store paths.
- Patterns to use now:
  - Native classes for routes/controllers/components.
  - Direct property access instead of Ember `get/set` helpers.
  - Native getters (and tracked state where needed) instead of classic `computed()` macros.
  - Angle-bracket invocation by default; dynamic `{{component ...}}` only for runtime-selected component types.
- Removed patterns/addons that are no longer valid for this codebase direction:
  - jQuery-based app patterns (`@ember/jquery`, plugin typeahead/croppie flows).
  - `ember-cli-inject-live-reload` (legacy middleware addon).
- Validation baseline: 77/77 Ember tests green after each migration batch.
- CI aligned to Node 18 and legacy Travis config removed.

### First Glimmer component: what to know
- Use a class-based component and read inputs from `this.args`.
- Keep local mutable UI state explicit (`@tracked` only where needed).
- Use actions for user events; avoid implicit side effects.
- Keep templates in angle-bracket style with explicit data flow.
- Follow project-specific examples and decisions here:
  - [ember4-refactorings.md](ember4-refactorings.md)
  - [upgradeLog.md](upgradeLog.md)
  - [testing.md](testing.md)

## Not done yet
- Build tooling modernization (Vite / Embroider).
  - Current test output still warns that the legacy build pipeline is deprecated and removed in Ember 7.
- Remaining dependency modernization:
  - UIKit update: potential UI regressions, move to dedicated PR.
  - Prettier 3: broad formatting churn, move to dedicated PR.

# Pull Request
- Should I integrate changes from dev to ember-upgrade branch?
- PR to DEV
- What happens after merge?
  - GitHub Action: Should work, changed to node 18

# TODO
- Clean up separate worktree
`git -C C:/repos/kursausschreibung worktree remove C:/repos/kursausschreibung-ember3`
