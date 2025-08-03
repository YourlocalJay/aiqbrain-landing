/**
 * Optimized Weekend Strategy Handler for AIQBrain
 * Implements time-sensitive content delivery with performance optimizations
 */
import { baseTemplate } from '../templates/base.js';
import { getPageLegalNotices } from '../components/legal.js';
import { detectDevice, getGeoData, generateFingerprint } from '../utils/traffic.js';
import { trackWeekendAccess } from '../analytics/tracking.js';
import { checkOperatorAccess, getOperatorLevel } from '../auth/operator.js';
import { getWeekendContent, isWeekendActive, getTimeUntilNext } from '../utils/weekend.js';

// Cache configuration
const WEEKEND_GEOS = new Set(['US', 'CA', 'GB', 'AU']);
const OPERATOR_BADGES = ['Visitor', 'Candidate', 'Operator', 'Advanced', 'Elite'];
const ACCESS_LEVELS = ['Basic', 'Operator', 'Advanced', 'Elite'];

export async function strategyWeekendHandler(request, env) {
  try {
    // Enhanced header processing with fallbacks
    const headers = {
      userAgent: request.headers.get('User-Agent') || '',
      clientIP: request.headers.get('CF-Connecting-IP') || '',
      country: request.cf?.country || 'US',
      timezone: request.cf?.timezone || 'America/Los_Angeles',
      referrer: request.headers.get('Referer') || ''
    };

    // Parallel data fetching
    const [deviceInfo, geoData, operatorAccess] = await Promise.all([
      detectDevice(headers.userAgent),
      getGeoData(headers.clientIP, headers.country),
      checkOperatorAccess(generateFingerprint(request), request)
    ]);

    const operatorLevel = getOperatorLevel(operatorAccess);
    const isWeekend = isWeekendActive(headers.timezone);
    const timeUntilNext = getTimeUntilNext(headers.timezone);
    const accessLevel = calculateWeekendAccess(operatorLevel, isWeekend, geoData);

    // Fire-and-forget tracking
    trackWeekendAccess({
      fingerprint: generateFingerprint(request),
      operatorLevel,
      accessLevel,
      isWeekend,
      timeUntilNext,
      geo: geoData,
      device: deviceInfo,
      timestamp: Date.now()
    }).catch(console.error);

    // Content generation pipeline
    const weekendContent = await getWeekendContent(operatorLevel, isWeekend);
    const contentSections = {
      header: generateHeader(isWeekend, timeUntilNext, operatorLevel, weekendContent),
      drops: isWeekend ?
        generateActiveDrops(weekendContent.drops, accessLevel) :
        generateUpcomingDrops(weekendContent.upcoming, accessLevel),
      systems: generateWeekendSystems(weekendContent.systems, accessLevel, isWeekend),
      leaderboard: generateLeaderboard(weekendContent.leaderboard, operatorLevel),
      tracker: generateTrackerDashboard(weekendContent.tracker, accessLevel, isWeekend),
      support: generateSupportOptions(operatorLevel, isWeekend),
      action: generateWeekendAction(accessLevel, operatorLevel, isWeekend),
      upgrade: accessLevel < 2 ? generateWeekendUpgrade(isWeekend, timeUntilNext) : '',
      legal: getPageLegalNotices('weekend-strategy'),
      script: generateWeekendScript(accessLevel, generateFingerprint(request), isWeekend, timeUntilNext)
    };

    const content = `
      ${contentSections.header}
      <section class="weekend-drops aiqbrain-weekend-drops">
        <div class="container">${contentSections.drops}</div>
      </section>
      <section class="weekend-systems aiqbrain-weekend-systems">
        <div class="container">${contentSections.systems}</div>
      </section>
      <section class="weekend-leaderboard aiqbrain-weekend-leaderboard">
        <div class="container">${contentSections.leaderboard}</div>
      </section>
      ${contentSections.upgrade}
      <section class="weekend-tracker aiqbrain-weekend-tracker">
        <div class="container">${contentSections.tracker}</div>
      </section>
      <section class="weekend-support aiqbrain-weekend-support">
        <div class="container">${contentSections.support}</div>
      </section>
      ${contentSections.action}
      ${contentSections.legal}
      <script>${contentSections.script}</script>
    `;

    return new Response(baseTemplate(content, {
      page: 'strategy-weekend',
      accessLevel,
      operatorLevel,
      isWeekend,
      timeUntilNext,
      geoData,
      deviceInfo
    }), {
      headers: {
        'Content-Type': 'text/html',
        'Cache-Control': `private, max-age=${isWeekend ? 300 : 3600}`,
        'X-Weekend-Active': isWeekend.toString(),
        'X-Access-Level': accessLevel.toString(),
        'X-Time-Until-Next': timeUntilNext.toString(),
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'DENY'
      }
    });
  } catch (error) {
    console.error('Weekend strategy handler error:', error);
    return new Response('System temporarily unavailable', {
      status: 503,
      headers: { 'Content-Type': 'text/plain' }
    });
  }
}

