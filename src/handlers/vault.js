/**
 * Optimized Vault page handler for AIQBrain
 * Enhanced with improved traffic scoring, security headers, and performance optimizations
 */
import { baseTemplate } from '../templates/base.js';
import { getPageLegalNotices, getLegalBeforePurchase } from '../components/legal.js';
import { detectDevice, getGeoData, generateFingerprint } from '../utils/traffic.js';
import { trackVaultAccess, logQualificationEvent } from '../analytics/tracking.js';

// Cache high-value geo list for performance
const HIGH_VALUE_GEOS = new Set(['US', 'CA', 'GB', 'AU', 'DE', 'NL', 'SE', 'NO', 'DK']);

export async function vaultHandler(request, env) {
  try {
    // Enhanced traffic analysis with header validation
    const userAgent = request.headers.get('User-Agent') || '';
    const clientIP = request.headers.get('CF-Connecting-IP') || '';
    const country = request.cf?.country || 'US';
    const referrer = request.headers.get('Referer') || '';

    // Parallelize data fetching for better performance
    const [deviceInfo, geoData] = await Promise.all([
      detectDevice(userAgent),
      getGeoData(clientIP, country)
    ]);

    const fingerprint = generateFingerprint(request);

    // Optimized traffic scoring
    const trafficScore = calculateTrafficScore({
      device: deviceInfo,
      geo: geoData,
      referrer,
      userAgent
    });

    const qualificationLevel = getQualificationLevel(trafficScore);

    // Pre-generate content components in parallel
    const [systemPreviews, legalNotices] = await Promise.all([
      getSystemPreviewsByQualification(qualificationLevel),
      getPageLegalNotices('vault')
    ]);

    // Track vault access (fire-and-forget)
    trackVaultAccess({
      fingerprint,
      trafficScore,
      qualification: qualificationLevel,
      geo: geoData,
      device: deviceInfo,
      timestamp: Date.now()
    }).catch(console.error);

    // Generate dynamic content sections
    const contentSections = {
      header: generateHeader(qualificationLevel, geoData),
      preview: generatePreviewSection(systemPreviews, qualificationLevel),
      benefits: generateBenefitsSection(qualificationLevel),
      application: generateApplicationSection(qualificationLevel, geoData, fingerprint, trafficScore),
      stickyBar: generateStickyBar(qualificationLevel),
      legal: legalNotices,
      script: generateVaultScript(qualificationLevel, fingerprint)
    };

    const content = `
      ${contentSections.header}
      ${contentSections.preview}
      ${contentSections.benefits}
      ${contentSections.application}
      ${contentSections.stickyBar}
      ${contentSections.legal}
      <script>${contentSections.script}</script>
    `;

    return new Response(baseTemplate(content, {
      page: 'vault',
      qualification: qualificationLevel,
      geoData,
      deviceInfo
    }), {
      headers: {
        'Content-Type': 'text/html',
        'Cache-Control': 'private, no-cache, max-age=0',
        'X-Qualification-Level': qualificationLevel.toString(),
        'X-Traffic-Score': trafficScore.toString(),
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'DENY',
        'Referrer-Policy': 'strict-origin-when-cross-origin'
      }
    });
  } catch (error) {
    console.error('Vault handler error:', error);
    return new Response('An error occurred processing your request', {
      status: 500,
      headers: { 'Content-Type': 'text/plain' }
    });
  }
}

// Optimized traffic scoring function
function calculateTrafficScore({ device, geo, referrer, userAgent }) {
  let score = 0;

  // Device scoring (using switch for better performance)
  switch(device.type) {
    case 'desktop': score += 20; break;
    case 'mobile': score += 15; break;
    case 'tablet': score += 10; break;
  }

  // Geographic scoring (using Set for O(1) lookups)
  if (HIGH_VALUE_GEOS.has(geo.country)) score += 25;

  // Referrer quality (optimized string checks)
  if (!referrer) {
    score += 15;
  } else {
    if (referrer.includes('google')) score += 10;
    else if (referrer.includes('reddit')) score += 5;
  }

  // User agent checks (ordered by prevalence)
  if (userAgent.includes('Chrome')) score += 10;
  else if (userAgent.includes('Firefox')) score += 8;
  else if (userAgent.includes('Safari')) score += 6;

  return Math.min(Math.max(score, 0), 100);
}

// Optimized qualification level calculation
const QUALIFICATION_THRESHOLDS = [40, 60, 80];
function getQualificationLevel(trafficScore) {
  return QUALIFICATION_THRESHOLDS.reduce((level, threshold) =>
    trafficScore >= threshold ? level + 1 : level, 1);
}

