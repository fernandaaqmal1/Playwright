# Test Plan Bug Multi-Project

## Ringkasan

Test plan dibuat berdasarkan bug dengan Status `Ready to test`.
Automation script belum dibuat.

## 1. Project WIT HRIS

### issue-003 - Menghapus tulisan Face recognition bypassed

**File:** `specs/WIT/generated/issue-003-attendance-remark.md`

**Prasyarat:**
- User memiliki akun HRIS valid.
- User memiliki akses ke menu Kehadiran Kerja.

**Langkah pengujian:**

1. Buka aplikasi HRIS WIT.
   - Halaman login HRIS ditampilkan.
2. Login menggunakan akun valid.
   - Dashboard HRIS ditampilkan.
3. Buka menu Kehadiran Kerja atau Inquiry.
   - Halaman inquiry kehadiran ditampilkan.
4. Periksa kolom Catatan Masuk dan Catatan Pulang.
   - Data kehadiran ditampilkan.
5. Periksa data tanpa remark dari user.
   - Teks `Face recognition bypassed` tidak ditampilkan.
6. Periksa data dengan remark dari user.
   - Hanya remark user yang ditampilkan.
   - Teks `Face recognition bypassed` tidak ditambahkan.

## 2. Project SauceDemo

### issue-001 - Gambar produk sesuai dengan nama produk

**File:** `specs/saucedemo/generated/issue-001-product-images.md`

**Prasyarat:**
- SauceDemo dapat diakses.
- Username: `standard_user`
- Password: `secret_sauce`

**Langkah pengujian:**

1. Buka SauceDemo.
   - Halaman login ditampilkan.
2. Login menggunakan `standard_user` dan `secret_sauce`.
   - Halaman inventory ditampilkan.
3. Periksa nama serta gambar setiap produk.
   - Gambar sesuai dengan nama produk.
4. Periksa `Sauce Labs Backpack`.
   - Gambar menampilkan backpack, bukan anjing.
5. Periksa `Sauce Labs Bike Light`.
   - Gambar menampilkan lampu sepeda, bukan anjing.
6. Periksa seluruh produk.
   - Tidak ada gambar anjing yang tidak sesuai produk.

## Traceability

- WIT: `data/WIT/ready-to-test.json`
- SauceDemo: `data/saucedemo/ready-to-test.json`
- Status diproses: `Ready to test`
- Automation script: belum dibuat