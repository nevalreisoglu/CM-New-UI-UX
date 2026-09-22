#!/usr/bin/env node
/**
 * Regression run for the Datamart catalogue (v43).
 *
 *   node tests/dm.js
 *
 * Opens the list as Admin, opens MAIN DATAMART, edits a column label, marks a
 * column as a category, then checks BOTH show up in the segment builder —
 * the point of the module is that the catalogue is what Segments reads.
 * Also runs a concept load and covers the delete guards. Screenshots go to
 * tests/shots/.
 */
const path = require('path');
const fs = require('fs');
const { chromium } = require('@playwright/test');

const URL = 'file://' + path.resolve(__dirname, '..', 'index.html') + '?notour';
const SHOTS = path.join(__dirname, 'shots');
const errors = [];
const check = (ok, what) => { console.log(`${ok ? '  ok  ' : '  FAIL'}  ${what}`); if (!ok) errors.push(what); };

async function admin(browser, width = 1440) {
  const page = await browser.newPage({ viewport: { width, height: 900 } });
  page.on('pageerror', (e) => errors.push('page error: ' + e.message));
  page.on('console', (m) => { if (m.type() === 'error' && !/ERR_FAILED/.test(m.text())) errors.push('console: ' + m.text()); });
  await page.route('https://fonts.googleapis.com/**', (r) => r.abort());
  await page.goto(URL);
  await page.waitForSelector('.view.active');
  await page.selectOption('#role-sel', 'admin');
  return page;
}

/* The module remembers the datamart you had open, so going back to the page
   can land on a detail view rather than the list. */
/* The drawer slides in from the right edge, so it is briefly outside the
   viewport by design. Measure and screenshot only once it has settled. */
async function openDrawer(page, colName) {
  await page.click(`.dm-col-row[data-col="${colName}"]`);
  await page.waitForSelector('#dm-drawer:not([hidden])');
  await page.waitForFunction(() => {
    const d = document.getElementById('dm-drawer');
    return d && d.getAnimations && d.getAnimations().every((a) => a.playState !== 'running');
  }, null, { timeout: 4000 }).catch(() => {});
}

async function goList(page) {
  await page.click('.nav button[data-view="datamart"]');
  const back = await page.$('#dm-back');
  if (back) await back.click();
  await page.waitForSelector('#dm-card tbody tr[data-dm]');
}

