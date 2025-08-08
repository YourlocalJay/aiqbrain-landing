<<<<<<< HEAD
export async function vaultHandler(request, env, ctx) {
  const html = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Vault Access</title>
    <meta name="robots" content="noindex, nofollow">
  </head>
  <body>
    <h1>Restricted Area</h1>
    <form method="GET" action="/access" id="vault-form">
      <input type="email" name="email" required />
      <input type="hidden" name="utm_source" />
      <input type="hidden" name="utm_medium" />
      <input type="hidden" name="utm_campaign" />
      <input type="hidden" name="utm_content" />
      <button type="submit">Request Access</button>
    </form>
    <script>
      (function(){
        const p = new URLSearchParams(location.search);
        ["utm_source","utm_medium","utm_campaign","utm_content"].forEach(k=>{
          const el = document.querySelector(\`[name="\${k}"]\`);
          if (el && p.get(k)) el.value = p.get(k);
        });
        const form = document.getElementById("vault-form");
        form?.addEventListener("submit",(e)=>{
          try{
            const fd = new FormData(form);
            const payload = Object.fromEntries(fd.entries());
            payload.ts = Date.now();
            const w = "${env.MAKE_WEBHOOK_URL}";
            if (w) navigator.sendBeacon(w, new Blob([JSON.stringify(payload)],{type:"application/json"}));
          }catch(_){}
        });
      })();
    </script>
  </body>
</html>`;
=======
import vaultHTML from '../../public/vault/index.html' assert { type: 'text' };
>>>>>>> cdac408ca54c2092d0fc7edaa46b36a01ca60344

export async function vaultHandler(request, env, ctx) {
  return new Response(vaultHTML, {
    headers: {
      'content-type': 'text/html; charset=utf-8',
      'x-robots-tag': 'noindex, nofollow',
      'cache-control': 'no-store, max-age=0'
    }
  });
}
