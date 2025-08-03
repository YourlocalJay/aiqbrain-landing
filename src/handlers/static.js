/**
 * ──────────────────────────────────────────────────────
 *  AIQBrain Static Asset Handler v2.1 (Brand Compliant)
 *  Performance-optimized asset delivery with enhanced
 *  caching, security, and monitoring.
 * ──────────────────────────────────────────────────────
 */

// Optimized content type mapping with faster lookup
const contentTypes = new Map([
  ['.html', 'text/html'],
  ['.css', 'text/css'],
  ['.js', 'text/javascript'],
  ['.mjs', 'text/javascript'],
  ['.json', 'application/json'],
  ['.png', 'image/png'],
  ['.jpg', 'image/jpeg'],
  ['.jpeg', 'image/jpeg'],
  ['.gif', 'image/gif'],
  ['.svg', 'image/svg+xml'],
  ['.webp', 'image/webp'],
  ['.avif', 'image/avif'],
  ['.ico', 'image/x-icon'],
  ['.woff', 'font/woff'],
  ['.woff2', 'font/woff2'],
  ['.ttf', 'font/ttf'],
  ['.otf', 'font/otf'],
  ['.eot', 'application/vnd.ms-fontobject'],
  ['.pdf', 'application/pdf'],
  ['.xml', 'application/xml'],
  ['.txt', 'text/plain']
]);

