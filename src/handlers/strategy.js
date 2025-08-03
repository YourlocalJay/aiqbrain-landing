/**
 * Optimized Strategy Hub page handler for AIQBrain
 * Enhanced with performance optimizations, security improvements, and better code organization
 */
import { baseTemplate } from '../templates/base.js';
import { getPageLegalNotices } from '../components/legal.js';
import { detectDevice, getGeoData, generateFingerprint } from '../utils/traffic.js';
import { trackStrategyAccess, logOperatorEvent } from '../analytics/tracking.js';
import { checkOperatorAccess, getOperatorLevel } from '../auth/operator.js';

// Cache frequently used values
const HIGH_VALUE_GEOS = new Set(['US', 'CA', 'GB', 'AU', 'DE', 'NL']);
const ACCESS_LEVEL_TEXTS = ['Basic Access', 'Operator Access', 'Advanced Operator', 'Elite Operator'];
const OPERATOR_STATUS_TEXTS = ['Visitor', 'Operator Candidate', 'Verified Operator', 'Verified Elite'];

export async function strategyHandler(request, env) {
  try {
    // Enhanced header parsing with fallbacks
    const userAgent = request.headers.get('User-Agent') || '';
    const clientIP = request.headers.get('CF-Connecting-IP') || '';
    const country = request.cf?.country || 'US';
    const referrer = request.headers.get('Referer') || '';

    // Parallelize data fetching
    const [deviceInfo, geoData, operatorAccess] = await Promise.all([
      detectDevice(userAgent),
      getGeoData(clientIP, country),
      checkOperatorAccess(generateFingerprint(request), request)
    ]);

    const operatorLevel = getOperatorLevel(operatorAccess);
    const accessLevel = calculateStrategyAccess(operatorLevel, geoData, deviceInfo);

    // Fire-and-forget tracking
    trackStrategyAccess({
      fingerprint: generateFingerprint(request),
      operatorLevel,
      accessLevel,
      geo: geoData,
      device: deviceInfo,
      referrer,
      timestamp: Date.now()
    }).catch(console.error);

    // Generate content sections in parallel
    const [frameworks, legalNotices] = await Promise.all([
      getAvailableFrameworks(accessLevel),
      getPageLegalNotices('strategy')
    ]);

    const content = `
      ${generateHeader(accessLevel, operatorLevel, geoData)}
      ${generateFrameworkShowcase(frameworks, accessLevel)}
      ${generateImplementationPathway(accessLevel)}
      ${generateOperatorResources(accessLevel)}
      ${accessLevel < 2 ? generateAccessUpgrade() : ''}
      ${generateStrategyBenefits(accessLevel)}
      ${generateActionSection(accessLevel, operatorLevel)}
      ${legalNotices}
      <script>${generateStrategyScript(accessLevel, generateFingerprint(request), operatorLevel)}</script>
    `;

    return new Response(baseTemplate(content, {
      page: 'strategy',
      accessLevel,
      operatorLevel,
      geoData,
      deviceInfo
    }), {
      headers: {
        'Content-Type': 'text/html',
        'Cache-Control': 'private, no-cache, max-age=0',
        'X-Access-Level': accessLevel.toString(),
        'X-Operator-Level': operatorLevel.toString(),
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'DENY',
        'Referrer-Policy': 'strict-origin-when-cross-origin'
      }
    });
  } catch (error) {
    console.error('Strategy handler error:', error);
    return new Response('An error occurred processing your request', {
      status: 500,
      headers: { 'Content-Type': 'text/plain' }
    });
  }
}

// Optimized access calculation
function calculateStrategyAccess(operatorLevel, geoData, deviceInfo) {
  const baseAccess = Math.min(Math.max(operatorLevel, 1), 4);
  const geoBoost = HIGH_VALUE_GEOS.has(geoData.country) && deviceInfo.type === 'desktop' ? 1 : 0;
  return Math.min(baseAccess + geoBoost, 4);
}

