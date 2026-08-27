// spec: specs/checkout-test-plan.md

import { test, expect } from '@playwright/test';

test.describe('Checkout - Abnormal Flow', () => {
  test('Checkout with missing required information', async ({ page }) => {
    // 1. Open Sauce Demo
    await page.goto('https://www.saucedemo.com/');

    // 2. Login
    await page.locator('input[placeholder=\'Username\']').fill('standard_user');
    await page.locator('input[placeholder=\'Password\']').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();

    // 3. Add Backpack to cart
    await page.locator('button[data-test="add-to-cart-sauce-labs-backpack"]').click();

    // 4. Navigate to cart
    await page.locator('a[data-test="shopping-cart-link"]').click();

    // 5. Click Checkout
    await page.locator('button[data-test="checkout"]').click();

    // 6. Leave fields empty and click Continue
    await page.locator('[data-test="continue"]').click();

    // 7. Verify validation error appears
    await expect(page.locator('[data-test="error"]')).toBeVisible();

    // 8. Verify user stays on checkout page
    await expect(page).toHaveURL(/checkout-step-one\.html/);
  });

  test('Checkout with invalid postal code', async ({ page }) => {
    // 1. Open Sauce Demo
    await page.goto('https://www.saucedemo.com/');

    // 2. Login
    await page.locator('input[placeholder=\'Username\']').fill('standard_user');
    await page.locator('input[placeholder=\'Password\']').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();

    // 3. Add Backpack to cart
    await page.locator('button[data-test="add-to-cart-sauce-labs-backpack"]').click();

    // 4. Navigate to cart
    await page.locator('a[data-test="shopping-cart-link"]').click();

    // 5. Click Checkout
    await page.locator('button[data-test="checkout"]').click();

    // 6. Fill valid name but invalid postal code
    await page.locator('input[data-test="firstName"]').fill('John');
    await page.locator('input[data-test="lastName"]').fill('Doe');
    await page.locator('input[data-test="postalCode"]').fill('abc');

    // 7. Click Continue
    await page.locator('[data-test="continue"]').click();

    // Sauce Demo accepts non-empty postal text; document the actual behavior.
    await expect(page).toHaveURL(/checkout-step-two\.html/);
    await expect(page.locator('[data-test="title"]')).toHaveText('Checkout: Overview');
  });
});