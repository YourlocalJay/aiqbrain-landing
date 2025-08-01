const fs = require('fs');
const path = require('path');

// List of all missing handlers
const missingHandlers = [
  { path: 'handlers/strategy.js', exportName: 'strategyHandler' },
  { path: 'handlers/strategy-weekend.js', exportName: 'strategyWeekendHandler' },
  { path: 'handlers/lab.js', exportName: 'labHandler' },
  { path: 'handlers/results.js', exportName: 'resultsHandler' },
  { path: 'handlers/request.js', exportName: 'requestHandler' },
  { path: 'handlers/high-intent.js', exportName: 'highIntentHandler' },
  { path: 'handlers/mobile-home.js', exportName: 'mobileHomeHandler' },
  { path: 'handlers/opsec.js', exportName: 'opsecHandler' },
  { path: 'handlers/legal/privacy.js', exportName: 'privacyHandler' },
  { path: 'handlers/legal/terms.js', exportName: 'termsHandler' },
  { path: 'handlers/legal/compliance.js', exportName: 'complianceHandler' },
  { path: 'handlers/contact.js', exportName: 'contactHandler' },
  { path: 'handlers/faq.js', exportName: 'faqHandler' },
];

// Template for handler files
const createHandlerContent = (name, path) => `/**
 * ${name.replace('Handler', '')} page handler for AIQBrain
 * Placeholder handler for ${path}
 */
import { baseTemplate } from '../templates/base.js';
import { getOwnershipStatement } from '../components/legal.js';

export async function ${name}(request, env) {
  const content = \`
    <div class="container page-container">
      <h1>${name.replace('Handler', '')} Page</h1>
      <p>This is a placeholder for the ${name.replace('Handler', '')} page. Implementation coming soon.</p>

      <div class="cta-container">
        <a href="/" class="btn btn-primary">Return Home</a>
      </div>

      ${getOwnershipStatement ? '${getOwnershipStatement()}' : '<!-- Ownership statement placeholder -->'}
    </div>
  \`;

  return new Response(baseTemplate(content, { page: '${path.split('/').pop().replace('.js', '')}' }), {
    headers: {
      'Content-Type': 'text/html'
    }
  });
}
`;

// Special template for legal pages
const createLegalHandlerContent = (name, path) => `/**
 * ${name.replace('Handler', '')} page handler for AIQBrain
 * Placeholder handler for ${path}
 */
import { baseTemplate } from '../../templates/base.js';

export async function ${name}(request, env) {
  const content = \`
    <div class="container legal-container">
      <h1>${name.replace('Handler', '').toUpperCase()} Policy</h1>
      <p>This is a placeholder for the ${name.replace('Handler', '')} policy page. Legal content coming soon.</p>

      <div class="cta-container">
        <a href="/" class="btn btn-secondary">Return Home</a>
      </div>
    </div>
  \`;

  return new Response(baseTemplate(content, {
    page: 'legal',
    title: '${name.replace('Handler', '')} Policy | AIQBrain',
    description: 'AIQBrain ${name.replace('Handler', '')} Policy and legal information.'
  }), {
    headers: {
      'Content-Type': 'text/html'
    }
  });
}
`;

// Create the handler files
missingHandlers.forEach(({ path: handlerPath, exportName }) => {
  const fullPath = `src/${handlerPath}`;
  const dirPath = fullPath.substring(0, fullPath.lastIndexOf('/'));

  // Create directory if it doesn't exist
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`Created directory: ${dirPath}`);
  }

  // Create the handler file
  const isLegalHandler = handlerPath.includes('legal/');
  const content = isLegalHandler
    ? createLegalHandlerContent(exportName, handlerPath)
    : createHandlerContent(exportName, handlerPath);

  fs.writeFileSync(fullPath, content);
  console.log(`Created handler: ${fullPath}`);
});

console.log('All missing handlers created successfully!');
