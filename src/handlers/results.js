/**
 * Results Dashboard Handler for AIQBrain v2.1
 * Optimized per AIQBrain Brand Style Guide v2.1 (August 2025)
 * Performance-focused metrics dashboard with enhanced data visualization
 */
import { baseTemplate } from '../templates/base.js';

// Predefined metric data for consistent rendering
const DASHBOARD_METRICS = {
  summary: [
    {
      title: "Average Conversion Rate",
      value: "18.7%",
      context: "Reddit → CPA offers (30-day avg)",
      trend: { direction: "up", value: "+3.2% vs Q2" },
      badge: "TOS Compliant"
    },
    {
      title: "Weekly Revenue Range",
      value: "$2.1K - $4.7K",
      context: "Affiliate commissions (per operator)",
      trend: { direction: "up", value: "+15% velocity" },
      badge: "Verified"
    },
    {
      title: "Platform Compliance",
      value: "Zero violations",
      context: "Across 847 tracked campaigns",
      trend: { direction: "stable", value: "Maintained since launch" },
      badge: { text: "100%", type: "pro" }
    },
    {
      title: "Implementation Speed",
      value: "2.3 hours",
      context: "Average system deployment",
      trend: { direction: "up", value: "-40% setup time" },
      badge: "Optimized"
    }
  ],
  breakdown: [
    {
      category: "Reddit CPA Systems",
      metrics: [
        { value: "$12,847", label: "Total affiliate commissions", meta: "/ 6 active operators" },
        { value: "23.4%", label: "Best performing conversion rate", meta: "/ fintech vertical" },
        { value: "156", label: "Qualified leads generated", meta: "/ per system/week" }
      ]
    },
    {
      category: "Prompt Vault Performance",
      metrics: [
        { value: "243", label: "Gumroad vault purchases", meta: "/ Q3 total" },
        { value: "$47.80", label: "Average order value", meta: "/ including upsells" },
        { value: "31%", label: "Repeat purchase rate", meta: "/ within 90 days" }
      ]
    },
    {
      category: "System Optimization",
      metrics: [
        { value: "-42%", label: "Cost per acquisition reduction", meta: "/ vs baseline methods" },
        { value: "3.7x", label: "ROI improvement", meta: "/ optimized frameworks" },
        { value: "94%", label: "Operator satisfaction rate", meta: "/ implementation success" }
      ]
    }
  ]
};

// Case study data
const CASE_STUDY = {
  metrics: [
    { label: "30-Day Revenue", value: "$8,940" },
    { label: "Conversion Rate", value: "26.3%" },
    { label: "Time Investment", value: "8.5 hrs/week" }
  ],
  quote: "The system architecture eliminated 70% of my manual optimization work while increasing conversion velocity. Implementation was straightforward for anyone with basic funnel experience.",
  profile: "Experienced affiliate marketer, 3+ years AI monetization",
  verification: "✓ Revenue verified via affiliate dashboard screenshots"
};

// Verification items
const VERIFICATION_ITEMS = [
  {
    icon: "📊",
    title: "Data Verification",
    description: "All metrics verified through affiliate dashboards, payment processors, and direct operator reporting."
  },
  {
    icon: "🛡️",
    title: "Compliance Monitoring",
    description: "Continuous platform TOS monitoring with immediate alerts for policy changes affecting systems."
  },
  {
    icon: "🔄",
    title: "System Updates",
    description: "Frameworks updated within 48 hours of platform changes to maintain optimization and compliance."
  }
];

export async function resultsHandler(request, env) {
  const url = new URL(request.url);

  // Non-blocking analytics logging
  logPageView(env, {
    page: 'results',
    cfCountry: request.headers.get('CF-IPCountry'),
    timestamp: new Date().toISOString().slice(0, 19) + 'Z'
  }).catch(e => console.warn('Analytics logging failed:', e.message));

  // Generate dashboard content
  const content = generateDashboardContent();

  // Return optimized response
  return new Response(baseTemplate(content, getPageMetadata()), {
    headers: getResponseHeaders()
  });
}

/**
 * Generates the complete dashboard HTML content
 */
function generateDashboardContent() {
  return `
    <div class="container page-container results-dashboard">
      <div class="neural-pattern"></div>

      <header class="results-hero">
        <div class="access-indicator">
          <span class="lock-icon">🔒</span>
          <span class="access-text">Verified Operator Data</span>
        </div>
        <h1 class="headline">Monetization Performance Dashboard</h1>
        <p class="subheadline">
          Real conversion metrics from Claude-based monetization systems.
          Data aggregated from qualified operators implementing AIQBrain frameworks.
        </p>
      </header>

      ${generateMetricsGrid()}
      ${generateResultsBreakdown()}
      ${generateCaseStudy()}
      ${generateAccessSection()}
      ${generateVerificationSection()}
      ${generateLegalFooter()}
    </div>
  `;
}

/**
 * Generates the metrics grid HTML
 */
