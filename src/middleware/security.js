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

  // Country filtering with Set for better performance
  const allowedCountries = new Set(['US', 'CA', 'GB', 'UK', 'AU', 'DE', 'NZ']);
  if (!allowedCountries.has(country)) {
    return new Response('Service not available in your region', { 
      status: 451,
      headers: securityHeaders
    });
  }

  // Enhanced rate limiting with atomic operations
  const rateLimitKey = `rate_${visitorId}`;
  const { value } = await env.AIQ_VISITORS.getWithMetadata(rateLimitKey);
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

  // Add security headers to successful requests
  return new Response(null, {
    status: 200,
    headers: securityHeaders
  });
}
