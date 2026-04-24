# Behavior Change Test Guide

## Purpose

This guide lists behavior-sensitive areas that changed during the Ember 4 hardening and Ember 5 upgrade work.

Use it as a focused manual QA checklist for application owner validation.

## Scope

The following technical changes are covered:

1. API transport migration from jQuery ajax to fetch.
2. Input component refactors (typeahead, file upload, image processing).
3. Pagination/template compatibility fixes.
4. Test and runtime bootstrapping updates.
5. Removal of legacy runtime dependencies and middleware.

## High Priority Owner Checks

### 1. Event list browsing flow

Why this matters:

1. Event list and pagination internals were refactored.

Steps:

1. Open list overview page.
2. Confirm events render.
3. Use pagination controls: previous, next, first page, last page.
4. Apply search and category/tag filtering.
5. Change filters while on page 2+.

Expected:

1. No empty or duplicated pages.
2. Active page highlighting remains correct.
3. Search/filter results and pagination stay in sync.
4. No navigation loop or broken links.

### 2. Event detail rendering

Why this matters:

1. Display components were converted to modern component style.

Steps:

1. Open several event details with different data completeness.
2. Check details table fields, optional text blocks, badges, and status lamp.
3. Trigger ICS download if available.

Expected:

1. No missing labels or shifted field names.
2. Status badges/icons remain accurate.
3. ICS download still works.

### 3. Subscription form happy path

Why this matters:

1. This area has the most dependent inputs and API interactions.

Steps:

1. Open subscription form for an event with seats.
2. Fill standard personal fields and required inputs.
3. Submit a non-destructive happy path test.

Expected:

1. Validation messages appear where expected.
2. Submission proceeds without client errors.
3. Confirmation page renders correct summary data.

## Input Behavior Checks

### 4. Freeform dropdown input

What changed:

1. jQuery typeahead plugin behavior was removed.
2. Freeform input now relies on plain input behavior.

Steps:

1. Enter known and unknown values.
2. Tab out of field.

Expected:

1. Entered values persist.
2. Dependent form logic still reacts on focusout.

### 5. Postal code input and location autofill

What changed:

1. jQuery typeahead was replaced with native input behavior and async suggestions.

Steps:

1. Enter at least 2 digits of postal code.
2. Select a suggested code (if suggestions are present).
3. Change to another code.

Expected:

1. Suggestions appear for valid prefixes.
2. Location field auto-populates correctly for selected code.
3. No stale location value remains after changing code.

### 6. File upload and image processing

What changed:

1. Croppie and jQuery image flow were replaced with native preview and canvas processing.

Steps:

1. Upload allowed non-image file type where supported.
2. Upload JPEG where image workflow is enabled.
3. Verify preview appears.
4. Use upload/confirm image action.
5. Delete selected file.
6. Try invalid type and oversized file.

Expected:

1. File name label updates correctly.
2. JPEG preview and processed image preview behave correctly.
3. Delete resets control state and required marker behavior.
4. Type/size rejection messages still appear.

## API and Confirmation Checks

### 7. Duplicate person and existing person handling

What changed:

1. API layer moved from jqXHR callback patterns to fetch response/header handling.

Steps:

1. Submit form with person data that already exists in backend.
2. Submit form with new person data.

Expected:

1. Existing person path still updates/uses existing identity correctly.
2. New person path still resolves created identifier.
3. No generic error shown when backend returns duplicate headers.

### 8. File attachment submission on subscription

What changed:

1. Header and response handling moved to fetch-based flow.

Steps:

1. Submit subscription with file attachment.
2. Verify confirmation path completes.

Expected:

1. Attachment is accepted by backend.
2. Confirmation flow does not break on attachment upload.

## Runtime and Operational Checks

### 9. Local startup and hot reload

What changed:

1. Legacy live-reload middleware addon was removed.

Steps:

1. Start app with npm run start.
2. Edit a template text locally.
3. Reload browser if hot reload does not auto-refresh.

Expected:

1. App starts without startup exceptions.
2. Development workflow remains usable.

### 10. Regression baseline command checks

Run:

1. npm run lint
2. npx ember test
3. npm run test

Expected:

1. Lint clean.
2. Tests execute and pass.
3. Combined gate remains green.

## Known Non-Blocking Warnings

During test runs, you may still see deprecations about component template resolving.

This is expected at current stage and is planned for follow-up modernization before or during Ember 6 hardening.

## Suggested QA Sign-Off Format

For each section above, record:

1. Passed / Failed
2. Environment and browser
3. Event ID or data used
4. Screenshot or error snippet for failures
5. Repro steps for failures

This will make follow-up fixes fast and auditable.