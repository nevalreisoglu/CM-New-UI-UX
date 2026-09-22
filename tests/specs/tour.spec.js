// @ts-check
const { test, expect } = require('./fixtures');

/**
 * The full drive of tour A lives in tests/tour.js, which the brief asks for as
 * a standalone script. This spec keeps the pieces the suite should guard on
 * every run: the launch points exist, the engine paints, and the checklist
 * reflects the role.
 */
test.describe('onboarding', () => {
  test('Getting started sits under Home and shows the role checklist', async ({ app }) => {
    await expect(app.locator('.nav button[data-view="start"] .nl')).toHaveText('Getting started');
    await expect(app.locator('.nav button[data-view="start"] .navnew')).toHaveText('New');

    await app.locator('.nav button[data-view="start"]').click();
    await expect(app.locator('.view.active')).toHaveId('view-start');
    await expect(app.locator('#crumb .cur')).toHaveText('Getting started');
    expect(await app.locator('#start-card .gs-it').count()).toBeGreaterThan(3);
    await expect(app.locator('#start-card .gs-prog')).toContainText('done');
  });

  test('the checklist follows the role', async ({ app }) => {
    await app.locator('.nav button[data-view="start"]').click();
    const titles = () => app.$$eval('#start-card .gs-it .nm b', (n) => n.map((x) => x.textContent.trim()));

    await app.selectOption('#role-sel', 'marketer');
    expect((await titles()).join(' ')).toContain('Create your first campaign');

    await app.selectOption('#role-sel', 'cmo');
    const cmo = (await titles()).join(' ');
    expect(cmo).toContain('Read the dashboard');
    expect(cmo).not.toContain('Create your first campaign');
  });

  test('the ? menu lists the tours for the role and their status', async ({ app }) => {
    await app.locator('#btn-help').click();
    await expect(app.locator('#help-menu')).toBeVisible();
    const ids = await app.$$eval('#help-menu [data-tour]', (n) => n.map((x) => x.dataset.tour));
    expect(ids).toContain('first-campaign');
    expect(ids).not.toContain('admin-setup'); // admin only
    await expect(app.locator('#help-menu [data-tour="first-campaign"] .pill')).toHaveText('not started');
  });

  test('a tour spotlights its target and counts its steps', async ({ app }) => {
    await app.evaluate(() => window.startTour('read-dashboard'));
    await expect(app.locator('.tour-card')).toBeVisible();
    await expect(app.locator('.tour-card .tc-n')).toHaveText('1 / 6');
    await expect(app.locator('.tour-hole')).toBeVisible();

    // the card must never sit on top of what it is pointing at
    const clear = await app.evaluate(() => {
      const c = document.querySelector('.tour-card').getBoundingClientRect();
      const h = document.querySelector('.tour-hole').getBoundingClientRect();
      return c.right < h.left || c.left > h.right || c.bottom < h.top || c.top > h.bottom;
    });
    expect(clear, 'card clears its target').toBe(true);

    await app.locator('.tour-card [data-next]').click();
    await expect(app.locator('.tour-card .tc-n')).toHaveText('2 / 6');
    await app.locator('.tour-card [data-back]').click();
    await expect(app.locator('.tour-card .tc-n')).toHaveText('1 / 6');
  });

  test('nothing starts on its own under automation', async ({ app }) => {
    await expect(app.locator('.tour-card')).toHaveCount(0);
  });
});
