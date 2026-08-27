import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await expect(page.getByText('Swag Labs')).toBeVisible();
  await expect(page.locator('#login_button_container')).toMatchAriaSnapshot(`
    - textbox "Username"
    - textbox "Password"
    - button "Login"
    `);
  await page.locator('[data-test="username"]').click();
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').click();
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();
  await expect(page.getByText('Swag Labs')).toBeVisible();
  await expect(page.locator('[data-test="item-4-title-link"]')).toBeVisible();
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  await page.locator('[data-test="shopping-cart-link"]').click();
  await expect(page.locator('[data-test="secondary-header"]')).toBeVisible();
  await expect(page.locator('[data-test="inventory-item"]')).toBeVisible();
  await page.locator('[data-test="checkout"]').click();
  await page.locator('[data-test="firstName"]').click();
  await expect(page.locator('.checkout_info')).toBeVisible();
  await page.locator('[data-test="firstName"]').click();
  await page.locator('[data-test="firstName"]').fill('akmal');
  await page.locator('[data-test="lastName"]').click();
  await page.locator('[data-test="lastName"]').fill('aja');
  await page.locator('[data-test="postalCode"]').click();
  await page.locator('[data-test="lastName"]').fill('aja1');
  await page.locator('[data-test="postalCode"]').fill('23321');
  await page.locator('[data-test="continue"]').click();
  await expect(page.locator('[data-test="cart-list"]')).toBeVisible();
  await expect(page.locator('[data-test="payment-info-label"]')).toBeVisible();
  await page.locator('[data-test="shipping-info-label"]').click();
  await expect(page.locator('[data-test="shipping-info-label"]')).toBeVisible();
  await expect(page.locator('[data-test="total-info-label"]')).toBeVisible();
  await expect(page.locator('[data-test="total-label"]')).toBeVisible();
  await page.locator('[data-test="finish"]').click();
  await expect(page.locator('[data-test="complete-header"]')).toBeVisible();
  await page.locator('[data-test="back-to-products"]').click();
});