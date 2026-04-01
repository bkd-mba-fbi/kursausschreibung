# Context




## Version Change Matrix

| Topic | Ember 3.x | Ember 4.x | Ember 5.x | Ember 6.x |
| --- | --- | --- | --- | --- |
| Status in this repo | Current baseline. Classic Ember CLI app, classic test boot, classic asset loading, Octane-era APIs mixed with older patterns. | First breaking step after 3.28. Main goal is to remove everything deprecated in 3.x before the jump. | Second breaking step. More legacy compatibility disappears and addon compatibility gets tighter. | Current modern major line. Tooling and ecosystem assume modern patterns, stricter dependency health, and current Node support. |
| Build pipeline | Classic Ember CLI plus Broccoli. `ember serve` and classic `tests/index.html` assumptions. | Still can run on classic Ember CLI. No need to introduce Embroider or Vite yet. | Classic build still possible, but old addon build assumptions start hurting more. | Many apps use Embroider, and some use Vite through Embroider, but this is still optional. Do not combine this migration with the 3 -> 4 jump unless the app is already stable. |
| Node.js expectations | Must use a Node version officially supported by Ember CLI 3.28. Too-new Node may work partially but is not reliable. | Must switch to a Node version supported by Ember CLI 4.x. Use overlap between current and target versions during each jump. | Node support tightens again. Recheck the Ember CLI support table before each major bump. | Requires current supported Node versions. Old LTS versions are no longer acceptable. |
| Deprecated APIs removed | Many older patterns still run but already warn: Ember global usage, computed macro access via `computed.alias`, implicit template `this` fallback, older test patterns, and legacy addon assumptions. | Deprecations that warned in 3.x are expected to be fixed. Code that still depends on removed 3.x compatibility will break here. | More transitional behavior is removed. Anything left that depends on old classic behavior becomes much riskier. | Modern APIs are expected throughout. Old fallback behavior should already be gone before reaching this step. |
| Templates | Octane syntax is supported, but older template habits may still work with warnings. | Template deprecations from 3.x need cleanup. Missing `this` in templates becomes more important to fix. | Template strictness continues to increase. Relying on fallback lookups is no longer safe. | Modern component and template conventions should be standard. |
| Components and object model | Mix of classic EmberObject patterns and newer Glimmer patterns is still common. | Classic patterns still exist, but deprecation cleanup becomes mandatory. | Prefer Glimmer components and tracked state. Old object-model patterns become more expensive to maintain. | Modern component model should dominate. The less classic EmberObject code remains, the easier this stage is. |
| Routing and application boot | Classic app boot assumptions still work, including custom globals and HTML bootstrapping. | Boot process must be cleaner and less dependent on removed deprecated behavior. | Custom boot-time globals and side effects should be isolated and tested. | Modern build and boot assumptions become more important, especially if the app later adopts Embroider. |
| Testing | QUnit plus ember-qunit still works in classic form. `tests/index.html` is still the classic style, not the Vite/Embroider style. | Tests must be green before moving on. Old test boot hacks and deprecated helper usage should be cleaned up here. | Addon and test helper versions must stay aligned. Test environment drift becomes more likely if dependencies are stale. | Modern test setups are cleaner and often assume newer helper versions and a healthier dependency graph. |
| Addon compatibility | Older addons may still install, but many already emit deprecations or carry hidden upgrade risk. | First major filter point: addons without 4.x support should be upgraded, replaced, or removed. | Second filter point: old unmaintained addons become a serious blocker. | By this point, unsupported classic addons are usually the main migration risk. |
| jQuery and legacy globals | Legacy patterns can still exist, especially in older apps like this one. | Should be reduced wherever possible. Anything relying on implicit globals should be questioned. | Remaining legacy global usage becomes more fragile and harder to justify. | Prefer explicit imports and isolated runtime configuration only. |
| Typical code cleanup | Remove deprecations on latest 3.28, stabilize tests, update test dependencies, remove copied modern boot code that does not belong in a classic app. | Replace APIs removed after 3.x deprecations, update addon versions, rerun full smoke tests. | Continue modernizing code style, trim classic patterns, and replace addons that cannot keep up. | Only after the app is stable on 6.x should you consider optional build modernization such as Embroider or Vite. |
| What this project should do | Stay on classic Ember CLI. Build a clean baseline, get tests running, write smoke tests, and eliminate current deprecations. | Upgrade to latest 4.x only after latest 3.28 is green and deprecation-light. | Upgrade only after 4.x is stable and all critical flows are covered by smoke tests. | Reach 6.x first. Postpone Embroider or Vite discussion until after the functional upgrade is complete. |


## Project-Specific Interpretation

