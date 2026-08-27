# User Guide Dashboard Kubikasi

## Akses

Dashboard Kubikasi:

`https://hris.dlhk.arkamaya.net/waste_volume`

Upload Kubikasi:

`https://hris.dlhk.arkamaya.net/waste_volume/upload`

Pengguna harus login terlebih dahulu.

## Dashboard Kubikasi

Dashboard menampilkan:

- **Dashboard Ringkas Kubikasi**
- **Tren Volume Bulanan**
- **Kontribusi Volume per Area Kerja**
- **Distribusi P1-P4 per Area Kerja**
- **Tabel data kubikasi**
- Tombol **Upload Kubikasi**

### Kolom tabel

- Bulan
- Bagian
- Jumlah Area Kerja
- Gaspul
- Distant
- P1
- P2
- P3
- P4
- Total
- Update Terakhir

### Contoh data yang terlihat

| Kolom | Nilai |
|---|---|
| Bulan | 2026 |
| Bagian | SWK Karees Gaspul |
| Jumlah Area Kerja | 11 |
| Gaspul | 4 |
| Distant | 2275 |
| P1 | 8.26 |
| P2 | 8.26 |
| P3 | 0 |
| P4 | 0 |
| Total | 16.52 |

## Upload Kubikasi

1. Buka halaman **Upload Kubikasi**.
2. Pilih **Bulan** dengan format `mm/yyyy`.
3. Pilih **Unit Kerja**.
4. Pilih **Periode**.
5. Pilih **Area Kerja**.
6. Klik **Download Template** jika membutuhkan template Excel.
7. Isi template Excel.
8. Klik **Pilih File**.
9. Pilih file Excel berekstensi `.xlsx`.
10. Klik **Upload & Preview**.
11. Periksa ringkasan dan data preview.
12. Klik **Simpan** untuk menyimpan data.

### Field wajib

- Bulan
- Unit Kerja
- Periode
- Area Kerja
- File Excel

### Pilihan periode

- **Semua Periode (1-akhir)**
- **Periode 1 (1-8)**
- **Periode 2 (9-16)**
- **Periode 3 (17-24)**
- **Periode 4 (25-akhir)**

Daftar **Area Kerja** bergantung pada **Unit Kerja** yang dipilih. Pilihan `Semua` tersedia jika didukung oleh unit kerja tersebut.

## Download Template

Tombol **Download Template** menggunakan endpoint:

`/waste_volume/download_template`

Sebelum download, sistem memvalidasi bahwa Bulan, Periode, Unit Kerja, dan Area Kerja sudah dipilih.

Template diunduh sebagai file Excel. Struktur isi template perlu mengikuti pilihan periode, unit kerja, dan area kerja yang digunakan.

## Upload & Preview

Sistem memproses file Excel melalui endpoint:

`/waste_volume/upload_preview`

Preview menampilkan:

- Total isian
- Total volume
- Nama sheet
- Jumlah baris per sheet
- Jumlah cell terisi per sheet
- Total volume per sheet

Tombol **Simpan** baru aktif setelah proses preview berhasil.

## Simpan Data

Klik **Simpan** setelah preview diperiksa. Sistem menyimpan hasil upload melalui proses commit. Jika berhasil, pengguna diarahkan kembali ke Dashboard Kubikasi.

## Pesan Validasi

| Kondisi | Pesan |
|---|---|
| Bulan belum dipilih | `Pilih Bulan terlebih dahulu.` |
| Periode belum dipilih | `Periode wajib dipilih.` |
| Unit Kerja belum dipilih | `Unit Kerja wajib dipilih.` |
| Area Kerja belum dipilih | `Area Kerja wajib dipilih.` |
| File belum dipilih | `Pilih file yang akan diupload.` |
| File tidak sesuai | Gunakan file Excel berekstensi `.xlsx`. |

## Catatan

- Jangan klik **Simpan** sebelum preview diperiksa.
- Pastikan bulan, periode, unit kerja, dan area kerja sesuai isi file.
- Dashboard yang diamati menampilkan grafik bulan Agustus 2026, sedangkan tabel contoh memiliki pembaruan terakhir pada 09/06/2026.
- Isi baris dan kolom template belum dapat didokumentasikan secara pasti karena template memerlukan kombinasi filter lengkap sebelum dapat diunduh.
