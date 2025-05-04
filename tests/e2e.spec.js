// tests/e2e.spec.js
const { test, expect } = require('@playwright/test');

test('Admin adds product → appears on Home', async ({ page }) => {
  page.on('dialog', d => d.accept());

  await page.goto('/admin', { waitUntil: 'networkidle' });
  await page.fill('input[placeholder="Product Name"]', 'PW Demo Prod');
  await page.fill('input[placeholder="Price"]', '555');
  await page.click('button:has-text("Add Product")');
  await page.waitForFunction(() => !document.querySelector('input[placeholder="Product Name"]').value);

  await page.goto('/', { waitUntil: 'networkidle' });

  // Just verify one instance is visible
  const card = page.locator('text=PW Demo Prod').first();
  await expect(card).toBeVisible();
  await expect(page.locator('text=₹555').first()).toBeVisible();
});