| Stage | What changes in practice for this repo | Why it matters |
| --- | --- | --- |
| 3.28 baseline | Keep classic `ember serve`, classic `tests/index.html`, classic asset loading, and classic app boot. | This repo is not an Embroider or Vite app yet. Copying boot files from a new Ember app breaks assumptions. |
| 3 -> 4 | Fix all 3.x deprecations first, especially template fallback, Ember global usage, and older computed macro patterns. | This is the cheapest place to reduce future breakage. |
| 4 -> 5 | Audit addons and custom boot logic. Remove anything that survives only because of legacy compatibility. | Addon drift becomes a bigger blocker than framework code itself. |
| 5 -> 6 | Finish modernization of app code, tests, and dependencies before touching the build pipeline. | Combining framework upgrade and build-system migration makes debugging much harder. |
| After 6.x | Evaluate Embroider, then optionally Vite. | Build modernization should be a separate project, not part of emergency framework stabilization. |


## Version Bump Workflow Matrix

Use this matrix as the concrete playbook per bump. It highlights what changes between upgrade steps.

| Version bump | Primary upgrade workflow | Node.js version target | Deprecation workflow mode | Commands to run | Exit criteria for this bump |
| --- | --- | --- | --- | --- | --- |
| 3.28 -> 4.x | Deprecation-first. Clear 3.x deprecations before bumping framework. | Move to Node 16+ (recommend pinning Node 18 for smoother later bumps). | Full use of ember-cli-deprecation-workflow: capture, silence baseline, then throw one category at a time. | npm install; ember test --server; deprecationWorkflow.flushDeprecations() in browser; ember test; npm run start; npx ember-cli-update --to 4.12.0 --compare-only; npx ember-cli-update --to 4.12.0; npm install; ember test | Full test suite green, critical smoke flow green, major 3.x deprecations resolved or explicitly triaged. |
| 4.x -> 5.x | Compatibility-first. Focus on addon compatibility and framework API removals introduced after 4.x. | Node 18 LTS recommended for this step. | Keep deprecation-workflow active, but shift to throwOnUnhandled to prevent new debt while upgrading addons. | npm install; ember test; npm run start; npx ember-cli-update --to latest; npm install; ember test; ember test --filter "Integration | Component | subscription-form" | Tests green, key addons upgraded/replaced, no blocker runtime errors in core user journeys. |
| 5.x -> 6.x | Stabilization-first. Finish code modernization and dependency alignment before optional build changes. | Node 20 LTS recommended for this step. | Keep strict mode: treat new deprecations as regressions, continue one-category fixes only when needed. | npm install; ember test; npm run start; npx ember-cli-update --to latest; npm install; ember test; ember test --filter "Unit | Route | list" | Tests green, smoke flow green, dependency graph stable, no unresolved high-impact deprecations. |
| 6.x -> build modernization (optional) | Separate project. Do not bundle with framework major upgrades. | Use Node version supported by chosen build stack (Embroider/Vite) at that time. | Optional. Keep only as guardrail for future regressions. | ember test; npm run start; then run dedicated Embroider/Vite migration commands in a separate branch/workstream. | Functional behavior unchanged after build migration, same test and smoke baseline preserved. |

Notes:

1. If Ember CLI and target Ember versions support a wider Node range, still pin one version per bump in CI to keep results reproducible.
2. Keep one upgrade concern per pull request when possible: deprecations, framework bump, addon swaps, and build tooling should not be mixed.


## Version Pinning Rules (Deprecation Workflow + Node)

This section is the explicit rule set for this repo.

| Stage | Ember target | Recommended `ember-cli-deprecation-workflow` | Node.js version to use | When to change Node |
| --- | --- | --- | --- | --- |
| Baseline cleanup before Ember 4 | Ember 3.28.x | `^2` | Node 16 first, then move to Node 18 during late cleanup | Start on current supported Node for 3.28, then switch to Node 18 before the actual 4.x bump so post-bump debugging happens on the target runtime. |
| After bump to Ember 4 | Ember 4.x | keep existing version if stable, otherwise move to `^3` | Node 18 LTS | Immediately after the 4.x upgrade branch is compiling and tests run, ensure Node 18 is pinned in local + CI. |
| Preparing Ember 5 bump | Ember 4.x -> 5.x | `^3` (or `^4` only if repo/toolchain is compatible) | Node 18 LTS | Keep Node 18 throughout the 4->5 transition to reduce moving parts. |
| Preparing Ember 6 bump | Ember 5.x -> 6.x | `^4` | Node 20 LTS | Change Node only after the app is stable on latest 5.x and before starting the 6.x bump work. |

Practical policy:

