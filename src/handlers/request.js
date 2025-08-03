/**
 * Request Access Handler for AIQBrain
 * Implements operator qualification system per Brand Style Guide v2.0
 * Focuses on technical vetting and strategic partner identification
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
    "script-src 'self' 'unsafe-inline'",
    "connect-src 'self'"
  ].join('; ')
};

export async function requestHandler(request, env) {
  const url = new URL(request.url);

  // Log access request asynchronously without waiting
  logAccessRequest(env, {
    type: 'request_page_view',
    userAgent: request.headers.get('User-Agent'),
    referer: request.headers.get('Referer'),
    cfCountry: request.headers.get('CF-IPCountry'),
    cfRay: request.headers.get('CF-Ray'),
    params: Object.fromEntries(url.searchParams),
    timestamp: new Date().toISOString()
  }).catch(console.warn);

  // Pre-constructed HTML content with optimized structure
  const content = createAccessRequestContent();

  const response = new Response(baseTemplate(content, {
    page: 'request',
    title: 'System Access Application | AIQBrain',
    description: 'Apply for access to AIQBrain operator-grade monetization systems and frameworks.',
    additionalHead: getFormStyles()
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
 * Creates the access request form content with optimized HTML structure
 */
function createAccessRequestContent() {
  return `
    <div class="container page-container request-container">
      <!-- Neural pattern background -->
      <div class="neural-pattern" aria-hidden="true"></div>

      <!-- Header Section -->
      <header class="request-header">
        ${createAccessIndicator()}
        <h1 class="headline">System Access Application</h1>
        <p class="subheadline">
          AIQBrain monetization frameworks require operator-level implementation knowledge.
          Complete qualification review ensures optimal system performance and platform compliance.
        </p>
      </header>

      <!-- Qualification Requirements -->
      <section class="qualification-requirements">
        <h2 class="section-title">Access Requirements</h2>
        ${createRequirementsGrid()}
      </section>

      <!-- Application Form -->
      <section class="application-section">
        <div class="form-container">
          <h2 class="form-title">
            <span class="title-accent">Application Form</span>
            <span class="review-notice">Manual Review Required</span>
          </h2>

          <form class="aiq-form operator-application-form" method="POST" action="/api/request-access" id="accessRequestForm">
            ${createFormSections()}
          </form>
        </div>
      </section>

      <!-- Alternative Options -->
      <section class="alternative-access">
        <div class="alternative-container">
          <h2 class="section-title">Alternative Access Options</h2>
          ${createAlternativeOptions()}
        </div>
      </section>

      <!-- Legal and Privacy -->
      <section class="legal-section">
        ${createLegalNotice()}
      </section>
    </div>

    <!-- Enhanced Form Validation -->
    <script>
      ${getFormValidationScript()}
    </script>
  `;
}

/**
 * Creates the access indicator component
 */
function createAccessIndicator() {
  return `
    <div class="access-indicator exclusive">
      <span class="lock-icon" aria-hidden="true">🔒</span>
      <span class="access-level">Operator Access Request</span>
    </div>
  `;
}

/**
 * Creates the requirements grid
 */
function createRequirementsGrid() {
  const requirements = [
    { icon: '⚡', title: 'Technical Proficiency',
      desc: 'Experience with funnel implementation, conversion tracking, and traffic routing systems.' },
    { icon: '📊', title: 'Performance Focus',
      desc: 'Active monetization projects with measurable conversion metrics and optimization experience.' },
    { icon: '🛡️', title: 'Compliance Standards',
      desc: 'Commitment to platform TOS adherence and ethical implementation of AI monetization systems.' }
  ];

  return `
    <div class="requirements-grid">
      ${requirements.map(req => `
        <div class="requirement-item">
          <div class="requirement-icon" aria-hidden="true">${req.icon}</div>
          <h3>${req.title}</h3>
          <p>${req.desc}</p>
        </div>
      `).join('')}
    </div>
  `;
}

/**
 * Creates all form sections
 */
function createFormSections() {
  return [
    createBasicInfoSection(),
    createTechnicalExperienceSection(),
    createImplementationCapacitySection(),
    createStrategicFocusSection(),
    createComplianceSection(),
    createReferralSection(),
    createSubmitSection()
  ].join('');
}