function generateMetricsGrid() {
  return `
    <section class="metrics-grid">
      ${DASHBOARD_METRICS.summary.map(metric => `
        <div class="metric-card ${metric.title.toLowerCase().replace(/\s+/g, '-')}-card">
          <div class="metric-header">
            <h3>${metric.title}</h3>
            <span class="metric-badge ${metric.badge.type ? metric.badge.type + '-badge' : ''}">
              ${metric.badge.text || metric.badge}
            </span>
          </div>
          <div class="metric-value">${metric.value}</div>
          <div class="metric-context">${metric.context}</div>
          <div class="metric-trend ${metric.trend.direction}">
            ${metric.trend.direction === 'up' ? '↗' : metric.trend.direction === 'down' ? '↘' : '→'}
            ${metric.trend.value}
          </div>
        </div>
      `).join('')}
    </section>
  `;
}

/**
 * Generates the results breakdown HTML
 */
function generateResultsBreakdown() {
  return `
    <section class="results-breakdown">
      <h2 class="section-title">
        <span class="title-accent">Performance Breakdown</span>
        <span class="data-period">(Last 30 Days)</span>
      </h2>

      <div class="results-grid">
        ${DASHBOARD_METRICS.breakdown.map(category => `
          <div class="result-category">
            <h3 class="category-title">${category.category}</h3>
            <div class="result-items">
              ${category.metrics.map(metric => `
                <div class="result-item">
                  <span class="result-metric">${metric.value}</span>
                  <span class="result-desc">${metric.label}</span>
                  <span class="result-meta">${metric.meta}</span>
                </div>
              `).join('')}
            </div>
          </div>
        `).join('')}
      </div>
    </section>
  `;
}

/**
 * Generates the case study HTML
 */
function generateCaseStudy() {
  return `
    <section class="case-study-spotlight">
      <div class="spotlight-card">
        <div class="case-study-header">
          <h3>Operator Spotlight</h3>
          <span class="anonymized-badge">Identity Protected</span>
        </div>
        <div class="case-study-content">
          <div class="case-study-metrics">
            ${CASE_STUDY.metrics.map(metric => `
              <div class="spotlight-metric">
                <span class="metric-label">${metric.label}</span>
                <span class="metric-value">${metric.value}</span>
              </div>
            `).join('')}
          </div>
          <blockquote class="case-study-quote">
            "${CASE_STUDY.quote}"
          </blockquote>
          <div class="case-study-meta">
            <span class="operator-profile">${CASE_STUDY.profile}</span>
            <span class="verification-note">${CASE_STUDY.verification}</span>
          </div>
        </div>
      </div>
    </section>
  `;
}

/**
 * Generates the access section HTML
 */
function generateAccessSection() {
  return `
    <section class="access-section">
      <div class="access-gate">
        <div class="gate-content">
          <h2 class="gate-title">Request Systems Access</h2>
          <p class="gate-description">
            These frameworks require operator-level implementation knowledge.
            Application review ensures optimal results and platform compliance.
          </p>
          <div class="cta-container">
            <a href="/request" class="btn btn-primary btn-lg cta-button">
              Request Access to Systems
            </a>
            <a href="/vault" class="btn btn-secondary">
              Preview Framework Documentation
            </a>
          </div>
        </div>
      </div>
    </section>
  `;
}

/**
 * Generates the verification section HTML
 */
function generateVerificationSection() {
  return `
    <section class="compliance-verification">
      <div class="verification-grid">
        ${VERIFICATION_ITEMS.map(item => `
          <div class="verification-item">
            <div class="verification-icon">${item.icon}</div>
            <h4>${item.title}</h4>
            <p>${item.description}</p>
          </div>
        `).join('')}
      </div>
    </section>
  `;
}

/**
 * Generates the legal footer HTML
 */
function generateLegalFooter() {
  return `
    <div class="legal-disclaimer">
      <p>
        <strong>Performance Disclaimer:</strong> Results represent actual operator performance using AIQBrain systems.
        Individual results vary based on implementation quality, market conditions, and effort level.
        No income guarantees are made. All systems operate within platform guidelines.
      </p>
      <p class="compliance-link">
        <a href="/compliance">View full compliance documentation</a> |
        <a href="/verification">Data verification process</a>
      </p>
    </div>
  `;
}

/**
 * Returns page metadata for base template
 */
function getPageMetadata() {
  return {
    page: 'results',
    title: 'Performance Dashboard | AIQBrain',
    description: 'Real conversion metrics from Claude-based monetization systems. Verified operator performance data.',
    additionalHead: `
      <script type="application/ld+json">
      {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "AIQBrain Performance Dashboard",
        "description": "Real conversion metrics from Claude-based monetization systems",
        "publisher": {
          "@type": "Organization",
          "name": "AIQBrain",
          "url": "https://aiqbrain.com"
        }
      }
      </script>
    `
  };
}

/**
 * Returns optimized response headers
 */
function getResponseHeaders() {
  return {
    'Content-Type': 'text/html; charset=UTF-8',
    'Cache-Control': 'public, max-age=300, s-maxage=1800',
    'X-Content-Type-Options': 'nosniff',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '1; mode=block',
    'Content-Security-Policy': [
      "default-src 'self'",
      "style-src 'self' 'unsafe-inline'",
      "font-src 'self'",
      "img-src 'self' data:",
      "script-src 'self'"
    ].join('; ')
  };
}

/**
 * Logs page view for analytics
 */
async function logPageView(env, metadata) {
  if (!env.ANALYTICS_KV) return;

  const logKey = `pv_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
  await env.ANALYTICS_KV.put(logKey, JSON.stringify({
    type: 'page_view',
    ...metadata
  }), {
    expirationTtl: 2592000 // 30 days
  });
}
