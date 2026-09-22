// @ts-check
const { test, expect } = require('./fixtures');

const STEPS = ['Info', 'Targeting', 'Offer', 'Channel & content', 'Communication rules', 'Schedule', 'Approval', 'Summary'];

async function openNewCampaign(app) {
  await app.locator('.nav button[data-view="campaigns"]').click();
  await app.locator('#camp-new').click();
  await expect(app.locator('#camp-card .stepper')).toBeVisible();
}

test.describe('campaign wizard', () => {
  test('the list filters by the search box', async ({ app }) => {
    await app.locator('.nav button[data-view="campaigns"]').click();
    const rows = app.locator('#camp-table tbody tr.row');
    const all = await rows.count();
    expect(all).toBeGreaterThan(0);

    await app.locator('#camp-q').fill('Win-back');
    await expect(rows).toHaveCount(1);
    await expect(rows.first()).toContainText('Win-back');
  });

  test('a new campaign shows all eight steps, with Offer disabled for an Info campaign', async ({ app }) => {
    await openNewCampaign(app);
    const stepper = app.locator('#camp-card .stepper button');

    // An Offer campaign can use every step.
    await app.locator('#camp-card select[data-k="type"]').selectOption('Offer');
    await expect(stepper).toHaveCount(STEPS.length);
    await expect(stepper.nth(2)).toBeEnabled();
    await expect(app.locator('#camp-card .stepper')).toContainText('Step 1 of 8');

    // An Info campaign has nothing to offer, so the step stays visible but dead.
    await app.locator('#camp-card select[data-k="type"]').selectOption('Info');
    await expect(stepper).toHaveCount(STEPS.length);
    const offer = stepper.nth(2);
    await expect(offer).toContainText('Offer');
    await expect(offer).toBeDisabled();
    await expect(offer).toHaveAttribute('title', 'Info campaign — no offer');
    await expect(offer.locator('i')).toHaveText('–');
    await expect(app.locator('#camp-card .stepper')).toContainText('Step 1 of 7');
  });

  test('the name is required before leaving the Info step', async ({ app }) => {
    await openNewCampaign(app);
    await app.locator('#camp-next').click();

    await expect(app.locator('#toast div').first()).toContainText('Name is required');
    await expect(app.locator('#camp-card .stepper button.on')).toContainText('Info');

    await app.locator('#camp-card input[data-k="name"]').fill('Regression test campaign');
    await app.locator('#camp-next').click();
    await expect(app.locator('#camp-card .stepper button.on')).toContainText('Targeting');
  });

  test('the readiness panel counts what is done and never blocks', async ({ app }) => {
    await openNewCampaign(app);
    const ready = app.locator('#camp-ready');
    await expect(ready).toBeVisible();
    await expect(ready).toContainText('Readiness');
    await expect(ready).toContainText('nothing here blocks saving');
    await expect(ready.locator('li.ok')).toHaveCount(0);

    // The panel refreshes when the step changes, not on every keystroke, so that
    // typing in a field never steals focus.
    await app.locator('#camp-card input[data-k="name"]').fill('Readiness check');
    await app.locator('#camp-next').click();

    await expect(ready.locator('li.ok')).toHaveCount(1);
    await expect(ready.locator('li.ok')).toContainText('Name, period and channels');
    await expect(ready).toContainText('1 of 7');
  });

  test('a readiness item jumps to its step', async ({ app }) => {
    await openNewCampaign(app);
    await app.locator('#camp-ready li[data-step="5"]').click();
    await expect(app.locator('#camp-card .stepper button.on')).toContainText('Schedule');
  });
});
