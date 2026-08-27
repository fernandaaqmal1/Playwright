// spec: specs/hris-login-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Login Functionality', () => {
  test('Login with Empty Password Field', async ({ page }) => {
    // 1. Navigate to https://hris.wit.arkamaya.net/login/
    await page.goto('https://hris.wit.arkamaya.net/login/');
    await page.waitForLoadState('domcontentloaded');

    // 2. Enter email address 'tina@lahanniaga.com' in the Email field
    await page.locator('input[name="user_name"]').fill('tina@lahanniaga.com');
    await expect(page.locator('input[name="user_name"]')).toHaveValue('tina@lahanniaga.com');

    // 3. Leave the Password field empty
    // (Password field remains empty - no action needed)

    // 4. Click the Masuk button
    await page.locator('button:has-text("Masuk")').click();
    await page.waitForURL('**/login/failed');
    await expect(page.getByText('Email atau Kata Sandi salah')).toBeVisible();
  });
});
