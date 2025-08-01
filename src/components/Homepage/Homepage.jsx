import { useState, useEffect, useCallback } from 'react';
import Head from 'next/head';
import FingerprintJS from '@fingerprintjs/fingerprintjs';

const Homepage = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [fingerprint, setFingerprint] = useState(null);
  const [geoData, setGeoData] = useState(null);
  const [qualificationScore, setQualificationScore] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Enhanced scroll tracking with throttling
  const handleScroll = useCallback(() => {
    const scrollThreshold = document.documentElement.scrollHeight * 0.4;
    setIsScrolled(window.scrollY > scrollThreshold);
  }, []);

  // Comprehensive visitor fingerprinting
  const generateFingerprint = useCallback(async () => {
    try {
      // Initialize FingerprintJS Pro (replace with your actual public key)
      const fp = await FingerprintJS.load({ apiKey: 'your_fpjs_public_key' });
      const { visitorId, confidence } = await fp.get();
      
      setFingerprint({
        visitorId,
        confidence: Math.round(confidence.score * 100)
      });

      // Basic qualification scoring
      let score = 0;
      
      // Device scoring
      const isMobile = window.innerWidth < 768;
      const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;
      score += isMobile ? 1 : isTablet ? 2 : 3;

      // Browser scoring
      const userAgent = navigator.userAgent;
      if (!/bot|crawler|spider|headless/i.test(userAgent)) score += 2;

      setQualificationScore(score);
      setIsLoading(false);
    } catch (error) {
      console.error('Fingerprinting error:', error);
      setQualificationScore(1); // Fallback score
      setIsLoading(false);
    }
  }, []);

  // Geo-location detection
  const fetchGeoData = useCallback(async () => {
    try {
      const response = await fetch('https://ipapi.co/json/');
      const data = await response.json();
      setGeoData({
        country: data.country_name,
        region: data.region,
        city: data.city,
        timezone: data.timezone,
        isEU: Boolean(data.in_eu)
      });

      // Add geo-based scoring
      setQualificationScore(prev => {
        const targetCountries = ['United States', 'Canada', 'United Kingdom', 'Germany', 'Australia'];
        return prev + (targetCountries.includes(data.country_name) ? 2 : 1;
      });
    } catch (error) {
      console.error('Geo detection error:', error);
    }
  }, []);

  // Initialize tracking
  useEffect(() => {
    generateFingerprint();
    fetchGeoData();
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Track initial page view
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'pageView',
      pagePath: window.location.pathname,
      visitorType: fingerprint ? 'returning' : 'new',
      qualificationScore
    });

    return () => window.removeEventListener('scroll', handleScroll);
  }, [generateFingerprint, fetchGeoData, handleScroll, fingerprint, qualificationScore]);

  // Dynamic CTA based on qualification score
  const renderPrimaryCTA = () => {
    if (qualificationScore >= 5) {
      return (
        <a 
          href="/vault" 
          className="cta-premium bg-gradient-to-r from-[#ff7b72] to-[#ff4d4d] hover:shadow-[0_0_15px_rgba(255,123,114,0.6)]"
        >
          Unlock Premium Vault
        </a>
      );
    }
    return (
      <a 
        href="/strategy" 
        className="cta-basic bg-[#58a6ff] hover:bg-[#3d8eff] hover:shadow-[0_0_15px_rgba(88,166,255,0.4)]"
      >
        Explore Strategies
      </a>
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0e12]">
        <div className="loader animate-spin rounded-full border-t-2 border-b-2 border-[#ff7b72] h-12 w-12"></div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>AIQBrain | Claude-Centric Monetization Systems</title>
        <meta name="description" content="Advanced monetization frameworks for Claude operators with premium traffic routing and conversion optimization systems" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <link rel="preconnect" href="https://fpjs.io" />
        <link rel="preconnect" href="https://ipapi.co" />
      </Head>

      <div className="bg-[#0a0e12] min-h-screen text-[#e6edf3] relative overflow-x-hidden">
        {/* Neural network background pattern */}
        <div className="fixed inset-0 opacity-[0.03] pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIHZpZXdCb3g9IjAgMCA1MCA1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBzdHJva2U9IiM1OGE2ZmYiIHN0cm9rZS13aWR0aD0iMC41Ij48Y2lyY2xlIGN4PSIyNSIgY3k9IjI1IiByPSIxLjUiLz48Y2lyY2xlIGN4PSIxMCIgY3k9IjEwIiByPSIxLjUiLz48Y2lyY2xlIGN4PSI0MCIgY3k9IjEwIiByPSIxLjUiLz48Y2lyY2xlIGN4PSIxMCIgY3k9IjQwIiByPSIxLjUiLz48Y2lyY2xlIGN4PSI0MCIgY3k9IjQwIiByPSIxLjUiLz48bGluZSB4MT0iMjUiIHkxPSIyNSIgeDI9IjEwIiB5Mj0iMTAiLz48bGluZSB4MT0iMjUiIHkxPSIyNSIgeDI9IjQwIiB5Mj0iMTAiLz48bGluZSB4MT0iMjUiIHkxPSIyNSIgeDI9IjEwIiB5Mj0iNDAiLz48bGluZSB4MT0iMjUiIHkxPSIyNSIgeDI9IjQwIiB5Mj0iNDAiLz48L2c+PC9zdmc+')] bg-[length:50px_50px]"></div>
        
        {/* Header with auth check */}
        <header className="container mx-auto py-6 px-4 flex justify-between items-center relative z-10">
          <div className="flex items-center">
            <div className="w-8 h-8 mr-2 bg-[#ff7b72] rounded-md flex items-center justify-center">
              <span className="font-bold text-[#0a0e12]">AQ</span>
            </div>
            <h1 className="text-xl font-bold font-['Space_Mono']">AIQBrain</h1>
          </div>
          
          <nav className="hidden md:block">
            <ul className="flex space-x-6">
              <li><a href="/vault" className="nav-link hover:text-[#ff7b72]">Vault</a></li>
              <li><a href="/strategy" className="nav-link hover:text-[#ff7b72]">Strategy</a></li>
              <li><a href="/results" className="nav-link hover:text-[#ff7b72]">Results</a></li>
              <li>
                <a href="/request" className="nav-cta bg-[#ff7b72] hover:shadow-[0_0_12px_rgba(255,123,114,0.5)]">
                  Request Access
                </a>
              </li>
            </ul>
          </nav>
          
          <button className="md:hidden text-[#e6edf3]">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </header>

        <main>
          {/* Hero Section */}
          <section className="container mx-auto px-4 py-16 md:py-24 relative z-10">
            <div className="max-w-3xl">
              <h1 className="font-['Space_Mono'] font-bold text-4xl md:text-5xl leading-tight mb-6">
                <span className="text-gradient bg-clip-text text-transparent bg-gradient-to-r from-[#ff7b72] to-[#ff4d4d]">
                  Claude Monetization Systems
                </span> for Strategic Operators
              </h1>
              <p className="text-lg mb-8 text-[#e6edf3]/90">
                Advanced traffic routing and conversion frameworks that leverage Claude's capabilities while maintaining strict platform compliance and long-term viability.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                {renderPrimaryCTA()}
                <a 
                  href="/request" 
                  className="cta-secondary border border-[#58a6ff] text-[#58a6ff] hover:bg-[rgba(88,166,255,0.1)]"
                >
                  Request Access
                </a>
              </div>
              
              {/* Trust indicators */}
              <div className="mt-12 flex flex-wrap items-center gap-6 text-sm text-[#e6edf3]/70">
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-2 text-[#58a6ff]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                  </svg>
                  <span>100% Platform Compliant</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-2 text-[#58a6ff]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd"></path>
                  </svg>
                  <span>18-37% Conversion Uplift</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-2 text-[#58a6ff]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"></path>
                  </svg>
                  <span>Application-Only Access</span>
                </div>
              </div>
            </div>
          </section>

          {/* Dynamic Content Section */}
          <section className="bg-gradient-to-b from-[#121820] to-[#0a0e12] py-16">
            <div className="container mx-auto px-4">
              <h2 className="font-['Space_Mono'] font-bold text-3xl mb-12 text-center">
                {qualificationScore >= 5 ? 
                  "You Qualify For Advanced Systems" : 
                  "Core Monetization Frameworks"}
              </h2>
              
              <div className="grid md:grid-cols-3 gap-8">
                {/* Dynamic card based on qualification */}
                {qualificationScore >= 5 ? (
                  <>
                    <SystemCard 
                      title="Premium Routing" 
                      description="Advanced multi-signal traffic routing with machine learning optimization" 
                      stat="31%"
                      statLabel="ROI Increase"
                      color="from-[#ff7b72] to-[#ff4d4d]"
                    />
                    <SystemCard 
                      title="Geo-Targeted Offers" 
                      description="Automated geo-specific offer presentation with dynamic fallbacks" 
                      stat="42%"
                      statLabel="Conversion Boost"
                      color="from-[#58a6ff] to-[#3d8eff]"
                    />
                    <SystemCard 
                      title="Elite Compliance" 
                      description="Enterprise-level compliance architecture with automated audits" 
                      stat="100%"
                      statLabel="Platform Safety"
                      color="from-[#2ea043] to-[#238636]"
                    />
                  </>
                ) : (
                  <>
                    <SystemCard 
                      title="Basic Routing" 
                      description="Essential traffic qualification and routing fundamentals" 
                      stat="18%"
                      statLabel="Avg. Uplift"
                      color="from-[#58a6ff] to-[#3d8eff]"
                    />
                    <SystemCard 
                      title="Core Frameworks" 
                      description="Proven monetization architectures with compliance guardrails" 
                      stat="23%"
                      statLabel="CR Increase"
                      color="from-[#58a6ff] to-[#3d8eff]"
                    />
                    <SystemCard 
                      title="Analytics Suite" 
                      description="Conversion tracking and optimization diagnostics" 
                      stat="27%"
                      statLabel="CPA Reduction"
                      color="from-[#58a6ff] to-[#3d8eff]"
                    />
                  </>
                )}
              </div>
            </div>
          </section>

          {/* Results Section */}
          <ResultsSection qualificationScore={qualificationScore} />
          
          {/* Access CTA */}
          <section className="bg-gradient-to-r from-[#121820] to-[#0d1117] py-16 border-y border-[rgba(88,166,255,0.1)]">
            <div className="container mx-auto px-4 text-center">
              <h2 className="font-['Space_Mono'] font-bold text-3xl mb-4">
                {qualificationScore >= 7 ? 
                  "You Pre-Qualify For Elite Access" : 
                  "Request System Access"}
              </h2>
              <p className="max-w-2xl mx-auto mb-8">
                AIQBrain maintains strict access controls to ensure community quality and system integrity.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="/request" 
                  className="cta-premium bg-gradient-to-r from-[#ff7b72] to-[#ff4d4d] hover:shadow-[0_0_15px_rgba(255,123,114,0.6)]"
                >
                  {qualificationScore >= 7 ? "Fast-Track Application" : "Begin Application"}
                </a>
                {qualificationScore >= 5 && (
                  <a 
                    href="/vault-preview" 
                    className="cta-secondary border border-[#58a6ff] text-[#58a6ff] hover:bg-[rgba(88,166,255,0.1)]"
                  >
                    Preview Vault Contents
                  </a>
                )}
              </div>
              {qualificationScore >= 5 && (
                <div className="mt-6 text-sm text-[#58a6ff] flex items-center justify-center">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                  </svg>
                  <span>Your qualification score: {qualificationScore}/10</span>
                </div>
              )}
            </div>
          </section>
        </main>

        {/* Sticky CTA */}
        <StickyCTA isScrolled={isScrolled} qualificationScore={qualificationScore} />
        
        {/* Footer */}
        <Footer />
      </div>
    </>
  );
};

// Component for system cards
const SystemCard = ({ title, description, stat, statLabel, color }) => (
  <div className={`bg-gradient-to-br ${color}/10 to-transparent rounded-lg p-6 border border-[rgba(88,166,255,0.1)] hover:border-[rgba(88,166,255,0.3)] transition-all duration-300 hover:translate-y-[-4px]`}>
    <h3 className={`text-xl font-['Space_Mono'] font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r ${color}`}>
      {title}
    </h3>
    <p className="mb-4 text-[#e6edf3]/80">{description}</p>
    <div className="flex items-center">
      <span className={`text-2xl font-bold mr-2 bg-clip-text text-transparent bg-gradient-to-r ${color}`}>{stat}</span>
      <span className="text-sm text-[#e6edf3]/60">{statLabel}</span>
    </div>
  </div>
);

// Results section component
const ResultsSection = ({ qualificationScore }) => (
  <section className="container mx-auto px-4 py-16">
    <div className="flex flex-col md:flex-row gap-12 items-center">
      <div className="md:w-1/2">
        <h2 className="font-['Space_Mono'] font-bold text-3xl mb-6">
          {qualificationScore >= 5 ? 
            "Operator-Grade Performance Metrics" : 
            "Proven Monetization Results"}
        </h2>
        <p className="mb-6">
          AIQBrain systems are designed for experienced operators who understand that sustainable monetization requires both strategic architecture and tactical execution.
        </p>
        <ul className="space-y-4">
          <ResultItem text="Multi-signal traffic qualification (device, geo, behavior)" />
          <ResultItem text="Automated compliance checks and risk mitigation" />
          <ResultItem text="Dynamic offer presentation based on real-time signals" />
          {qualificationScore >= 5 && (
            <ResultItem text="Premium: Machine learning optimization of routing paths" />
          )}
        </ul>
        <div className="mt-8">
          <a href="/results" className="text-[#58a6ff] font-semibold flex items-center group">
            View detailed case studies
            <svg className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" fill="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </a>
        </div>
      </div>
      <div className="md:w-1/2 bg-[#121820] p-6 rounded-lg border border-[rgba(88,166,255,0.2)]">
        <ConversionFunnel qualificationScore={qualificationScore} />
      </div>
    </div>
  </section>
);

// Result item component
const ResultItem = ({ text }) => (
  <li className="flex items-start">
    <svg className="w-5 h-5 text-[#ff7b72] mr-2 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
    </svg>
    <span>{text}</span>
  </li>
);

// Conversion funnel component
const ConversionFunnel = ({ qualificationScore }) => {
  const funnelData = qualificationScore >= 5 ? 
    [100, 88, 72, 55, 42] : 
    [100, 75, 50, 30, 18];
  
  const labels = ['Traffic', 'Qualified', 'Routed', 'Engaged', 'Converted'];
  
  return (
    <div className="relative h-[300px] flex flex-col justify-between">
      {funnelData.map((value, index) => (
        <div key={index}>
          <div 
            className={`w-full h-16 ${index === funnelData.length - 1 ? 
              'bg-gradient-to-r from-[#ff7b72] to-[#ff4d4d] rounded-b-lg' : 
              'bg-[rgba(88,166,255,0.1)]'} flex items-center justify-center relative`}
            style={{ width: `${value}%` }}
          >
            <span className="font-['Space_Mono'] font-bold text-sm">
              {labels[index]}
            </span>
            <span className="absolute right-3 text-[#e6edf3] font-bold">
              {value}%
            </span>
          </div>
          {index < funnelData.length - 1 && (
            <svg className="w-8 h-8 text-[rgba(88,166,255,0.3)] mx-auto" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v10.586l3.293-3.293a1 1 0 111.414 1.414l-5 5a1 1 0 01-1.414 0l-5-5a1 1 0 111.414-1.414L9 14.586V4a1 1 0 011-1z" clipRule="evenodd"></path>
            </svg>
          )}
        </div>
      ))}
    </div>
  );
};

// Sticky CTA component
const StickyCTA = ({ isScrolled, qualificationScore }) => (
  <div className={`fixed bottom-0 left-0 right-0 bg-[#0a0e12] border-t border-[rgba(88,166,255,0.2)] p-4 transition-transform duration-300 z-50 ${isScrolled ? 'translate-y-0' : 'translate-y-full'}`}>
    <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
      <div>
        <h3 className="font-['Space_Mono'] font-bold text-lg">
          {qualificationScore >= 5 ? 
            "You Qualify For Advanced Access" : 
            "Ready To Improve Your Monetization?"}
        </h3>
        <p className="text-[rgba(230,237,243,0.8)]">
          {qualificationScore >= 5 ? 
            "Begin your fast-track application now" : 
            "Request access to AIQBrain systems"}
        </p>
      </div>
      <a 
        href="/request" 
        className={`px-6 py-3 rounded font-semibold transition duration-200 whitespace-nowrap ${
          qualificationScore >= 5 ? 
            'bg-gradient-to-r from-[#ff7b72] to-[#ff4d4d] hover:shadow-[0_0_12px_rgba(255,123,114,0.5)]' : 
            'bg-[#58a6ff] hover:bg-[#3d8eff] hover:shadow-[0_0_12px_rgba(88,166,255,0.4)]'
        }`}
      >
        {qualificationScore >= 5 ? 'Fast-Track Application' : 'Request Access'}
      </a>
    </div>
  </div>
);

// Footer component
const Footer = () => (
  <footer className="bg-[#0a0e12] border-t border-[rgba(88,166,255,0.1)] py-12">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center mb-4">
            <div className="w-6 h-6 mr-2 bg-[#ff7b72] rounded-md flex items-center justify-center">
              <span className="font-bold text-[#0a0e12] text-xs">AQ</span>
            </div>
            <span className="font-['Space_Mono']">AIQBrain</span>
          </div>
          <p className="text-sm text-[rgba(230,237,243,0.6)]">
            Advanced monetization systems for Claude operators.
          </p>
        </div>
        
        <div>
          <h4 className="font-['Space_Mono'] font-bold text-sm mb-4">SYSTEMS</h4>
          <ul className="space-y-2">
            <li><a href="/vault" className="footer-link">Vault Access</a></li>
            <li><a href="/strategy" className="footer-link">Core Frameworks</a></li>
            <li><a href="/routing" className="footer-link">Traffic Routing</a></li>
            <li><a href="/analytics" className="footer-link">Performance Analytics</a></li>
          </ul>
        </div>
        
        <div>
          <h4 className="font-['Space_Mono'] font-bold text-sm mb-4">RESOURCES</h4>
          <ul className="space-y-2">
            <li><a href="/compliance" className="footer-link">Compliance Guide</a></li>
            <li><a href="/case-studies" className="footer-link">Case Studies</a></li>
            <li><a href="/faq" className="footer-link">Operator FAQ</a></li>
            <li><a href="/updates" className="footer-link">System Updates</a></li>
          </ul>
        </div>
        
        <div>
          <h4 className="font-['Space_Mono'] font-bold text-sm mb-4">LEGAL</h4>
          <ul className="space-y-2">
            <li><a href="/terms" className="footer-link">Terms of Service</a></li>
            <li><a href="/privacy" className="footer-link">Privacy Policy</a></li>
            <li><a href="/disclaimer" className="footer-link">Disclaimer</a></li>
            <li><a href="/contact" className="footer-link">Contact</a></li>
          </ul>
        </div>
      </div>
      
      <div className="mt-12 pt-6 border-t border-[rgba(88,166,255,0.1)] text-center text-xs text-[rgba(230,237,243,0.5)]">
        <p>© {new Date().getFullYear()} AIQBrain. All rights reserved.</p>
        <p className="mt-2">Not affiliated with Anthropic, OpenAI, or other mentioned platforms.</p>
      </div>
    </div>
  </footer>
);

export default Homepage;
