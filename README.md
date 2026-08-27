# Playwright Test Automation

Project ini mengotomatisasi test dari bug report Excel menggunakan Playwright.

## Flow Kerja

```text
Excel → JSON → Agent Plan → Test Plan → Review → Agent Generator → Script
```

## Persiapan

1. Install dependencies:
   ```powershell
   npm install
   npm install xlsx
   ```

---

## Case 1: Single Project (1 Project)

### Struktur Folder

```text
data/
└── WIT/
    ├── IncidentList_WIT_TINTIN_HRIS.xlsx
    └── ready-to-test.json

specs/
└── WIT/ 
    └── generated/

tests/
└── WIT/
    └── generated/
```

### Langkah 1: Convert Excel ke JSON

```powershell
node scripts/read-xlsx.js "data/WIT/IncidentList_WIT_TINTIN_HRIS.xlsx" "data/WIT/ready-to-test.json"
```

Output:
```text
[IncidentList_WIT_TINTIN_HRIS.xlsx] Found X ready-to-test bugs
  Output: data/WIT/ready-to-test.json
```

### Langkah 2: Buat Test Plan (Agent Plan)

Prompt ke Agent Plan:

```text
Baca data/WIT/ready-to-test.json.

Proses hanya data dengan Status "Ready to test".
Untuk setiap bug, buat test plan di specs/WIT/generated/.

Gunakan:
- Module
- Feature
- What Actualy Hapen
- What Shoud be Hapen
- Priority
- Preconditions
- Test steps
- Expected result
- Traceability ke Bug ID

Jangan buat automation script.
Jangan menjalankan test.
Tunggu review saya.
```

### Langkah 3: Review Test Plan

Periksa:
- Bug ID benar
- Steps dapat dijalankan
- Expected result sesuai bug report
- URL memakai baseURL dari playwright.config.ts
- Login/precondition lengkap
- Tidak ada langkah yang mengarang

### Langkah 4: Buat Automation Script (Agent Generator)

Setelah test plan disetujui, prompt ke Agent Generator:

```text
Baca data/WIT/ready-to-test.json dan specs/WIT/generated/.

Proses hanya bug dengan Status "Ready to test".
Buat satu script Playwright untuk setiap test plan.
Simpan di tests/WIT/generated/.

Gunakan baseURL dari playwright.config.ts.
Jangan hardcode base URL.
Gunakan await page.goto('/').
Gunakan locator stabil: data-test, role, atau label.
Terjemahkan setiap test step menjadi aksi.
Terjemahkan expected result menjadi assertion.
Tambahkan Bug ID pada describe dan test title.
Jalankan test.
Perbaiki error sampai semua test pass.
```

### Langkah 5: Jalankan Test

```powershell
npx playwright test --project=WIT
```

---

## Case 2: Multi Project (2+ Projects)

### Konfigurasi `playwright.config.ts`

```ts
projects: [
  {
    name: 'WIT',
    testMatch: /WIT\/.*\.spec\.ts/,
    use: {
      ...devices['Desktop Chrome'],
      baseURL: 'https://hris.wit.arkamaya.net/',
    },
  },
  {
    name: 'SauceDemo',
    testMatch: /saucedemo\/.*\.spec\.ts/,
    use: {
      ...devices['Desktop Chrome'],
      baseURL: 'https://www.saucedemo.com/',
    },
  },
]
```

### Struktur Folder

```text
data/
├── WIT/
│   ├── IncidentList_WIT_TINTIN_HRIS.xlsx
│   └── ready-to-test.json
└── saucedemo/
    ├── Bug report saucedemo.xlsx
    └── ready-to-test.json

specs/
├── WIT/
│   └── generated/
└── saucedemo/
    └── generated/

tests/
├── WIT/
│   └── generated/
└── saucedemo/
    └── generated/
```

### Langkah 1: Convert Excel ke JSON (Multi-Project)

