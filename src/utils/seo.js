/**
 * SEO utilities for AIQBrain
 * Manages page metadata, robots directives, and canonical URLs
 */
export function getSeoTags(page) {
  const baseTags = {
    title: 'AIQBrain | Claude-Centric Monetization Systems for Discerning Operators',
    description: 'Transform Claude expertise into sustainable revenue streams with AIQBrain\'s battle-tested, TOS-compliant monetization frameworks.',
    robots: 'index, follow',
    canonical: 'https://aiqbrain.com/'
  };
  
  const pageTags = {
    'home': {
      title: 'AIQBrain | Claude-Centric Monetization Systems for Discerning Operators',
      description: 'Transform Claude expertise into sustainable revenue streams with AIQBrain\'s battle-tested, TOS-compliant monetization frameworks.',
      robots: 'index, follow',
      canonical: 'https://aiqbrain.com/'
    },
    'vault': {
      title: 'AIQBrain Vault | Premium Claude Monetization Systems',
      description: 'Access our vault of proven, compliant Claude monetization systems that deliver reliable revenue while maintaining full platform compliance.',
      robots: 'noindex, nofollow', // Keep the vault private
      canonical: 'https://aiqbrain.com/vault'
    },
    'strategy': {
      title: 'AIQBrain Strategy Hub | Claude Monetization Frameworks',
      description: 'Discover strategic Claude-based monetization frameworks designed for sophisticated AI operators seeking optimized conversion systems.',
      robots: 'noindex, nofollow', // Protect strategy content
      canonical: 'https://aiqbrain.com/strategy'
    },
    'strategy-weekend': {
      title: 'Weekend Special | AIQBrain Strategy Hub',
      description: 'Limited-time access to premium Claude monetization frameworks with exclusive weekend bonuses.',
      robots: 'noindex, nofollow',
      canonical: 'https://aiqbrain.com/strategy'
    },
    'lab': {
      title: 'AIQBrain Monetization Lab | Implementation Tools',
      description: 'Access our implementation tools, template library, and integration guides for Claude-based monetization systems.',
      robots: 'noindex, nofollow',
      canonical: 'https://aiqbrain.com/lab'
    },
    'results': {
      title: 'AIQBrain Results Dashboard | Proof & Verification',
      description: 'View anonymized metrics, conversion data, and ROI calculators for our Claude monetization systems.',
      robots: 'noindex, nofollow',
      canonical: 'https://aiqbrain.com/results'
    },
    'request': {
      title: 'Request Access | AIQBrain Premium Systems',
      description: 'Apply for access to AIQBrain\'s exclusive Claude monetization systems and frameworks.',
      robots: 'noindex, nofollow',
      canonical: 'https://aiqbrain.com/request'
    },
    'high-intent': {
      title: 'Special Access | AIQBrain Premium Systems',
      description: 'Limited-time special access opportunity for AIQBrain\'s exclusive Claude monetization systems.',
      robots: 'noindex, nofollow',
      canonical: 'https://aiqbrain.com/'
    },
    'mobile': {
      title: 'AIQBrain | Claude Monetization Systems (Mobile)',
      description: 'Optimized mobile experience for AIQBrain\'s Claude-centric monetization systems.',
      robots: 'noindex, nofollow',
      canonical: 'https://aiqbrain.com/'
    },
    'ops': {
      title: 'AIQBrain OPSEC Resources | Security & Compliance',
      description: 'Security guidelines, best practices, and risk mitigation for Claude-based monetization systems.',
      robots: 'noindex, nofollow',
      canonical: 'https://aiqbrain.com/ops'
    },
    'privacy': {
      title: 'Privacy Policy | AIQBrain',
      description: 'AIQBrain\'s privacy policy explaining how we collect, use, and protect your information.',
      robots: 'index, follow',
      canonical: 'https://aiqbrain.com/privacy'
    },
    'terms': {
      title: 'Terms of Service | AIQBrain',
      description: 'AIQBrain\'s terms of service and user agreement.',
      robots: 'index, follow',
      canonical: 'https://aiqbrain.com/terms'
    },
    'compliance': {
      title: 'Compliance | AIQBrain',
      description: 'AIQBrain\'s platform guideline adherence and compliance policies.',
      robots: 'index, follow',
      canonical: 'https://aiqbrain.com/compliance'
    },
    'contact': {
      title: 'Contact | AIQBrain',
      description: 'Contact AIQBrain for support or inquiries about our Claude monetization systems.',
      robots: 'index, follow',
      canonical: 'https://aiqbrain.com/contact'
    },
    'faq': {
      title: 'Frequently Asked Questions | AIQBrain',
      description: 'Answers to common questions about AIQBrain\'s Claude monetization systems and frameworks.',
      robots: 'index, follow',
      canonical: 'https://aiqbrain.com/faq'
    }
  };
  
  return pageTags[page] || baseTags;
}
