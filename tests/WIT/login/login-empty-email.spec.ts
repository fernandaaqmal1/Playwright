// spec: specs/hris-login-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Login Functionality', () => {
  test('Login with Empty Email Field', async ({ page }) => {
    // 1. Navigate to https://hris.wit.arkamaya.net/login/
    await page.goto('https://hris.wit.arkamaya.net/login/');
    await page.waitForLoadState('domcontentloaded');

    // 2. Leave the Email/Nomor Induk Karyawan field empty
    // (Email field remains empty - no action needed)

    // 3. Enter password 'Bandung123!' in the Password field
    await page.locator('input[name="user_password"]').fill('Bandung123!');
    await expect(page.locator('input[name="user_password"]')).toHaveValue('Bandung123!');

    // 4. Click the Masuk button
    await page.locator('button:has-text("Masuk")').click();
    await page.waitForURL('**/login/failed');
    await expect(page.getByText('Login Gagal')).toBeVisible();
    await expect(page.getByText('Email atau Kata Sandi salah')).toBeVisible();
  });
});
