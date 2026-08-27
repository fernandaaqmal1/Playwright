# WIT issue-002 Test Plan

## Application Overview

Test plan untuk bug `issue-002` dari `data/WIT/ready-to-test.json`.

Bug menguji hasil download data pegawai **Aan Agustian** pada modul **Data Pegawai**. Login menggunakan credential yang diberikan.

## Test Scenario

### WIT - Data Pegawai - Download Data

**Bug ID:** `issue-002`  
**Module:** Data pegawai  # WIT issue-002 Test Plan

## Application Overview

Test plan untuk bug `issue-002` dari `data/WIT/ready-to-test.json`.

Bug menguji hasil download data pegawai **Aan Agustian** pada modul **Data Pegawai**. Login menggunakan credential yang diberikan.

## Test Scenario

### WIT - Data Pegawai - Download Data

**Bug ID:** `issue-002`  
**Module:** Data pegawai  
**Feature:** Download excel 
**Priority:** P0  
**Status:** Ready to test  
**Automation:** `tests/WIT/generated/issue-002-download-data.spec.ts`

## Preconditions

1. Aplikasi HRIS dapat diakses.
2. User memiliki akses ke modul Data Pegawai.
3. Credential tersedia:
   - Email: `asri@lahanniaga.com`
   - Password: `Bandung123!`

## Test Steps

1. Buka base URL dari `playwright.config.ts`.
   - **Expected:** Halaman login HRIS tampil.
2. Masukkan email `asri@lahanniaga.com`.
   - **Expected:** Email terisi.
3. Masukkan password `Bandung123!`.
   - **Expected:** Password terisi dan termasking.
4. Klik tombol **Masuk**.
   - **Expected:** Login berhasil dan halaman utama tampil.
5. Klik menu **Personalia**.
6. Buka sub-menu **Data Pegawai**.
   - **Expected:** Halaman Data Pegawai tampil.
7. Masukkan `Aan Agustian` pada field pencarian.
   - **Expected:** Data Aan Agustian ditemukan.
8. Klik tombol **Download** di bawah filter pencarian.
   - **Expected:** File hasil download tersedia.
9. Buka file hasil download dan cari baris Aan Agustian.
   - **Expected:** Baris Aan Agustian tersedia.
10. Periksa nilai pada kolom **Alamat**.
    - **Expected:** Nilai Alamat tidak mengandung literal:
      - `\r`
      - `\n`
      - `//r`
      - `//n`

## Expected Result

File hasil download menampilkan alamat Aan Agustian tanpa karakter escape atau representasi line break yang tidak semestinya.

## Traceability

- Source: `data/WIT/ready-to-test.json`
- Bug ID: `issue-002`
**Priority:** P0  
**Status:** Ready to test  
**Automation:** `tests/WIT/generated/issue-002-download-data.spec.ts`

## Preconditions

1. Aplikasi HRIS dapat diakses.
2. User memiliki akses ke modul Data Pegawai.
3. Credential tersedia:
   - Email: `asri@lahanniaga.com`
   - Password: `Bandung123!`

## Test Steps

1. Buka base URL dari `playwright.config.ts`.
   - **Expected:** Halaman login HRIS tampil.
2. Masukkan email `asri@lahanniaga.com`.
   - **Expected:** Email terisi.
3. Masukkan password `Bandung123!`.
   - **Expected:** Password terisi dan termasking.
4. Klik tombol **Masuk**.
   - **Expected:** Login berhasil dan halaman utama tampil.
5. Klik menu **Personalia**.
6. Buka sub-menu **Data Pegawai**.
   - **Expected:** Halaman Data Pegawai tampil.
7. Masukkan `Aan Agustian` pada field pencarian.
   - **Expected:** Data Aan Agustian ditemukan.
8. Klik tombol **Download** di bawah filter pencarian.
   - **Expected:** File hasil download tersedia.
9. Buka file hasil download dan cari baris Aan Agustian.
   - **Expected:** Baris Aan Agustian tersedia.
10. Periksa nilai pada kolom **Alamat**.
    - **Expected:** Nilai Alamat tidak mengandung literal:
      - `\r`
      - `\n`
      - `//r`
      - `//n`

## Expected Result

File hasil download menampilkan alamat Aan Agustian tanpa karakter escape atau representasi line break yang tidak semestinya.

## Traceability

- Source: `data/WIT/ready-to-test.json`
- Bug ID: `issue-002`