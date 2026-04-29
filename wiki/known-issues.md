- Language Switch doesn't work when clicked. Refresh required. And after refresh page is empty.
- Click on Categories (Jugendliche, Erwachsene, etc.) on Veranstaltungsthemen doesn't work
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
