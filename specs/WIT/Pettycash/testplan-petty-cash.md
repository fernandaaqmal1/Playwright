# TEST PLAN - Modul Petty Cash (HRIS Lahans Connect)

---

## Informasi Umum

| Item | Detail |
|---|---|
| Nama Aplikasi | HRIS Lahans Connect (LAHANS) |
| Base URL | https://hris.wit.arkamaya.net/ |
| Modul yang Diuji | Petty Cash (/petty_cas) |
| Credential | Email: tina@lahanniaga.com / Password: Bandung123! |
| User Login | AGUSTINA ANGGRAENI (Personal Assistant Staff) |
| Browser | Chromium (Desktop Chrome) |

---

## Ringkasan Fitur Modul Petty Cash

### Halaman List Petty Cash (/petty_cash)

| Komponen | Tipe | Keterangan |
|---|---|---|
| Buat Petty Cash | Button | Membuka form pembuatan baru |
| Jenis Laporan | Combobox/Filter | Opsi: Harian, dll. |
| Periode (Dari Tanggal) | Date Picker | Default: 1 bulan terakhir |
| Periode (Sampai Tanggal) | Date Picker | Default: hari ini |
| Tipe Petty Cash | Combobox/Filter | Opsi: Semua Tipe, PLAN, REALIZATION |
| Status | Combobox/Filter | Opsi: Semua Status, Disetujui, Ditolak, Menunggu |
| Filter | Button | Menerapkan filter yang dipilih |
| Download | Button | Mengunduh data |
| Per Baris | Dropdown | Opsi: 10, 25, 50, 100, 200, All |
| Cari | Searchbox | Pencarian bebas |
| Pagination | Navigasi | Awal, Mundur, 1-4, Maju, Akhir |

### Tabel Data Petty Cash

| Kolom | Keterangan |
|---|---|
| Diajukan Oleh | Nama pengaju |
| Tanggal Dibuat | Tanggal pembuatan record |
| Tanggal | Rentang tanggal perjalanan |
| Lama | Durasi perjalanan |
| Jenis / Keperluan Perjalanan | Jenis operasional + detail keperluan (link) |
| Tipe Petty Cash | PLAN atau REALIZATION |
| Persetujuan | Disetujui / Ditolak / Menunggu |

### Form Buat Petty Cash (/petty_cash/create)

| Field | Tipe | Wajib | Keterangan |
|---|---|---|---|
| Diajukan Oleh | Read-only | - | Auto-filled: nama user login |
| Penempatan Kerja | Listbox | YA | Pilihan: CV Tintin, PT LMN - [lokasi], dll. |
| Tanggal Keberangkatan | Date Picker | YA | Tanggal mulai perjalanan |
| Tanggal Kembali | Date Picker | - | Tanggal selesai perjalanan |
| Lokasi Tujuan | Textbox | YA | Lokasi tujuan perjalanan |
| Keperluan Perjalanan | Textbox | YA | Alasan/peruntukan perjalanan |
| Jenis Petty Cash | Dropdown | YA | Pilih jenis (wajib untuk menambah biaya) |
| Status Pengajuan | Radio | YA | Terencana / Mendadak |
| Biaya diperlukan pada tanggal | Date Picker | - | Kapan dana dibutuhkan |
| Payment Method | Radio | YA | Transfer (default) |
| Penerima | Textbox | - | Auto-filled: nama user |
| Bank | Textbox | - | Auto-filled: Bank BCA |
| No Rekening | Textbox | - | Auto-filled: nomor rekening |
| Member Petty Cash | Table + Tambah | - | Tambah anggota tim |
| Biaya Petty Cash | Table | - | Isi setelah Jenis Petty Cash dipilih |

---

## TEST CASE 1 - NORMAL CASE

### Judul: Buat Petty Cash Baru dengan Data Lengkap dan Valid

| Item | Detail |
|---|---|
| ID | TC-PC-001 |
| Tipe | Normal / Positive |
| Tujuan | Memverifikasi bahwa user dapat membuat pengajuan Petty Cash baru dengan data yang valid dan lengkap |
| Prekondisi | User sudah login sebagai AGUSTINA ANGGRAENI |

### Data Test

| Field | Nilai |
|---|---|
| Penempatan Kerja | PT LMN - Bandung |
| Tanggal Keberangkatan | 25/07/2026 |
| Tanggal Kembali | 25/07/2026 |
| Lokasi Tujuan | Bandung City Office |
| Keperluan Perjalanan | Meeting koordinasi bulanan dengan tim sales |
| Jenis Petty Cash | (pilih opsi pertama yang tersedia) |
| Status Pengajuan | Terencana |
| Biaya diperlukan pada tanggal | 24/07/2026 |
| Payment Method | Transfer |
| Biaya: Jenis Pengeluaran | Transport |
| Biaya: Jumlah Biaya | 150000 |
| Biaya: Keterangan | Tiket transport pulang pergi |