// Enhanced system previews generation with caching
const SYSTEM_CACHE = new Map();
function getSystemPreviewsByQualification(level) {
  const cacheKey = `systems-${level}`;
  if (SYSTEM_CACHE.has(cacheKey)) {
    return SYSTEM_CACHE.get(cacheKey);
  }

  const baseSystems = [
    {
      id: 'survey_vault',
      title: 'Survey Vault Monetization System',
      description: 'Strategic Claude-driven survey funnel with geo-targeting and device detection.',
      features: ['21.3% Average Conversion', 'Advanced Targeting', 'Complete Implementation'],
      badge: 'PREMIUM'
    },
    {
      id: 'prompt_profit',
      title: 'Claude Prompt-to-Profit Framework',
      description: 'Commercial Claude applications with built-in monetization and compliance.',
      features: ['4 Revenue Models', 'Legal Documentation', 'Scalable Growth'],
      badge: 'PREMIUM'
    }
  ];

  if (level >= 3) {
    baseSystems.push({
      id: 'operator_stack',
      title: 'Operator Stack Integration',
      description: 'Advanced multi-channel Claude monetization with automated optimization.',
      features: ['Cross-Channel Sync', 'A/B Testing Suite', 'Performance Analytics'],
      badge: 'ELITE'
    });
  }

  if (level >= 4) {
    baseSystems.push({
      id: 'stealth_systems',
      title: 'Stealth Monetization Systems',
      description: 'Proprietary frameworks for sophisticated operators with proven track records.',
      features: ['Exclusive Access', 'White-Label Rights', 'Direct Support'],
      badge: 'STEALTH'
    });
  }

  SYSTEM_CACHE.set(cacheKey, baseSystems);
  return baseSystems;
}

// Optimized header generation
function generateHeader(qualificationLevel, geoData) {
  const accessStatus = getAccessStatusText(qualificationLevel);
  const audienceText = getAudienceText(qualificationLevel);

  return `
    <header class="vault-header aiqbrain-vault-header">
      <div class="container">
        <div class="vault-status-indicator" data-qualification="${qualificationLevel}">
          <span class="status-dot"></span>
          <span class="status-text">Vault Access: ${accessStatus}</span>
        </div>

        <h1 class="vault-title">AIQBrain Vault</h1>
        <p class="vault-subtitle">Claude Monetization Systems for ${audienceText} Operators</p>

        ${generateUrgencyBanner(qualificationLevel, geoData)}

        <div class="access-metrics aiqbrain-access-metrics">
          ${generateMetrics()}
        </div>
      </div>
    </header>
  `;
}

function generateMetrics() {
  return `
    <div class="metric-item">
      <span class="metric-value">18.7%</span>
      <span class="metric-label">Avg. Conversion Rate</span>
    </div>
    <div class="metric-item">
      <span class="metric-value">$2.4k</span>
      <span class="metric-label">Monthly Operator Avg</span>
    </div>
    <div class="metric-item">
      <span class="metric-value">72hrs</span>
      <span class="metric-label">Avg. Implementation</span>
    </div>
  `;
}

// Optimized preview section generation
function generatePreviewSection(systemPreviews, qualificationLevel) {
  return `
    <section class="vault-preview aiqbrain-vault-preview">
      <div class="container">
        <h2 class="section-heading">Operator-Grade Monetization Systems</h2>
        <div class="qualification-notice aiqbrain-qualification-notice">
          <p>Preview access granted based on traffic qualification. ${getQualificationMessage(qualificationLevel)}</p>
        </div>

        <div class="system-grid aiqbrain-system-grid">
          ${systemPreviews.map(system => generateSystemCard(system, qualificationLevel)).join('')}
        </div>

        ${qualificationLevel >= 3 ? generateBonusContent() : ''}
      </div>
    </section>
  `;
}

// Optimized system card generation
function generateSystemCard(system, qualification) {
  const isUnlocked = qualification >= 3 && ['survey_vault', 'prompt_profit'].includes(system.id);

  return `
    <article class="system-card aiqbrain-system-card" data-system="${system.id}">
      <header class="card-header aiqbrain-card-header">
        <span class="badge badge-${system.badge.toLowerCase()}">${system.badge}</span>
        ${system.title}
      </header>
      <p class="system-description">${system.description}</p>
      <ul class="system-features aiqbrain-system-features">
        ${system.features.map(feature => `<li>${feature}</li>`).join('')}
      </ul>
      <div class="system-${isUnlocked ? 'preview' : 'locked'} aiqbrain-system-${isUnlocked ? 'preview' : 'locked'}">
        ${isUnlocked ?
          `<button class="btn btn-secondary preview-btn">Preview System →</button>` :
          `<div class="lock-icon">🔒</div><p>Full access requires approval</p>`
        }
      </div>
    </article>
  `;
}