1. Do not upgrade `ember-cli-deprecation-workflow` and Ember major version in the same commit unless required.
2. Pin one Node version per bump phase and keep CI on that same version.
3. If deprecation workflow itself causes issues, temporarily disable strict throw behavior first, then resolve addon/version mismatch.

Commands to pin/check Node version (PowerShell):

```powershell
node -v
npm -v
```

If your team uses `.nvmrc` or Volta, update that file at the phase boundary (Node 18 before/at Ember 4 work, Node 20 before Ember 6 work).


# Upgrade Strategy

Input:
- https://cli.emberjs.com/release/basic-use/upgrading/
- We need to use correct node.js version (maybe): https://github.com/ember-cli/ember-cli/blob/master/docs/node-support.m

## Base
- Add test: We need tests to have a baseline to test against.

## Workflow
- Upgrade with https://cli.emberjs.com/release/basic-use/upgrading/ to the latest minor version of the current major version
- Use https://github.com/ember-cli/ember-cli-deprecation-workflow as the main tool to isolate and work through deprecations one category at a time
- Bump to next major version
- Repeat


## Proposed Workflow For This Repo

This section is the practical workflow we should follow now to prepare the jump from Ember 3.28 to Ember 4.x.

The goal is not to guess what will break after the upgrade. The goal is to create a repeatable loop with `ember-cli-deprecation-workflow` doing most of the triage work for us:

1. run the app
2. run the tests
3. capture deprecations into the workflow tool
4. turn one deprecation class into `throw`
5. rerun everything
6. only then bump the framework version


## Phase 1: Establish A Clean 3.28 Baseline

Do this before touching dependencies.

Run:

```powershell
npm install
npm run start
```

Use this phase to verify that the app still boots locally on the current branch.

Then run the full automated suite:

```powershell
ember test
```

If you want a file with the full output for later review:

```powershell
ember test 2>&1 | Tee-Object -FilePath full-test-run.log
```

Expected outcome for this repo now:

1. app starts
2. test suite is green
3. `full-test-run.log` can be used as the working baseline


## Phase 2: Identify What Must Be Fixed Before Ember 4

At this stage we do not upgrade yet. We use Ember 3.28 to tell us what Ember 4 will remove.

### 2.1 Install and wire `ember-cli-deprecation-workflow`

Use the addon to suppress deprecation spew and process one category at a time.

Important note for this repo:

1. Do not blindly install the newest major version.
2. Use the addon version compatible with our current Ember CLI / Ember 3.28 setup.
3. For the 3.28 cleanup phase, default to `ember-cli-deprecation-workflow@^2`.

Typical install step:

```powershell
npm install --save-dev ember-cli-deprecation-workflow@^2
```

Later bump guidance:

1. Re-evaluate addon major only after the framework bump is stable.
2. Move to `^3` in the Ember 4/5 window if needed.
3. Move to `^4` in the Ember 6 window.

Then add the wiring described in the addon docs:

1. create `app/deprecation-workflow.js`
2. load it from `app/app.js` in development / test builds

### 2.2 Capture deprecations into the workflow file

Run:

```powershell
ember test --server
```

Then open the test app in the browser and run in the console:

```js
deprecationWorkflow.flushDeprecations()
```

Copy the generated output into `app/deprecation-workflow.js`.

This becomes the tracked list of known deprecations.

### 2.3 Optional: also capture a log file snapshot

We still keep a plain log when we want an offline record or a quick overview outside the browser.

Run:

```powershell
ember test 2>&1 | Tee-Object -FilePath full-test-run.log
```

### 2.4 Optional: group deprecations by deprecation id from the log

Run:

```powershell
$lines = Get-Content full-test-run.log | Select-String -Pattern "DEPRECATION:"
$ids = $lines | ForEach-Object {
	if ($_.Line -match "\[deprecation id: ([^\]]+)\]") {
		$matches[1]
	}
}
$ids | Group-Object | Sort-Object Count -Descending | Format-Table -AutoSize | Out-String
```

This gives a quick frequency overview, but the primary source of work should now be `app/deprecation-workflow.js`.

### 2.5 Search the codebase for the patterns behind those deprecations

Typical commands:

```powershell
rg "Ember\." app tests
rg "computed\.(alias|oneWay|reads|readOnly|and|or|empty|notEmpty|none|not|bool|match|equal|gt|gte|lt|lte|collect|sum|min|max|map|mapBy|filter|filterBy|uniq|union|intersect|sort|setDiff|deprecatingAlias)" app tests
rg "\{\{[^}]*[^./@]" app/templates tests
```

Use this phase to map deprecation ids to actual files that need cleanup.


## Phase 3: Fix One Category At A Time On Ember 3.28

