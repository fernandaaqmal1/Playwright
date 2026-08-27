// spec: specs/hris-login-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Login Functionality', () => {
  test('Login with Both Fields Empty', async ({ page }) => {
    // 1. Navigate to https://hris.wit.arkamaya.net/login/
    await page.goto('https://hris.wit.arkamaya.net/login/');
    await page.waitForLoadState('domcontentloaded');

    // 2. Leave both Email and Password fields empty
    // (Both fields remain empty - no action needed)

    // 3. Click the Masuk button
    await page.locator('button:has-text("Masuk")').click();
    await page.waitForURL('**/login/failed');
    await expect(page.getByText('Email atau Kata Sandi salah')).toBeVisible();
  });
});