```powershell
node scripts/read-xlsx.js "data/WIT/IncidentList_WIT_TINTIN_HRIS.xlsx" "data/WIT/ready-to-test.json" "data/saucedemo/Bug report saucedemo.xlsx" "data/saucedemo/ready-to-test.json"
```

Output:
```text
[IncidentList_WIT_TINTIN_HRIS.xlsx] Found 1 ready-to-test bugs
  Output: data/WIT/ready-to-test.json
[Bug report saucedemo.xlsx] Found 1 ready-to-test bugs
  Output: data/saucedemo/ready-to-test.json
```

### Langkah 2: Buat Test Plan (Agent Plan)

Prompt ke Agent Plan:

```text
Baca data/WIT/ready-to-test.json dan data/saucedemo/ready-to-test.json.

Proses hanya data dengan Status "Ready to test".
Untuk setiap bug, buat test plan sesuai project:

- Bug WIT → specs/WIT/generated/
- Bug SauceDemo → specs/saucedemo/generated/

Gunakan:
- Module
- Feature
- What Actualy Hapen
- What Shoud be Hapen
- Priority
- Preconditions
- Test steps
- Expected result
- Traceability ke Bug ID

Jangan buat automation script.
Jangan menjalankan test.
Tunggu review saya.
```

### Langkah 3: Review Test Plan

Periksa:
- Bug ID benar
- Steps dapat dijalankan
- Expected result sesuai bug report
- URL memakai baseURL dari playwright.config.ts
- Login/precondition lengkap
- Tidak ada langkah yang mengarang

### Langkah 4: Buat Automation Script (Agent Generator)

Setelah test plan disetujui, prompt ke Agent Generator:

```text
Baca data/WIT/ready-to-test.json, data/saucedemo/ready-to-test.json,
dan specs/WIT/generated/, specs/saucedemo/generated/.

Proses hanya bug dengan Status "Ready to test".
Buat satu script Playwright untuk setiap test plan.

Simpan sesuai project:
- Bug WIT → tests/WIT/generated/
- Bug SauceDemo → tests/saucedemo/generated/

Gunakan baseURL dari playwright.config.ts.
Jangan hardcode base URL.
Gunakan await page.goto('/').
Gunakan locator stabil: data-test, role, atau label.
Terjemahkan setiap test step menjadi aksi.
Terjemahkan expected result menjadi assertion.
Tambahkan Bug ID pada describe dan test title.
Jalankan test.
Perbaiki error sampai semua test pass.
```

### Langkah 5: Jalankan Test

Jalankan semua project:

```powershell
npx playwright test
```

Jalankan project tertentu:

```powershell
npx playwright test --project=WIT
npx playwright test --project=SauceDemo
```

Jalankan satu file:

```powershell
npx playwright test tests/WIT/generated/issue-002-download-data.spec.ts --project=WIT
npx playwright test tests/saucedemo/checkout-normal.spec.ts --project=SauceDemo
```

---

## Menambah Project Baru

Tambahkan folder baru:

```text
data/
└── project-b/
    ├── bug-report.xlsx
    └── ready-to-test.json

specs/
└── project-b/
    └── generated/

tests/
└── project-b/
    └── generated/
```

Tambahkan project di `playwright.config.ts`:

```ts
{
  name: 'ProjectB',
  testMatch: /project-b\/.*\.spec\.ts/,
  use: {
    ...devices['Desktop Chrome'],
    baseURL: 'https://example.com/',
  },
}
```

---

## Troubleshooting

### Error: Cannot find module 'xlsx'

```powershell
npm install xlsx
```

### Error: File Excel tidak ditemukan

Pastikan path file Excel benar:

```powershell
dir data/WIT
```

### Error: Test tidak ditemukan

Pastikan script ada di folder `tests/`:

```powershell
dir tests/WIT/generated
```

### Error: Tool disabled

Buka Chat baru, pilih mode **Agent**, bukan **Planner**.