/**
 * Creates basic information form section
 */
function createBasicInfoSection() {
  return `
    <div class="form-section">
      <h3 class="form-section-title">Operator Information</h3>
      <div class="form-row">
        <div class="form-group">
          <label for="name" class="form-label">
            Full Name <span class="required">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            autocomplete="name"
            class="form-control"
            placeholder="Professional name for access records"
          />
        </div>

        <div class="form-group">
          <label for="email" class="form-label">
            Primary Email <span class="required">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            autocomplete="email"
            class="form-control"
            placeholder="Primary contact for system access"
          />
        </div>
      </div>
    </div>
  `;
}

/**
 * Creates technical experience section
 */
function createTechnicalExperienceSection() {
  return `
    <div class="form-section">
      <h3 class="form-section-title">Technical Background</h3>

      <div class="form-group">
        <label for="experience_level" class="form-label">
          Monetization Experience <span class="required">*</span>
        </label>
        <select id="experience_level" name="experience_level" required class="form-control">
          <option value="">Select experience level</option>
          <option value="beginner">New to AI monetization (0-6 months)</option>
          <option value="intermediate">Some experience (6-18 months)</option>
          <option value="advanced">Experienced operator (18+ months)</option>
          <option value="expert">Expert/Agency level (3+ years)</option>
        </select>
      </div>

      <div class="form-group">
        <label for="current_methods" class="form-label">
          Current Monetization Methods <span class="required">*</span>
        </label>
        <textarea
          id="current_methods"
          name="current_methods"
          required
          rows="3"
          class="form-control"
          placeholder="Describe your current AI monetization approaches, traffic sources, and conversion systems"
        ></textarea>
      </div>
    </div>
  `;
}

/**
 * Creates implementation capacity section
 */
function createImplementationCapacitySection() {
  return `
    <div class="form-section">
      <h3 class="form-section-title">Implementation Capacity</h3>

      <div class="form-row">
        <div class="form-group">
          <label for="monthly_volume" class="form-label">
            Monthly Traffic Volume
          </label>
          <select id="monthly_volume" name="monthly_volume" class="form-control">
            <option value="">Select range</option>
            <option value="under_1k">Under 1,000 visitors</option>
            <option value="1k_5k">1,000 - 5,000 visitors</option>
            <option value="5k_25k">5,000 - 25,000 visitors</option>
            <option value="25k_plus">25,000+ visitors</option>
            <option value="confidential">Prefer not to disclose</option>
          </select>
        </div>

        <div class="form-group">
          <label for="time_commitment" class="form-label">
            Weekly Time Investment
          </label>
          <select id="time_commitment" name="time_commitment" class="form-control">
            <option value="">Select commitment level</option>
            <option value="part_time">5-10 hours/week</option>
            <option value="significant">10-20 hours/week</option>
            <option value="full_time">20+ hours/week</option>
            <option value="team_operation">Team-based operation</option>
          </select>
        </div>
      </div>
    </div>
  `;
}

/**
 * Creates strategic focus section
 */
function createStrategicFocusSection() {
  const goals = [
    { value: 'affiliate_cpa', label: 'CPA/Affiliate offer optimization' },
    { value: 'product_sales', label: 'Digital product sales systems' },
    { value: 'lead_generation', label: 'Lead generation and qualification' },
    { value: 'service_sales', label: 'Service-based monetization' },
    { value: 'scaling', label: 'Scaling existing operations' }
  ];

  return `
    <div class="form-section">
      <h3 class="form-section-title">Strategic Objectives</h3>

      <div class="form-group">
        <label class="form-label">
          Primary Monetization Goals <span class="required">*</span>
        </label>
        <div class="checkbox-group">
          ${goals.map(goal => `
            <label class="checkbox-item">
              <input type="checkbox" name="goals[]" value="${goal.value}">
              <span class="checkmark"></span>
              ${goal.label}
            </label>
          `).join('')}
        </div>
      </div>

      <div class="form-group">
        <label for="specific_interests" class="form-label">
          Specific System Interests
        </label>
        <textarea
          id="specific_interests"
          name="specific_interests"
          rows="3"
          class="form-control"
          placeholder="Which AIQBrain systems or frameworks are most relevant to your operation?"
        ></textarea>
      </div>
    </div>
  `;
}

