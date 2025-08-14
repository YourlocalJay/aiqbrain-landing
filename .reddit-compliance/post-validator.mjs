import fs from "fs/promises";
import yaml from "yaml";

export async function validate({ subreddit, title, body, hasLink }) {
  const cfg = yaml.parse(await fs.readFile(".reddit-compliance/ruleset.yml","utf8")) || {};
  const rules = cfg[subreddit] || {};
  const errs = [];
  if (rules.max_title && title.length > rules.max_title) errs.push("Title too long");
  if (Array.isArray(rules.banned_words)) {
    const r = new RegExp(rules.banned_words.join("|"), "i");
    if (r.test(title) || r.test(body)) errs.push("Banned phrasing");
  }
  if (hasLink && rules.links === "comments_only") errs.push("Links must be in comments here");
  const minDisclosure = process.env.MIN_DISCLOSURE_TEXT || "";
  if (minDisclosure && !body.includes(minDisclosure)) errs.push("Missing disclosure");
  return { ok: errs.length === 0, errs };
}