### Langkah-Langkah (Steps)

| Step | Aksi | Expected Result |
|---|---|---|
| 1 | Buka browser, navigasi ke https://hris.wit.arkamaya.net/login/ | Halaman login ditampilkan dengan field Email dan Kata Sandi |
| 2 | Input email: tina@lahanniaga.com pada field email | Email terisi dengan benar |
| 3 | Input password: Bandung123! pada field Kata Sandi | Password terisi (tersembunyi/tampil dot) |
| 4 | Klik tombol Masuk | Login berhasil, redirect ke Dashboard Personalia (/dashboard). Tampil nama AGUSTINA ANGGRAENI di navbar |
| 5 | Klik menu Layanan Mandiri pada sidebar navigasi | Sub-menu terbuka, menampilkan opsi: Presensi, Perjalanan Dinas, Petty Cash, Reimbursement, Pengajuan Cuti, Pengajuan Lembur, Kalendar Kerja, Download Slip |
| 6 | Klik sub-menu Petty Cash | Halaman Petty Cash List terbuka (/petty_cash). Menampilkan tabel data dengan kolom: Diajukan Oleh, Tanggal Dibuat, Tanggal, Lama, Jenis/Keperluan, Tipe, Persetujuan. Filter dan pagination terlihat |
| 7 | Klik tombol Buat Petty Cash | Form Buat Petty Cash terbuka (/petty_cash/create). Field Diajukan Oleh terisi otomatis: AGUSTINA ANGGRAENI. Semua field input ditampilkan |
| 8 | Pilih PT LMN - Bandung pada field Penempatan Kerja | Field Penempatan Kerja terisi PT LMN - Bandung |
| 9 | Set Tanggal Keberangkatan ke 25/07/2026 | Tanggal keberangkatan terisi |
| 10 | Set Tanggal Kembali ke 25/07/2026 | Tanggal kembali terisi (sama dengan keberangkatan = 1 hari) |
| 11 | Input Lokasi Tujuan: Bandung City Office | Field lokasi tujuan terisi |
| 12 | Input Keperluan Perjalanan: Meeting koordinasi bulanan dengan tim sales | Field keperluan terisi |
| 13 | Pilih Jenis Petty Cash dari dropdown (pilih opsi pertama yang tersedia) | Jenis Petty Cash terpilih. Bagian Biaya Petty Cash table di bawah menjadi aktif untuk diisi |
| 14 | Pilih radio Terencana pada Status Pengajuan | Radio Terencana terpilih |
| 15 | Set Biaya diperlukan pada tanggal ke 24/07/2026 | Tanggal biaya terisi |
| 16 | Pastikan Payment Method = Transfer (default sudah terpilih) | Radio Transfer tetap terpilih |
| 17 | Verifikasi field Penerima = AGUSTINA ANGGRAENI, Bank = Bank BCA, No Rekening = 4460556142 | Field pembayaran terisi otomatis dengan data yang benar |
| 18 | Pada bagian Biaya Petty Cash, tambahkan baris baru: Jenis Pengeluaran = Transport, Jumlah Biaya = 150000, Keterangan = Tiket transport pulang pergi | Baris biaya berhasil ditambahkan ke tabel |
| 19 | Klik tombol Buat Petty Cash | Form terkirim. User di-redirect kembali ke halaman list Petty Cash (/petty_cash). Muncul notifikasi sukses. Data baru muncul di tabel dengan status Menunggu dan tipe PLAN |
| 20 | Verifikasi data baru di tabel | Data baru menampilkan: Diajukan Oleh = AGUSTINA ANGGRAENI, Tanggal = 25 Jul 2026, Lama = 1 Hari, Tipe = PLAN, Status = Menunggu |

---

## TEST CASE 2 - ABNORMAL CASE

### Judul: Buat Petty Cash dengan Mengosongkan Semua Field Wajib (Validasi Required Fields)

| Item | Detail |
|---|---|
| ID | TC-PC-002 |
| Tipe | Abnormal / Negative |
| Tujuan | Memverifikasi bahwa sistem menampilkan pesan validasi error ketika user mencoba submit form Petty Cash dengan mengosongkan semua field wajib |
| Prekondisi | User sudah login sebagai AGUSTINA ANGGRAENI |

### Data Test

