export async function vaultHandler() {
  const html = `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>AIQBrain Vault</title></head><body style="margin:0;background:#0a0e12;color:#e6edf3;font-family:Arial,sans-serif;display:flex;align-items:center;justify-content:center;min-height:100vh;text-align:center"><div><h1 style="color:#ff7b72;font-family:'Space Mono',monospace">Claude Control Room</h1><p>Bait interface active. Operators submit credentials via secure channel.</p></div></body></html>`;
  return new Response(html, {
    headers: { 'Content-Type': 'text/html; charset=UTF-8' }
  });
}
