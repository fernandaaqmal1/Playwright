// spec: specs/WIT/generated/issue-002-download-data.md
// source: data/WIT/ready-to-test.json
// bug: issue-002
// module: Data pegawai
// feature: Download excel
// priority: P0
// status: Ready to test

import { test, expect } from '@playwright/test';
import * as XLSX from 'xlsx';
import * as fs from 'node:fs';
import * as path from 'node:path';

test.describe('issue-002 - Data pegawai / Download excel', () => {
  test('Alamat Aan Agustian tidak mengandung karakter escape', async ({ page }) => {
    // 1. Buka base URL dari playwright.config.ts
    await page.goto('/');
    await expect(page.getByRole('textbox', { name: 'Email / Nomor Induk Karyawan' })).toBeVisible();

    // 2. Masukkan email
    await page.getByRole('textbox', { name: 'Email / Nomor Induk Karyawan' }).fill('asri@lahanniaga.com');

    // 3. Masukkan password
    await page.getByRole('textbox', { name: 'Kata Sandi' }).fill('Bandung123!');

    // 4. Klik tombol Masuk
    await page.getByRole('button', { name: 'Masuk' }).click();
    await expect(page).toHaveURL(/dashboard/);

    // 5. Klik menu Personalia
    await page.getByRole('link', { name: /Personalia/ }).click();

    // 6. Buka sub-menu Data Pegawai
    await page.getByRole('link', { name: 'Data Pegawai' }).click();
    await expect(page).toHaveURL(/employee/);

    // 7. Masukkan Aan Agustian pada field pencarian
    await page.getByRole('textbox', { name: 'Cari' }).fill('Aan Agustian');
    await expect(page.getByRole('link', { name: 'AAN AGUSTIAN' })).toBeVisible();

    // 8. Klik tombol Download
    const downloadPromise = page.waitForEvent('download');
    await page.getByRole('button', { name: 'Download' }).click();
    const download = await downloadPromise;
    const downloadDir = path.resolve('test-results', 'downloads');
    fs.mkdirSync(downloadDir, { recursive: true });
    const filePath = path.join(downloadDir, download.suggestedFilename());
    await download.saveAs(filePath);
    await expect.poll(() => fs.existsSync(filePath)).toBe(true);

    // 9. Buka file hasil download dan cari baris Aan Agustian
    const fileBuffer = await fs.promises.readFile(filePath);
    expect(fileBuffer.byteLength).toBeGreaterThan(0);
    const workbook = XLSX.read(fileBuffer, { type: 'buffer' });
    const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
    expect(firstSheet).toBeDefined();
    const rawRows = XLSX.utils.sheet_to_json<unknown[]>(firstSheet, {
      header: 1,
      defval: '',
    });
    const headerIndex = rawRows.findIndex(row =>
      row.some(value => /alamat/i.test(String(value))),
    );
    expect(headerIndex).toBeGreaterThanOrEqual(0);
    const headers = rawRows[headerIndex].map(value => String(value).trim());
    const dataRows = rawRows.slice(headerIndex + 1);
    const employee = dataRows.find(row =>
      row.some(value => String(value).trim().toUpperCase() === 'AAN AGUSTIAN'),
    );
    expect(employee).toBeDefined();

    // 10. Periksa nilai pada kolom Alamat
    const addressIndex = headers.findIndex(header => /alamat/i.test(header));
    expect(addressIndex).toBeGreaterThanOrEqual(0);
    const address = String(employee![addressIndex]);
    expect(address).not.toMatch(/(?:\\r|\\n|\/\/r|\/\/n)/i);
  });
});