// playwright.config.js
const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  // Only look inside the top-level "tests" folder
  testDir: './tests',

  // Only match files ending in ".spec.js" (so it skips "products.test.js")
  testMatch: /.*\.spec\.js/,

  timeout: 30_000,
  use: {
    baseURL: 'http://localhost:3000',
    headless: true,
    actionTimeout: 10_000,
  },
});
