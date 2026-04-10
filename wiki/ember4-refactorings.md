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

## Definition of Done For Ember 4 Refactoring Phase
1. Main user flows pass smoke tests and automated tests.
2. No known blocker deprecations in active paths.
3. Template/component surface is mostly modernized.
4. Lint rules are stricter than current compatibility mode and enforced in CI.

## Notes For This Repo
- This app has custom host-page and classic boot assumptions; preserve behavior during refactors.
- Prefer incremental conversion over architecture rewrites.
- Track each refactoring theme in its own PR for easier rollback and review.
