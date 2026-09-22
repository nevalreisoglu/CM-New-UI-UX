// @ts-check
const path = require('path');
const base = require('@playwright/test');

const PROTOTYPE = 'file://' + path.resolve(__dirname, '..', '..', 'index.html');

/**
 * `app` is the prototype loaded and ready: fonts blocked so a run is offline and
 * deterministic, and the first view rendered.
 */
const test = base.test.extend({
  app: async ({ page }, use) => {
    await page.route('https://fonts.googleapis.com/**', (r) => r.abort());
    await page.route('https://fonts.gstatic.com/**', (r) => r.abort());
    const errors = [];
    page.on('pageerror', (e) => errors.push(e.message));
    await page.goto(PROTOTYPE);
    await page.waitForSelector('.view.active');
    await use(page);
    base.expect(errors, 'the prototype threw no uncaught errors').toEqual([]);
  },
});

const ROLE_LABELS = { marketer: 'Marketer', approver: 'Approver', admin: 'Etiya Admin', cmo: 'CMO / Executive' };

/** Switch the role view in the top bar and wait for the menu to follow. */
async function setRole(app, role) {
  await app.selectOption('#role-sel', role);
  await base.expect(app.locator('#role-lbl')).toHaveText(ROLE_LABELS[role]);
}

/** Page names visible in the left menu for the current role. */
async function visibleNavLabels(app) {
  return app.$$eval('.nav button[data-view]', (bs) =>
    bs.filter((b) => !b.hidden).map((b) => b.querySelector('.nl').textContent.trim())
  );
}

/** Open a page from the left menu by its label. */
async function openPage(app, label) {
  await app.locator('.nav button[data-view]', { hasText: label }).first().click();
}

module.exports = { test, expect: base.expect, PROTOTYPE, ROLE_LABELS, setRole, visibleNavLabels, openPage };