// Optimized access calculation
function calculateWeekendAccess(operatorLevel, isWeekend, geoData) {
  let access = operatorLevel;
  if (isWeekend && operatorLevel >= 2) access += 1;
  if (isWeekend && WEEKEND_GEOS.has(geoData.country)) access += 1;
  return Math.min(access, 4);
}

// Content generation functions
function generateHeader(isWeekend, timeUntilNext, operatorLevel, content) {
  const statusClass = isWeekend ? 'status-active' : 'status-inactive';
  const statusText = isWeekend ? 'WEEKEND ACTIVE' : 'WEEKEND INACTIVE';
  const subtitle = isWeekend ?
    'Weekend acceleration protocols are LIVE. Execute now for maximum velocity.' :
    `Next drop in ${formatTimeRemaining(timeUntilNext)}. Prepare for rapid deployment.`;

  return `
    <header class="weekend-header aiqbrain-weekend-header">
      <div class="container">
        <div class="weekend-status aiqbrain-weekend-status">
          <div class="status-indicator ${statusClass}">
            <span class="status-dot"></span>
            <span class="status-text">${statusText}</span>
          </div>
          <div class="operator-badge operator-level-${operatorLevel}">
            ${OPERATOR_BADGES[operatorLevel] || 'Standard'}
          </div>
        </div>

        ${generateWeekendBanner(isWeekend, timeUntilNext, operatorLevel)}

        <h1 class="weekend-title">AIQBrain Weekend Strategy Hub</h1>
        <p class="weekend-subtitle">${subtitle}</p>

        <div class="weekend-metrics aiqbrain-weekend-metrics">
          ${generateMetrics(content.stats)}
        </div>
      </div>
    </header>
  `;
}

function generateMetrics(stats) {
  return `
    <div class="metric-item">
      <span class="metric-value">${stats.activeOperators}</span>
      <span class="metric-label">Active This Weekend</span>
    </div>
    <div class="metric-item">
      <span class="metric-value">${stats.avgImplementationTime}</span>
      <span class="metric-label">Avg Implementation</span>
    </div>
    <div class="metric-item">
      <span class="metric-value">${stats.weekendMultiplier}</span>
      <span class="metric-label">Weekend ROI Boost</span>
    </div>
  `;
}

function generateWeekendSystems(systems, accessLevel, isWeekend) {
  return `
    <h2 class="section-heading">Weekend-Optimized Systems</h2>
    <div class="systems-grid aiqbrain-systems-grid">
      ${systems
        .filter(system => system.weekendOptimized)
        .map(system => generateSystemCard(system, accessLevel, isWeekend))
        .join('')}
    </div>
  `;
}