| Field | Nilai |
|---|---|
| Penempatan Kerja | (KOSONG / Tidak dipilih) |
| Tanggal Keberangkatan | (biarkan default) |
| Tanggal Kembali | (biarkan default) |
| Lokasi Tujuan | (KOSONG) |
| Keperluan Perjalanan | (KOSONG) |
| Jenis Petty Cash | (KOSONG / Tidak dipilih) |
| Status Pengajuan | (KOSONG / Tidak dipilih radio) |

### Langkah-Langkah (Steps)

| Step | Aksi | Expected Result |
|---|---|---|
| 1 | Buka browser, navigasi ke https://hris.wit.arkamaya.net/login/ | Halaman login ditampilkan |
| 2 | Input email: tina@lahanniaga.com pada field email | Email terisi |
| 3 | Input password: Bandung123! pada field Kata Sandi | Password terisi |
| 4 | Klik tombol Masuk | Login berhasil, redirect ke Dashboard (/dashboard) |
| 5 | Klik menu Layanan Mandiri pada sidebar navigasi | Sub-menu terbuka |
| 6 | Klik sub-menu Petty Cash | Halaman Petty Cash List terbuka (/petty_cash) |
| 7 | Klik tombol Buat Petty Cash | Form Buat Petty Cash terbuka (/petty_cash/create) |
| 8 | JANGAN MENGISI field apapun. Langsung klik tombol Buat Petty Cash tanpa mengisi field wajib | Sistem MENOLAK submit form. Pesan validasi error ditampilkan pada setiap field wajib yang kosong, termasuk: Penempatan Kerja, Lokasi Tujuan, Keperluan Perjalanan, Jenis Petty Cash |
| 9 | Verifikasi bahwa user TIDAK di-redirect dari halaman form | URL tetap di https://hris.wit.arkamaya.net/petty_cash/create. User masih berada di halaman form, bukan di halaman list |
| 10 | Verifikasi bahwa tidak ada data baru yang terbuat | Tidak ada record baru yang tercreate di sistem |

### Skenario Tambahan Abnormal (opsional)

| Sub-Case | Aksi | Expected Result |
|---|---|---|
| 2a | Isi semua field wajib, lalu kosongkan kembali satu per satu field wajib lalu submit | Error validasi muncul spesifik pada field yang dikosongkan |
| 2b | Input Lokasi Tujuan hanya spasi lalu submit | Sistem menolak input kosong/spasi saja, tampilkan pesan error |
| 2c | Input Keperluan Perjalanan dengan karakter sangat panjang (500+ karakter) | Sistem menampilkan pesan error batas maksimum karakter, atau field membatasi input |
| 2d | Batal form (klik tombol Batal) | User di-redirect kembali ke halaman list Petty Cash (/petty_cash). Tidak ada data tersimpan |

---

## Ringkasan Test Coverage

| Aspek Pengujian | TC-001 (Normal) | TC-002 (Abnormal) |
|---|---|---|
| Login & Autentikasi | YA | YA |
| Navigasi Sidebar | YA | YA |
| Halaman List Petty Cash | YA | YA |
| Form Create (field wajib) | YA Isi lengkap | YA Kosongkan semua |
| Form Create (auto-fill) | YA Verifikasi | - |
| Dropdown / Combobox | YA | - |
| Date Picker | YA | - |
| Radio Button | YA | - |
| Biaya Petty Cash Table | YA | - |
| Validasi Required Fields | - | YA |
| Submit Handling | YA Sukses | YA Ditolak sistem |
| Redirect Behavior | YA Ke list | YA Tetap di form |
| Data Integrity | YA Data muncul | YA Tidak ada data baru |

---

## Catatan untuk Tester

1. URL Penting:
   - Login: https://hris.wit.arkamaya.net/login/
   - Dashboard: https://hris.wit.arkamaya.net/dashboard
   - Petty Cash List: https://hris.wit.arkamaya.net/petty_cash
   - Buat Petty Cash: https://hris.wit.arkamaya.net/petty_cash/create

2. Karakteristik Sistem:
   - Field bertanda * adalah field wajib
   - Jenis Petty Cash harus dipilih sebelum bisa mengisi Biaya Petty Cash
   - Field pembayaran (Penerima, Bank, No Rekening) terisi otomatis berdasarkan profil user
   - Status default pengajuan: Menunggu (belum disetujui/ditolak)
   - Tipe default: PLAN (rencana, bukan realisasi)

3. Status Persetujuan:
   - Disetujui = Approved
   - Ditolak = Rejected
   - Menunggu = Pending/Waiting for approval

4. Asumsi: Semua test case dimulai dari keadaan fresh/bersih (tidak ada dependency antar test case).
