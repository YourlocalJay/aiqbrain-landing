#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

// --- helpers ---
const read = (p) => fs.readFileSync(p, "utf8");
const repoRoot = process.cwd();
const dataPath = path.join(repoRoot, "public/data/cloudflare_offers.json");
const wranglerPath = path.join(repoRoot, "wrangler.toml");
const useJson = process.argv.includes("--json");

function parseAllowedHosts() {
  // 1) ENV wins
  if (process.env.ALLOWED_HOSTS) {
    return process.env.ALLOWED_HOSTS.split(",").map(s => s.trim().toLowerCase()).filter(Boolean);
  }
  // 2) Try wrangler.toml [vars] ALLOWED_HOSTS="a,b,c"
  try {
    const toml = read(wranglerPath);
    const kv = toml.match(/ALLOWED_HOSTS\s*=\s*"(.*?)"/);
    if (kv && kv[1]) {
      return kv[1].split(",").map(s => s.trim().toLowerCase()).filter(Boolean);
    }
  } catch {}
  return []; // empty = no host restriction (warn later)
}

const errors = [];

function fail(msg, index = null) {
  if (useJson) {
    errors.push({ index, message: msg });
  } else {
    console.error("❌", msg);
  }
  process.exitCode = 1;
}

function ok(msg) {
  if (!useJson) {
    console.log("✅", msg);
  }
}

function hostnameOf(url) {
  try {
    return new URL(url).hostname.toLowerCase();
  } catch {
    return "";
  }
}

// --- main ---
let raw;
try {
  raw = read(dataPath);
} catch (e) {
  const msg = `Missing file: ${dataPath}`;
  if (useJson) {
    console.log(JSON.stringify({ success: false, errors: [{ index: null, message: msg }] }, null, 2));
  } else {
    console.error(`❌ ${msg}`);
  }
  process.exit(1);
}

let offers;
try {
  offers = JSON.parse(raw);
} catch (e) {
  const msg = `JSON parse error in cloudflare_offers.json: ${e.message}`;
  if (useJson) {
    console.log(JSON.stringify({ success: false, errors: [{ index: null, message: msg }] }, null, 2));
  } else {
    console.error(`❌ ${msg}`);
  }
  process.exit(1);
}

if (!Array.isArray(offers) || offers.length === 0) {
  fail("cloudflare_offers.json must be a non-empty array.");
}

const allowedHosts = parseAllowedHosts();
if (allowedHosts.length === 0 && !useJson) {
  console.warn("⚠️  No ALLOWED_HOSTS found (env or wrangler.toml). URL host checks will be skipped.");
}

const required = ["name", "url", "geo", "device", "payout", "active"];
let invalidCount = 0;

offers.forEach((o, idx) => {
  const where = `offer[${idx}]`;
  // Required keys
  for (const k of required) {
    if (!(k in o)) {
      fail(`${where}: missing required field "${k}"`, idx);
      invalidCount++;
    }
  }
  if (!o) return;

  // Types & values
  if (typeof o.name !== "string" || !o.name.trim()) {
    fail(`${where}: "name" must be a non-empty string`, idx);
    invalidCount++;
  }

  if (typeof o.url !== "string" || !o.url.trim()) {
    fail(`${where}: "url" must be a non-empty string`, idx);
    invalidCount++;
  } else {
    if (!o.url.startsWith("https://")) {
      fail(`${where}: "url" must start with https:// — got ${o.url}`, idx);
      invalidCount++;
    }
    const host = hostnameOf(o.url);
    if (!host) {
      fail(`${where}: "url" is not a valid URL — ${o.url}`, idx);
      invalidCount++;
    } else if (allowedHosts.length) {
      const allowed = allowedHosts.some(h => host === h || host.endsWith("." + h));
      if (!allowed) {
        fail(`${where}: host "${host}" not in ALLOWED_HOSTS: ${allowedHosts.join(", ")}`, idx);
        invalidCount++;
      }
    }
  }

  if (!Array.isArray(o.geo) || o.geo.some(g => typeof g !== "string" || !g.trim())) {
    fail(`${where}: "geo" must be an array of non-empty strings`, idx);
    invalidCount++;
  }

  if (typeof o.device !== "string" || !o.device.trim()) {
    fail(`${where}: "device" must be a non-empty string`, idx);
    invalidCount++;
  }

  const payout = Number(o.payout);
  if (!Number.isFinite(payout) || payout < 0) {
    fail(`${where}: "payout" must be a number >= 0`, idx);
    invalidCount++;
  }

  if (typeof o.active !== "boolean") {
    fail(`${where}: "active" must be boolean`, idx);
    invalidCount++;
  }
});

if (useJson) {
  const output = { success: invalidCount === 0, errors };
  console.log(JSON.stringify(output, null, 2));
  process.exit(invalidCount === 0 ? 0 : 1);
} else if (invalidCount === 0) {
  ok(`Validated ${offers.length} offers successfully.`);
} else {
  console.error(`\n❌ Validation failed with ${invalidCount} error(s).`);
  process.exit(1);
}
