import { isBot } from "./botFilter";
import { logEvent } from "./logger";

export interface Env { WEBHOOK_LOG_URL?: string; }

const withDefaultUtm = (u: URL) => {
  if (!u.searchParams.get("utm_source")) {
    u.searchParams.set("utm_source","reddit");
    u.searchParams.set("utm_medium","organic");
    u.searchParams.set("utm_campaign","p007");
  }
};

export default {
  async fetch(req: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(req.url);
    if (url.pathname !== "/sv") return new Response("OK", { status: 200 });
    if (isBot(req)) return new Response("Not found", { status: 404 });

    const dest = url.searchParams.get("dest");
    if (!dest) return new Response("Missing dest", { status: 400 });

    // UTM + disclosure/terms flags
    withDefaultUtm(url);
    const terms = (globalThis as any).REQUIRED_TERMS_LINK || "";
    url.searchParams.set("disclosure","1");
    if (terms) url.searchParams.set("terms", terms);

    // async log
    const cf: any = (req as any).cf || {};
    ctx.waitUntil(logEvent(env, {
      ts: new Date().toISOString(),
      route: "/sv",
      geo: cf.country || "UNK",
      ua: req.headers.get("user-agent") || "",
      tid: url.searchParams.get("tid") || "",
      net: url.searchParams.get("net") || "",
      oid: url.searchParams.get("oid") || "",
      dest
    }));

    return Response.redirect(dest, 302);
  }
};
