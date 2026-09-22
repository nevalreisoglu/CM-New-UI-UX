// @ts-check
const { defineConfig, devices } = require('@playwright/test');

/**
 * The prototype is a single file with no build and no server, so the specs open
 * index.html over file:// . Nothing here talks to the network: the Google Fonts
 * stylesheet is the only external reference and it is aborted in the fixture so
 * a run works offline and takes the same time every time.
 */
module.exports = defineConfig({
  testDir: './specs',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 0,
  reporter: process.env.CI ? [['github'], ['html', { open: 'never' }]] : [['list']],
  outputDir: './test-results',
  use: {
    viewport: { width: 1440, height: 900 },
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  ],
});
