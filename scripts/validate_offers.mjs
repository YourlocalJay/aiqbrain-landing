#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

// --- helpers ---
const read = (p) => fs.readFileSync(p, "utf8");
const repoRoot = process.cwd();
const dataPath = path.join(repoRoot, "public/data/cloudflare_offers.json");
const wranglerPath = path.join(repoRoot, "wrangler.toml");

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

function fail(msg) {
  console.error("❌", msg);
  process.exitCode = 1;
}

function ok(msg) {
  console.log("✅", msg);
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
  console.error(`❌ Missing file: ${dataPath}`);
  process.exit(1);
}

let offers;
try {
  offers = JSON.parse(raw);
} catch (e) {
  console.error("❌ JSON parse error in cloudflare_offers.json:", e.message);
  process.exit(1);
}

if (!Array.isArray(offers) || offers.length === 0) {
  fail("cloudflare_offers.json must be a non-empty array.");
}

const allowedHosts = parseAllowedHosts();
if (allowedHosts.length === 0) {
  console.warn("⚠️  No ALLOWED_HOSTS found (env or wrangler.toml). URL host checks will be skipped.");
}

const required = ["name", "url", "geo", "device", "payout", "active"];
let invalidCount = 0;

offers.forEach((o, idx) => {
  const where = `offer[${idx}]`;
  // Required keys
  for (const k of required) {
    if (!(k in o)) {
      fail(`${where}: missing required field "${k}"`);
      invalidCount++;
    }
  }
  if (!o) return;

  // Types & values
  if (typeof o.name !== "string" || !o.name.trim()) {
    fail(`${where}: "name" must be a non-empty string`);
    invalidCount++;
  }

  if (typeof o.url !== "string" || !o.url.trim()) {
    fail(`${where}: "url" must be a non-empty string`);
    invalidCount++;
  } else {
    if (!o.url.startsWith("https://")) {
      fail(`${where}: "url" must start with https:// — got ${o.url}`);
      invalidCount++;
    }
    const host = hostnameOf(o.url);
    if (!host) {
      fail(`${where}: "url" is not a valid URL — ${o.url}`);
      invalidCount++;
    } else if (allowedHosts.length) {
      const allowed = allowedHosts.some(h => host === h || host.endsWith("." + h));
      if (!allowed) {
        fail(`${where}: host "${host}" not in ALLOWED_HOSTS: ${allowedHosts.join(", ")}`);
        invalidCount++;
      }
    }
  }

  if (!Array.isArray(o.geo) || o.geo.some(g => typeof g !== "string" || !g.trim())) {
    fail(`${where}: "geo" must be an array of non-empty strings`);
    invalidCount++;
  }

  if (typeof o.device !== "string" || !o.device.trim()) {
    fail(`${where}: "device" must be a non-empty string`);
    invalidCount++;
  }

  const payout = Number(o.payout);
  if (!Number.isFinite(payout) || payout < 0) {
    fail(`${where}: "payout" must be a number >= 0`);
    invalidCount++;
  }

  if (typeof o.active !== "boolean") {
    fail(`${where}: "active" must be boolean`);
    invalidCount++;
  }
});

if (invalidCount === 0) {
  ok(`Validated ${offers.length} offers successfully.`);
} else {
  console.error(`\n❌ Validation failed with ${invalidCount} error(s).`);
  process.exit(1);
}
