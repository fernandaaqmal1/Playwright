import { expect, test } from '@playwright/test';

test.describe('issue-001 - Gambar produk sesuai nama produk', () => {
  test('issue-001 - setiap gambar sesuai nama produk', async ({ page }) => {
    // 1. Buka SauceDemo
    await page.goto('/');

    // 2. Login dengan standard_user dan secret_sauce
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();

    // Expected: halaman inventory ditampilkan
    await expect(page).toHaveURL(/inventory\.html/);
    await expect(page.getByText('Products')).toBeVisible();

    // 3. Periksa setiap item produk
    const products = page.locator('[data-test="inventory-item"]');
    const productCount = await products.count();
    expect(productCount).toBeGreaterThan(0);

    for (let i = 0; i < productCount; i++) {
      const product = products.nth(i);
      const name = (await product.locator('[data-test="inventory-item-name"]').textContent())?.trim();
      const image = product.locator('img');

      await expect(image).toBeVisible();
      await expect(image).toHaveAttribute('alt', name ?? '');
      await expect(image).not.toHaveAttribute('src', /.*sl-404\.jpg/);
    }

    // 4. Verifikasi Sauce Labs Backpack
    const backpackImage = page.locator(
      '[data-test="inventory-item-sauce-labs-backpack-img"]'
    );

    await expect(backpackImage).toHaveAttribute(
      'src',
      /sauce-backpack.*\.jpg$/
    );

    // 5. Verifikasi Sauce Labs Bike Light
    const bikeLightImage = page.locator(
      '[data-test="inventory-item-sauce-labs-bike-light-img"]'
    );

    await expect(bikeLightImage).toHaveAttribute(
      'src',
      /bike-light.*\.jpg$/
    );

    // 6. Periksa seluruh produk
    await expect(page.locator('img[src*="sl-404"]')).toHaveCount(0);
  });
});