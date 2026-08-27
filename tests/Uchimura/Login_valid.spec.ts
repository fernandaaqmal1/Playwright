import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://dev-wms.nec.arkamaya.net/login');
  await expect(page.getByText('Sign In Enter your username and password to access WMS. Username Password Log In')).toBeVisible();
  await page.getByRole('textbox', { name: 'Username' }).click();
  await page.getByRole('textbox', { name: 'Username' }).fill('admin');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('admin');
  await page.getByRole('button', { name: 'Log In' }).click();
  await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
  await page.getByRole('button', { name: 'Admin admin' }).click();
  await page.getByRole('button', { name: 'Admin admin' }).click();
  await page.getByRole('button', { name: 'Admin admin' }).click();
  await page.getByRole('link', { name: '󰍃 Logout' }).click();
  await expect(page.getByText('Sign In Enter your username and password to access WMS. Username Password Log In')).toBeVisible();