/**
 * Creates compliance section
 */
function createComplianceSection() {
  const complianceItems = [
    { value: 'tos_adherence',
      text: 'I commit to implementing all systems within platform Terms of Service and applicable guidelines.' },
    { value: 'ethical_implementation',
      text: 'I agree to ethical implementation practices and will not engage in deceptive or fraudulent tactics.' },
    { value: 'update_compliance',
      text: 'I understand that access may be revoked for compliance violations or misuse of provided systems.' }
  ];

  return `
    <div class="form-section compliance-section">
      <h3 class="form-section-title">Compliance Agreement</h3>

      <div class="compliance-items">
        ${complianceItems.map(item => `
          <label class="checkbox-item compliance-item">
            <input type="checkbox" name="compliance[]" value="${item.value}" required>
            <span class="checkmark"></span>
            <span class="compliance-text">${item.text}</span>
          </label>
        `).join('')}
      </div>
    </div>
  `;
}

/**
 * Creates referral section
 */
function createReferralSection() {
  return `
    <div class="form-section">
      <h3 class="form-section-title">Referral Source</h3>

      <div class="form-group">
        <label for="referral_source" class="form-label">
          How did you discover AIQBrain?
        </label>
        <select id="referral_source" name="referral_source" class="form-control">
          <option value="">Select source</option>
          <option value="direct_search">Direct search/research</option>
          <option value="referral">Referral from operator</option>
          <option value="community">AI/monetization community</option>
          <option value="content">Educational content/case study</option>
          <option value="partnership">Strategic partnership</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div class="form-group">
        <label for="referral_details" class="form-label">
          Additional Context
        </label>
        <textarea
          id="referral_details"
          name="referral_details"
          rows="2"
          class="form-control"
          placeholder="Any additional context about your interest in AIQBrain systems (optional)"
        ></textarea>
      </div>
    </div>
  `;
}

/**
 * Creates form submit section
 */
function createSubmitSection() {
  return `
    <div class="form-submit-section">
      <button type="submit" class="btn btn-primary btn-lg cta-button" id="submitButton">
        <span class="button-text">Submit Application</span>
        <span class="button-loader" style="display: none;">Processing...</span>
      </button>

      <div class="form-notes">
        <p><strong>Review Process:</strong> Applications are manually reviewed within 48-72 hours.
        Qualified operators receive access credentials and implementation guidance.</p>
        <p><strong>Selection Criteria:</strong> Priority given to experienced operators with
        demonstrated monetization track records and compliance commitment.</p>
      </div>
    </div>
  `;
}

/**
 * Creates alternative access options
 */
function createAlternativeOptions() {
  const options = [
    { title: 'Framework Preview',
      desc: 'Review system documentation and implementation guides before applying for full access.',
      link: '/vault',
      btnText: 'Preview Systems' },
    { title: 'Partnership Inquiry',
      desc: 'Strategic partnerships and white-label opportunities for qualified agencies and operators.',
      link: '/contact',
      btnText: 'Partnership Discussion' }
  ];

  return `
    <div class="access-options">
      ${options.map(opt => `
        <div class="access-option">
          <h3>${opt.title}</h3>
          <p>${opt.desc}</p>
          <a href="${opt.link}" class="btn btn-secondary">${opt.btnText}</a>
        </div>
      `).join('')}
    </div>
  `;
}

/**
 * Creates legal notice section
 */
function createLegalNotice() {
  return `
    <div class="privacy-notice">
      <h3>Privacy & Data Handling</h3>
      <p>
        All application data is encrypted and used solely for qualification review and onboarding processes.
        We implement enterprise-grade security measures and comply with applicable privacy regulations.
      </p>
      <div class="legal-links">
        <a href="/privacy">Privacy Policy</a> |
        <a href="/terms">Terms of Service</a> |
        <a href="/compliance">Compliance Documentation</a>
      </div>
    </div>
  `;
}

/**
 * Returns the form validation script
 */
