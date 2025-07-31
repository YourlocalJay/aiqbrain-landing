// dist/index.js
export default {
  async fetch(request, env, ctx) {
    // ========== SECURITY CHECKS ==========
    try {
      const ip = request.headers.get('cf-connecting-ip') || '';
      const country = request.cf?.country || 'US';
      const userAgent = request.headers.get('user-agent') || '';
      const url = new URL(request.url);
      const path = url.pathname;

      // Blocked IPs (comma-separated list from env)
      const blockedIps = (env.BLOCKED_IPS || '').split(',').map(ip => ip.trim());
      if (blockedIps.includes(ip)) {
        return blockResponse('IP Blocked');
      }

      // Country allowlist (comma-separated from env)
      const allowedCountries = (env.ALLOWED_COUNTRIES || 'US,CA,UK,DE,AU').split(',').map(c => c.trim());
      if (!allowedCountries.includes(country)) {
        return Response.redirect(addTracking(env.REDIRECT_COMPLIANCE, {
          t: 'geo_block',
          country
        }), 302);
      }

      // Bot detection (with more comprehensive patterns)
      const botPatterns = /bot|crawl|slurp|spider|google|bing|duckduckgo|yandex|baidu|facebot|facebook|twitterbot|linkedinbot|embedly|quora|pinterest|slack|whatsapp|telegram|vkShare|Screaming Frog|Site Auditor|Ahrefs|MJ12|Semrush/i;
      if (botPatterns.test(userAgent.toLowerCase())) {
        return blockResponse('Bot Detected');
      }

      // ========== MAINTENANCE MODE ==========
      if (env.MAINTENANCE_ENABLED === "true") {
        return new Response(env.MAINTENANCE_MESSAGE || "System Maintenance", {
          status: 503,
          headers: { 
            'Retry-After': '3600',
            'Cache-Control': 'no-store'
          }
        });
      }

      // ========== USER BUCKETING ==========
      const userId = getUserId(request);
      const abWeights = parseAbWeights(env.AB_TEST_SPLIT || '0.3,0.3,0.4');
      const variant = getAbVariant(userId, abWeights); // A, B, C, etc.

      // ========== ROUTING DECISIONS ==========
      const isMobile = /iPhone|iPad|iPod|Android/i.test(userAgent);
      const isWeekend = [0, 6].includes(new Date().getDay());
      const isEvening = new Date().getHours() >= 18 || new Date().getHours() < 6;
      const quarter = `q${Math.floor(new Date().getMonth() / 3) + 1}_2025`;

      let redirectUrl = determineRedirectUrl({
        env,
        path,
        country,
        isMobile,
        isWeekend,
        isEvening,
        variant
      });

      // ========== TRACKING & ANALYTICS ==========
      const trackingData = {
        userId,
        variant,
        country,
        ip,
        userAgent,
        path,
        redirectUrl,
        timestamp: new Date().toISOString(),
        cfRay: request.headers.get('cf-ray'),
        referrer: request.headers.get('referer') || 'direct'
      };

      // Non-blocking analytics
      ctx.waitUntil(trackConversion(env, trackingData));

      // ========== FINAL REDIRECT ==========
      return createRedirectResponse(redirectUrl, {
        source: 'aiqbrain',
        campaign: quarter,
        variant,
        userId,
        country,
        device: isMobile ? 'mobile' : 'desktop',
        originalParams: Object.fromEntries(url.searchParams)
      });

    } catch (error) {
      // Fallback to default redirect with error tracking
      ctx.waitUntil(logError(env, error));
      return Response.redirect(env.REDIRECT_START, 302);
    }
  }
};

// ========== CORE UTILITIES ==========
function getUserId(request) {
  // Persistent user ID from cookie or generate new
  const cookie = request.headers.get('cookie') || '';
  const match = cookie.match(/aiq_uid=([^;]+)/);
  if (match) return match[1];
  
  const newId = 'uid_' + crypto.randomUUID();
  return newId;
}

function parseAbWeights(weightString) {
  const weights = weightString.split(',').map(parseFloat).filter(w => !isNaN(w));
  if (weights.length === 0) return [1]; // Fallback to single variant
  return weights;
}

function getAbVariant(userId, weights) {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const hash = stableHash(userId);
  let totalWeight = weights.reduce((sum, w) => sum + w, 0);
  if (totalWeight <= 0) totalWeight = 1;
  
  let cumulative = 0;
  for (let i = 0; i < weights.length; i++) {
    cumulative += weights[i] / totalWeight;
    if (hash < cumulative) return letters[i];
  }
  return letters[0]; // Fallback to first variant
}

