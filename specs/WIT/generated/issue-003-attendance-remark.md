# Test Plan: issue-003 - Menghapus tulisan Face recognition bypassed

## Informasi Bug
- **ID Bug**: issue-003
- **Modul**: Kehadiran Kerja
- **Fitur**: Inquiry
- **Prioritas**: P0
- **Status**: Ready to test

## Deskripsi
Pada kolom Catatan Masuk dan Catatan Pulang muncul tulisan otomatis "Face recognition bypassed" meskipun user tidak mengisi remark saat clock in atau clock out.

## Prasyarat
- User sudah login ke HRIS WIT
HRIS_EMAIL : asri@lahanniaga.com
HRIS_PASSWORD: Bandung123!
- User memiliki akses ke menu Kehadiran Kerja

## Langkah Pengujian

| No | Langkah | Hasil yang Diharapkan |
|----|---------|----------------------|
| 1 | Buka halaman login HRIS WIT | Halaman login ditampilkan |
| 2 | Login dengan akun valid | Dashboard ditampilkan |
| 3 | Buka menu Kehadiran Kerja atau Inquiry | Halaman inquiry kehadiran ditampilkan |
| 5 | gunakan filter pegawai : Heri irawan| Heri irawan ada pada filter pegawai |
| 6 | Gunakan filter periode setting ke tanggal 06/08/2026 | Tanggal sudah sesuai |
| 7 | Periksa kolom Catatan Masuk dan Catatan Pulang | Data kehadiran ditampilkan |
| 8 | Periksa data tanpa remark user | Kolom kosong, tidak ada "Face recognition bypassed" |
| 9 | Periksa data dengan remark user | Hanya remark user yang tampil |

## Hasil yang Diharapkan
- Tidak ada teks "Face recognition bypassed"
- Hanya remark user yang ditampilkan

## Traceability
- Sumber: `data/WIT/ready-to-test.json`
- ID Bug: issue-003