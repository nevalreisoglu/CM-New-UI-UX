# Regression tests

Playwright scripts that open `../index.html` over `file://` and check that the
decisions taken in the UX/UI meetings still hold. There is no build and no
server: the prototype is one HTML file, and the specs drive it directly.

## Running them

```bash
cd tests
npm install        # once — installs @playwright/test only
npm test           # the whole suite
npm run test:headed  # watch it happen in a real window
npm test -- specs/roles.spec.js      # one file
npm test -- -g "simulation strip"    # one group
```

`@playwright/test` is pinned to **1.56.1**. Playwright refuses to run against a
browser build it does not know, so if `npm test` reports a missing executable,
the pin and the installed Chromium have drifted apart — either install the
matching browser (`npx playwright install chromium`) or move the pin to the
version that matches.

## What is covered

| Spec | What it protects |
| --- | --- |
| `branding.spec.js` | The brand reads ETIYA everywhere; the old "ETYA" spelling cannot come back. |
| `navigation.spec.js` | Every menu entry opens its page, the breadcrumb follows, the menu collapses to an icon rail. |
| `roles.spec.js` | Role views: the marketer never sees Parameters, the executive never sees the build pages, the admin sees everything, and switching role moves off a page the new role may not see. |
| `campaign.spec.js` | The eight-step wizard: list search, the Offer step disabled for Info campaigns, name required before leaving Info, and the readiness panel counting without blocking. |
| `segments.spec.js` | The segment workbench: definition beside live audience insight, Search counting the audience, and the assistant living in a dialog rather than the form. |
| `journey.spec.js` | The builder canvas and palette, and the v41 simulation strips in both Journey Builder and Journey Monitor — marked demo-only, never styled as primary actions, sharing one clock. |
| `screenshots.spec.js` | Writes reference screenshots of the main screens to `screenshots/`. |

## Screenshots

`screenshots/*.png` are review material for the UX meetings, refreshed with:

```bash
npm run shots
```

They are committed so a change to a screen shows up as a visible diff in review.
Nothing compares them pixel by pixel — the run only fails if a screen cannot be
reached or renders empty.

## Writing a new spec

Import the fixture rather than `@playwright/test` directly:

```js
const { test, expect, setRole, openPage } = require('./fixtures');

test('...', async ({ app }) => { /* `app` is the loaded prototype */ });
```

The `app` fixture blocks the Google Fonts request so a run works offline and
takes the same time every time, and it fails the test if the prototype threw an
uncaught error — so every spec doubles as a smoke test for JavaScript errors on
the screens it touches.

## Things the specs deliberately pin down

These surprised us once, so they are asserted rather than assumed:

- The prototype **boots on the Journey Builder**, not the Dashboard.
- The Journey Monitor opens on **day 3**: the prototype runs three simulated days
  at load so the monitor has something to show.
- The **Offer step is not removed** for an Info campaign — it stays in the
  stepper, disabled and marked `–`.
- The **readiness panel refreshes when the step changes**, not on every
  keystroke, so that typing in a field never steals focus.
- The assistant dialog closes with its **Close button**; the global Escape
  handler does not cover it.
