import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://127.0.0.1:5500/Invt_/index.html');
  await expect(page.getByText('Inventory Manager Add Item')).toBeVisible();
  await page.getByRole('textbox', { name: 'Product Name' }).click();
  await page.getByRole('textbox', { name: 'Product Name' }).fill('Item 1');
  await page.getByPlaceholder('Price').click();
  await page.getByPlaceholder('Price').fill('45000');
  await page.getByPlaceholder('Quantity').click();
  await page.getByPlaceholder('Quantity').fill('15');
  await page.getByRole('button', { name: 'Add Item' }).click();
  await expect(page.getByRole('cell', { name: 'Item' })).toBeVisible();
  await expect(page.getByText('Total (Inc. Tax 11%):')).toBeVisible();
});