// Pre-computed error responses for faster serving
const ERROR_RESPONSES = {
  404: {
    content: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Asset Not Found | AIQBrain</title>
  <style>
    :root{--background:#0a0e12;--card-bg:#121820;--text-primary:#e6edf3;--text-secondary:rgba(230,237,243,0.8);--accent-primary:#ff7b72;--accent-secondary:#58a6ff}
    *{margin:0;padding:0;box-sizing:border-box}
    body{font-family:system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Oxygen,Ubuntu,Cantarell,sans-serif;background:var(--background);color:var(--text-primary);line-height:1.5;min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:1.25rem}
    .error-container{background:var(--card-bg);border-radius:8px;padding:2rem;max-width:500px;width:100%;text-align:center;box-shadow:0 4px 12px rgba(0,0,0,0.4);border:1px solid rgba(88,166,255,0.2)}
    .error-icon{font-size:3rem;color:var(--accent-primary);margin-bottom:1rem}
    h1{font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,monospace;font-weight:700;font-size:2rem;color:var(--accent-primary);margin-bottom:0.75rem}
    p{color:var(--text-secondary);margin-bottom:1.5rem;font-size:1rem}
    .cta-button{display:inline-block;background:var(--accent-primary);color:var(--background);padding:0.75rem 1.5rem;border-radius:6px;text-decoration:none;font-weight:600;transition:all 0.2s ease;border:none;cursor:pointer;font-size:1rem}
    .cta-button:hover{filter:brightness(110%);box-shadow:0 0 8px rgba(255,123,114,0.4);transform:translateY(-1px)}
    .footer{margin-top:2rem;color:rgba(230,237,243,0.6);font-size:0.875rem}
    .neural-pattern{position:fixed;top:0;left:0;width:100%;height:100%;opacity:0.05;pointer-events:none;background-image:url("data:image/svg+xml,%3Csvg width='50' height='50' viewBox='0 0 50 50' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%2358a6ff' stroke-width='0.5'%3E%3Ccircle cx='25' cy='25' r='1.5'/%3E%3Ccircle cx='10' cy='10' r='1.5'/%3E%3Ccircle cx='40' cy='10' r='1.5'/%3E%3Ccircle cx='10' cy='40' r='1.5'/%3E%3Ccircle cx='40' cy='40' r='1.5'/%3E%3Cline x1='25' y1='25' x2='10' y2='10'/%3E%3Cline x1='25' y1='25' x2='40' y2='10'/%3E%3Cline x1='25' y1='25' x2='10' y2='40'/%3E%3Cline x1='25' y1='25' x2='40' y2='40'/%3E%3C/g%3E%3C/svg%3E");background-size:50px 50px}
  </style>
</head>
<body>
  <div class="neural-pattern"></div>
  <div class="error-container">
    <div class="error-icon">🔒</div>
    <h1>Asset Not Found</h1>
    <p>The requested resource is not available or access is restricted to qualified operators.</p>
    <a href="/" class="cta-button">Return to Command Center</a>
  </div>
  <div class="footer">AIQBrain.com | Claude-Centric Monetization Systems</div>
</body>
</html>`,
    headers: {
      'Content-Type': 'text/html; charset=UTF-8',
      'Cache-Control': 'no-cache, no-store, must-revalidate'
    }
  },
  500: {
    content: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>System Error | AIQBrain</title>
  <style>
    :root{--background:#0a0e12;--card-bg:#121820;--text-primary:#e6edf3;--text-secondary:rgba(230,237,243,0.8);--accent-primary:#ff7b72;--accent-warning:#f9c74f}
    *{margin:0;padding:0;box-sizing:border-box}
    body{font-family:system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Oxygen,Ubuntu,Cantarell,sans-serif;background:var(--background);color:var(--text-primary);line-height:1.5;min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:1.25rem}
    .error-container{background:var(--card-bg);border-radius:8px;padding:2rem;max-width:500px;width:100%;text-align:center;box-shadow:0 4px 12px rgba(0,0,0,0.4);border:1px solid rgba(249,199,79,0.3)}
    .error-icon{font-size:3rem;color:var(--accent-warning);margin-bottom:1rem}
    h1{font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,monospace;font-weight:700;font-size:2rem;color:var(--accent-warning);margin-bottom:0.75rem}
    p{color:var(--text-secondary);margin-bottom:1.5rem;font-size:1rem}
    .cta-button{display:inline-block;background:var(--accent-primary);color:var(--background);padding:0.75rem 1.5rem;border-radius:6px;text-decoration:none;font-weight:600;transition:all 0.2s ease}
    .cta-button:hover{filter:brightness(110%);box-shadow:0 0 8px rgba(255,123,114,0.4)}
    .footer{margin-top:2rem;color:rgba(230,237,243,0.6);font-size:0.875rem}
  </style>
</head>
<body>
  <div class="error-container">
    <div class="error-icon">⚠️</div>
    <h1>System Error</h1>
    <p>Temporary processing error. Systems are being optimized for better performance.</p>
    <a href="/" class="cta-button">Retry Access</a>
  </div>
  <div class="footer">AIQBrain.com | Claude-Centric Monetization Systems</div>
</body>
</html>`,
    headers: {
      'Content-Type': 'text/html; charset=UTF-8',
      'Cache-Control': 'no-cache, no-store, must-revalidate'
    }
  }
};

// Predefined security headers for different content types
const SECURITY_HEADERS = {
  default: {
    'X-Content-Type-Options': 'nosniff',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '1; mode=block',
    'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
    'X-AIQBrain-Version': '2.1'
  },
  html: {
    'Content-Security-Policy': "default-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; script-src 'self' https://plausible.io https://js.stripe.com; connect-src 'self' https://api.stripe.com https://plausible.io; frame-src https://js.stripe.com; form-action 'self'"
  },
  font: {
    'Access-Control-Allow-Origin': '*',
    'Cross-Origin-Resource-Policy': 'cross-origin'
  },
  image: {
    'Cross-Origin-Resource-Policy': 'same-site'
  }
};

/**
 * Enhanced static asset handler with optimized performance
 */
export async function staticAssetHandler(request, env) {
  const url = new URL(request.url);
  let path = url.pathname;
  const startTime = Date.now();

  // Lightweight metadata collection
  const requestMetadata = {
    path,
    cfRay: request.headers.get('CF-Ray'),
    cfCountry: request.headers.get('CF-IPCountry'),
    timestamp: new Date().toISOString().slice(0, 19) + 'Z'
  };

  // Security: Prevent directory traversal
  if (path.includes('..') || path.includes('//')) {
    return createErrorResponse(404, env);
  }

  // Directory/pretty URL fallback
  if (path.endsWith('/')) {
    path += 'index.html';
  }

  // Extract file extension
  const extMatch = path.match(/\.[^/.]+$/);
  const extension = extMatch ? extMatch[0] : '.html';
  const contentType = contentTypes.get(extension) || 'application/octet-stream';

  try {
    // Try to fetch asset with optimized cache strategy
    const asset = await fetchAsset(path, env);
    if (!asset) {
      await logAssetRequest(env, { ...requestMetadata, status: 404, responseTime: Date.now() - startTime });
      return createErrorResponse(404, env);
    }

    const cacheControl = determineCacheControl(path, extension);
    const securityHeaders = getSecurityHeaders(extension);
    const responseTime = Date.now() - startTime;

    // Log successful request (non-blocking)
    logAssetRequest(env, { ...requestMetadata, status: 200, responseTime, cacheControl });

    return new Response(asset, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': cacheControl,
        'X-Response-Time': `${responseTime}ms`,
        'X-AIQBrain-Asset': 'true',
        ...securityHeaders
      }
    });

  } catch (error) {
    console.error('Asset Handler Error:', { path, error: error.message });
    await logAssetRequest(env, {
      ...requestMetadata,
      status: 500,
      error: error.message,
      responseTime: Date.now() - startTime
    });
    return createErrorResponse(500, env);
  }
}

