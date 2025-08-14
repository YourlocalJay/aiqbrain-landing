import fs from "fs/promises";
import puppeteer from "puppeteer";

export async function renderPdfs() {
  const items = JSON.parse(await fs.readFile("data/manifest.json","utf8"));
  const date = new Date().toISOString().slice(0,10).replace(/-/g,"");
  await fs.mkdir("public/vault", { recursive: true });

  const vaultHtml = await fs.readFile("templates/vault.html","utf8");
  const teaserHtml = await fs.readFile("templates/teaser.html","utf8");

  const grouped = {
    cash: items.filter(i=>i.prize_type==="cash"),
    gift_card: items.filter(i=>i.prize_type==="gift_card"),
    tech: items.filter(i=>i.prize_type==="tech")
  };
  const toLi = i => `<li><b>${i.prize_name}</b> — <a href="${i.entry_url}">Enter</a></li>`;
  const sections = Object.entries(grouped).map(([k,arr]) =>
    `<div class="box"><h2>${k.toUpperCase()}</h2><ol>${arr.map(toLi).join("")}</ol></div>`).join("");

  const vaultFilled = vaultHtml.replace("{{DATE}}", date).replace("{{SECTIONS}}", sections);

  const teaser3 = [grouped.gift_card[0], grouped.cash[0], grouped.tech[0]].filter(Boolean).slice(0,3);
  const teaserFilled = teaserHtml.replace("{{DATE}}", date)
    .replace("{{LIST}}", `<ol>${teaser3.map(toLi).join("")}</ol>`);

  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setContent(vaultFilled, { waitUntil: "networkidle0" });
  await page.pdf({ path: `public/vault/sweepstakes-insider_v${date}.pdf`, format: "Letter", printBackground: true });
  await page.setContent(teaserFilled, { waitUntil: "networkidle0" });
  await page.pdf({ path: `public/vault/hot-picks_v${date}.pdf`, format: "Letter", printBackground: true });
  await browser.close();
}
if (process.argv[1].endsWith("render_pdfs.mjs")) renderPdfs();
