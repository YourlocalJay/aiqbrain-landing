export async function logEvent(env: any, payload: any) {
  try {
    if (env.WEBHOOK_LOG_URL) {
      await fetch(env.WEBHOOK_LOG_URL, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(payload)
      });
    }
  } catch {}
}
