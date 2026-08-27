// spec: specs/hris-login-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Login Functionality', () => {
  test('Login with XSS Attempt in Email', async ({ page }) => {
    // 1. Navigate to https://hris.wit.arkamaya.net/login/
    await page.goto('https://hris.wit.arkamaya.net/login/');

    // 2. Enter XSS payload "<script>alert('XSS')</script>" in the Email field
    await page.locator('input[name="user_name"]').fill("<script>alert('XSS')</script>");
    await expect(page.locator('input[name="user_name"]')).toHaveValue("<script>alert('XSS')</script>");

    // 3. Enter password 'Bandung123!' in the Password field
    await page.locator('input[name="user_password"]').fill('Bandung123!');
    await expect(page.locator('input[name="user_password"]')).toHaveValue('Bandung123!');

    // 4. Click the Masuk button
    await page.locator('button:has-text("Masuk")').click();
    await expect(page).toHaveURL('https://hris.wit.arkamaya.net/login/failed');
    await expect(page.getByText('Email atau Kata Sandi salah')).toBeVisible();
  });
});
