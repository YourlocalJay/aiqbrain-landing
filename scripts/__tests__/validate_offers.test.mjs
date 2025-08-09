import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
import path from 'node:path';

const repoRoot = process.cwd();
const dataPath = path.join(repoRoot, 'public/data/cloudflare_offers.json');
const originalData = await fs.readFile(dataPath, 'utf8');

function runValidator() {
  return spawnSync('node', ['scripts/validate_offers.mjs'], { encoding: 'utf8' });
}

async function withData(data, fn) {
  await fs.writeFile(dataPath, data);
  try {
    await fn();
  } finally {
    await fs.writeFile(dataPath, originalData);
  }
}

test('valid data passes', async () => {
  await withData(originalData, async () => {
    const { status } = runValidator();
    assert.strictEqual(status, 0);
  });
});

test('missing fields fails', async () => {
  const missingUrl = JSON.stringify([
    { name: 'No URL', geo: ['US'], device: 'Desktop', payout: 1, active: true }
  ], null, 2);
  await withData(missingUrl, async () => {
    const { status, stderr } = runValidator();
    assert.notStrictEqual(status, 0);
    assert.match(stderr, /missing required field "url"/);
  });
});

test('invalid URL fails', async () => {
  const invalidUrl = JSON.stringify([
    { name: 'Bad URL', url: 'http://example.com', geo: ['US'], device: 'Desktop', payout: 1, active: true }
  ], null, 2);
  await withData(invalidUrl, async () => {
    const { status, stderr } = runValidator();
    assert.notStrictEqual(status, 0);
    assert.match(stderr, /"url" must start with https:\/\//);
  });
});
