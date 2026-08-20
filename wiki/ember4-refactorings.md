# Ember 4 Refactorings

## Purpose
This document defines the refactoring work we should do while staying on Ember 4.x, before any jump to Ember 5/6.

Goal:
- reduce upgrade risk,
- remove legacy patterns that are costly to maintain,
- make later major upgrades mostly dependency and compatibility work.

## Refactoring Principles
1. Keep behavior stable first; refactor in small batches.
2. One theme per pull request (templates, components, tests, etc.).
3. Keep tests green after each batch.
4. Prefer codemod + manual review over broad rewrites.

## Priority Refactoring Areas

### 1) Templates: move from positional args and legacy invocation patterns
Why:
- Angle-bracket migration is blocked by positional-arg helper/component usage.
- Named args improve readability and compatibility with modern Ember tooling.

What to do:
- Replace positional invocations where possible with named args.
- Adopt angle-bracket invocation for components once call sites are compatible.

Read more:
- https://github.com/emberjs/rfcs/blob/main/text/0311-angle-bracket-invocation.md
- https://guides.emberjs.com/release/components/
- https://guides.emberjs.com/release/components/component-arguments-and-html-attributes/
- https://github.com/ember-codemods/ember-angle-brackets-codemod

### 2) Component model: gradually migrate classic components to Glimmer components
Why:
- Classic `Component.extend` patterns are harder to evolve and lint strictly.
- Glimmer components are the modern default and reduce lifecycle complexity.

What to do:
- Start with leaf components (few dependencies).
- Convert to native classes + `@glimmer/component` where no classic APIs are required.
- Keep classic components where required, but isolate and document why.

Read more:
- https://guides.emberjs.com/release/upgrading/current-edition/glimmer-components/
- https://guides.emberjs.com/release/components/

### 3) State management: replace old computed/get/set patterns with tracked/native patterns where reasonable
Why:
- Legacy computed chains are harder to reason about.
- Tracked state gives clearer update semantics.

What to do:
- Introduce `@tracked` for mutable component state.
- Reduce `get`/`set` usage in newly touched code.
- Keep stable computed logic unless there is clear value in rewriting.

Read more:
- https://guides.emberjs.com/release/in-depth-topics/autotracking-in-depth/
- https://guides.emberjs.com/release/upgrading/current-edition/

### 4) Actions and DOM behavior: prefer `@action` and element modifiers over legacy hooks
Why:
- Modern Ember patterns are explicit and testable.
- Reduces dependence on classic lifecycle hooks.

What to do:
- Use `@action` in native classes.
- Move DOM setup from lifecycle hooks to element modifiers where possible.

Read more:
- https://guides.emberjs.com/release/in-depth-topics/patterns-for-actions/
- https://guides.emberjs.com/release/components/template-lifecycle-dom-and-modifiers/
- https://github.com/emberjs/ember-render-modifiers

### 5) jQuery dependency reduction
Why:
- jQuery-centric code is legacy-heavy and can block modernization.
- Native DOM APIs are sufficient for most current use cases.

What to do:
- Replace simple selectors/manipulation with native DOM APIs.
- Keep unavoidable jQuery usage isolated behind helper functions.

Read more:
- https://deprecations.emberjs.com/
- https://guides.emberjs.com/release/components/template-lifecycle-dom-and-modifiers/

### 6) Test modernization
Why:
- Modern test assertions/readability reduce migration risk.
- Better tests make refactoring safer.

What to do:
- Continue using modern `setup*Test` patterns.
- Prefer `assert.dom()` style assertions.
- Keep integration tests for critical flows (subscription, confirmation, list/filter).

Read more:
- https://guides.emberjs.com/release/testing/
- https://github.com/mainmatter/qunit-dom-codemod

### 7) Lint hardening in phases
Why:
- Strict lint all at once creates noisy, risky changes.
- Rule-by-rule enablement keeps diffs reviewable.

What to do:
- Re-enable one strict Ember lint rule (or small group) at a time.
- Fix violations.
- Commit and verify tests.

Read more:
- https://github.com/ember-cli/eslint-plugin-ember
- https://github.com/ember-template-lint/ember-template-lint

## Suggested Execution Order
1. Template argument cleanup (to unlock angle brackets).
2. Angle-bracket component invocation migration.
3. Leaf component migrations to Glimmer/native class.
4. jQuery reduction in high-value paths.
5. Strict lint rule re-enablement in small batches.

## Actionable PR Checklist (First 3 Batches)

Use this as the concrete next work plan. Each batch should be one pull request.