/**
 * Optimized asset fetching with multiple fallback strategies
 */
async function fetchAsset(path, env) {
  if (!env.STATIC_ASSETS) return null;

  // Try direct path first
  let asset = await env.STATIC_ASSETS.get(path, 'arrayBuffer');
  if (asset) return asset;

  // Try versioned asset pattern
  const versionedPath = path.replace(/\.v[0-9a-f]+\./, '.');
  if (versionedPath !== path) {
    asset = await env.STATIC_ASSETS.get(versionedPath, 'arrayBuffer');
    if (asset) return asset;
  }

  // Fallback for common asset patterns
  if (path.startsWith('/assets/')) {
    return await env.STATIC_ASSETS.get(path.replace(/^\/assets/, ''), 'arrayBuffer');
  }

  return null;
}

/**
 * Optimized cache control determination
 */
function determineCacheControl(path, extension) {
  // Versioned assets (immutable)
  if (path.match(/\.[0-9a-f]{8,}\.(css|js|woff2?|ttf|otf|eot|svg|png|jpe?g|gif|webp|avif)$/i)) {
    return 'public, max-age=31536000, immutable';
  }

  // Static assets directory
  if (path.startsWith('/assets/')) {
    return 'public, max-age=86400, s-maxage=604800';
  }

  // Font files
  if (['.woff', '.woff2', '.ttf', '.otf', '.eot'].includes(extension)) {
    return 'public, max-age=604800, s-maxage=2592000';
  }

  // Images
  if (['.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp', '.avif'].includes(extension)) {
    return 'public, max-age=3600, s-maxage=86400';
  }

  // Dynamic content
  if (['.html', '.json', '.xml'].includes(extension)) {
    return 'public, max-age=300, s-maxage=3600';
  }

  // Default
  return 'public, max-age=1800, s-maxage=7200';
}

/**
 * Optimized security headers lookup
 */
function getSecurityHeaders(extension) {
  const headers = { ...SECURITY_HEADERS.default };

  if (['.html', '.htm'].includes(extension)) {
    Object.assign(headers, SECURITY_HEADERS.html);
  } else if (['.woff', '.woff2', '.ttf', '.otf', '.eot'].includes(extension)) {
    Object.assign(headers, SECURITY_HEADERS.font);
  } else if (['.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp', '.avif'].includes(extension)) {
    Object.assign(headers, SECURITY_HEADERS.image);
  }

  return headers;
}

/**
 * Optimized error response creation
 */
function createErrorResponse(status, env) {
  const error = ERROR_RESPONSES[status] || ERROR_RESPONSES[500];
  return new Response(error.content, {
    status,
    headers: {
      ...error.headers,
      ...getSecurityHeaders('.html')
    }
  });
}

/**
 * Optimized logging with non-blocking operation
 */
async function logAssetRequest(env, metadata) {
  if (!env.ANALYTICS_KV) return;

  try {
    const logKey = `asset_${Date.now()}_${Math.random().toString(36).slice(2, 11)}`;
    await env.ANALYTICS_KV.put(logKey, JSON.stringify({
      type: 'asset_request',
      ...metadata
    }), {
      expirationTtl: 2592000 // 30 days
    });
  } catch (error) {
    console.warn('Logging failed:', error.message);
  }
}

/**
 * Preload headers generator for critical assets
 */
export function generatePreloadHeaders(criticalAssets = []) {
  if (criticalAssets.length === 0) return {};

  const hints = criticalAssets.map(asset => {
    const ext = asset.match(/\.[^/.]+$/)?.[0] || '';
    let asType = 'fetch';

    if (ext === '.css') asType = 'style';
    else if (ext === '.js' || ext === '.mjs') asType = 'script';
    else if (ext === '.woff' || ext === '.woff2') asType = 'font';
    else if (['.png', '.jpg', '.jpeg', '.webp', '.avif'].includes(ext)) asType = 'image';

    return `<${asset}>; rel=preload; as=${asType}${asType === 'font' ? '; crossorigin' : ''}`;
  });

  return { 'Link': hints.join(', ') };
}
