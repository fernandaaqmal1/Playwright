# HRIS Login Test Plan

## Application Overview

Comprehensive test plan untuk Lahans Connect HRIS login functionality. Application adalah Human Resource Information System (HRIS) dengan URL base https://hris.wit.arkamaya.net/. Test plan mencakup normal login case dengan credential valid dan berbagai abnormal cases termasuk invalid input, missing fields, dan security-related edge cases.

## Test Scenarios

### 1. Login Functionality

**Seed:** `tests/seed.spec.ts`

#### 1.1. Successful Login with Valid Credentials

**File:** `tests/login/login-normal.spec.ts`

**Steps:**
  1. Navigate to https://hris.wit.arkamaya.net/login/ homepage
    - expect: Login page is displayed with email and password input fields
    - expect: Masuk (Login) button is visible
    - expect: Forgot Password link is available
  2. Enter email address 'tina@lahanniaga.com' in the Email/Nomor Induk Karyawan field
    - expect: Email is entered successfully in the field
    - expect: No error message appears
  3. Enter password 'Bandung123!' in the Kata Sandi (Password) field
    - expect: Password is entered successfully
    - expect: Password field shows masked characters (dots/asterisks)
  4. Click the Masuk (Login) button
    - expect: Page redirects to dashboard URL: https://hris.wit.arkamaya.net/dashboard
    - expect: Page title changes to 'Dasbor Personalia - LAHANS - Lahans Connect'
    - expect: User is authenticated and can see dashboard content
    - expect: No error messages are displayed

#### 1.2. Login with Empty Email Field

**File:** `tests/login/login-empty-email.spec.ts`

**Steps:**
  1. Navigate to https://hris.wit.arkamaya.net/login/
    - expect: Login page is displayed
  2. Leave the Email/Nomor Induk Karyawan field empty
    - expect: Email field remains empty
  3. Enter password 'Bandung123!' in the Password field
    - expect: Password is entered successfully
  4. Click the Masuk button
    - expect: Page redirects to login/failed URL: https://hris.wit.arkamaya.net/login/failed
    - expect: Error alert message 'Login Gagal' (Login Failed) is displayed
    - expect: Error message 'Email atau Kata Sandi salah' (Email or Password is incorrect) is shown
    - expect: User remains on login page and is not authenticated

#### 1.3. Login with Empty Password Field

**File:** `tests/login/login-empty-password.spec.ts`

**Steps:**
  1. Navigate to https://hris.wit.arkamaya.net/login/
    - expect: Login page is displayed
  2. Enter email address 'tina@lahanniaga.com' in the Email field
    - expect: Email is entered successfully
  3. Leave the Password field empty
    - expect: Password field remains empty
  4. Click the Masuk button
    - expect: Page redirects to login/failed URL
    - expect: Error alert message 'Login Gagal' is displayed
    - expect: Error message 'Email atau Kata Sandi salah' is shown

#### 1.4. Login with Both Fields Empty

**File:** `tests/login/login-both-empty.spec.ts`

**Steps:**
  1. Navigate to https://hris.wit.arkamaya.net/login/
    - expect: Login page is displayed with empty form fields
  2. Leave both Email and Password fields empty
    - expect: Both fields remain empty
  3. Click the Masuk button
    - expect: Page redirects to login/failed URL
    - expect: Error alert message 'Login Gagal' is displayed
    - expect: Error message 'Email atau Kata Sandi salah' is shown

#### 1.5. Login with Incorrect Email Format

**File:** `tests/login/login-invalid-email.spec.ts`

**Steps:**
  1. Navigate to https://hris.wit.arkamaya.net/login/
    - expect: Login page is displayed
  2. Enter invalid email 'invalidemail' (without @ symbol) in the Email field
    - expect: Invalid email is entered in the field
  3. Enter password 'Bandung123!' in the Password field
    - expect: Password is entered successfully
  4. Click the Masuk button
    - expect: Page redirects to login/failed URL
    - expect: Error message 'Email atau Kata Sandi salah' is displayed
    - expect: User is not authenticated

#### 1.6. Login with Wrong Email Address

**File:** `tests/login/login-wrong-email.spec.ts`

**Steps:**
  1. Navigate to https://hris.wit.arkamaya.net/login/
    - expect: Login page is displayed
  2. Enter different email 'wrong@example.com' in the Email field
    - expect: Email is entered successfully
  3. Enter password 'Bandung123!' in the Password field
    - expect: Password is entered successfully
  4. Click the Masuk button
    - expect: Page redirects to login/failed URL
    - expect: Error message 'Email atau Kata Sandi salah' is displayed
    - expect: User is not authenticated

