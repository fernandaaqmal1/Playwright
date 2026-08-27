# Test Plan: issue-001 - Gambar produk sesuai nama produk

## Informasi Bug
- **ID Bug**: issue-001
- **Modul**: Inquiry
- **Fitur**: List Produk
- **Prioritas**: P0
- **Status**: Ready to test

## Deskripsi
Semua foto produk menampilkan gambar anjing. Seharusnya gambar sesuai nama produk.

## Prasyarat
- SauceDemo dapat diakses
- Username: `standard_user`
- Password: `secret_sauce`

## Langkah Pengujian

| No | Langkah | Hasil yang Diharapkan |
|----|---------|----------------------|
| 1 | Buka SauceDemo | Halaman login ditampilkan |
| 2 | Login dengan `standard_user` dan `secret_sauce` | Halaman inventory ditampilkan |
| 3 | Periksa setiap item produk | Gambar sesuai nama produk |
| 4 | Verifikasi Sauce Labs Backpack | Gambar backpack, bukan anjing |
| 5 | Verifikasi Sauce Labs Bike Light | Gambar lampu sepeda, bukan anjing |
| 6 | Periksa seluruh produk | Tidak ada gambar anjing |

## Hasil yang Diharapkan
- Semua gambar sesuai nama produk
- Tidak ada gambar anjing

## Traceability
- Sumber: `data/saucedemo/ready-to-test.json`
- ID Bug: issue-001