(async () => {
  fs.mkdirSync(SHOTS, { recursive: true });
  const browser = await chromium.launch();

  console.log('\nthe list');
  const page = await admin(browser);
  check(await page.$eval('.nav button[data-view="datamart"]', (b) => !b.hidden), 'Datamart is in the admin menu');
  await page.click('.nav button[data-view="datamart"]');
  check(await page.$eval('.view.active', (e) => e.id) === 'view-datamart', 'it opens the datamart view');
  await page.waitForSelector('#dm-card tbody tr[data-dm]');

  const rows = await page.$$eval('#dm-card tbody tr[data-dm]', (n) => n.length);
  check(rows >= 6, `at least six datamarts are listed (${rows})`);
  const health = await page.$$eval('#dm-card tbody tr .pill', (n) => n.map((x) => x.textContent.trim()));
  check(health.some((h) => /fresh/.test(h)), 'a fresh datamart is listed');
  check(health.some((h) => /stale/.test(h)), 'a stale datamart is listed');
  check(health.some((h) => /failed/.test(h)), 'a failed datamart is listed');
  check(health.some((h) => /Default main/.test(h)), 'the default main is flagged');
  check(await page.$$eval('#dm-card tbody tr', (n) => n.some((r) => /not used/.test(r.textContent))), 'an unused datamart is listed');
  await page.screenshot({ path: path.join(SHOTS, 'dm-list.png') });

  console.log('\nusage is computed, not hard-coded');
  const used = await page.evaluate(() => {
    const u = dmUsage('DM-1');
    const segs = MLS.filter((m) => m.dm === 'Main' || m.dm2 === 'Main').map((m) => m.id);
    return { got: u.segments.map((s) => s.id), expect: segs, camps: u.campaigns.length, jrns: u.journeys.length };
  });
  check(JSON.stringify(used.got) === JSON.stringify(used.expect), 'Main "used by" matches the segments that really reference it');
  check(used.camps > 0, `campaigns are resolved through those segments (${used.camps})`);

  console.log('\ndelete guards');
  const guard = await page.evaluate(() => {
    const u = dmUsage('DM-1');
    return { used: u.segments.length > 0 };
  });
  await page.click('#dm-card tr[data-dm="DM-1"] [data-more]');
  const delBtn = await page.$('#dm-card tr[data-dm="DM-1"] .pop button[data-a="del"]');
  check(guard.used && (await delBtn.getAttribute('disabled')) !== null, 'Delete is disabled while the datamart is used');
  check(/remove them first/.test(await delBtn.getAttribute('title') || ''), 'and it says why');
  await page.keyboard.press('Escape');

  console.log('\ncolumns and the drawer');
  await page.click('#dm-card tr[data-dm="DM-1"] [data-open]');
  await page.click('[data-dmtab="columns"]');
  const cols = await page.$$eval('.dm-col-row', (n) => n.length);
  check(cols === 21, `all 21 main columns are listed (${cols})`);

  // profile comes from the rows
  const prof = await page.evaluate(() => {
    const d = dmById('DM-1'); const p = dmProfile(d, 'CHURN_RISK');
    const raw = dmRows(d).map((r) => Number(r.CHURN_RISK)).filter((n) => !isNaN(n));
    return { min: p.min, max: p.max, realMin: Math.min(...raw), realMax: Math.max(...raw), distinct: p.distinct, fill: p.fill };
  });
  check(prof.min === prof.realMin && prof.max === prof.realMax, `min/max are computed from the rows (${prof.min}–${prof.max})`);
  check(prof.fill > 0 && prof.distinct > 1, `fill ${prof.fill}% and ${prof.distinct} distinct values are real`);

  // edit a label in the drawer
  await openDrawer(page, 'CHURN_RISK');
  await page.screenshot({ path: path.join(SHOTS, 'dm-columns-drawer.png') });
  await page.fill('#dm-drawer [data-f="label.en"]', 'Churn propensity');
  await page.click('#dm-save');
  check(await page.$eval('.dm-col-row[data-col="CHURN_RISK"] .lbl b', (e) => e.textContent) === 'Churn propensity', 'the new label is saved');

  // mark a column as a category
  await openDrawer(page, 'REGION');
  const wasCat = await page.$eval('#dm-drawer [data-b="category"]', (e) => e.checked);
  if (!wasCat) await page.check('#dm-drawer [data-b="category"]');
  await page.click('#dm-fillvals');
  const allowed = await page.$$eval('#dm-allowed .chip', (n) => n.length);
  check(allowed > 1, `allowed values are filled from the data (${allowed})`);
  await page.click('#dm-save');

  console.log('\nthe segment builder reads the catalogue');
  await page.selectOption('#role-sel', 'admin');
  await page.click('.nav button[data-view="segmentation"]');
  await page.click('#seg-new');
  await page.click('#seg-add');
  const optText = await page.$$eval('#seg-filters select[data-k="col"] option', (n) => n.map((o) => o.textContent));
  check(optText.some((t) => /Churn propensity/.test(t)), 'the edited label shows in the filter picker');
  check(optText.some((t) => /personal/.test(t)), 'personal columns are marked in the picker');
  const groups = await page.$$eval('#seg-filters select[data-k="col"] optgroup', (n) => n.map((g) => g.label));
  check(groups.length > 2, `the picker is grouped by attribute group (${groups.length} groups)`);

  await page.selectOption('#seg-filters select[data-k="col"]', 'REGION');
  const op = await page.$eval('#seg-filters select[data-k="op"]', (e) => e.value);
  check(op === 'in', 'a category column defaults to the IN operator');
  const valTag = await page.$eval('#seg-filters [data-k="val"]', (e) => e.tagName + (e.multiple ? ':multi' : ''));
  check(valTag === 'SELECT:multi', 'and its value input becomes a value multi-select');
  await page.screenshot({ path: path.join(SHOTS, 'dm-segment-picker.png') });

  console.log('\nthe join uses the relationship');
  const rel = await page.evaluate(() => ({ joinable: segJoinable('Main').map((d) => d.key), text: segJoinText('Main', 'Event') }));
  check(rel.joinable.includes('Event'), 'Event is joinable from Main because a relationship exists');
  check(/CUSTOMER_ID = CUSTOMER_ID/.test(rel.text), `the join text comes from the relationship (${rel.text})`);

  console.log('\nthe data tab masks for non-admins');
  await goList(page);
  await page.click('#dm-card tr[data-dm="DM-1"] [data-prev]');
  await page.waitForSelector('.dm-prev');
  const plain = await page.$eval('.dm-prev tbody tr td:nth-child(4)', (e) => e.textContent);
  await page.check('#dm-asmk');
  const masked = await page.$eval('.dm-prev tbody tr td:nth-child(4)', (e) => e.textContent);
  check(plain !== masked && /•/.test(masked), `MSISDN is masked as a marketer (${plain} → ${masked})`);
  await page.screenshot({ path: path.join(SHOTS, 'dm-data.png') });

  console.log('\nload and danger zone');
  await page.click('[data-dmtab="load"]');
  const before = await page.$$eval('#dm-body tbody tr', (n) => n.length);
  await page.click('#dm-run');
  await page.waitForFunction((b) => document.querySelectorAll('#dm-body tbody tr').length > b, before, { timeout: 8000 }).catch(() => {});
  check(await page.$$eval('#dm-body tbody tr', (n) => n.length) > before, 'Run now adds a load-history row');
  check((await page.$$('#dm-delall')).length === 0, 'Delete all records is blocked on the default main datamart');

  await page.click('#dm-back');
  await page.waitForSelector('#dm-card tr[data-dm="DM-4"]');
  await page.click('#dm-card tr[data-dm="DM-4"] [data-open]');
  await page.click('[data-dmtab="load"]');
  check(await page.$eval('#dm-delall', (e) => e.disabled), 'elsewhere it stays disabled until the name is typed');
  await page.fill('#dm-delname', 'KYIVSTAR PROSPECTS');
  check(!(await page.$eval('#dm-delall', (e) => e.disabled)), 'typing the exact name enables it');
  await page.close();

  console.log('\nnot reachable for other roles');
  for (const role of ['marketer', 'approver', 'cmo']) {
    const p2 = await admin(browser);
    await p2.selectOption('#role-sel', role);
    check(await p2.$eval('.nav button[data-view="datamart"]', (b) => b.hidden), `hidden for ${role}`);
    await p2.close();
  }

  console.log('\nlayout at 1280 and with the menu collapsed');
  const narrow = await admin(browser, 1280);
  await goList(narrow);
  await narrow.click('#dm-card tr[data-dm="DM-1"] [data-open]');
  await narrow.click('[data-dmtab="columns"]');
  await narrow.click('#btn-nav');
  await narrow.waitForTimeout(250);
  await openDrawer(narrow, 'MSISDN');
  const fits = await narrow.evaluate(() => {
    const dr = document.getElementById('dm-drawer').getBoundingClientRect();
    const tbl = document.querySelector('#dm-body table');
    return { drawerIn: dr.right <= innerWidth + 1 && dr.left >= 0, noHScroll: document.documentElement.scrollWidth <= innerWidth + 1, tbl: !!tbl };
  });
  check(fits.drawerIn, 'the drawer stays inside the viewport at 1280 with the menu collapsed');
  check(fits.noHScroll, 'the page does not scroll horizontally');
  await narrow.screenshot({ path: path.join(SHOTS, 'dm-1280-collapsed.png') });
  await narrow.close();

  await browser.close();
  console.log('\nerrors: ' + (errors.length ? '\n - ' + errors.join('\n - ') : 'none'));
  process.exit(errors.length ? 1 : 0);
})();
