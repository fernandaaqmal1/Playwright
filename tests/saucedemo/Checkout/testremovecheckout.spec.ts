import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await expect(page.getByText('Swag Labs')).toBeVisible();
  await expect(page.locator('#login_button_container')).toBeVisible();
  await page.locator('[data-test="username"]').click();
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').click();
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();
  await expect(page.getByText('Swag Labs')).toBeVisible();
  await expect(page.locator('[data-test="item-4-title-link"]')).toBeVisible();
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  await page.locator('[data-test="shopping-cart-link"]').click();
  await expect(page.locator('[data-test="inventory-item"]')).toBeVisible();
  await expect(page.locator('[data-test="item-4-title-link"]')).toBeVisible();
  await page.locator('[data-test="remove-sauce-labs-backpack"]').click();
  await expect(page.locator('[data-test="cart-list"]')).toBeVisible();
  await page.locator('[data-test="continue-shopping"]').click();
});