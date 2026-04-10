# Ember 5 Next Steps

## Current State

Branch status at pause point:

1. Ember 4 hardening work is complete on `ember-upgrade`.
2. `npm run lint` passes.
3. `npx ember test` passes with 78/78 tests.
4. `ember/no-component-lifecycle-hooks` is enabled and clean.
5. `ember/no-jquery` is enabled and clean.
6. Classic component base-class usage has been removed from `app/components`.
7. API transport already uses `fetch` instead of `$.ajax`.

This means the next step is no longer broad legacy cleanup. The main work is now Ember 5 compatibility and addon/dependency alignment.

## Recommended Resume Order

### 1. Confirm runtime/tooling baseline

Before changing dependencies:

```powershell
node -v
npm -v
npm install
npm run lint
npx ember test
```

Target runtime for the 4.x -> 5.x step:

1. Prefer Node 18 LTS.
2. Keep one Node version pinned during the whole bump.

### 2. Audit package compatibility before updating

Inspect current dependency versions and identify addons most likely to block Ember 5:

```powershell
npm outdated
```

Focus on:

1. `ember-source`
2. `ember-cli`
3. `ember-auto-import`
4. `ember-cli-deprecation-workflow`
5. test helpers and lint-related Ember packages
6. any older addon that still assumes classic Ember internals

Goal:

1. identify packages that already support Ember 5,
2. identify packages that must be upgraded first,
3. identify packages that may need replacement.

### 3. Preview framework changes before applying them

Run updater in compare-only mode first:

```powershell
npx ember-cli-update --to latest --compare-only
```

Review:

1. blueprint file changes,
2. test boot changes,
3. build pipeline changes,
4. config changes,
5. any package.json changes that may affect custom app boot assumptions.

Do not apply blindly. This repo has custom boot/index/build behavior that needs manual review.

### 4. Apply Ember 5 bump in a dedicated batch

Once compatibility looks reasonable:

```powershell
npx ember-cli-update --to latest
npm install
```

Then validate immediately:

```powershell
npm run lint
npx ember test
```

If tests fail, start with focused reruns around the higher-risk user path:

```powershell
npx ember test --filter "Integration | Component | subscription-form"
npx ember test --filter "Integration | Component | event-list-search"
npx ember test --filter "Unit | Route | list"
```

### 5. Smoke-check the main flow manually

After the version bump compiles:

```powershell
npm run start
```

Exercise:

1. list page,
2. search/filter,
3. event details,
4. subscription form,
5. confirmation flow.

## Suggested Regression Tests To Add

These are the most useful missing tests based on the changes already made on `ember-upgrade`.

### 1. File upload image processing

Reason:

1. the old croppie/jQuery flow was replaced with native preview plus canvas-based JPEG processing,
2. this is one of the most behavior-sensitive changes on the branch.

Suggested coverage:

1. selecting a valid JPEG shows preview controls,
2. uploading/cropping produces a base64 image on the file object,
3. deleting the selected file resets the UI state,
4. invalid file type or oversized file shows the expected error path.

### 2. Postal code autofill behavior

Reason:

1. jQuery typeahead was replaced with native input behavior plus debounced lookup,
2. the `Location` autofill behavior is important to preserve.

Suggested coverage:

1. typing a postal code triggers the lookup path,
2. selecting/changing to a returned postal code updates the `Location` field,
3. short input clears suggestions instead of reusing stale results.

### 3. Freeform dropdown dependency behavior

Reason:

1. typeahead was simplified,
2. the important retained behavior is the dependency update on blur/focusout.

Suggested coverage:

1. focusout triggers the dependency hook with the current text value,
2. entered freeform values still propagate through the dependent form logic.

### 4. Confirmation flow header handling

Reason:

1. API transport moved from `$.ajax` to `fetch`,
2. person creation and duplicate-detection logic depend on response headers.

Suggested coverage:

1. create-person path reads `location` header correctly,
2. duplicate-person path reads `x-duplicate` header correctly,
3. confirmation route still reaches the expected success state after these branches.

### 5. Event list filtering/search state

Reason:

1. event-list, event-list-search, and list-pagination were refactored away from lifecycle hooks,
2. this is a core user-facing flow.

Suggested coverage:

1. search resets page state as expected,
2. pagination still reflects filtered results,
3. filter tag state remains correct after rerender.

## Likely Risk Areas

Expect the next issues to come from these areas rather than from component code:

1. addon compatibility with Ember 5,
2. test helper/version drift,
3. custom application boot assumptions,
4. updater changes that conflict with the embedded host-page setup,
5. dependency graph conflicts during `npm install`.

## What Not To Revisit First

Do not spend time reopening these unless the Ember 5 bump exposes a concrete regression:

1. lifecycle-hook cleanup,
2. jQuery cleanup,
3. classic component migration,
4. template action modernization.

Those have already been handled on this branch.

## Suggested First Command When Resuming

```powershell
npm install
npm run lint
npx ember test
npm outdated
npx ember-cli-update --to latest --compare-only
```

## Related Docs

1. `wiki/upgrade.md`
2. `wiki/upgradeLog.md`
3. `wiki/ember4-refactorings.md`
