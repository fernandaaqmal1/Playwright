import { test, expect } from '@playwright/test';

test.describe('Bug issue-002 — Login', () => {
  test('issue-002 — Unregistered account login displays error and blocks dashboard access', async ({ page }) => {
    // 1. Open SauceDemo in a fresh browser session; verify the login page.
    await page.goto('/');
    await expect(page.getByText('Swag Labs')).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Username' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Password' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();

    // 2. Enter aku in the Username field; verify the value.
    const username = page.getByRole('textbox', { name: 'Username' });
    await username.fill('aku');
    await expect(username).toHaveValue('aku');

    // 3. Enter 123 in the Password field; verify it remains masked.
    const password = page.getByRole('textbox', { name: 'Password' });
    await password.fill('123');
    await expect(password).toHaveValue('123');
    await expect(password).toHaveAttribute('type', 'password');

    // 4. Submit invalid credentials; verify the error and blocked dashboard access.
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.getByText('Epic sadface: Username and password do not match any user in this service')).toBeVisible();
    await expect(page).toHaveURL(/saucedemo\.com\/?$/);
    await expect(page.locator('[data-test="inventory-container"]')).toBeHidden();

    // 5. Verify login controls remain available after failed submission.
    await expect(username).toBeVisible();
    await expect(password).toBeVisible();
    await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
  });
});
