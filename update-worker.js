// Simple script to update the worker's SUPABASE_SITEMAP_URL if needed
// Run this with: node update-worker.js <new-url>

const fs = require('fs');
const path = require('path');

const workerFile = path.join(__dirname, 'index.js');
let workerCode = fs.readFileSync(workerFile, 'utf8');

const newUrl = process.argv[2];
if (!newUrl) {
  console.log('Usage: node update-worker.js <new-supabase-url>');
  console.log('Current URL:', workerCode.match(/const SUPABASE_SITEMAP_URL = '(.+?)'/)[1]);
  process.exit(0);
}

// Update the URL
workerCode = workerCode.replace(
  /const SUPABASE_SITEMAP_URL = '(.+?)'/,
  `const SUPABASE_SITEMAP_URL = '${newUrl}'`
);

// Write the updated file
fs.writeFileSync(workerFile, workerCode);
console.log(`Updated Supabase sitemap URL to: ${newUrl}`);
