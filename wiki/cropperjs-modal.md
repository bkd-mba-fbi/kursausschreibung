# Cropper.js Modal Notes

This project uses Cropper.js v2 for image uploads in `app/components/input/input-file.js`.

## Current UX

- Selecting a JPEG opens a crop modal immediately.
- The user confirms the crop in the modal.
- After confirmation, the form shows a small thumbnail and a delete button.
- The upload control is hidden while an image is present and reappears after delete.

## Why the modal CSS lives in `app/styles/app.css`

The modal wrapper styles must load with the main application stylesheet.
During the Ember upgrade, keeping these rules in a separate `cropper.css` file led to
runtime cases where the modal wrapper styles were not applied reliably. When that
happened, the cropper appeared inline and pushed surrounding form fields around.

Keeping the cropper modal rules in `app/styles/app.css` avoids that failure mode and
ensures the modal stays `position: fixed` above the page.

## Cropper.js v2 notes

- Cropper.js v2 is web-component based.
- The crop UI is configured through the `template` option, not the legacy v1 options.
- The cropped result is produced with `getCropperSelection().$toCanvas(...)`.
- `initial-coverage` is intentionally smaller than `1` so resize handles are visible.
