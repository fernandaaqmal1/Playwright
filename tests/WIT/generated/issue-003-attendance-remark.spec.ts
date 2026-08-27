import { test, expect } from '@playwright/test';

test.describe('issue-003 - Kehadiran Kerja / Inquiry', () => {
  test('Catatan masuk dan pulang tidak menampilkan Face recognition bypassed', async ({ page }) => {
    await page.goto('/');
    const email = page.getByRole('textbox', { name: /Email|Nomor Induk Karyawan/i });
    const password = page.getByRole('textbox', { name: /Kata Sandi|Password/i });
    await expect(email).toBeVisible();
    await email.fill('asri@lahanniaga.com');
    await password.fill('Bandung123!');
    await page.getByRole('button', { name: /Masuk/i }).click();
    await expect(page).toHaveURL(/dashboard/);

    await page.goto('/attendance');

    const employeeInput = page.locator('.select2-search__field').last();
    await employeeInput.click();
    await employeeInput.fill('Heri Irawan');
    await page.locator('.select2-results__option', { hasText: /Heri Irawan/i }).first().click();

    const periodFrom = page.getByPlaceholder('Dari Tanggal');
    const periodTo = page.getByPlaceholder('Sampai Tanggal');

    await periodFrom.focus();
    await periodFrom.evaluate((el: HTMLInputElement) => {
      el.value = '06/08/2026';
      el.dispatchEvent(new Event('input', { bubbles: true }));
      el.dispatchEvent(new Event('change', { bubbles: true }));
    });

    await periodTo.focus();
    await periodTo.evaluate((el: HTMLInputElement) => {
      el.value = '06/08/2026';
      el.dispatchEvent(new Event('input', { bubbles: true }));
      el.dispatchEvent(new Event('change', { bubbles: true }));
    });

    await expect(periodFrom).toHaveValue('06/08/2026');
    await expect(periodTo).toHaveValue('06/08/2026');

    await page.getByRole('button', { name: 'Filter', exact: true }).click();

    await expect(page.getByText('Memuat data. Silahkan tunggu...', { exact: true })).toBeHidden();
    const table = page.locator('.dataTables_wrapper, table, [role="grid"]').last();
    await expect(table).toBeVisible();
    await expect(table).toContainText(/Heri Irawan/i);
    await expect(table).not.toContainText('Face recognition bypassed');
  });
});
