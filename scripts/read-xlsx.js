const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);

if (args.length === 0 || args.length % 2 !== 0) {
  console.error(
    'Usage: node scripts/read-xlsx.js <input.xlsx> <output.json> [input.xlsx output.json ...]'
  );
  process.exit(1);
}

for (let i = 0; i < args.length; i += 2) {
  const input = args[i];
  const output = args[i + 1];

  if (!input || !output) {
    console.error('Each pair must have both input and output paths.');
    process.exit(1);
  }

  const workbook = XLSX.readFile(input);
  const rows = XLSX.utils.sheet_to_json(
    workbook.Sheets[workbook.SheetNames[0]],
    { defval: '' }
  );

  const readyToTest = rows.filter(
    row => String(row.Status).trim().toLowerCase() === 'ready to test'
  );

  fs.mkdirSync(path.dirname(output), { recursive: true });
  fs.writeFileSync(output, JSON.stringify(readyToTest, null, 2));

  console.log(`[${path.basename(input)}] Found ${readyToTest.length} ready-to-test bugs`);
  console.log(`  Output: ${output}`);
}