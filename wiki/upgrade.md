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


# Upgrade Strategy

Input:
- https://cli.emberjs.com/release/basic-use/upgrading/
- We need to use correct node.js version (maybe): https://github.com/ember-cli/ember-cli/blob/master/docs/node-support.md



## Base
- Add test: We need tests to have a baseline to test against.

## Workflow
- Upgrade with https://cli.emberjs.com/release/basic-use/upgrading/ to the latest minor version of the current major version
- Use https://github.com/ember-cli/ember-cli-deprecation-workflow to fix deprecations
- Bump to next major version
- Repeat
