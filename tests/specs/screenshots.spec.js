// @ts-check
const path = require('path');
const { test, expect } = require('./fixtures');

/**
 * Reference screenshots of the main screens, written to tests/screenshots/.
 * They are review material for the UX meetings, not pixel assertions — the run
 * only fails if a screen cannot be reached or renders empty.
 */
const SHOTS = [
  ['dashboard', 'admin', async (app) => app.locator('.nav button[data-view="dashboard"]').click()],
  ['programs', 'admin', async (app) => app.locator('.nav button[data-view="programs"]').click()],
  ['campaign-list', 'admin', async (app) => app.locator('.nav button[data-view="campaigns"]').click()],
  ['campaign-info-step', 'admin', async (app) => {
    await app.locator('.nav button[data-view="campaigns"]').click();
    await app.locator('#camp-new').click();
  }],
  ['journey-builder', 'admin', async (app) => app.locator('.nav button[data-view="journeys"]').click()],
  ['journey-monitor', 'admin', async (app) => app.locator('.nav button[data-view="monitor"]').click()],
  ['segment-workbench', 'admin', async (app) => {
    await app.locator('.nav button[data-view="segmentation"]').click();
    await app.locator('#seg-new').click();
    await app.locator('#seg-search').click();
  }],
  ['reports', 'admin', async (app) => app.locator('.nav button[data-view="reports"]').click()],
  ['parameters', 'admin', async (app) => app.locator('.nav button[data-view="parameters"]').click()],
  ['dashboard-cmo', 'cmo', async (app) => app.locator('.nav button[data-view="dashboard"]').click()],
];

for (const [name, role, open] of SHOTS) {
  test(`screenshot: ${name}`, async ({ app }) => {
    await app.selectOption('#role-sel', role);
    await open(app);
    await expect(app.locator('.view.active')).toBeVisible();
    await app.waitForTimeout(150); // let the collapse/zoom transitions settle
    await app.screenshot({ path: path.join(__dirname, '..', 'screenshots', `${name}.png`), fullPage: false });
  });
}
