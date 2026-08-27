// spec: specs/hris-login-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Login Functionality', () => {
  test('Forgot Password Link Navigation', async ({ page }) => {
    // 1. Navigate to https://hris.wit.arkamaya.net/login/
    await page.goto('https://hris.wit.arkamaya.net/login/');
    await page.waitForLoadState('domcontentloaded');
    await expect(page.getByRole('link', { name: ' Lupa Kata Sandi' })).toBeVisible();

    // 2. Click the 'Lupa Kata Sandi' (Forgot Password) link
    await page.getByRole('link', { name: ' Lupa Kata Sandi' }).click();
    await page.waitForURL('**/forgot_password');
  });
});
