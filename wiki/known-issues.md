- ~~Language Switch doesn't work when clicked. Refresh required. And after refresh page is empty.~~ **Fixed** (ember-upgrade branch, 2026-04-29)
  - **What was broken:** Clicking DE/FR language buttons did nothing; after a manual reload the page was empty or still in the wrong language.
  - **Root cause (technical):** The language buttons are `<a href="#">` elements. The old code called `window.location.assign(location.href)`, which included the `#` fragment already in the URL — the browser treated it as an in-page anchor scroll, not a reload. The language was saved to localStorage but the page never actually reloaded to pick it up.
  - **How to verify (PO smoke test):**
    1. Open the app in the default language (DE).
    2. Click the language button and select FR.
    3. Expected: page reloads immediately and all labels switch to French.
    4. Reload the page manually — expected: language stays French.
    5. Repeat switching back to DE.
- ~~Click on Categories (Jugendliche, Erwachsene, etc.) on Veranstaltungsthemen doesn't work~~ **Fixed** (ember-upgrade branch, 2026-04-29)
  - **What was broken:** Clicking a category name in the left sidebar (e.g. Jugendliche, Erwachsene) did nothing — the URL did not change and the event list stayed the same.
  - **Root cause (technical):** Ember 6 requires `<LinkTo>` to receive all route segment models explicitly via `@models`. For the nested route `list/:area/:category`, the old code passed only `@model={{categoryKey}}` (the category) and relied on Ember to infer the area from the current route context. This inference was removed in Ember 6, so `LinkTo` generated a broken `#CategoryName` fragment instead of a proper route URL.
  - **How to verify (PO smoke test):**
    1. Open an area that has multiple categories in the left sidebar.
    2. Click any category name (e.g. Jugendliche).
    3. Expected: the URL changes to `#/areaKey/categoryKey` and the event list filters to that category.
    4. Verify the same works from the mobile menu modal.
- ~~Form can't be submitted~~ **Fixed** (ember-upgrade branch, 2026-04-29)
  - **What was broken:** Clicking the submit button on the subscription form did nothing — no confirmation page appeared, no error message.
  - **Root cause (technical):** Two bugs introduced during the Ember upgrade:
    1. `showCompanyButtonOnly` was always `true` (a logic expression `!x || x` is always `true`), causing the form to always try to read address fields from the DOM even when the user is logged in and those fields are not rendered.
    2. `getFieldSetData` in the submit handler called `.querySelectorAll` on a DOM node that was `null` (the unrendered address fieldset), which threw a JavaScript exception and silently aborted the entire submit action.
  - **How to verify the fix (PO smoke test):**
    1. Open an event that allows subscription.
    2. Fill in the subscription form fields.
    3. Click the subscribe/submit button.
    4. Expected: the page transitions to the confirmation step showing the filled-in data.
    5. Verify this for both the **logged-in** flow (address section hidden) and the **anonymous/guest** flow (address section visible).
