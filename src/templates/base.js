/**
 * Base HTML template for AIQBrain
 * Provides the foundation for all pages with proper SEO and analytics
 */
import { getSeoTags } from '../utils/seo.js';
import { getFooterLegal } from '../components/legal.js';

export function baseTemplate(content, options = {}) {
  const page = options.page || 'home';
  const seoTags = getSeoTags(page);
  
  const title = options.title || seoTags.title;
  const description = options.description || seoTags.description;
  const canonical = seoTags.canonical;
  const robots = seoTags.robots;
  
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  
  <!-- Google Tag Manager -->
  <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
  'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
  })(window,document,'script','dataLayer','GTM-MLJCSX2P');</script>
  <!-- End Google Tag Manager -->
  
  <title>${title}</title>
  <meta name="description" content="${description}">
  <link rel="canonical" href="${canonical}">
  <meta name="robots" content="${robots}">
  
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Inter+Tight:wght@400;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/assets/css/main.css">
  <link rel="icon" href="/assets/images/favicon.ico">
  
  <!-- Plausible Analytics - Privacy Focused -->
  <script defer data-domain="aiqbrain.com" src="https://plausible.io/js/script.js"></script>
  
  <!-- Custom Events Tracking -->
  <script>
    window.plausible = window.plausible || function() { (window.plausible.q = window.plausible.q || []).push(arguments) }
  </script>
  
  <!-- Accessibility Skip Link -->
  <style>
    .skip-to-content {
      position: absolute;
      left: -9999px;
      top: auto;
      width: 1px;
      height: 1px;
      overflow: hidden;
    }
    .skip-to-content:focus {
      position: fixed;
      top: 0;
      left: 0;
      width: auto;
      height: auto;
      padding: 0.5rem 1rem;
      background: var(--accent-primary);
      color: var(--background);
      z-index: 9999;
    }
  </style>
</head>
<body class="bg-deep-slate text-light-steel">
  <!-- Google Tag Manager (noscript) -->
  <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-MLJCSX2P"
  height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
  <!-- End Google Tag Manager (noscript) -->
  
  <a href="#main" class="skip-to-content">Skip to content</a>
  
  <main id="main">
    ${content}
  </main>
  
  ${getFooterLegal()}
  
  <script src="/assets/js/main.js"></script>
  ${options.extraScripts || ''}
</body>
</html>`;
}
