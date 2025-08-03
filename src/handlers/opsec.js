/**
 * OPSEC Resources Handler for AIQBrain
 * Focuses on legitimate operational security, compliance monitoring,
 * and risk management for professional monetization operations
 * Version 2.1 - Optimized for performance and security
 */
import { baseTemplate } from '../templates/base.js';

// Cache security headers since they don't change
const SECURITY_HEADERS = {
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
  ].join('; '),
  'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload'
};

export async function opsecHandler(request, env) {
  const url = new URL(request.url);

  // Track OPSEC page access asynchronously without waiting
  logOpsecAccess(env, {
    type: 'opsec_page_view',
    userAgent: request.headers.get('User-Agent'),
    referer: request.headers.get('Referer'),
    cfCountry: request.headers.get('CF-IPCountry'),
    cfRay: request.headers.get('CF-Ray'),
    timestamp: new Date().toISOString()
  }).catch(console.warn);

  // Pre-constructed HTML content with optimized structure
  const content = createOpsecContent();

  const response = new Response(baseTemplate(content, {
    page: 'opsec',
    title: 'Operations Security & Risk Management | AIQBrain',
    description: 'Comprehensive security protocols and compliance frameworks for professional AI monetization operations.',
    additionalHead: getOpsecStyles()
  }), {
    headers: {
      'Content-Type': 'text/html; charset=UTF-8',
      'Cache-Control': 'public, max-age=300, s-maxage=1800',
      ...SECURITY_HEADERS
    }
  });

  return response;
}

/**
 * Creates the OPSEC content with optimized HTML structure
 */
function createOpsecContent() {
  return `
    <div class="container page-container opsec-container">
      <!-- Neural pattern background -->
      <div class="neural-pattern" aria-hidden="true"></div>

      <!-- Header Section -->
      <header class="opsec-header">
        ${createSecurityIndicator()}
        <h1 class="headline">Operations Security & Risk Management</h1>
        <p class="subheadline">
          Comprehensive security protocols and compliance frameworks for
          professional AI monetization operations. Designed for operators
          who prioritize sustainable, platform-compliant revenue systems.
        </p>
      </header>

      <!-- Security Pillars -->
      <section class="security-pillars">
        <h2 class="section-title">Core Security Principles</h2>
        ${createSecurityPillars()}
      </section>

      <!-- OPSEC Resources -->
      <section class="opsec-resources">
        <h2 class="section-title">
          <span class="title-accent">Security Resources</span>
          <span class="access-badge">Operator Access Required</span>
        </h2>
        ${createResourcesGrid()}
      </section>

      <!-- Security Toolkit -->
      <section class="security-toolkit">
        <h2 class="section-title">Operator Security Toolkit</h2>
        ${createToolkitGrid()}
      </section>

      <!-- Best Practices -->
      <section class="best-practices">
        <h2 class="section-title">Security Best Practices</h2>
        ${createBestPractices()}
      </section>

      <!-- Access Control -->
      <section class="access-control">
        ${createAccessGate()}
      </section>

      <!-- Legal Framework -->
      <section class="legal-framework">
        ${createLegalFramework()}
      </section>

      <!-- Legal Disclaimer -->
      <div class="legal-disclaimer">
        ${createLegalDisclaimer()}
      </div>
    </div>
  `;
}

/**
 * Creates the security indicator component
 */
function createSecurityIndicator() {
  return `
    <div class="security-indicator">
      <span class="shield-icon" aria-hidden="true">🛡️</span>
      <span class="security-level">Operational Security Center</span>
    </div>
  `;
}

/**
 * Creates the security pillars section
 */
