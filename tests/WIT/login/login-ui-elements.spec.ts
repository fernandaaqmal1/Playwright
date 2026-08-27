// spec: specs/hris-login-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Login Functionality', () => {
  test('Login Page UI Elements Visibility', async ({ page }) => {
    // 1. Navigate to https://hris.wit.arkamaya.net/login/
    await page.goto('https://hris.wit.arkamaya.net/login/');
    
    // Verify all UI elements are visible
    await expect(page).toHaveTitle('Login - Lahans Connect');
    await expect(page.locator('input[name="user_name"]')).toBeVisible();
    await expect(page.locator('input[name="user_password"]')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Masuk' })).toBeVisible();
    await expect(page.getByRole('link', { name: ' Lupa Kata Sandi' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Play Store' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'App Store' })).toBeVisible();
    await expect(page.getByText('© 2026')).toBeVisible();
  });
});
