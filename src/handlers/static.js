
/**
 * ──────────────────────────────────────────────────────
 *  AIQBrain Static Asset Handler (Brand Optimized)
 *  All static asset requests are processed here. This
 *  ensures brand consistency, audit trail, and security.
 * ──────────────────────────────────────────────────────
 */

// Map file extensions to content types for all supported assets
const contentTypes = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.otf': 'font/otf',
  '.eot': 'application/vnd.ms-fontobject'
};

// Branded 404 HTML page for all missing assets
const BRAND_404 = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Not Found | AIQBrain</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="/assets/css/main.css">
</head>
<body class="aiq-gradient aiq-404">
  <main>
    <h1 class="aiq-title">404: Not Found</h1>
    <p class="aiq-subtitle">The asset you requested doesn’t exist or isn’t available at this time.</p>
    <a href="/" class="aiq-cta">Return to Home</a>
  </main>
  <footer class="aiq-footer">Powered by AIQBrain</footer>
</body>
</html>
`;

/**
 * Main static asset handler for AIQBrain
 * - Handles asset serving, versioned assets, pretty URL fallback, and security headers.
 */
export async function staticAssetHandler(request, env) {
  const url = new URL(request.url);
  let path = url.pathname;

  // ── Directory/pretty URL fallback to index.html
  if (path.endsWith('/')) path += 'index.html';

  // ── Guess file extension and type
  const extMatch = path.match(/\.[^/.]+$/);
  const extension = extMatch ? extMatch[0] : '.html';
  const contentType = contentTypes[extension] || 'application/octet-stream';

  try {
    // ── Try to fetch the asset from KV if configured
    let asset;
    if (env.STATIC_ASSETS) {
      // Cache-busting: strip version numbers like .v1234.js
      const versionedPath = path.replace(/\.v[0-9]+\./, '.');
      asset = await env.STATIC_ASSETS.get(versionedPath, 'arrayBuffer')
           || await env.STATIC_ASSETS.get(path, 'arrayBuffer');
    }

    // ── If asset not found, serve branded 404 HTML
    if (!asset) {
      return new Response(BRAND_404, {
        status: 404,
        headers: {
          'Content-Type': 'text/html; charset=UTF-8',
          ...aiqSecurityHeaders()
        }
      });
    }

    // ── Determine proper cache policy for asset type
    const isLongTerm = path.match(/\/assets\/.*\.(css|js|woff2?|ttf|otf|eot|svg|png|jpg|jpeg|gif)$/i);
    const isVersioned = path.match(/\.v[0-9]+\./);
    const cacheControl = isVersioned
      ? 'public, max-age=31536000, immutable'
      : isLongTerm
        ? 'public, max-age=86400'
        : 'public, max-age=120';

    // ── Return the asset with full headers
    return new Response(asset, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': cacheControl,
        ...aiqSecurityHeaders()
      }
    });
  } catch (error) {
    // ── Fail gracefully with branded error page
    return new Response(BRAND_404, {
      status: 500,
      headers: {
        'Content-Type': 'text/html; charset=UTF-8',
        ...aiqSecurityHeaders()
      }
    });
  }
}

/**
 * Returns standard AIQBrain security and brand headers
 */
function aiqSecurityHeaders() {
  return {
    'X-Content-Type-Options': 'nosniff',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '1; mode=block',
    'Content-Security-Policy': [
      "default-src 'self'",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      "img-src 'self' data:",
      "script-src 'self' https://plausible.io"
    ].join('; '),
    'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload'
  };
}
