@'
# Test Plan: issue-001 — Download Apps

## Source

- File: `data/ready-to-test.json`
- Type: Bug
- Priority: P0
- Module: Login
- Feature: Download apps
- Status: Ready to test

## Objective

Memastikan link Play Store mengarah ke aplikasi Lahans Connect.

## Preconditions

- Aplikasi tersedia.
- Base URL dikonfigurasi di `playwright.config.ts`.

## Steps

1. Buka base URL.
2. Temukan link `Play Store`.
3. Verifikasi link terlihat.
4. Verifikasi `href`:
   `https://play.google.com/store/apps/details?id=com.personalia.wit.tintin&pcampaignid=web_share`
5. Klik link.
6. Verifikasi URL tujuan.

## Expected Result

Link mengarah ke halaman Lahans Connect di Google Play Store.

## Automation

`tests/generated/issue-001-download-apps.spec.ts`
'@ | Set-Content specs/generated/issue-001-download-apps.md