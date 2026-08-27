# SauceDemo Ready-to-Test Bug Test Plan

## Application Overview

SauceDemo login page at https://www.saucedemo.com/. Validate unregistered-account login behavior. Fresh browser state per test; no automation script generated.

## Test Scenarios

### 1. Login

**Seed:** `tests/saucedemo/seed.spec.ts`

#### 1.1. issue-002 — Unregistered account login displays error and blocks dashboard access

**File:** `specs/saucedemo/generated/issue-002-unregistered-account-login.md`

**Steps:**
  1. Open https://www.saucedemo.com/ in a fresh browser session.
    - expect: Login page displays the Swag Labs heading.
    - expect: Username textbox, Password textbox, and Login button are visible.
  2. Enter `aku` in the Username field.
    - expect: Username field contains `aku`.
  3. Enter `123` in the Password field.
    - expect: Password field contains `123` and remains masked.
  4. Click the Login button.
    - expect: A clear login error message appears.
    - expect: The error identifies the credentials as invalid or otherwise communicates that authentication failed.
    - expect: The user remains on the login page.
    - expect: The inventory/dashboard page is not displayed.
  5. Verify the URL and login controls after the failed submission.
    - expect: URL remains the SauceDemo login URL or does not navigate to the inventory page.
    - expect: Username and Password fields plus Login button remain available.
    - expect: No authenticated dashboard or product inventory is accessible.
