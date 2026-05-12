# Upgrade Summary (Demo)

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
- Typeahead plugin behavior was removed and replaced with native input handling.
- Image clipper flow (Croppie) was removed and replaced with native preview/canvas processing.
- Related regressions found during upgrade were fixed (language switch reliability and category filter clicks).

## Developer-facing changes
- [behavior-change-test-guide.md](behavior-change-test-guide.md)
- Framework jump: Ember 3.28.6 -> Ember 6.12.x.
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
