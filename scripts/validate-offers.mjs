#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const dataPath = path.join(process.cwd(), 'public/data/cloudflare_offers.json');
let raw;
try {
  raw = fs.readFileSync(dataPath, 'utf8');
} catch (e) {
  console.error('Missing offers file at', dataPath);
  process.exit(1);
}

let offers;
try {
  offers = JSON.parse(raw);
} catch (e) {
  console.error('Invalid JSON:', e.message);
  process.exit(1);
}

let valid = true;
offers.forEach((o, i) => {
  if (!o.name || !o.url || !Array.isArray(o.geo) || !o.device) {
    console.error(`Offer ${i}: missing name/url/geo/device`);
    valid = false;
  }
  if (o.url && !o.url.startsWith('https://')) {
    console.error(`Offer ${i}: url must start with https://`);
    valid = false;
  }
});

if (valid) {
  console.log(`Validated ${offers.length} offers.`);
} else {
  process.exit(1);
}
