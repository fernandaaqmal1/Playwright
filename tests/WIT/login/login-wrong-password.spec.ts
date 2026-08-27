// spec: specs/hris-login-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Login Functionality', () => {
  test('Login with Wrong Password', async ({ page }) => {
    // 1. Navigate to https://hris.wit.arkamaya.net/login/
    await page.goto('https://hris.wit.arkamaya.net/login/');
    await page.waitForLoadState('domcontentloaded');

    // 2. Enter correct email 'tina@lahanniaga.com' in the Email field
    await page.locator('input[name="user_name"]').fill('tina@lahanniaga.com');
    await expect(page.locator('input[name="user_name"]')).toHaveValue('tina@lahanniaga.com');

    // 3. Enter incorrect password 'WrongPassword123!' in the Password field
    await page.locator('input[name="user_password"]').fill('WrongPassword123!');
    await expect(page.locator('input[name="user_password"]')).toHaveValue('WrongPassword123!');

    // 4. Click the Masuk button
    await page.locator('button:has-text("Masuk")').click();
    await page.waitForURL('**/login/failed');
    await expect(page.getByText('Email atau Kata Sandi salah')).toBeVisible();
  });
});
