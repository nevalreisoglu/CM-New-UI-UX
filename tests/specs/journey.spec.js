// @ts-check
const { test, expect } = require('./fixtures');

test.describe('journey builder and monitor', () => {
  test('the builder draws the selected journey on the canvas', async ({ app }) => {
    await app.locator('.nav button[data-view="journeys"]').click();
    await expect(app.locator('.view.active')).toHaveId('view-journeys');
    expect(await app.locator('#canvas .node').count()).toBeGreaterThan(0);
    expect(await app.locator('#canvas .edge').count()).toBeGreaterThan(0);
  });

  test('the canvas is fitted the first time the builder is opened', async ({ app }) => {
    // The prototype boots on the Dashboard, so the canvas is measured and fitted
    // when the builder is first shown — not at boot, where the hidden SVG
    // measures 0x0. fitView has a zoom floor of 0.45, so a wide journey can
    // still run off the right edge; what must hold is that the journey starts
    // at the top left of the viewport rather than somewhere off screen.
    await expect(app.locator('.view.active')).toHaveId('view-dashboard');
    await app.locator('.nav button[data-view="journeys"]').click();

    const placed = await app.evaluate(() => {
      const c = document.getElementById('canvas').getBoundingClientRect();
      const first = document.querySelector('#canvas .node').getBoundingClientRect();
      return {
        insetLeft: Math.round(first.left - c.left),
        insetTop: Math.round(first.top - c.top),
        inside: first.right <= c.right && first.bottom <= c.bottom,
      };
    });
    expect(placed.inside, 'the first step is fully inside the canvas').toBe(true);
    expect(placed.insetLeft, 'the first step sits near the left edge').toBeLessThan(120);
    expect(placed.insetTop, 'the first step sits near the top edge').toBeLessThan(160);
  });

  test('the step palette collapses to icons', async ({ app }) => {
    await app.locator('.nav button[data-view="journeys"]').click();
    const jb = app.locator('#jb');
    await expect(jb).not.toHaveClass(/pal-closed/);
    await app.locator('#btn-pal').click();
    await expect(jb).toHaveClass(/pal-closed/);
  });

  /**
   * v41: the demo clock and event controls sit in a marked strip so nobody reads
   * them as product features. Both the builder and the monitor carry one.
   */
  test.describe('simulation strip (v41)', () => {
    test('the builder strip is labelled demo only', async ({ app }) => {
      await app.locator('.nav button[data-view="journeys"]').click();
      const bar = app.locator('#view-journeys .simbar');
      await expect(bar).toBeVisible();
      await expect(bar.locator('.simtag')).toContainText('Simulation · demo only');
      await expect(bar).toHaveAttribute('title', 'Demo only — not part of the product');
      await expect(bar.locator('.hint')).toContainText('no real clock or sends');
    });

    test('the monitor strip is labelled demo only and holds the clock controls', async ({ app }) => {
      await app.locator('.nav button[data-view="monitor"]').click();
      const bar = app.locator('#view-monitor .simbar');
      await expect(bar).toBeVisible();
      await expect(bar.locator('.simtag')).toContainText('Simulation · demo only');
      await expect(bar.locator('#btn-tick')).toHaveAttribute('title', /simulated clock one day forward/);
      await expect(bar.locator('#btn-tick5')).toBeVisible();
      await expect(bar.locator('#btn-reset')).toBeVisible();
    });

    test('no simulation button is styled as a primary product action', async ({ app }) => {
      await app.locator('.nav button[data-view="monitor"]').click();
      expect(await app.locator('.simbar .btn.primary').count()).toBe(0);
      await app.locator('.nav button[data-view="journeys"]').click();
      expect(await app.locator('.simbar .btn.primary').count()).toBe(0);
    });

    test('Advance 1 day moves the simulated clock', async ({ app }) => {
      await app.locator('.nav button[data-view="monitor"]').click();
      // The prototype seeds three simulated days at boot so the monitor has
      // something to show, so day 3 — not day 0 — is the starting state.
      await expect(app.locator('#daypill')).toHaveText('Day 3');

      await app.locator('#btn-tick').click();
      await expect(app.locator('#daypill')).toHaveText('Day 4');

      await app.locator('#btn-tick5').click();
      await expect(app.locator('#daypill')).toHaveText('Day 9');

      // Reset rebuilds the simulation from scratch, back to an empty day 0.
      await app.locator('#btn-reset').click();
      await expect(app.locator('#daypill')).toHaveText('Day 0');
    });

    test('the two strips share one clock', async ({ app }) => {
      await app.locator('.nav button[data-view="monitor"]').click();
      await app.locator('#btn-tick').click();
      await expect(app.locator('#daypill')).toHaveText('Day 4');

      await app.locator('.nav button[data-view="journeys"]').click();
      await expect(app.locator('#daypill-j')).toHaveText('Day 4');
      await app.locator('#btn-tick-j').click();
      await expect(app.locator('#daypill-j')).toHaveText('Day 5');
    });
  });
});