function generateSystemCard(system, accessLevel, isWeekend) {
  const hasAccess = accessLevel >= system.accessRequired;
  const weekendBonus = isWeekend && system.weekendBonus;
  const cardClasses = [
    'weekend-system-card',
    hasAccess ? 'system-available' : 'system-locked',
    weekendBonus ? 'weekend-boosted' : ''
  ].filter(Boolean).join(' ');

  return `
    <article class="${cardClasses}">
      <div class="system-header">
        <div class="system-badges">
          <span class="system-type-badge">${system.type}</span>
          ${weekendBonus ? '<span class="weekend-bonus-badge">WEEKEND BOOST</span>' : ''}
          ${!hasAccess ? '<span class="lock-badge">🔒</span>' : ''}
        </div>
        <h3 class="system-title">${system.title}</h3>
      </div>

      <p class="system-description">${system.description}</p>

      <div class="system-weekend-metrics">
        ${generateSystemMetrics(system)}
      </div>

      <div class="system-features">
        ${system.weekendFeatures.map(f => `<span class="feature-chip">${f}</span>`).join('')}
      </div>

      <div class="system-actions">
        ${hasAccess ?
          `<button class="btn btn-primary system-deploy-btn" data-system="${system.id}">
            ${isWeekend ? 'Deploy Now' : 'Prepare for Weekend'} →
          </button>` :
          `<button class="btn btn-secondary system-unlock-btn" data-required="${system.accessRequired}">
            Unlock Required
          </button>`
        }
      </div>
    </article>
  `;
}

function generateSystemMetrics(system) {
  return `
    <div class="metric-item">
      <span class="metric-label">Weekend Multiplier:</span>
      <span class="metric-value">${system.weekendMultiplier}x</span>
    </div>
    <div class="metric-item">
      <span class="metric-label">Implementation:</span>
      <span class="metric-value">${system.implementationTime}</span>
    </div>
    <div class="metric-item">
      <span class="metric-label">ROI Potential:</span>
      <span class="metric-value">${system.roiPotential}</span>
    </div>
  `;
}

// Optimized JavaScript generation
function generateWeekendScript(accessLevel, fingerprint, isWeekend, timeUntilNext) {
  return `
    const weekendHub = {
      access: ${accessLevel},
      fp: '${fingerprint}',
      isWeekend: ${isWeekend},
      timeLeft: ${timeUntilNext},

      track(action, data = {}) {
        navigator.sendBeacon('/api/track/weekend', JSON.stringify({
          action,
          access: this.access,
          fp: this.fp,
          isWeekend: this.isWeekend,
          t: Date.now(),
          ...data
        }));
      },

      initCountdown() {
        const updateTimer = () => {
          if (this.timeLeft <= 0) {
            window.location.reload();
            return;
          }

          const timer = document.querySelector('.countdown-timer');
          if (timer) {
            timer.textContent = this.formatTime(this.timeLeft);
          }
          this.timeLeft -= 1000;
        };

        updateTimer();
        setInterval(updateTimer, 1000);
      },

      formatTime(ms) {
        const hours = Math.floor(ms / 3.6e6);
        const minutes = Math.floor((ms % 3.6e6) / 6e4);
        const seconds = Math.floor((ms % 6e4) / 1000);
        return [hours, minutes, seconds]
          .map(v => v.toString().padStart(2, '0'))
          .join(':');
      },

      initDeploymentHandlers() {
        document.addEventListener('click', (e) => {
          if (e.target.closest('.system-deploy-btn')) {
            this.track('system_deploy', {
              system: e.target.dataset.system
            });
          }

          if (e.target.closest('.drop-access-btn')) {
            this.track('drop_access', {
              drop: e.target.dataset.drop
            });
          }
        });
      },

      initLiveUpdates() {
        if (this.access >= 2 && this.isWeekend) {
          setInterval(() => {
            document.querySelectorAll('[id^="live-"]').forEach(el => {
              const current = parseFloat(el.textContent.replace(/\\D/g, ''));
              const variation = current * (0.95 + Math.random() * 0.1);
              el.textContent = el.id.includes('ctr') ?
                variation.toFixed(1) + '%' :
                Math.round(variation);
            });
          }, 30000);
        }
      },

      init() {
        this.track('weekend_view');
        this.initCountdown();
        this.initDeploymentHandlers();
        this.initLiveUpdates();
      }
    };

    document.addEventListener('DOMContentLoaded', () => weekendHub.init());
  `;
}

// Helper functions
function formatTimeRemaining(ms) {
  const hours = Math.floor(ms / 3.6e6);
  const minutes = Math.floor((ms % 3.6e6) / 6e4);

  if (hours > 24) {
    const days = Math.floor(hours / 24);
    return \`\${days}d \${hours % 24}h\`;
  }
  return \`\${hours}h \${minutes}m\`;
}
