import vaultHTML from '../../public/vault/index.html' assert { type: 'text' };

export async function vaultHandler(request, env, ctx) {
  return new Response(vaultHTML, {
    headers: {
      'content-type': 'text/html; charset=utf-8',
      'x-robots-tag': 'noindex, nofollow',
      'cache-control': 'no-store, max-age=0'
    }
  });
}
