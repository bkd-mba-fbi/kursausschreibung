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
| Total tests | 49 |
| Passed | 48 |
| Failed | 1 |
| Failing suite | `Integration | Component | event-list-search` |

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
| Component files | 22 | Full component test file presence exists | Presence alone does not imply meaningful behavior coverage |
| Integration test files | 22 | Structure coverage exists | Several tests are still generated placeholders (`it renders`, `template block text`) |
| Strengthened suites | 8 | `area-navigation`, `event-list-item`, `event-details-table`, `input-base`, `list-pagination`, `remaining-seats-badge`, `status-lamp`, `twitter-feed` now use behavior assertions | Additional behavior depth still needed for input subcomponents and form-heavy components |
| Known unstable suite | 1 | `event-list-search` currently has a runtime timeout in isolated integration run | Needs refactor to remove render-time side effects and make filtering logic test-safe |
| Overall status | Mixed | Good progress on key components, but still one flaky/failing component and multiple shallow tests | Replace remaining placeholder tests with behavior assertions |

## Priority Gaps To Close Next

1. Fix `event-list-search` integration timeout and add stable behavior tests.
2. Replace placeholder tests under `tests/integration/components/input/*` with field-specific behavior assertions.
3. Strengthen `subscription-form` integration coverage for:
	- add/remove person behavior
	- required field behavior
	- conditional sections (company address, additional people, login hint)
4. Add coverage tooling (`ember-cli-code-coverage`) when suite is stable, then track statement/branch/function/line percentages.

