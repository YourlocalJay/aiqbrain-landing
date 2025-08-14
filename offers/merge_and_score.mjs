import fs from "fs/promises";
import { getCpagripOffers } from "./cpagrip/feed.mjs";
import { loadMaxBounty } from "./maxbounty/import.mjs";

const allowedGeos = (process.env.ALLOWED_GEOS || "US,CA,UK,AU").split(",").map(s=>s.trim().toUpperCase());
const minPrize    = Number(process.env.MIN_PRIZE_VALUE || 100);

function geoAllowed(countries) {
  const list = String(countries||"").split(",").map(s=>s.trim().toUpperCase());
  return list.some(c => allowedGeos.includes(c));
}
function prizeType(t="") {
  return /iphone|ps5|macbook|console/i.test(t) ? "tech" :
         /gift|visa|amazon|paypal|roblox|walmart/i.test(t) ? "gift_card" : "cash";
}
function score(it) {
  let s = 0;
  const val = Number(it.prize_value || (it.payout||0)*100);
  if (val >= 750) s += 25; else if (val >= 300) s += 16; else if (val >= 100) s += 8;
  if (it.deadline_iso) {
    const h = (new Date(it.deadline_iso)-Date.now())/36e5;
    if (h > 0 && h <= 72) s += 20; else if (h <= 168) s += 10;
  }
  if (/amazon|paypal|visa|roblox|iphone|ps5/i.test(it.prize_name||"")) s += 10;
  if (it.mobile) s += 10;
  return s;
}
function cloak(url, {oid, net}) {
  const base = (process.env.AIQBRAIN_CLOAK_BASE || "https://aiqbrain.com").replace(/\/$/,'');
  const route = process.env.ROUTE_SV || "/sv";
  const utm = process.env.UTM_DEFAULT || "utm_source=reddit&utm_medium=organic&utm_campaign=p007";
  const tid = "auto";
  const qs = `dest=${encodeURIComponent(url)}&tid=${encodeURIComponent(tid)}&${utm}&net=${encodeURIComponent(net||"")}&oid=${encodeURIComponent(oid||"")}`;
  return `${base}${route}?${qs}`;
}

export async function buildManifest() {
  let organic = [];
  try { organic = JSON.parse(await fs.readFile("data/organic_seeds.json","utf8")); } catch {}
  organic = organic.filter(x => (x.prize_value||0) >= minPrize && (x.verified_live!==false));

  const grip = (await getCpagripOffers())
    .filter(o => geoAllowed(o.accepted_countries||""))
    .map(o => ({
      id: `cpagrip:${o.offerid}`,
      source: "cpa",
      prize_type: prizeType(o.title),
      prize_name: o.title,
      payout: Number(o.payout||0),
      entry_url: cloak(o.offerlink, { oid: String(o.offerid||""), net: "cpagrip" }),
      mobile: true
    }));

  const mb = (await loadMaxBounty())
    .filter(o => (o.geo||[]).some(g=>allowedGeos.includes(String(g).toUpperCase())))
    .map(o => ({ ...o, entry_url: cloak(o.entry_url, { oid: o.id, net: "maxbounty" }), mobile: true }));

  const all = [...organic, ...grip, ...mb];

  const map = new Map();
  for (const it of all) {
    const k = it.id || (it.entry_url||"").split("?")[0];
    const s = score(it);
    if (!map.has(k) || s > map.get(k).score) map.set(k, { ...it, score: s });
  }
  const list = [...map.values()].sort((a,b)=>b.score-a.score);

  const want = { cash: 15, gift_card: 20, tech: 15 };
  const buckets = { cash:[], gift_card:[], tech:[] };
  for (const it of list) (buckets[it.prize_type]||(buckets[it.prize_type]=[])).push(it);

  const pick = [
    ...buckets.cash.slice(0, want.cash),
    ...buckets.gift_card.slice(0, want.gift_card),
    ...buckets.tech.slice(0, want.tech),
  ].slice(0, 50);

  await fs.writeFile("data/manifest.json", JSON.stringify(pick,null,2));
  return pick;
}

if (process.argv[1].endsWith("merge_and_score.mjs")) buildManifest();
