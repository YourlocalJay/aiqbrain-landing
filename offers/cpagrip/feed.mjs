import fetch from "node-fetch";
import crypto from "crypto";

const userId = process.env.CPA_CPAGRIP_USER_ID;
const key    = process.env.CPA_CPAGRIP_API_KEY;
const salt   = process.env.TRACKING_SALT || "change_me";

export async function getCpagripOffers(trackingRaw = "anon", limit = 30) {
  if (!userId || !key) return [];
  const tracking_id = crypto.createHash("sha256").update(`${salt}|${trackingRaw}`).digest("hex").slice(0,32);
  const u = new URL("https://www.cpagrip.com/common/offer_feed_json.php");
  u.searchParams.set("user_id", userId);
  u.searchParams.set("key", key);
  u.searchParams.set("limit", String(limit));
  u.searchParams.set("tracking_id", tracking_id);
  u.searchParams.set("domain", "filetrkr.com");
  u.searchParams.set("showall", "true");

  const r = await fetch(u.toString(), { headers: { "accept": "application/json" }});
  if (!r.ok) return [];
  const json = await r.json();
  return Array.isArray(json?.offers) ? json.offers : [];
}
