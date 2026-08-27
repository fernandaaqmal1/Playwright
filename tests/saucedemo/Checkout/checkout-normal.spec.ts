// spec: specs/checkout-test-plan.md

import { test, expect } from '@playwright/test'; 

test.describe('Checkout - Normal Flow', () => {
  test('Complete checkout successfully', async ({ page }) => {
    // 1. Open Sauce Demo
    await page.goto('https://www.saucedemo.com/');

    // 2. Enter username
    await page.locator('input[placeholder=\'Username\']').fill('standard_user');

    // 3. Enter password
    await page.locator('input[placeholder=\'Password\']').fill('secret_sauce');

    // 4. Click Login
    await page.locator('[data-test="login-button"]').click();

    // 5. Add Sauce Labs Backpack to cart
    await page.locator('button[data-test="add-to-cart-sauce-labs-backpack"]').click();

    // 6. Navigate to cart
    await page.locator('a[data-test="shopping-cart-link"]').click();

    // 7. Click Checkout
    await page.locator('button[data-test="checkout"]').click();

    // 8. Fill checkout information
    await page.locator('input[data-test="firstName"]').fill('John');
    await page.locator('input[data-test="lastName"]').fill('Doe');
    await page.locator('input[data-test="postalCode"]').fill('12345');

    // 9. Click Continue
    await page.locator('[data-test="continue"]').click();

    // 10. Verify checkout overview page
    await expect(page).toHaveURL(/checkout-step-two\.html/);
    await expect(page.locator('[data-test="title"]')).toHaveText('Checkout: Overview');

    // 11. Verify product and total price
    await expect(page.locator('[data-test="inventory-item-name"]')).toHaveText('Sauce Labs Backpack');
    await expect(page.locator('[data-test="total-label"]')).toHaveText('Total: $32.39');

    // 12. Click Finish
    await page.locator('[data-test="finish"]').click();

    // 13. Verify confirmation message
    await expect(page).toHaveURL(/checkout-complete\.html/);
    await expect(page.locator('[data-test="complete-header"]')).toHaveText('Thank you for your order!');
  });
});