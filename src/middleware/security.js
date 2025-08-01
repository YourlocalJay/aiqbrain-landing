/**
 * Security middleware for AIQBrain landing page
 * Handles IP filtering, bot detection, and rate limiting
 */
export async function securityMiddleware(request, env) {
  const clientIP = request.headers.get('cf-connecting-ip') || '';
  const country = request.cf.country || '';
  const userAgent = request.headers.get('user-agent') || '';
  const asn = request.cf.asn || '';
  
  // Block known crawler/bot user agents
  if (/bot|crawler|spider|lighthouse|pagespeed|pingdom|gtmetrix|googlebot|bingbot|yandex|baidu/i.test(userAgent)) {
    return new Response('Not found', { status: 404 });
  }
  
  // Block datacenter IPs and VPNs that aren't typical user IPs
  const blockedASNs = [
    16509, // AWS
    14618, // Amazon
    15169, // Google
    13335, // Cloudflare
    20473, // Choopa/Vultr
    14061, // DigitalOcean
    63949, // Linode
    // Add other ASNs as needed
  ];
  
  if (blockedASNs.includes(Number(asn))) {
    return new Response('Access denied', { status: 403 });
  }
  
  // Block restricted countries
  const allowedCountries = ['US', 'CA', 'GB', 'UK', 'AU', 'DE', 'NZ'];
  if (!allowedCountries.includes(country)) {
    return new Response('Service not available in your region', { status: 451 });
  }
  
  // Rate limiting
  const visitorId = request.headers.get('cf-ray') || clientIP;
  const currentCount = await env.AIQ_VISITORS.get(`rate_${visitorId}`);
  const count = currentCount ? parseInt(currentCount, 10) : 0;
  
  if (count > 30) { // More than 30 requests in 60 seconds
    return new Response('Too many requests', { status: 429 });
  }
  
  await env.AIQ_VISITORS.put(`rate_${visitorId}`, (count + 1).toString(), {
    expirationTtl: 60 // 60 seconds
  });
  
  return null; // Continue to next middleware
}
