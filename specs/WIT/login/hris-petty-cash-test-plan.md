# Petty Cash Create Test Plan

## Application Overview

Test plan untuk modul Petty Cash (Layanan Mandiri) pada aplikasi HRIS Lahans Connect. Fokus pada pembuatan Petty Cash baru dengan test case normal (successful creation) dan abnormal (validation errors, missing required fields). Aplikasi menggunakan form dengan multiple sections: informasi dasar, transfer cost, member petty cash, dan biaya petty cash.

## Test Scenarios

### 1. Petty Cash Create

**Seed:** `tests/seed.spec.ts`

#### 1.1. Create Petty Cash - Normal Case

**File:** `tests/petty-cash/create-petty-cash-normal.spec.ts`

**Steps:**
  1. Navigate ke https://hris.wit.arkamaya.net/login/ dan login dengan email tina@lahanniaga.com dan password Bandung123!
    - expect: Login berhasil dan user berada di dashboard
  2. Dari menu Layanan Mandiri, klik Petty Cash
    - expect: Halaman Petty Cash terbuka dengan list petty cash
  3. Klik button Buat Petty Cash
    - expect: Form buat petty cash terbuka dengan semua field kosong
  4. Klik pada field Penempatan Kerja dan pilih CV TINTIN (HO)
    - expect: CV TINTIN (HO) terseleksi di dropdown Penempatan Kerja
  5. Klik field Tanggal Keberangkatan dan enter tanggal 20/07/2026
    - expect: Tanggal keberangkatan terisi dengan 20/07/2026
  6. Klik field Tanggal Kembali dan enter tanggal 22/07/2026
    - expect: Tanggal kembali terisi dengan 22/07/2026
  7. Masukkan 'Jakarta' pada field Lokasi Tujuan
    - expect: Lokasi Tujuan berisi text 'Jakarta'
  8. Masukkan 'Business Meeting' pada field Keperluan Perjalanan
    - expect: Keperluan Perjalanan berisi text 'Business Meeting'
  9. Klik field Jenis Petty Cash dan pilih 'Operasional'
    - expect: Jenis Petty Cash terpilih 'Operasional'
  10. Pilih radio button 'Terencana' pada Status Pengajuan
    - expect: Radio button Terencana terseleksi
  11. Klik field Biaya diperlukan pada tanggal dan enter tanggal 25/07/2026
    - expect: Tanggal cost requirement terisi
  12. Verifikasi radio button Transfer sudah dipilih
    - expect: Payment Method Transfer sudah selected
  13. Klik button Buat Petty Cash untuk submit form
    - expect: Form berhasil disubmit
    - expect: User diredirect ke halaman petty cash list atau detail
    - expect: Notifikasi sukses ditampilkan

#### 1.2. Create Petty Cash - Empty Required Fields

**File:** `tests/petty-cash/create-petty-cash-empty-fields.spec.ts`

**Steps:**
  1. Navigate ke https://hris.wit.arkamaya.net/login/ dan login dengan email tina@lahanniaga.com dan password Bandung123!
    - expect: Login berhasil
  2. Navigasi ke Petty Cash > Buat Petty Cash
    - expect: Form create petty cash terbuka
  3. Klik button Buat Petty Cash tanpa mengisi field apapun
    - expect: Form tidak submit
    - expect: Error message ditampilkan untuk field yang required
    - expect: Halaman tetap di form create petty cash
