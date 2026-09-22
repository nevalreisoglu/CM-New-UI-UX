#!/usr/bin/env node
/**
 * Copy docs/user-manual.md into the <script type="text/markdown" id="man-src">
 * block in index.html, between the MANUAL:START / MANUAL:END markers.
 *
 * The prototype ships as one file people download and open with no server, so
 * the manual travels inside it rather than being linked. This script keeps that
 * copy honest; tests/specs/manual.spec.js fails the suite if it drifts.
 *
 *   node tools/embed-manual.js          # update index.html
 *   node tools/embed-manual.js --check  # exit 1 if it is out of date
 */
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const htmlPath = path.join(root, 'index.html');
const manualPath = path.join(root, 'docs', 'user-manual.md');

const manual = fs.readFileSync(manualPath, 'utf8');
const html = fs.readFileSync(htmlPath, 'utf8');

if (/<\/script/i.test(manual)) {
  console.error('docs/user-manual.md contains "</script" and cannot be embedded as-is.');
  process.exit(1);
}

const block = /(<!-- MANUAL:START -->\n)[\s\S]*?(<!-- MANUAL:END -->)/;
if (!block.test(html)) {
  console.error('MANUAL:START / MANUAL:END markers not found in index.html.');
  process.exit(1);
}

const updated = html.replace(block, (_, start, end) => start + manual + end);

if (process.argv.includes('--check')) {
  if (updated !== html) {
    console.error('index.html is out of date with docs/user-manual.md — run: node tools/embed-manual.js');
    process.exit(1);
  }
  console.log('index.html is in sync with docs/user-manual.md');
  process.exit(0);
}

if (updated === html) {
  console.log('index.html already in sync with docs/user-manual.md');
} else {
  fs.writeFileSync(htmlPath, updated);
  console.log(`index.html updated from docs/user-manual.md (${manual.length} chars)`);
}
