// spec: specs/plan.md (testplan-petty-cash.md)
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Petty Cash - Normal Case', () => {
  test('TC-PC-001: Buat Petty Cash Baru dengan Data Lengkap dan Valid', async ({ page }) => {
    // Compute unique future dates per run using randomness for uniqueness
    // Use a random day offset to avoid overlap with any previous runs
    const dayOffset = Math.floor(Math.random() * 200); // 0..199
    const departureDate = new Date(2030, 0, 1 + dayOffset); // Jan 1 - Jul 19, 2030
    const returnDate = new Date(2030, 0, 3 + dayOffset);   // Jan 3 - Jul 21, 2030
    const expenseDate = new Date(2030, 0, dayOffset);       // Dec 31, 2029 - Jul 18, 2030

    // Step 1: Navigate to login page
    await page.goto('/login/');
    await expect(page).toHaveURL(/\/login/);

    // Step 2: Input email
    await page.getByRole('textbox', { name: 'Email / Nomor Induk Karyawan' }).fill('tina@lahanniaga.com');

    // Step 3: Input password
    await page.getByRole('textbox', { name: 'Kata Sandi' }).fill('Bandung123!');

    // Step 4: Click tombol Masuk
    await page.getByRole('button', { name: 'Masuk' }).click();

    // Verify login success - redirected to dashboard
    await expect(page).toHaveURL(/\/dashboard/, { timeout: 15000 });

    // Step 5: Navigate to Petty Cash page directly
    await page.goto('/petty_cash', { timeout: 60000, waitUntil: 'domcontentloaded' });

    // Step 6: Klik tombol Buat Petty Cash
    await page.getByRole('button', { name: /Buat Petty Cash/ }).click();
    await expect(page).toHaveURL(/\/petty_cash\/create/);
    await expect(page.getByRole('heading', { name: 'Buat Petty Cash' })).toBeVisible();

    // Verify auto-filled "Diajukan Oleh"
    await expect(page.locator('a[title="Lihat Profil"]:has-text("AGUSTINA ANGGRAENI")')).toBeVisible();

    // Step 8: Pilih PT LMN - Bandung pada field Penempatan Kerja
    // Use Playwright UI interaction with select2 multi-select for reliability
    await page.waitForFunction(() => typeof (window as any).$ === 'function' && typeof (window as any).$.fn?.select2 === 'function');
    const placementInput = page.locator('.select2-selection--multiple .select2-search__field').first();
    await placementInput.click();
    await placementInput.fill('PT LMN - Bandung');
    await page.locator('.select2-results__option').filter({ hasText: 'PT LMN - Bandung' }).click();
    // Verify placement was selected
    await page.waitForFunction(() => {
      const sel = document.querySelector('#placement') as HTMLSelectElement;
      if (!sel) return false;
      for (let i = 0; i < sel.options.length; i++) {
        if (sel.options[i].selected && sel.options[i].value === '701') return true;
      }
      return false;
    });

    // Step 9: Set Tanggal Keberangkatan
    // NOTE: This is bootstrap-datepicker, NOT jQuery UI datepicker — must use Date objects
    await page.waitForFunction(() => typeof (window as any).$ === 'function' && typeof (window as any).$.fn?.datepicker === 'function');
    await page.evaluate((depDate) => {
      const dtFrom = document.querySelector<HTMLInputElement>('#dt_from');
      if (dtFrom) {
        $(dtFrom).datepicker('setDate', new Date(depDate));
      }
    }, departureDate.toISOString());

    // Step 10: Set Tanggal Kembali
    await page.evaluate((retDate) => {
      const dtTo = document.querySelector<HTMLInputElement>('#dt_to');
      if (dtTo) {
        $(dtTo).datepicker('setDate', new Date(retDate));
      }
    }, returnDate.toISOString());

    // Step 11: Input Lokasi Tujuan
    await page.locator('input[name="destination_location"]').fill('Bandung City Office');

    // Step 12: Input Keperluan Perjalanan
    await page.locator('textarea[name="destination"]').fill('Meeting koordinasi bulanan dengan tim sales');

    // Step 13: Pilih Jenis Petty Cash dari dropdown (opsi pertama: Belanja ATK)
    await page.evaluate(() => {
      const sel = document.querySelector<HTMLSelectElement>('#petty_cash_type_id');
      if (sel) {
        sel.value = '2';
        sel.dispatchEvent(new Event('change', { bubbles: true }));
        if (window.$) $(sel).trigger('change');
      }
    });

    // Step 14: Pilih radio Terencana pada Status Pengajuan
    await page.getByRole('radio', { name: 'Terencana' }).click();
    await expect(page.getByRole('radio', { name: 'Terencana' })).toBeChecked();

    // Step 15: Set Biaya diperlukan pada tanggal ke 1 hari sebelum tanggal keberangkatan
    await page.evaluate((expDate) => {
      const costDate = document.querySelector<HTMLInputElement>('#expense_needed_date');
      if (costDate) {
        $(costDate).datepicker('setDate', new Date(expDate));
      }
    }, expenseDate.toISOString());

    // Step 16: Pastikan Payment Method = Transfer (default sudah terpilih)
    await expect(page.getByRole('radio', { name: 'Transfer' })).toBeChecked();

    // Step 17: Verifikasi field Penerima, Bank, No Rekening terisi otomatis
    await expect(page.locator('input[name="recipient_bank_holder"]')).toHaveValue('AGUSTINA ANGGRAENI');
    await expect(page.locator('input[name="recipient_bank_account"]')).toHaveValue('Bank BCA');
    await expect(page.locator('input[name="recipient_bank_number"]')).toHaveValue('4460556142');

    // Step 18a: Add Member Petty Cash - type employee name and add
    const memberInput = page.locator('input.members');
    await memberInput.click();
    await memberInput.pressSequentially('Agustina');

    // Wait for autocomplete dropdown to appear and select the matching suggestion
    const suggestion = page.locator('.autocomplete-suggestion').filter({ hasText: 'AGUSTINA ANGGRAENI' }).first();
    await suggestion.waitFor({ state: 'visible', timeout: 5000 });
    await suggestion.click();

    // Press Enter to confirm the selection and add the member to the table
    await memberInput.press('Enter');

    // Verify member was added to the table (check the table body for the employee name)
    await expect(page.locator('#employeeTableBody')).toContainText('AGUSTINA ANGGRAENI');

    // Step 18b: Fill Biaya Petty Cash row - select Transportasi
    await page.getByRole('combobox', { name: '-- Pilih --' }).click();
    await page.getByRole('treeitem', { name: /Transportasi/ }).click();

    // Fill Jumlah Biaya - trigger autoNumeric formatting via blur
    const amountInput = page.locator('.cost-amount-input').first();
    await amountInput.fill('150000');
    await amountInput.blur();

    // Fill Keterangan
    await page.getByRole('textbox', { name: 'Keterangan' }).fill('Tiket transport pulang pergi');

    // Click Tambah to add the cost row
    await page.getByRole('button', { name: 'Tambah', exact: true }).click();

    // Verify the cost row was added to the table (second table on the page)
    const biayaTable = page.locator('#costTableBody');
    // Wait for the cost type select to have the proper value loaded
    await expect(biayaTable.locator('.cost-type-select').first()).not.toHaveValue('', { timeout: 10000 });
    await expect(biayaTable.locator('.cost-type-select').first()).toHaveValue('1');
    await expect(biayaTable.locator('.cost-amount-input').first()).toHaveValue('150.000');
    await expect(biayaTable.locator('.cost-note-input').first()).toHaveValue('Tiket transport pulang pergi');

    // Step 19: Wait for submit handler function to load, then click submit
    await page.waitForFunction(() => typeof (window as any).submit_petty_cash === 'function', { timeout: 15000 });
    await page.getByRole('button', { name: 'Buat Petty Cash', exact: true }).click();

    // Step 20: Verify redirect to detail page with success message
    await expect(page).toHaveURL(/\/petty_cash\/id\//);
    await expect(page.getByText('Berhasil.')).toBeVisible();
    await expect(page.getByText('Petty Cash Berhasil dibuat.')).toBeVisible();

    // Verify detail data on the created petty cash page
    await expect(page.getByText('PLAN').first()).toBeVisible();
    await expect(page.getByText('Menunggu').first()).toBeVisible();
    await expect(page.getByText('PT LMN - Bandung')).toBeVisible();
    await expect(page.getByText(/\d+ \w+ 20\d\d/).first()).toBeVisible();
    await expect(page.getByText('Bandung City Office')).toBeVisible();
    await expect(page.getByText('Meeting koordinasi bulanan dengan tim sales')).toBeVisible();
    await expect(page.getByText('Terencana')).toBeVisible();
    await expect(page.getByText('Transfer', { exact: true })).toBeVisible();
    await expect(page.getByText('AGUSTINA ANGGRAENI').first()).toBeVisible();
    await expect(page.getByText('Bank BCA')).toBeVisible();
    await expect(page.getByText('4460556142')).toBeVisible();
    await expect(page.getByText('Transportasi')).toBeVisible();
    await expect(page.getByText('150.000,00').first()).toBeVisible();
  });
});