// Optimized application section generation
function generateApplicationSection(qualificationLevel, geoData, fingerprint, trafficScore) {
  return `
    <section class="access-application aiqbrain-access-application" id="vault-access">
      <div class="container">
        <h2 class="section-heading">${getApplicationHeading(qualificationLevel)}</h2>
        <p class="application-intro">${getApplicationIntro(qualificationLevel, geoData)}</p>

        <form id="access-request-form" action="/request" method="POST" class="application-form aiqbrain-application-form" data-qualification="${qualificationLevel}">
          <input type="hidden" name="fingerprint" value="${fingerprint}">
          <input type="hidden" name="traffic_score" value="${trafficScore}">
          <input type="hidden" name="geo_data" value="${btoa(JSON.stringify(geoData))}">
          <input type="hidden" name="qualification_level" value="${qualificationLevel}">

          <div class="form-group aiqbrain-form-group">
            <label for="email" class="form-label aiqbrain-form-label">Primary Contact Email</label>
            <input type="email" id="email" name="email" class="form-control aiqbrain-form-control" placeholder="operator@domain.com" required>
            <small class="form-help">Used for system delivery and compliance notifications</small>
          </div>

          ${generateQualificationFields(qualificationLevel)}

          <div class="form-group aiqbrain-form-group">
            <label for="traffic_source" class="form-label aiqbrain-form-label">How did you discover AIQBrain?</label>
            <select id="traffic_source" name="traffic_source" class="form-control aiqbrain-form-control" required>
              <option value="" disabled selected>Select source</option>
              <option value="direct">Direct/Bookmark</option>
              <option value="referral">Operator Referral</option>
              <option value="community">Private Community</option>
              <option value="search">Search Discovery</option>
              <option value="affiliate">Affiliate Network</option>
            </select>
          </div>

          ${getLegalBeforePurchase()}

          <div class="form-actions aiqbrain-form-actions">
            <button type="submit" class="btn btn-primary btn-large aiqbrain-btn-primary" id="vault-submit">
              ${getSubmitButtonText(qualificationLevel)} →
            </button>
            <p class="form-note">Review typically completed within ${getReviewTime(qualificationLevel)}</p>
          </div>
        </form>
      </div>
    </section>
  `;
}

// Optimized script generation
function generateVaultScript(qualification, fingerprint) {
  return `
    const vaultTracker = {
      qual: ${qualification},
      fp: '${fingerprint}',

      track(action, data = {}) {
        navigator.sendBeacon('/api/track', JSON.stringify({
          action,
          qual: this.qual,
          fp: this.fp,
          t: Date.now(),
          ...data
        }));
      },

      init() {
        const form = document.getElementById('access-request-form');
        form?.addEventListener('submit', () => this.track('vault_submit', {
          e: form.email.value,
          exp: form.experience.value,
          src: form.traffic_source.value
        }));

        this.track('vault_view');

        // Efficient scroll tracking
        let lastReportedScroll = 0;
        const scrollHandler = () => {
          const scrollPct = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
          if (scrollPct > lastReportedScroll && scrollPct % 25 === 0) {
            lastReportedScroll = scrollPct;
            this.track('scroll', { pct: scrollPct });
          }
        };

        window.addEventListener('scroll', scrollHandler, { passive: true });
      }
    };

    document.addEventListener('DOMContentLoaded', () => vaultTracker.init());
  `;
}

// Helper functions with memoization
const statusTextCache = new Map();
function getAccessStatusText(level) {
  if (statusTextCache.has(level)) return statusTextCache.get(level);

  const statusMap = {
    1: 'Basic Preview',
    2: 'Qualified Preview',
    3: 'Advanced Access',
    4: 'Elite Operator'
  };
  const result = statusMap[level] || 'Standard';
  statusTextCache.set(level, result);
  return result;
}

function getApplicationHeading(level) {
  return level >= 3 ? 'Unlock Full Operator Access' : 'Apply for Vault Access';
}

function getReviewTime(level) {
  return level >= 3 ? '4-6 hours' : '24-48 hours';
}

function generateUrgencyBanner(level, geoData) {
  return level >= 3 ? `
    <div class="vault-urgency-banner aiqbrain-urgency-banner urgency-qualified">
      <strong>Qualified Traffic Detected:</strong> Fast-track approval available for your region (${geoData.country}).
    </div>
  ` : `
    <div class="vault-urgency-banner aiqbrain-urgency-banner">
      <strong>Limited Access:</strong> Only select operators gain full Vault privileges. Apply now to secure your spot.
    </div>
  `;
}