### PR Batch 1: Helper argument normalization + low-risk template cleanup
Scope:
1. Normalize helper/component invocations that are blockers for angle-bracket conversion.

Primary file targets:
1. `app/templates/application.hbs`
2. `app/templates/index.hbs`
3. `app/templates/error.hbs`
4. `app/templates/list.hbs`
5. `app/templates/list/index.hbs`
6. `app/templates/components/area-navigation.hbs`
7. `app/templates/components/event-details-table.hbs`
8. `app/templates/components/event-list-search.hbs`
9. `app/templates/list/category/event/index.hbs`
10. `app/templates/list/category/event/confirmation.hbs`
11. `app/templates/list/category/event/confirmation-error.hbs`
12. `app/templates/list/category/event/confirmation-loading.hbs`

What to do in this PR:
1. Replace positional helper usage where practical, starting with `translate` call sites.
2. Keep behavior unchanged (same rendered text and same keys).
3. Do not migrate component classes yet.

Validation:
1. `npx ember test`
2. Manual smoke: list page, event detail, confirmation and confirmation-error views.

Definition of done:
1. No behavior change in translated labels/messages.
2. Templates touched in this PR are ready for angle-bracket conversion in the next batch.

### PR Batch 2: Angle-bracket invocation migration for stable templates
Scope:
1. Convert compatible component invocations from curly to angle-bracket syntax.

Primary file targets:
1. `app/templates/application.hbs`
2. `app/templates/index.hbs`
3. `app/templates/list.hbs`
4. `app/templates/list/index.hbs`
5. `app/templates/list/category.hbs`
6. `app/templates/list/category/index.hbs`
7. `app/templates/list/category/event/index.hbs`
8. `app/templates/list/category/event/subscribe.hbs`
9. `app/templates/list/category/event/confirmation.hbs`
10. `app/templates/components/event-list.hbs`
11. `app/templates/components/event-list-item.hbs`
12. `app/templates/components/list-pagination.hbs`
13. `app/templates/components/status-lamp.hbs`
14. `app/templates/components/remaining-seats-badge.hbs`

What to do in this PR:
1. Convert only invocations with clear named arguments.
2. Skip risky call sites that still depend on positional semantics.
3. Keep skipped cases listed in the PR description for follow-up.

Validation:
1. `npx ember test`
2. `npm run start` and click through list/filter/pagination/subscribe flow.

Definition of done:
1. Converted templates render identically.
2. No new runtime errors in primary user journey.

### PR Batch 3: Leaf component native-class/Glimmer migration
Scope:
1. Migrate low-coupling components first to reduce risk.

Primary file targets:
1. `app/components/status-lamp.js`
2. `app/components/remaining-seats-badge.js`
3. `app/components/twitter-feed.js`
4. `app/components/input/input-checkbox.js`
5. `app/components/input/input-date.js`
6. `app/components/input/input-number.js`
7. `app/components/input/input-string.js`
8. `app/components/input/input-telephone.js`
9. `app/components/input/input-textarea.js`
10. `app/components/input/input-email.js`

Related test targets:
1. `tests/integration/components/status-lamp-test.js`
2. `tests/integration/components/remaining-seats-badge-test.js`
3. `tests/integration/components/twitter-feed-test.js`
4. `tests/integration/components/input/*.js`

What to do in this PR:
1. Convert class syntax and action handling.
2. Introduce `@tracked` only where mutable state exists.
3. Keep DOM behavior unchanged.

Validation:
1. `npx ember test`
2. Focus tests while iterating:
	- `npx ember test --filter "Integration | Component | status-lamp"`
	- `npx ember test --filter "Integration | Component | remaining-seats-badge"`
	- `npx ember test --filter "Integration | Component | input/"`

Definition of done:
1. Migrated components are behaviorally equivalent.
2. Tests for those components pass without compatibility hacks.

## Tracking Template For Each PR
Use this mini-checklist in every PR description:
1. Objective of this batch.
2. File list (exact files changed).
3. Risks and intentional non-goals.
4. Test commands run.
5. Manual smoke steps completed.
6. Follow-up items deferred to next batch.

## Definition of Done For Ember 4 Refactoring Phase
1. Main user flows pass smoke tests and automated tests.
2. No known blocker deprecations in active paths.
3. Template/component surface is mostly modernized.
4. Lint rules are stricter than current compatibility mode and enforced in CI.

## Notes For This Repo
- This app has custom host-page and classic boot assumptions; preserve behavior during refactors.
- Prefer incremental conversion over architecture rewrites.
- Track each refactoring theme in its own PR for easier rollback and review.
