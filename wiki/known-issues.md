- ~~Language Switch doesn't work when clicked. Refresh required. And after refresh page is empty.~~ **Fixed** (ember-upgrade branch, 2026-04-29)
  - **What was broken:** Switching DE/FR was unreliable: sometimes it looked like nothing happened, and route slugs could remain in the previous language until another navigation + reload.
  - **Root cause (technical):**
    1. Language links were anchor-based (`href="#"`), and the old reload logic used `window.location.assign(location.href)`, which could behave like a hash navigation instead of a full reload.
    2. During reload on translated routes, `list` route fallback used `this.replaceWith('/')` in a class route context where that call was not available, causing `this.replaceWith is not a function` and broken recovery when a slug was invalid for the selected language.
  - **How to verify (PO smoke test):**
    1. Open the app in the default language (DE).
    2. Click the language button and select FR.
    3. Expected: page reloads immediately, labels switch to French, and URL route slug is French (for example `#/formation` / `#/thèmes_des_manifestations`).
    4. Switch back to DE.
    5. Expected: labels and route slug switch back to German equivalents.
- ~~Click on Categories (Jugendliche, Erwachsene, etc.) on Veranstaltungsthemen doesn't work~~ **Fixed** (ember-upgrade branch, 2026-04-29)
  - **What was broken:** On Veranstaltungsthemen, clicking filter pills like *Jugendliche* / *Erwachsene* appeared to do nothing.
  - **Root cause (technical):**
    1. Those pills are UIkit filter controls (`uk-filter-control`) rendered as anchor links like `#Jugendliche`.
    2. Click handler stopped propagation, so UIkit never received the click event; filter state was not applied.
    3. Hash-only `href` values remained visible, which made it look like route navigation was broken.
  - **How to verify (PO smoke test):**
    1. Open `#/veranstaltungsthemen`.
    2. Click filter pills: *Jugendliche*, *Erwachsene*, and *Alle*.
    3. Expected: active pill changes and list content updates immediately.
    4. Expected: URL query parameter `?filter=...` updates accordingly.
    5. Verify one language switch afterwards still preserves correct behavior.
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