// Framework management with caching
const FRAMEWORK_CACHE = new Map();
function getAvailableFrameworks(accessLevel) {
  const cacheKey = `frameworks-${accessLevel}`;
  if (FRAMEWORK_CACHE.has(cacheKey)) {
    return FRAMEWORK_CACHE.get(cacheKey);
  }

  const allFrameworks = [
    {
      id: 'survey_monetization',
      title: 'Survey Vault Monetization',
      category: 'survey',
      description: 'High-converting survey funnels with Claude-generated content and geo-targeting.',
      metrics: ['21.3% Conversion', '847 Completions/Day', '3.2x Revenue'],
      accessRequired: 1,
      implementation: '2-4 hours',
      complexity: 'Intermediate'
    },
    // ... other frameworks remain the same ...
  ];

  const filtered = allFrameworks.filter(f => f.accessRequired <= accessLevel);
  FRAMEWORK_CACHE.set(cacheKey, filtered);
  return filtered;
}

// Optimized content generation functions
function generateHeader(accessLevel, operatorLevel, geoData) {
  return `
    <header class="strategy-header aiqbrain-strategy-header">
      <div class="container">
        <div class="access-indicator aiqbrain-access-indicator">
          <span class="access-level-badge access-level-${accessLevel}">
            ${ACCESS_LEVEL_TEXTS[accessLevel - 1] || 'Standard'}
          </span>
          <span class="operator-status">${OPERATOR_STATUS_TEXTS[operatorLevel] || 'Visitor'}</span>
        </div>

        <h1 class="strategy-title">AIQBrain Strategy Hub</h1>
        <p class="strategy-subtitle">Claude-Centric Monetization Command Center for ${getAudienceText(accessLevel)} Operators</p>

        <div class="hub-metrics aiqbrain-hub-metrics">
          ${generateMetrics()}
        </div>

        ${generateAccessNotice(accessLevel, operatorLevel)}
      </div>
    </header>
  `;
}

function generateMetrics() {
  return `
    <div class="metric-card">
      <span class="metric-value">47</span>
      <span class="metric-label">Active Frameworks</span>
    </div>
    <div class="metric-card">
      <span class="metric-value">$847k</span>
      <span class="metric-label">Generated This Quarter</span>
    </div>
    <div class="metric-card">
      <span class="metric-value">89.2%</span>
      <span class="metric-label">Implementation Success</span>
    </div>
    <div class="metric-card">
      <span class="metric-value">3.7x</span>
      <span class="metric-label">Avg ROI Multiplier</span>
    </div>
  `;
}

function generateFrameworkShowcase(frameworks, accessLevel) {
  return `
    <section class="framework-showcase aiqbrain-framework-showcase">
      <div class="container">
        <h2 class="section-heading">Operator-Grade Monetization Frameworks</h2>

        <div class="framework-filter aiqbrain-framework-filter">
          <button class="filter-btn active" data-filter="all">All Systems</button>
          <button class="filter-btn" data-filter="survey">Survey Funnels</button>
          <button class="filter-btn" data-filter="affiliate">Affiliate Systems</button>
          <button class="filter-btn" data-filter="automation">Automation Stacks</button>
          ${accessLevel >= 3 ? '<button class="filter-btn" data-filter="stealth">Stealth Operations</button>' : ''}
        </div>

        <div class="framework-grid aiqbrain-framework-grid">
          ${frameworks.map(framework => generateFrameworkCard(framework, accessLevel)).join('')}
        </div>
      </div>
    </section>
  `;
}

