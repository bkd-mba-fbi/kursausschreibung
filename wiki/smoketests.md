# Smoke Tests for Ember Upgrade

## Overview

Smoke tests are high-value, thin acceptance tests covering the most critical user workflows. They serve as your first regression signal during the Ember upgrade and provide confidence that core functionality remains intact across major framework changes.

For this project, smoke tests should focus on the event listing, search/filter, and subscription flows—the core business logic.

## Critical Flows to Test

### 1. Load App and Display Event List
**Why it matters:** App bootstrap, routing, and initial data loading are common upgrade pain points.

**Test steps:**
1. Navigate to the app root (hash-based routing)
2. Verify the event list renders
3. Verify at least one event displays with title, location, and seats info
4. Verify category navigation renders

**Expected:** List page displays with events and no console errors.

### 2. Search/Filter Events
**Why it matters:** Search component uses observers, keyUp handlers, and state mutation—all common upgrade friction.

**Test steps:**
1. Go to list page
2. Type in the search input field
3. Verify filtered events display matching the query
4. Verify non-matching events disappear
5. Clear search and verify all events reappear

**Expected:** Filter works without lag or errors; rendered results update reactively.

### 3. Open Event Details
**Why it matters:** Route transitions and nested component rendering are easy to break.

**Test steps:**
1. From list page, click an event
2. Verify event details page loads
3. Verify subscription form is visible
4. Verify event metadata (dates, seats, category) displays

**Expected:** Details page renders correctly with all information.

### 4. Subscription Form Submission
**Why it matters:** Form handling, validation, and API calls are upgrade-sensitive.

**Test steps:**
1. From event details, fill in subscription form with valid data
2. Submit the form
3. Verify success or error message displays appropriately
4. For success: verify redirect to confirmation page or success message

**Expected:** Form submission completes without console errors; feedback is displayed.

### 5. Category Filter (Sidebar or Dropdown)
**Why it matters:** If event category filtering exists, it exercises the UI kit integration and dynamic rendering.

**Test steps:**
1. From list page, select a category
2. Verify list updates to show only that category's events
3. Verify URL reflects the category filter

**Expected:** Category filter works and events re-render.

### 6. Permalink/Deep Link
**Why it matters:** URL-based routing and parameter handling are common break points.

**Test steps:**
1. Open a direct event permalink (e.g., `/uid/:event_id`)
2. Verify the correct event details page loads
3. Verify all event data displays

**Expected:** Deep link works and loads the correct event.

## Implementation Strategy

### Minimize Dependencies, Maximize Coverage
- Keep tests lean: one assertion per user action where possible.
- Use built-in Ember test helpers, avoid page object libraries initially.
- Focus on rendered output, not internal state.

### Where to Put Them
1. **Option A:** Add to `tests/acceptance/` folder (if not already there) as application tests.
2. **Option B:** Start with high-level integration tests in specific component folders.
3. **Option C:** Keep as manual checklist in CI or alongside test automation.

### Run Them Often
- Before and after every major upgrade step (3.28 → 4.x, 4.x → 5.x, etc.).
- Add to CI as required checks; fail CI if any fail.
- Run locally before committing changes.

## Example Test Shell

```javascript
// tests/acceptance/smoke-list-and-search-test.js
import { module, test } from 'qunit';
import { visit, fillIn, findAll } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | Smoke Tests | List and Search', function(hooks) {
  setupApplicationTest(hooks);

  test('list page loads with events', async function(assert) {
    await visit('/');
    const eventItems = findAll('[data-test-event-item]');
    assert.ok(eventItems.length > 0, 'At least one event renders');
  });

  test('search filters events', async function(assert) {
    await visit('/');
    const initialCount = findAll('[data-test-event-item]').length;
    
    await fillIn('#searchEvents', 'query-term');
    const filteredCount = findAll('[data-test-event-item]').length;
    
    // Verify at least one event was filtered out
    assert.ok(filteredCount <= initialCount, 'Search filtering works');
  });
});
```

## Monitoring Deprecations During Smoke Tests

When running smoke tests during upgrade:
1. Use `ember-cli-deprecation-workflow` to collect new warnings.
2. Document any new deprecations found.
3. Plan cleanup; do not accumulate deprecations across steps.

## Success Criteria

All smoke tests pass ✓ before proceeding to the next Ember major version.

If a smoke test fails during upgrade:
1. Stop and fix the blocker before continuing.
2. Do not commit/merge if smoke tests are red.
3. Consider reverting recent changes and taking a different approach.

## Checklist Before Upgrade

- [ ] Write or update smoke tests to cover the 6 critical flows above
- [ ] Run smoke tests on baseline (current 3.28) and verify all pass
- [ ] Commit smoke tests to version control
- [ ] Add smoke tests to CI pipeline as required checks
- [ ] Document any manually verified flows (if acceptance tests are not feasible yet)
