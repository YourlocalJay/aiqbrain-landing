/**
 * Enhanced security middleware for AIQBrain landing page
 * Handles IP filtering, bot detection, rate limiting, and security headers
 * Optimized for performance and reduced false positives
 */
export async function securityMiddleware(request, env) {
  const { cf } = request;
  const clientIP = request.headers.get('cf-connecting-ip') || '';
  const country = cf.country || '';
  const userAgent = (request.headers.get('user-agent') || '').toLowerCase();
  const asn = Number(cf.asn) || 0;
  const visitorId = request.headers.get('cf-ray') || clientIP;

  // Security headers to add if request passes checks
  const securityHeaders = {
    'X-Frame-Options': 'DENY',
    'X-Content-Type-Options': 'nosniff',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'interest-cohort=()'
  };

  // Enhanced bot detection with more precise matching
  const botPatterns = [
    'bot', 'crawler', 'spider', 'lighthouse',
    'pagespeed', 'pingdom', 'gtmetrix', 'monitor',
    'slurp', 'teoma', 'archive', 'scan', 'check',
    'validator', 'cloudflare', 'headless', 'phantom',
    'selenium', 'webdriver', 'prerender', 'node-fetch',
    'python-urllib', 'java', 'curl', 'wget', 'go-http'
  ];

  if (botPatterns.some(pattern => userAgent.includes(pattern))) {
    return new Response('Not found', {
      status: 404,
      headers: securityHeaders
    });
  }

  // Optimized ASN blocking with Set for faster lookups
  const blockedASNs = new Set([
    16509, 14618, 15169, 13335, 20473,
    14061, 63949, 16276, 8075, 396982
  ]);

  if (blockedASNs.has(asn)) {
    return new Response('Access denied', {
      status: 403,
      headers: securityHeaders
    });
  }

  // Allow global traffic except for explicit sanctions or undefined
  // Expanded country support: Only block explicitly disallowed or undefined
  const blockedCountries = new Set(['KP', 'SY', 'IR', 'CU', 'SD']); // Example: OFAC sanctions
  if (!country || blockedCountries.has(country)) {
    return new Response('Service not available in your region', {
      status: 451,
      headers: securityHeaders
    });
  }

  // Enhanced rate limiting with atomic operations
  const rateLimitKey = `rate_${visitorId}`;
  const { value } = await env.AIQ_VISITORS.getWithMetadata(rateLimitKey) || { value: null };
  const currentCount = value ? parseInt(value, 10) : 0;

  if (currentCount > 30) {
    return new Response('Too many requests', {
      status: 429,
      headers: {
        ...securityHeaders,
        'Retry-After': '60'
      }
    });
  }

  await env.AIQ_VISITORS.put(rateLimitKey, (currentCount + 1).toString(), {
    expirationTtl: 60
  });

  // If all checks pass, do not block; let the request continue to the next handler
  return null;
}
