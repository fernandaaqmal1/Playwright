import { test, expect } from '@playwright/test';

// spec: specs/WIT/generated/issue-005-login-without-password.md
// seed: tests/WIT/seed.spec.ts

test.describe('WIT Login — issue-005', () => {
  test('issue-005 — Login tanpa password harus ditolak', async ({ page }) => {
    // 1. Buka halaman login.
    await page.goto('/');
    await expect(
      page.getByRole('textbox', { name: 'Email / Nomor Induk Karyawan' }),
    ).toBeVisible();

    // 2. Isi email.
    const email = page.getByRole('textbox', {
      name: 'Email / Nomor Induk Karyawan',
    });
    await email.fill('tina@lahanniaga.com');
    await expect(email).toHaveValue('tina@lahanniaga.com');

    // 3. Biarkan password kosong.
    const password = page.getByRole('textbox', { name: 'Kata Sandi' });
    await expect(password).toBeEmpty();

    // 4. Klik tombol Login.
    await page.getByRole('button', { name: 'Masuk' }).click();

    // 5. Verifikasi login gagal dan pesan error muncul.
    await expect(
      page.getByText('Login Gagal. Email atau Kata Sandi salah.'),
    ).toBeVisible();
  });

  test('issue-005 — Login dengan password benar harus berhasil', async ({
    page,
  }) => {
    // 1. Buka halaman login.
    await page.goto('/');
    await expect(
      page.getByRole('textbox', { name: 'Email / Nomor Induk Karyawan' }),
    ).toBeVisible();

    // 2. Isi email.
    const email = page.getByRole('textbox', {
      name: 'Email / Nomor Induk Karyawan',
    });
    await email.fill('tina@lahanniaga.com');
    await expect(email).toHaveValue('tina@lahanniaga.com');

    // 3. Isi password.
    const password = page.getByRole('textbox', { name: 'Kata Sandi' });
    await password.fill('Bandung123!');
    await expect(password).toHaveAttribute('type', 'password');

    // 4. Klik tombol Login.
    await page.getByRole('button', { name: 'Masuk' }).click();

    // 5. Verifikasi berhasil masuk ke dashboard.
    await expect(page).toHaveURL(/\/dashboard\/?$/);
    await expect(
      page.getByRole('heading', { name: 'Dasbor Personalia' }),
    ).toBeVisible();
  });

  test('issue-005 — Submit tanpa password menggunakan Enter', async ({
    page,
  }) => {
    // 1. Buka halaman login.
    await page.goto('/');
    await expect(
      page.getByRole('textbox', { name: 'Email / Nomor Induk Karyawan' }),
    ).toBeVisible();

    // 2. Isi email.
    const email = page.getByRole('textbox', {
      name: 'Email / Nomor Induk Karyawan',
    });
    await email.fill('tina@lahanniaga.com');
    await expect(email).toHaveValue('tina@lahanniaga.com');

    // 3. Tekan Enter tanpa mengisi password.
    await email.press('Enter');

    // 4. Verifikasi login gagal dan pesan error muncul.
    await expect(
      page.getByText('Login Gagal. Email atau Kata Sandi salah.'),
    ).toBeVisible();
  });
});