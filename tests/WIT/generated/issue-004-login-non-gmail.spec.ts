import { test, expect } from '@playwright/test';

// spec: specs/WIT/generated/issue-004-login-non-gmail.md
// seed: tests/WIT/seed.spec.ts

test.describe('WIT Login — issue-004', () => {
  test('issue-004 — Login with non-Gmail email', async ({ page }) => {
    // 1. Open login page.
    await page.goto('/');
    await expect(
      page.getByRole('textbox', { name: 'Email / Nomor Induk Karyawan' }),
    ).toBeVisible();

    // 2. Enter email.
    const email = page.getByRole('textbox', {
      name: 'Email / Nomor Induk Karyawan',
    });
    await email.fill('tina@lahanniaga.com');
    await expect(email).toHaveValue('tina@lahanniaga.com');

    // 3. Enter password.
    const password = page.getByRole('textbox', { name: 'Kata Sandi' });
    await password.fill('Bandung123!');
    await expect(password).toHaveAttribute('type', 'password');

    // 4. Submit login and verify dashboard.
    await page.getByRole('button', { name: 'Masuk' }).click();
    await expect(page).toHaveURL(/\/dashboard\/?$/);
    await expect(
      page.getByRole('heading', { name: 'Dasbor Personalia' }),
    ).toBeVisible();
  });
});