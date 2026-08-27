# Test Plan: issue-005 — Login Tanpa Password

## Application Overview

Bug P0: sistem mengizinkan login tanpa password. Test plan memverifikasi password wajib diisi sebelum login berhasil.

## Test Scenarios

### 1. issue-005-login-without-password

**Seed:** ``

#### 1.1. Login tanpa password harus ditolak

**File:** `specs/WIT/generated/issue-005-login-without-password.md`

**Steps:**
  1. Buka https://hris.wit.arkamaya.net/. Isi email tina@lahanniaga.com. Kosongkan password. Klik Login.
    - expect: Halaman login tetap tampil.
    - expect: Muncul pesan error bahwa password wajib diisi.

#### 1.2. Login dengan password benar harus berhasil

**File:** `specs/WIT/generated/issue-005-login-without-password.md`

**Steps:**
  1. Buka https://hris.wit.arkamaya.net/. Isi email tina@lahanniaga.com. Isi password Bandung123!. Klik Login.
    - expect: Berhasil masuk ke halaman dashboard.
    - expect: URL berubah ke halaman dashboard.

#### 1.3. Submit tanpa password menggunakan Enter

**File:** `specs/WIT/generated/issue-005-login-without-password.md`

**Steps:**
  1. Buka https://hris.wit.arkamaya.net/. Isi email tina@lahanniaga.com. Tekan Enter tanpa mengisi password.
    - expect: Login gagal.
    - expect: Password tetap wajib diisi.
