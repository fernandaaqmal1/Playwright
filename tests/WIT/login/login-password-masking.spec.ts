// spec: specs/hris-login-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Login Functionality', () => {
  test('Password Field Masking', async ({ page }) => {
    // 1. Navigate to https://hris.wit.arkamaya.net/login/
    await page.goto('https://hris.wit.arkamaya.net/login/');

    // 2. Click on the Password field
    const passwordField = page.locator('input[name="user_password"]');
    await passwordField.focus();

    // 3. Type password 'Bandung123!' character by character
    await passwordField.type('Bandung123!', { delay: 50 });
    
    // Verify password is masked (field type should be password)
    await expect(passwordField).toHaveAttribute('type', 'password');
    await expect(passwordField).toHaveValue('Bandung123!');
  });
});