function createSecurityPillars() {
  const pillars = [
    { icon: '📋', title: 'Compliance First',
      desc: 'Proactive monitoring and adherence to platform guidelines, terms of service, and regulatory requirements across all monetization channels.' },
    { icon: '🔐', title: 'Data Protection',
      desc: 'Enterprise-grade data handling, user privacy protection, and secure storage of monetization assets and customer information.' },
    { icon: '📊', title: 'Threat Monitoring',
      desc: 'Real-time monitoring of platform policy changes, compliance risks, and market conditions affecting monetization systems.' },
    { icon: '🔄', title: 'Business Continuity',
      desc: 'Backup systems, diversification strategies, and rapid adaptation protocols for maintaining revenue streams during platform changes.' }
  ];

  return `
    <div class="pillars-grid">
      ${pillars.map(pillar => `
        <div class="pillar-card">
          <div class="pillar-icon" aria-hidden="true">${pillar.icon}</div>
          <h3>${pillar.title}</h3>
          <p>${pillar.desc}</p>
        </div>
      `).join('')}
    </div>
  `;
}

/**
 * Creates the resources grid
 */
function createResourcesGrid() {
  const categories = [
    {
      icon: '📜',
      title: 'Compliance Monitoring',
      resources: [
        {
          title: 'Platform Policy Tracking',
          desc: 'Automated monitoring systems for Terms of Service updates across major platforms (Reddit, Discord, Claude, OpenAI).',
          frequency: 'Daily',
          access: 'Verified Operators'
        },
        {
          title: 'Compliance Checklists',
          desc: 'Pre-implementation verification frameworks ensuring all monetization systems operate within platform guidelines.',
          frequency: 'Weekly',
          access: 'All Members'
        },
        {
          title: 'Risk Assessment Tools',
          desc: 'Systematic evaluation frameworks for new monetization opportunities and compliance risk analysis.',
          frequency: 'Bi-weekly',
          access: 'Advanced Operators'
        }
      ]
    },
    {
      icon: '🔐',
      title: 'Data Security Protocols',
      resources: [
        {
          title: 'Customer Data Protection',
          desc: 'GDPR and CCPA compliant data handling procedures for email collection, user tracking, and customer relationship management.',
          frequency: 'Monthly',
          access: 'All Members'
        },
        {
          title: 'Asset Security Framework',
          desc: 'Protection protocols for intellectual property, prompt libraries, and proprietary monetization systems.',
          frequency: 'Quarterly',
          access: 'Premium Access'
        },
        {
          title: 'Communication Security',
          desc: 'Secure communication protocols for client interactions, partner collaborations, and sensitive business discussions.',
          frequency: 'As needed',
          access: 'Enterprise Level'
        }
      ]
    },
    {
      icon: '🔄',
      title: 'Business Continuity',
      resources: [
        {
          title: 'Diversification Strategies',
          desc: 'Multi-platform revenue distribution to reduce dependency on single traffic sources or monetization channels.',
          frequency: 'Monthly',
          access: 'Verified Operators'
        },
        {
          title: 'Backup System Protocols',
          desc: 'Rapid deployment procedures for alternative monetization systems during platform disruptions or policy changes.',
          frequency: 'Quarterly',
          access: 'Advanced Access'
        },
        {
          title: 'Crisis Response Playbooks',
          desc: 'Step-by-step response protocols for account suspensions, policy violations, and revenue stream disruptions.',
          frequency: 'As needed',
          access: 'Premium Members'
        }
      ]
    },
    {
      icon: '📡',
      title: 'Threat Intelligence',
      resources: [
        {
          title: 'Policy Change Alerts',
          desc: 'Real-time notifications for platform policy updates, algorithm changes, and compliance requirement modifications.',
          frequency: 'Real-time',
          access: 'All Members'
        },
        {
          title: 'Market Intelligence Reports',
          desc: 'Weekly intelligence briefings on monetization trends, competitive analysis, and opportunity identification.',
          frequency: 'Weekly',
          access: 'Verified Operators'
        },
        {
          title: 'Enforcement Pattern Analysis',
          desc: 'Analysis of platform enforcement actions, violation patterns, and prevention strategies based on community intelligence.',
          frequency: 'Bi-weekly',
          access: 'Premium Access'
        }
      ]
    }
  ];

  return `
    <div class="resources-grid">
      ${categories.map(category => `
        <div class="resource-category">
          <h3 class="category-title">
            <span class="category-icon" aria-hidden="true">${category.icon}</span>
            ${category.title}
          </h3>
          <div class="resource-list">
            ${category.resources.map(resource => `
              <div class="resource-item">
                <h4>${resource.title}</h4>
                <p>${resource.desc}</p>
                <div class="resource-meta">
                  <span class="update-frequency">Updated: ${resource.frequency}</span>
                  <span class="access-level">🔒 ${resource.access}</span>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

/**
 * Creates the toolkit grid
 */
function createToolkitGrid() {
  const tools = [
    {
      title: 'Compliance Dashboard',
      status: 'available',
      desc: 'Centralized monitoring for all platform compliance requirements, policy updates, and risk indicators across your monetization systems.',
      features: ['Real-time monitoring', 'Multi-platform support', 'Risk scoring']
    },
    {
      title: 'Security Checklist Generator',
      status: 'available',
      desc: 'Automated generation of security and compliance checklists customized for your specific monetization systems and platforms.',
      features: ['Custom templates', 'Platform-specific', 'Audit trails']
    },
    {
      title: 'Threat Alert System',
      status: 'beta',
      desc: 'Proactive threat detection and early warning system for policy changes, enforcement actions, and market disruptions.',
      features: ['Early warnings', 'Custom alerts', 'Integration ready']
    },
    {
      title: 'Business Continuity Planner',
      status: 'coming-soon',
      desc: 'Comprehensive planning tool for maintaining revenue streams during platform changes, policy updates, and market shifts.',
      features: ['Scenario planning', 'Backup strategies', 'Recovery protocols']
    }
  ];

  return `
    <div class="toolkit-grid">
      ${tools.map(tool => `
        <div class="tool-card">
          <div class="tool-header">
            <h3>${tool.title}</h3>
            <span class="tool-status ${tool.status.replace('-', '')}">
              ${tool.status === 'coming-soon' ? 'Coming Soon' : tool.status === 'beta' ? 'Beta' : 'Available'}
            </span>
          </div>
          <p>${tool.desc}</p>
          <div class="tool-features">
            ${tool.features.map(feature => `
              <span class="feature-tag">${feature}</span>
            `).join('')}
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

/**
 * Creates the best practices section
 */
function createBestPractices() {
  const practices = [
    {
      title: 'Daily Operations',
      items: [
        'Review platform notifications and policy updates',
        'Monitor system performance and compliance metrics',
        'Maintain secure backup copies of critical assets',
        'Update security protocols based on threat intelligence'
      ]
    },
    {
      title: 'Weekly Reviews',
      items: [
        'Conduct comprehensive compliance audits',
        'Review and update risk assessment documentation',
        'Analyze performance metrics for anomalies',
        'Test backup and recovery procedures'
      ]
    },
    {
      title: 'Monthly Planning',
      items: [
        'Strategic review of monetization system security',
        'Update business continuity and crisis response plans',
        'Evaluate new security tools and protocols',
        'Conduct scenario planning and stress testing'
      ]
    }
  ];

  return `
    <div class="practices-container">
      ${practices.map(practice => `
        <div class="practice-category">
          <h3>${practice.title}</h3>
          <ul class="practice-list">
            ${practice.items.map(item => `
              <li>${item}</li>
            `).join('')}
          </ul>
        </div>
      `).join('')}
    </div>
  `;
}

/**
 * Creates the access gate section
 */
function createAccessGate() {
  const benefits = [
    { icon: '⚡', text: 'Real-time policy monitoring' },
    { icon: '🛡️', text: 'Proactive threat detection' },
    { icon: '📋', text: 'Compliance automation tools' },
    { icon: '🔄', text: 'Business continuity planning' }
  ];

  return `
    <div class="access-gate security-focused">
      <div class="gate-content">
        <h2 class="gate-title">Security Resource Access</h2>
        <p class="gate-description">
          Comprehensive OPSEC resources require verified operator status.
          Access includes real-time threat intelligence, compliance monitoring tools,
          and business continuity frameworks.
        </p>
        <div class="security-benefits">
          ${benefits.map(benefit => `
            <div class="benefit-item">
              <span class="benefit-icon" aria-hidden="true">${benefit.icon}</span>
              <span class="benefit-text">${benefit.text}</span>
            </div>
          `).join('')}
        </div>
        <div class="cta-container">
          <a href="/request" class="btn btn-primary btn-lg cta-button">
            Apply for Security Access
          </a>
          <a href="/compliance" class="btn btn-secondary">
            Review Compliance Framework
          </a>
        </div>
      </div>
    </div>
  `;
}

/**
 * Creates the legal framework section
 */
function createLegalFramework() {
  const items = [
    {
      title: 'Platform Compliance',
      desc: 'All security protocols and operational procedures are designed to maintain strict compliance with platform terms of service and community guidelines.'
    },
    {
      title: 'Data Protection',
      desc: 'Security measures include GDPR, CCPA, and other applicable privacy regulation compliance for user data handling and storage.'
    },
    {
      title: 'Ethical Standards',
      desc: 'All OPSEC resources promote transparent, ethical business practices that prioritize long-term sustainability over short-term gains.'
    },
    {
      title: 'Professional Responsibility',
      desc: 'Operators are expected to implement security measures responsibly and in accordance with applicable laws and regulations.'
    }
  ];

  return `
    <div class="framework-content">
      <h2 class="framework-title">Legal & Compliance Framework</h2>
      <div class="framework-grid">
        ${items.map(item => `
          <div class="framework-item">
            <h3>${item.title}</h3>
            <p>${item.desc}</p>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

/**
 * Creates the legal disclaimer
 */
function createLegalDisclaimer() {
  return `
    <p>
      <strong>Security Disclaimer:</strong> All OPSEC resources are provided for legitimate
      business security purposes only. Users are responsible for ensuring compliance with
      applicable laws, platform terms of service, and ethical business practices.
    </p>
    <div class="legal-links">
      <a href="/compliance">Compliance Policy</a> |
      <a href="/terms">Terms of Service</a> |
      <a href="/privacy">Privacy Policy</a>
    </div>
  `;
}

/**
 * Returns the OPSEC styles
 */
function getOpsecStyles() {
  return `
    <style>
      .neural-pattern {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        opacity: 0.05;
        pointer-events: none;
        background-image: url("data:image/svg+xml,%3Csvg width='50' height='50' viewBox='0 0 50 50' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%2358a6ff' stroke-width='0.5'%3E%3Ccircle cx='25' cy='25' r='1.5'/%3E%3Ccircle cx='10' cy='10' r='1.5'/%3E%3Ccircle cx='40' cy='10' r='1.5'/%3E%3Ccircle cx='10' cy='40' r='1.5'/%3E%3Ccircle cx='40' cy='40' r='1.5'/%3E%3Cline x1='25' y1='25' x2='10' y2='10'/%3E%3Cline x1='25' y1='25' x2='40' y2='10'/%3E%3Cline x1='25' y1='25' x2='10' y2='40'/%3E%3Cline x1='25' y1='25' x2='40' y2='40'/%3E%3C/g%3E%3C/svg%3E");
        background-size: 50px 50px;
      }

      .security-indicator {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        background: rgba(88, 166, 255, 0.1);
        padding: 0.5rem 1rem;
        border-radius: 6px;
        border: 1px solid rgba(88, 166, 255, 0.3);
        margin-bottom: 1rem;
        font-size: 0.875rem;
        font-weight: 600;
      }

      .pillars-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: 1.5rem;
        margin: 2rem 0;
      }

      .pillar-card {
        background: var(--card-bg);
        border-radius: 8px;
        padding: 1.5rem;
        border: 1px solid rgba(88, 166, 255, 0.2);
        text-align: center;
      }

      .pillar-icon {
        font-size: 2.5rem;
        margin-bottom: 1rem;
      }

      .resources-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
        gap: 2rem;
        margin: 2rem 0;
      }

      .resource-category {
        background: var(--card-bg);
        border-radius: 8px;
        padding: 1.5rem;
        border: 1px solid rgba(88, 166, 255, 0.2);
      }

      .category-title {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        margin-bottom: 1.5rem;
        font-family: 'Space Mono', monospace;
        color: var(--accent-primary);
      }

      .resource-item {
        margin-bottom: 1.5rem;
        padding-bottom: 1rem;
        border-bottom: 1px solid rgba(230, 237, 243, 0.1);
      }

      .resource-item:last-child {
        margin-bottom: 0;
        padding-bottom: 0;
        border-bottom: none;
      }

      .resource-meta {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 0.5rem;
        font-size: 0.875rem;
        color: var(--text-secondary);
      }

      .access-level {
        background: rgba(249, 199, 79, 0.2);
        padding: 0.25rem 0.5rem;
        border-radius: 4px;
        font-size: 0.75rem;
        color: var(--accent-warning);
      }

      .toolkit-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 1.5rem;
        margin: 2rem 0;
      }

      .tool-card {
        background: var(--card-bg);
        border-radius: 8px;
        padding: 1.5rem;
        border: 1px solid rgba(88, 166, 255, 0.2);
      }

      .tool-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1rem;
      }

      .tool-status {
        padding: 0.25rem 0.75rem;
        border-radius: 4px;
        font-size: 0.75rem;
        font-weight: 600;
      }

      .tool-status.available {
        background: rgba(86, 211, 100, 0.2);
        color: #56d364;
      }

      .tool-status.beta {
        background: rgba(249, 199, 79, 0.2);
        color: var(--accent-warning);
      }

      .tool-status.comingsoon {
        background: rgba(88, 166, 255, 0.2);
        color: var(--accent-secondary);
      }

      .tool-features {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
        margin-top: 1rem;
      }

      .feature-tag {
        background: rgba(88, 166, 255, 0.1);
        color: var(--accent-secondary);
        padding: 0.25rem 0.5rem;
        border-radius: 4px;
        font-size: 0.75rem;
      }

      .practices-container {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: 1.5rem;
        margin: 2rem 0;
      }

      .practice-category {
        background: var(--card-bg);
        border-radius: 8px;
        padding: 1.5rem;
        border: 1px solid rgba(88, 166, 255, 0.2);
      }

      .practice-list {
        list-style: none;
        padding: 0;
      }

      .practice-list li {
        padding: 0.5rem 0;
        border-bottom: 1px solid rgba(230, 237, 243, 0.1);
        position: relative;
        padding-left: 1.5rem;
      }

      .practice-list li:before {
        content: "✓";
        position: absolute;
        left: 0;
        color: var(--accent-secondary);
        font-weight: bold;
      }

      .security-benefits {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 1rem;
        margin: 1.5rem 0;
      }

      .benefit-item {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        background: rgba(88, 166, 255, 0.05);
        padding: 0.75rem;
        border-radius: 6px;
      }

      .framework-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: 1.5rem;
        margin: 1.5rem 0;
      }

      .framework-item {
        background: var(--card-bg);
        border-radius: 8px;
        padding: 1.5rem;
        border: 1px solid rgba(88, 166, 255, 0.2);
      }
    </style>
  `;
}

/**
 * Log OPSEC page access for security analytics
 */
async function logOpsecAccess(env, metadata) {
  if (!env.ANALYTICS_KV) return;

  const logEntry = {
    type: 'opsec_access',
    ...metadata
  };

  const logKey = `opsec_${Date.now()}_${Math.random().toString(36).slice(2, 11)}`;

  try {
    await env.ANALYTICS_KV.put(logKey, JSON.stringify(logEntry), {
      expirationTtl: 86400 * 90 // 90 days retention
    };
  } catch (error) {
    console.warn('OPSEC access logging failed:', error.message);
    throw error;
  }
}