#### 1.7. Login with Wrong Password

**File:** `tests/login/login-wrong-password.spec.ts`

**Steps:**
  1. Navigate to https://hris.wit.arkamaya.net/login/
    - expect: Login page is displayed
  2. Enter correct email 'tina@lahanniaga.com' in the Email field
    - expect: Email is entered successfully
  3. Enter incorrect password 'WrongPassword123!' in the Password field
    - expect: Password is entered successfully
  4. Click the Masuk button
    - expect: Page redirects to login/failed URL
    - expect: Error message 'Email atau Kata Sandi salah' is displayed
    - expect: User is not authenticated

#### 1.8. Login with SQL Injection Attempt in Email

**File:** `tests/login/login-sql-injection.spec.ts`

**Steps:**
  1. Navigate to https://hris.wit.arkamaya.net/login/
    - expect: Login page is displayed
  2. Enter SQL injection payload "admin' OR '1'='1" in the Email field
    - expect: Payload is entered in the field without being executed
  3. Enter password 'Bandung123!' in the Password field
    - expect: Password is entered successfully
  4. Click the Masuk button
    - expect: Page redirects to login/failed URL
    - expect: Error message 'Email atau Kata Sandi salah' is displayed
    - expect: Application is protected against SQL injection
    - expect: No unauthorized access is granted

#### 1.9. Login with XSS Attempt in Email

**File:** `tests/login/login-xss-attempt.spec.ts`

**Steps:**
  1. Navigate to https://hris.wit.arkamaya.net/login/
    - expect: Login page is displayed
  2. Enter XSS payload "<script>alert('XSS')</script>" in the Email field
    - expect: Payload is entered as plain text without executing scripts
  3. Enter password 'Bandung123!' in the Password field
    - expect: Password is entered successfully
  4. Click the Masuk button
    - expect: Page redirects to login/failed URL
    - expect: No JavaScript alert appears
    - expect: Application properly sanitizes input
    - expect: Error message 'Email atau Kata Sandi salah' is displayed

#### 1.10. Login with Special Characters in Password

**File:** `tests/login/login-special-chars.spec.ts`

**Steps:**
  1. Navigate to https://hris.wit.arkamaya.net/login/
    - expect: Login page is displayed
  2. Enter email 'tina@lahanniaga.com' in the Email field
    - expect: Email is entered successfully
  3. Enter password 'Bandung123!' which contains special characters (! symbol) in the Password field
    - expect: Password with special characters is accepted and entered
    - expect: Password field shows masked display
  4. Click the Masuk button
    - expect: Page redirects to dashboard
    - expect: User is successfully authenticated
    - expect: Special characters in password are properly handled

#### 1.11. Forgot Password Link Navigation

**File:** `tests/login/login-forgot-password.spec.ts`

**Steps:**
  1. Navigate to https://hris.wit.arkamaya.net/login/
    - expect: Login page is displayed
    - expect: Forgot Password link is visible
  2. Click the 'Lupa Kata Sandi' (Forgot Password) link
    - expect: Page navigates to forgot password page
    - expect: URL changes to https://hris.wit.arkamaya.net/forgot_password
    - expect: Forgot password form is displayed

#### 1.12. Login Page UI Elements Visibility

**File:** `tests/login/login-ui-elements.spec.ts`

**Steps:**
  1. Navigate to https://hris.wit.arkamaya.net/login/
    - expect: Login page title 'Login - Lahans Connect' is displayed
    - expect: Email/Nomor Induk Karyawan input field is visible and enabled
    - expect: Kata Sandi (Password) input field is visible and enabled
    - expect: Masuk button is visible and clickable
    - expect: Forgot Password link is present
    - expect: App Store and Play Store links are visible in footer
    - expect: Copyright notice '© 2017 - 2026' is displayed

#### 1.13. Password Field Masking

**File:** `tests/login/login-password-masking.spec.ts`

**Steps:**
  1. Navigate to https://hris.wit.arkamaya.net/login/
    - expect: Login page is displayed
  2. Click on the Password field
    - expect: Password field is focused and ready for input
  3. Type password 'Bandung123!' character by character
    - expect: Each character is masked as dots or asterisks
    - expect: Actual password characters are not visible
    - expect: Password length is visible through masked characters