function getFormValidationScript() {
  return `
    document.addEventListener('DOMContentLoaded', function() {
      const form = document.getElementById('accessRequestForm');
      const submitButton = document.getElementById('submitButton');
      const buttonText = submitButton.querySelector('.button-text');
      const buttonLoader = submitButton.querySelector('.button-loader');

      form.addEventListener('submit', async function(e) {
        e.preventDefault();

        // Validate compliance checkboxes
        const complianceBoxes = Array.from(form.querySelectorAll('input[name="compliance[]"]'));
        if (complianceBoxes.some(box => !box.checked)) {
          alert('Please acknowledge all compliance requirements before submitting.');
          return;
        }

        // Validate at least one goal is selected
        const goalBoxes = Array.from(form.querySelectorAll('input[name="goals[]"]'));
        if (goalBoxes.every(box => !box.checked)) {
          alert('Please select at least one primary monetization goal.');
          return;
        }

        // Validate required fields
        const requiredFields = Array.from(form.querySelectorAll('[required]'));
        const invalidFields = requiredFields.filter(field => !field.value.trim());

        if (invalidFields.length > 0) {
          invalidFields.forEach(field => field.classList.add('error'));
          alert('Please complete all required fields.');
          return;
        }

        // Submit form
        submitButton.disabled = true;
        buttonText.style.display = 'none';
        buttonLoader.style.display = 'inline';

        try {
          const response = await fetch('/api/request-access', {
            method: 'POST',
            body: new FormData(form)
          });

          const data = await response.json();

          if (data.success) {
            window.location.href = '/request-submitted';
          } else {
            throw new Error(data.message || 'Submission failed');
          }
        } catch (error) {
          alert('Submission error: ' + error.message);
        } finally {
          submitButton.disabled = false;
          buttonText.style.display = 'inline';
          buttonLoader.style.display = 'none';
        }
      });

      // Real-time validation feedback
      form.querySelectorAll('[required]').forEach(field => {
        field.addEventListener('blur', function() {
          this.classList.toggle('error', this.value.trim() === '');
        });
      });
    });
  `;
}

/**
 * Returns the form styles
 */
function getFormStyles() {
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

      .form-control.error {
        border-color: #f85149;
        box-shadow: 0 0 0 3px rgba(248, 81, 73, 0.2);
      }

      .button-loader {
        display: inline-block;
        width: 1rem;
        height: 1rem;
        border: 2px solid transparent;
        border-top: 2px solid currentColor;
        border-radius: 50%;
        animation: spin 1s linear infinite;
      }

      @keyframes spin {
        to { transform: rotate(360deg); }
      }

      .requirements-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: 1.5rem;
        margin: 1.5rem 0;
      }

      .requirement-item {
        background: var(--card-bg);
        border-radius: 8px;
        padding: 1.5rem;
        border: 1px solid rgba(88, 166, 255, 0.2);
      }

      .requirement-icon {
        font-size: 2rem;
        margin-bottom: 1rem;
      }

      .compliance-section {
        background: rgba(249, 199, 79, 0.05);
        border-radius: 8px;
        padding: 1.5rem;
        border: 1px solid rgba(249, 199, 79, 0.2);
      }

      .checkbox-group {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
      }

      .checkbox-item {
        display: flex;
        align-items: flex-start;
        gap: 0.75rem;
        cursor: pointer;
      }

      .checkbox-item input[type="checkbox"] {
        margin: 0;
        width: 1.25rem;
        height: 1.25rem;
        accent-color: var(--accent-primary);
      }

      .access-options {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 1.5rem;
        margin-top: 1.5rem;
      }

      .access-option {
        background: var(--card-bg);
        border-radius: 8px;
        padding: 1.5rem;
        border: 1px solid rgba(88, 166, 255, 0.2);
        text-align: center;
      }
    </style>
  `;
}

/**
 * Log access request for qualification analysis
 */
async function logAccessRequest(env, metadata) {
  if (!env.ANALYTICS_KV) return;

  const logEntry = {
    type: 'access_request_view',
    ...metadata
  };

  const logKey = `access_${Date.now()}_${Math.random().toString(36).slice(2, 11)}`;

  try {
    await env.ANALYTICS_KV.put(logKey, JSON.stringify(logEntry), {
      expirationTtl: 86400 * 60 // 60 days retention
    });
  } catch (error) {
    console.warn('Access request logging failed:', error.message);
    throw error; // Re-throw for caller to handle
  }
}
