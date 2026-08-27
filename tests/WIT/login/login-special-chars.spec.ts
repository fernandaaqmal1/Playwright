// spec: specs/hris-login-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Login Functionality', () => {
  test('Login with Special Characters in Password', async ({ page }) => {
    // 1. Navigate to https://hris.wit.arkamaya.net/login/
    await page.goto('https://hris.wit.arkamaya.net/login/');
    await page.waitForLoadState('domcontentloaded');

    // 2. Enter email 'tina@lahanniaga.com' in the Email field
    await page.locator('input[name="user_name"]').fill('tina@lahanniaga.com');
    await expect(page.locator('input[name="user_name"]')).toHaveValue('tina@lahanniaga.com');

    // 3. Enter password 'Bandung123!' which contains special characters (! symbol) in the Password field
    await page.locator('input[name="user_password"]').fill('Bandung123!');
    await expect(page.locator('input[name="user_password"]')).toHaveValue('Bandung123!');

    // 4. Click the Masuk button
    await page.locator('button:has-text("Masuk")').click();
    await expect(page).toHaveURL(/dashboard/);
    await expect(page).toHaveTitle(/Dasbor Personalia/);
  });
});
