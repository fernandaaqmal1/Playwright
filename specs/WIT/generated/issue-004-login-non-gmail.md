# WIT Ready-to-Test Bug Plans

## Application Overview

WIT HRIS Login. Bug issue-004: login fails with non-Gmail email. Verify supplied Lahanniaga account can authenticate and display username Agustina Anggraeni.

## Test Scenarios

### 1. WIT Login — issue-004

**Seed:** `tests/seed.spec.ts`

#### 1.1. issue-004 — Login with non-Gmail email

**File:** `specs/WIT/generated/issue-004-login-non-gmail.md`

**Steps:**
  1. Start from a fresh browser session at the WIT application base URL configured in playwright.config.ts.
    - expect: Login page is displayed.
    - expect: No prior user session is active.
  2. Enter email `tina@lahanniaga.com` in the email/username field.
    - expect: The entered non-Gmail email is accepted by the field.
  3. Enter password `Bandung123!` in the password field.
    - expect: The password is accepted and masked.
  4. Submit the login form.
    - expect: Authentication succeeds.
    - expect: The user is taken to the authenticated application area.
    - expect: No validation or server error states that non-Gmail email is unsupported.
  5. Verify the authenticated user identity.
    - expect: The displayed username is `agustina anggraeni`, matching the bug report remark.