function stableHash(str) {
  // Consistent hash between 0 and 1
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0; // Convert to 32bit integer
  }
  return (Math.abs(hash) % 10000) / 10000; // 0-1 range
}

// ========== ROUTING LOGIC ==========
function determineRedirectUrl({ env, path, country, isMobile, isWeekend, isEvening, variant }) {
  // Time-based offers
  if (path === '/offer') {
    if (isWeekend && env.WEEKEND_OFFER) return env.WEEKEND_OFFER;
    if (isEvening && env.EVENING_OFFER) return env.EVENING_OFFER;
    return env[`SV_OFFERS_${variant}`] || env.SV_OFFERS_A;
  }

  // Geo-specific paths
  if (path === '/geo' && env[`GEO_OFFERS_${country}`]) {
    return env[`GEO_OFFERS_${country}`];
  }

  // Device-specific paths
  if (path === '/vault') {
    return isMobile ? (env.MOBILE_VAULT || env.REDIRECT_VAULT) 
                   : (env.DESKTOP_VAULT || env.REDIRECT_VAULT);
  }

  // Core routes
  switch (path) {
    case '/start': 
      return isMobile ? (env.MOBILE_START || env.REDIRECT_START) 
                      : env.REDIRECT_START;
    case '/privacy': return env.REDIRECT_PRIVACY;
    case '/compliance': return env.REDIRECT_COMPLIANCE;
    default: return env.REDIRECT_START;
  }
}

// ========== TRACKING & ANALYTICS ==========
async function trackConversion(env, data) {
  const promises = [];
  
  // Plausible Analytics
  if (env.PLAUSIBLE_DOMAIN) {
    promises.push(
      fetch(`https://plausible.io/api/event`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Forwarded-For': data.ip
        },
        body: JSON.stringify({
          name: 'conversion',
          url: `https://${env.PLAUSIBLE_DOMAIN}${data.path}`,
          domain: env.PLAUSIBLE_DOMAIN,
          props: data
        })
      }).catch(() => {})
    );
  }

  // Webhook with HMAC signature
  if (env.WEBHOOK_URL && env.WEBHOOK_SECRET) {
    const signature = await generateHmac(JSON.stringify(data), env.WEBHOOK_SECRET);
    promises.push(
      fetch(env.WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Signature': signature
        },
        body: JSON.stringify(data)
      }).catch(() => {})
    );
  }

  // KV Storage for redundancy
  if (env.CONVERSION_LOGS) {
    const logKey = `conv_${Date.now()}_${data.userId.substring(0, 8)}`;
    promises.push(
      env.CONVERSION_LOGS.put(logKey, JSON.stringify(data), {
        metadata: { path: data.path, variant: data.variant },
        expirationTtl: 604800 // 7 days
      }).catch(() => {})
    );
  }

  return Promise.allSettled(promises);
}

async function generateHmac(message, secret) {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const signature = await crypto.subtle.sign(
    'HMAC',
    key,
    encoder.encode(message))
  );
  return Array.from(new Uint8Array(signature))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

async function logError(env, error) {
  if (!env.ERROR_LOGS) return;
  
  const errorData = {
    message: error.message,
    stack: error.stack,
    timestamp: new Date().toISOString()
  };
  
  return env.ERROR_LOGS.put(
    `error_${Date.now()}`,
    JSON.stringify(errorData)
  ).catch(() => {});
}

// ========== RESPONSE HELPERS ==========
function blockResponse(reason) {
  return new Response(`Access Denied: ${reason}`, {
    status: 403,
    headers: {
      'Cache-Control': 'no-store',
      'X-Robots-Tag': 'noindex, nofollow'
    }
  });
}

function createRedirectResponse(baseUrl, trackingParams) {
  const url = new URL(baseUrl);
  
  // Core tracking params
  url.searchParams.set('t', trackingParams.source || 'direct');
  url.searchParams.set('c', trackingParams.campaign || 'general');
  url.searchParams.set('v', trackingParams.variant || 'A');
  url.searchParams.set('uid', trackingParams.userId || '');
  url.searchParams.set('country', trackingParams.country || '');
  url.searchParams.set('device', trackingParams.device || 'desktop');
  
  // Preserve original UTM params
  if (trackingParams.originalParams) {
    for (const [key, value] of Object.entries(trackingParams.originalParams)) {
      if (key.startsWith('utm_')) {
        url.searchParams.set(key, value);
      }
    }
  }

  return Response.redirect(url.toString(), 302);
}

function addTracking(baseUrl, params) {
  const url = new URL(baseUrl);
  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(key, value);
  }
  return url.toString();
}
