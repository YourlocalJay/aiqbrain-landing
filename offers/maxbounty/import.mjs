import fs from "fs/promises";

export async function loadMaxBounty() {
  try {
    const csv = await fs.readFile("offers/maxbounty/offers.csv","utf8");
    const lines = csv.trim().split(/\r?\n/);
    const [header, ...rows] = lines;
    const cols = header.split(",");
    const idx = (k)=>cols.indexOf(k);
    return rows.map(r=>{
      const f = r.split(",");
      return {
        id: `maxbounty:${f[idx("OfferID")]||""}`,
        source: "cpa",
        prize_type: /iphone|ps5|macbook/i.test(f[idx("OfferName")]||"") ? "tech" :
                    /gift|visa|amazon|paypal|roblox/i.test(f[idx("OfferName")]||"") ? "gift_card" : "cash",
        prize_name: f[idx("OfferName")] || "Offer",
        payout: Number(f[idx("Payout")]||0),
        geo: (f[idx("Countries")]||"").split(";"),
        entry_url: f[idx("PreviewUrl")]||""
      };
    });
  } catch { return []; }
}