Do not mix many unrelated changes in one step. Pick one category and clear it.

This is where `ember-cli-deprecation-workflow` becomes the main simplifier.

For one category, do this:

1. open `app/deprecation-workflow.js`
2. change exactly one matching rule from `silence` to `throw`
3. run tests or the app
4. fix the thrown deprecation
5. remove that entry once resolved, or change it back if still in progress

Recommended order for this repo:

1. template `this` fallback issues
2. Ember global usage
3. classic computed macro usage
4. built-in component import deprecations
5. any remaining resolver / globals boot issues

After each category, run:

```powershell
ember test
```

If the change is risky, also run the app and click through the main user flow:

```powershell
npm run start
```

Main smoke flow to verify manually:

1. open list page
2. search/filter events
3. open event detail page
4. open subscription form
5. submit through the non-destructive happy path if available

If you need browser-driven deprecations instead of test-only deprecations:

```powershell
npm run start
```

Then exercise the app manually and use the same workflow file to isolate one issue at a time.


## Phase 4: Re-run Deprecation Collection

Once a batch of fixes is done, measure again.

Run:

```powershell
ember test --server
```

Then flush again in the browser console:

```js
deprecationWorkflow.flushDeprecations()
```

Update `app/deprecation-workflow.js` with the new reduced set.

Optionally also regenerate the plain log summary:

```powershell
ember test 2>&1 | Tee-Object -FilePath full-test-run.log
$lines = Get-Content full-test-run.log | Select-String -Pattern "DEPRECATION:"
$ids = $lines | ForEach-Object {
	if ($_.Line -match "\[deprecation id: ([^\]]+)\]") {
		$matches[1]
	}
}
$ids | Group-Object | Sort-Object Count -Descending | Format-Table -AutoSize | Out-String
```

Keep looping until the remaining deprecations are small enough to review manually.


## Phase 5: Prepare The Actual Ember 4 Bump

Only do this when all of the following are true:

1. `ember test` is green
2. critical user flows are manually smoke-tested
3. major 3.x deprecation categories are fixed or understood

Before changing versions, capture the exact baseline:

```powershell
git status
ember test
```

Then perform the upgrade using Ember CLI update guidance.

Practical commands to inspect the target change first:

```powershell
npx ember-cli-update --to 4.12.0 --compare-only
```

Then apply when ready:

```powershell
npx ember-cli-update --to 4.12.0
npm install
```

Note:

1. Use the exact 4.x target you agree on for the branch.
2. Do not jump further in the same change.


## Phase 6: Validate Immediately After The Ember 4 Bump

Run in this order:

```powershell
ember test
```

Then:

```powershell
npm run start
```

Then repeat the same smoke flow:

1. list page
2. filters/search
3. event details
4. subscription form

If errors appear, capture them with focused reruns:

```powershell
ember test --filter "Integration | Component | event-list-search"
ember test --filter "Integration | Component | subscription-form"
ember test --filter "Unit | Route | list"
```


## Concrete Command Checklist

### Daily cleanup loop on Ember 3.28

```powershell
npm install
ember test --server
# browser console: deprecationWorkflow.flushDeprecations()
# copy result into app/deprecation-workflow.js
# change one entry from silence to throw
ember test
rg "Ember\." app tests
rg "computed\.(alias|oneWay|reads|readOnly|and|or|empty|notEmpty|none|not|bool|match|equal|gt|gte|lt|lte|collect|sum|min|max|map|mapBy|filter|filterBy|uniq|union|intersect|sort|setDiff|deprecatingAlias)" app tests
rg "\{\{[^}]*[^./@]" app/templates tests
```

If you want a text report in parallel:

```powershell
ember test 2>&1 | Tee-Object -FilePath full-test-run.log
$lines = Get-Content full-test-run.log | Select-String -Pattern "DEPRECATION:"
$ids = $lines | ForEach-Object { if ($_.Line -match "\[deprecation id: ([^\]]+)\]") { $matches[1] } }
$ids | Group-Object | Sort-Object Count -Descending | Format-Table -AutoSize | Out-String
```

### Pre-upgrade checkpoint

```powershell
ember test
npm run start
git status
```

### Upgrade step

```powershell
npx ember-cli-update --to 4.12.0 --compare-only
npx ember-cli-update --to 4.12.0
npm install
ember test
```


## Decision Rule

We should treat Ember 4 readiness as achieved when:

1. the app boots cleanly
2. the full test suite is green
3. the major 3.x deprecation categories have been worked down through the deprecation-workflow loop above
4. the post-upgrade run is debug work, not blind discovery work

That is the practical purpose of the workflow: identify and shrink the unknowns before the major version bump.
