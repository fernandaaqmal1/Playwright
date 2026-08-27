// spec: specs/generated/issue-001-download-apps.md
// source: data/ready-to-test.json
// bug: issue-001
// module: Login
// feature: Download apps
// priority: P0
// status: Ready to test

import { test, expect } from '@playwright/test';

const expectedPlayStoreUrl =
  'https://play.google.com/store/apps/details?id=com.personalia.wit.tintin&pcampaignid=web_share';

test.describe('issue-001 - Login / Download apps', () => {
  test('Get it on Playstore directs to Lahans Connect app', async ({ page }) => {
    // Navigate to HRIS application
    await page.goto('/');

    // Verify Play Store link is visible
    const playStoreLink = page.getByRole('link', { name: 'Play Store' });
    await expect(playStoreLink).toBeVisible();

    // Verify Play Store link href
    await expect(playStoreLink).toHaveAttribute('href', expectedPlayStoreUrl);

    // Click Play Store link and verify navigation
    await playStoreLink.click();
    await expect(page).toHaveURL(expectedPlayStoreUrl);
  });
});