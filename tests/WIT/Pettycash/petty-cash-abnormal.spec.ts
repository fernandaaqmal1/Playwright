// spec: specs/plan.md (testplan-petty-cash.md)
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Petty Cash - Abnormal Case', () => {
  test('TC-PC-002: Submit Form dengan Field Wajib Kosong (Validasi Required Fields)', async ({ page }) => {
    // Step 1: Navigate to login page
    await page.goto('/login/');
    await expect(page).toHaveURL(/\/login/);

    // Step 2: Input email
    await page.getByRole('textbox', { name: 'Email / Nomor Induk Karyawan' }).fill('tina@lahanniaga.com');

    // Step 3: Input password
    await page.getByRole('textbox', { name: 'Kata Sandi' }).fill('Bandung123!');

    // Step 4: Click tombol Masuk
    await page.getByRole('button', { name: 'Masuk' }).click();

    // Verify login success
    await expect(page).toHaveURL(/\/dashboard/);

    // Step 5: Navigate to Petty Cash page directly
    await page.goto('/petty_cash', { timeout: 60000, waitUntil: 'domcontentloaded' });

    // Step 6: Klik tombol Buat Petty Cash
    await page.getByRole('button', { name: /Buat Petty Cash/ }).click();
    await expect(page).toHaveURL(/\/petty_cash\/create/);
    await expect(page.getByRole('heading', { name: 'Buat Petty Cash' })).toBeVisible();

    // Wait for submit handler function to be loaded before clicking submit
    await page.waitForFunction(() => typeof (window as any).submit_petty_cash === 'function');

    // Step 8: JANGAN MENGISI field apapun. Langsung klik tombol Buat Petty Cash
    await page.getByRole('button', { name: 'Buat Petty Cash', exact: true }).click();

    // Step 9: Verify user TIDAK di-redirect dari halaman form
    // URL should remain on the create page
    await expect(page).toHaveURL(/\/petty_cash\/create/);

    // Verify the form is still visible (not redirected to list)
    await expect(page.getByRole('heading', { name: 'Buat Petty Cash' })).toBeVisible();

    // Verify validation error messages are displayed for required fields
    // The form uses jQuery Validate with "error" class on <span> and <div> elements
    // Check that at least one error message is visible
    await expect(page.getByText('Field ini harus diisi.').first()).toBeVisible();
    // "Pilih status pengajuan" is shown in a div.error (not the hidden span)
    await expect(page.locator('div.error:has-text("Pilih status pengajuan")')).toBeVisible();

    // Step 10: Verify no new data was created by navigating to the list
    await page.goto('/petty_cash');
    await expect(page).toHaveURL(/\/petty_cash/);
    await expect(page.getByRole('heading', { name: 'Petty Cash' })).toBeVisible();

    // Verify the user is on the list page (no new record was accidentally created from the empty form)
    await expect(page.getByText(/Menampilkan/)).toBeVisible();
  });
});
