import offers from '../../public/data/cloudflare_offers.json' assert { type: 'json' };

export async function offersDataHandler() {
  return new Response(JSON.stringify(offers), {
    headers: {
      'content-type': 'application/json',
      'cache-control': 'no-store, max-age=0'
    }
  });
}
