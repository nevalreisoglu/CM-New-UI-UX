// @ts-check
const { test, expect } = require('./fixtures');

async function openSegments(app) {
  await app.locator('.nav button[data-view="segmentation"]').click();
  await expect(app.locator('.view.active')).toHaveId('view-segmentation');
}

test.describe('segment workbench', () => {
  test('the list shows the saved segments and filters', async ({ app }) => {
    await openSegments(app);
    const rows = app.locator('#seg-table tbody tr');
    expect(await rows.count()).toBeGreaterThan(0);

    await app.locator('#seg-q').fill('zzz-no-such-segment');
    await expect(app.locator('#seg-table tbody')).toContainText('No');
  });

  test('a new segment opens the workbench with definition and audience side by side', async ({ app }) => {
    await openSegments(app);
    await app.locator('#seg-new').click();

    await expect(app.locator('#seg-name')).toBeVisible();
    await expect(app.locator('#seg-work')).toBeVisible();
    await expect(app.locator('#seg-insight')).toBeVisible();
    await expect(app.locator('#crumb .cur')).toHaveText('New segment');
  });

  test('Search counts the audience and opens the result rows', async ({ app }) => {
    await openSegments(app);
    await app.locator('#seg-new').click();
    await app.locator('#seg-name').fill('Regression audience');

    await app.locator('#seg-search').click();

    await expect(app.locator('#seg-live b')).not.toHaveText('—');
    const n = Number(await app.locator('#seg-live b').textContent());
    expect(Number.isFinite(n)).toBe(true);
    await expect(app.locator('#seg-prevwrap')).toHaveAttribute('open', '');
  });

  test('the natural-language assistant lives in a dialog, not the form', async ({ app }) => {
    await openSegments(app);
    await app.locator('#seg-new').click();

    await expect(app.locator('#seg-nl-modal')).toBeHidden();
    await app.locator('#seg-nl-open').click();
    await expect(app.locator('#seg-nl-modal')).toBeVisible();
    await expect(app.locator('#seg-nl')).toBeFocused();

    await app.locator('#seg-nl-close').click();
    await expect(app.locator('#seg-nl-modal')).toBeHidden();
  });

  test('the assistant turns a sentence into filters the user can still edit', async ({ app }) => {
    await openSegments(app);
    await app.locator('#seg-new').click();
    await app.locator('#seg-nl-open').click();

    await app.locator('#seg-nl').fill('prepaid customers in Kyiv with high churn risk');
    await app.locator('#seg-nl-go').click();

    await expect(app.locator('#seg-nl-modal')).toBeHidden();
    expect(await app.locator('#seg-filters [data-k="col"]').count()).toBeGreaterThan(0);
    await expect(app.locator('#toast div').first()).toContainText('Filters built');
  });
});