function generateFrameworkCard(framework, accessLevel) {
  const hasAccess = accessLevel >= framework.accessRequired;

  return `
    <article class="framework-card aiqbrain-framework-card framework-${hasAccess ? 'unlocked' : 'locked'}"
             data-category="${framework.category}">
      <div class="framework-header">
        <div class="framework-badges">
          <span class="complexity-badge complexity-${framework.complexity.toLowerCase()}">${framework.complexity}</span>
          ${!hasAccess ? '<span class="lock-badge">🔒</span>' : ''}
        </div>
        <h3 class="framework-title">${framework.title}</h3>
      </div>

      <p class="framework-description">${framework.description}</p>

      <div class="framework-metrics">
        ${framework.metrics.map(metric => `<span class="metric-chip">${metric}</span>`).join('')}
      </div>

      <div class="framework-details">
        <div class="detail-item">
          <span class="detail-label">Implementation:</span>
          <span class="detail-value">${framework.implementation}</span>
        </div>
        <div class="detail-item">
          <span class="detail-label">Access Level:</span>
          <span class="detail-value">${getAccessRequiredText(framework.accessRequired)}</span>
        </div>
      </div>

      <div class="framework-actions">
        ${hasAccess ?
          `<button class="btn btn-primary framework-access-btn" data-framework="${framework.id}">Access Framework →</button>` :
          `<button class="btn btn-secondary framework-upgrade-btn" data-required="${framework.accessRequired}">Upgrade Required</button>`
        }
      </div>
    </article>
  `;
}

// Optimized script generation
function generateStrategyScript(accessLevel, fingerprint, operatorLevel) {
  return `
    const strategyHub = {
      access: ${accessLevel},
      opLevel: ${operatorLevel},
      fp: '${fingerprint}',

      track(action, data = {}) {
        navigator.sendBeacon('/api/track/strategy', JSON.stringify({
          action,
          access: this.access,
          opLevel: this.opLevel,
          fp: this.fp,
          t: Date.now(),
          ...data
        }));
      },

      initFilters() {
        const filter = (category) => {
          document.querySelectorAll('.framework-card').forEach(card => {
            card.style.display = category === 'all' || card.dataset.category === category ? 'block' : 'none';
          });
        };

        document.querySelectorAll('.filter-btn').forEach(btn => {
          btn.addEventListener('click', (e) => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            filter(e.target.dataset.filter);
            this.track('framework_filter', { filter: e.target.dataset.filter });
          });
        });
      },

      initFrameworkHandlers() {
        document.addEventListener('click', (e) => {
          if (e.target.closest('.framework-access-btn')) {
            const framework = e.target.dataset.framework;
            this.track('framework_access', { framework });
            window.location.href = \`/lab/\${framework}\`;
          }

          if (e.target.closest('.framework-upgrade-btn')) {
            this.track('upgrade_click', { required: e.target.dataset.required });
            window.location.href = '/request';
          }
        });
      },

      init() {
        this.track('strategy_hub_view');
        this.initFilters();
        this.initFrameworkHandlers();

        // Efficient scroll tracking
        let maxScroll = 0;
        window.addEventListener('scroll', () => {
          const scrollPct = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
          if (scrollPct > maxScroll && scrollPct % 25 === 0) {
            maxScroll = scrollPct;
            this.track('scroll_depth', { pct: scrollPct });
          }
        }, { passive: true });
      }
    };

    // Global action handlers
    window.openOperatorDashboard = () => {
      strategyHub.track('operator_dashboard_click');
      window.location.href = '/dashboard';
    };

    window.scheduleImplementation = () => {
      strategyHub.track('implementation_call_click');
      window.location.href = '/schedule';
    };

    document.addEventListener('DOMContentLoaded', () => strategyHub.init());
  `;
}

// Helper functions with memoization
const accessRequiredCache = new Map();
function getAccessRequiredText(required) {
  if (accessRequiredCache.has(required)) return accessRequiredCache.get(required);

  const levels = ['Basic', 'Operator', 'Advanced', 'Elite'];
  const result = levels[required - 1] || 'Standard';
  accessRequiredCache.set(required, result);
  return result;
}

function generateAccessNotice(accessLevel, operatorLevel) {
  return accessLevel >= 3 ? `
    <div class="access-notice access-notice-premium">
      <p><strong>Elite Access Granted:</strong> You have full access to all frameworks and operator resources.</p>
    </div>
  ` : `
    <div class="access-notice access-notice-standard">
      <p><strong>Preview Access:</strong> Apply for operator status to unlock all frameworks and resources.</p>
    </div>
  `;
}

// ... other generate functions remain similar but optimized ...
