// spec: specs/hris-login-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Login Functionality', () => {
  test('Successful Login with Valid Credentials', async ({ page }) => {
    // 1. Navigate to https://hris.wit.arkamaya.net/login/ homepage
    await page.goto('https://hris.wit.arkamaya.net/login/');
    await expect(page.getByRole('button', { name: 'Masuk' })).toBeVisible();
    await expect(page.getByRole('link', { name: ' Lupa Kata Sandi' })).toBeVisible();

    // 2. Enter email address 'tina@lahanniaga.com' in the Email/Nomor Induk Karyawan field
    await page.locator('input[name="user_name"]').fill('tina@lahanniaga.com');
    await expect(page.locator('input[name="user_name"]')).toHaveValue('tina@lahanniaga.com');

    // 3. Enter password 'Bandung123!' in the Kata Sandi (Password) field
    await page.locator('input[name="user_password"]').fill('Bandung123!');
    await expect(page.locator('input[name="user_password"]')).toHaveValue('Bandung123!');

    // 4. Click the Masuk (Login) button
    await page.locator('button:has-text("Masuk")').click();
    await expect(page).toHaveURL('https://hris.wit.arkamaya.net/dashboard');
    await expect(page).toHaveTitle(/Dasbor Personalia/);
  });
});
