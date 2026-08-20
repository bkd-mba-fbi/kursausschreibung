# Testing Guide

## How We Test

We use Ember's built-in test runner (`ember test`) with QUnit.

Current workflow:

1. Run focused suites during development:
	- `npx ember test --filter "Integration | Component | <name>"`
	- `npx ember test --filter "Unit | Route | <name>"`
2. Run full suite before commit:
	- `npx ember test`
3. Prefer behavior assertions over generated placeholder tests.

Current full test snapshot (latest local run):

| Metric | Value |
| --- | --- |
| Total tests | 78 |
| Passed | 78 |
| Failed | 0 |
| Failing suite | none |

Important note:

- We currently do not have code coverage instrumentation configured (`ember-cli-code-coverage` is not installed), so we track test breadth and quality by suite status and assertion depth.

## Which Test Types We Have

| Test Type | Location | Purpose |
| --- | --- | --- |
| Unit tests (routes) | `tests/unit/routes` | Route existence and basic route behavior wiring |
| Unit tests (controllers) | `tests/unit/controllers` | Controller wiring and basic controller creation |
| Integration tests (components) | `tests/integration/components` | Component rendering, state handling, and UI behavior |

## Test Type Status Tables

### 1) Unit Tests - Routes

| State | Count | Notes | Not Tested Yet |
| --- | --- | --- | --- |
| Route files | 13 | All route files have matching unit test files | Deep route behavior (model transformations, redirects, side effects) is only lightly covered |
| Route test files | 13 | Good one-to-one structure coverage | Error-path behavior and data-edge cases are mostly not asserted |
| Overall status | Stable | Structural baseline is in place | More behavior assertions needed per route |

### 2) Unit Tests - Controllers

| State | Count | Notes | Not Tested Yet |
| --- | --- | --- | --- |
| Controller files | 6 | All controller files have matching unit test files | Most tests are existence/wiring level |
| Controller test files | 6 | Good one-to-one structure coverage | Query-param logic, computed behavior, and action behavior are mostly not covered |
| Overall status | Stable | Good baseline for upgrade safety at wiring level | Add behavior-focused assertions for business logic |

### 3) Integration Tests - Components

| State | Count | Notes | Not Tested Yet |
| --- | --- | --- | --- |
| Component files | 22 | Full component test file presence exists | Remaining gaps are mostly depth/edge-cases, not missing suites |
| Integration test files | 22 | Structure coverage exists and tests are now behavior-focused | Some plugin-heavy controls (typeahead/file upload) still use presence-oriented assertions for stability |
| Strengthened suites | 22 | All component integration suites were migrated away from generated placeholder assertions | Add more interaction-level assertions for complex JS plugins and async workflows |
| Known unstable suite | 0 | Previous `event-list-search` flakiness was resolved | Keep test-only side effects guarded to prevent regressions |
| Overall status | Stable | Component integration suite is green in full run | Expand negative-path and edge-case coverage |

## Priority Gaps To Close Next

1. Add code coverage tooling (`ember-cli-code-coverage`) and publish statement/branch/function/line baselines.
2. Increase depth for plugin-driven input tests (`typeahead`, upload/croppie) with interaction-level assertions.
3. Add more negative-path cases for `subscription-form` (validation and submission edge paths).
4. Add acceptance/E2E smoke flows for key user journeys (list -> category -> event -> subscribe).

