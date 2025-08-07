import { useState, useEffect, useCallback } from 'react';
import Head from 'next/head';

const Homepage = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [qualificationScore, setQualificationScore] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Throttled scroll handler
  const handleScroll = useCallback(() => {
    const scrollThreshold = document.documentElement.scrollHeight * 0.4;
    setIsScrolled(window.scrollY > scrollThreshold);
  }, []);

  // Secure qualification scoring
  const assessQualification = useCallback(() => {
    try {
      let score = 0;
      
      // Device scoring (no fingerprinting)
      const isMobile = window.innerWidth < 768;
      const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;
      score += isMobile ? 1 : isTablet ? 2 : 3;

      // Browser scoring
      const userAgent = navigator.userAgent;
      if (!/bot|crawler|spider|headless/i.test(userAgent)) score += 2;

      // Referrer scoring
      if (document.referrer && document.referrer.includes('aiqbrain.com')) {
        score += 1;
      }

      setQualificationScore(Math.min(score, 10)); // Cap at 10
      setIsLoading(false);
    } catch (error) {
      console.error('Assessment error:', error);
      setQualificationScore(1);
      setIsLoading(false);
    }
  }, []);

  // Initialize tracking
  useEffect(() => {
    assessQualification();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, [assessQualification, handleScroll]);

  // Dynamic CTA based on qualification score
  const renderPrimaryCTA = () => {
    if (qualificationScore >= 5) {
      return (
        <a 
          href="/vault" 
          className="cta-premium bg-gradient-to-r from-coral to-coral-dark hover:shadow-coral-glow"
          data-analytics="premium-cta"
        >
          Unlock Premium Vault
        </a>
      );
    }
    return (
      <a 
        href="/strategy" 
        className="cta-basic bg-blue hover:bg-blue-dark hover:shadow-blue-glow"
        data-analytics="basic-cta"
      >
        Explore Strategies
      </a>
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-dark">
        <div className="loader animate-spin rounded-full border-t-2 border-b-2 border-coral h-12 w-12"></div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>AIQBrain | Claude-Centric Monetization Systems</title>
        <meta name="description" content="Advanced monetization frameworks for Claude operators with premium traffic routing and conversion optimization systems" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <meta name="robots" content="noindex, nofollow" />
        <link rel="canonical" href="https://aiqbrain.com/vault" />
      </Head>

      <div className="bg-dark min-h-screen text-light relative overflow-x-hidden">
        {/* Neural network background pattern */}
        <div className="fixed inset-0 opacity-[0.03] pointer-events-none bg-neural-pattern"></div>
        
        {/* Secure header */}
        <SecureHeader qualificationScore={qualificationScore} />

        <main>
          {/* Hero Section */}
          <HeroSection renderPrimaryCTA={renderPrimaryCTA} qualificationScore={qualificationScore} />
          
          {/* Dynamic Content Section */}
          <DynamicContentSection qualificationScore={qualificationScore} />

          {/* Results Section */}
          <ResultsSection qualificationScore={qualificationScore} />
          
          {/* Access CTA */}
          <AccessCTASection qualificationScore={qualificationScore} />
        </main>

        {/* Sticky CTA */}
        <StickyCTA isScrolled={isScrolled} qualificationScore={qualificationScore} />
        
        {/* Secure Footer */}
        <SecureFooter />
      </div>
    </>
  );
};

// Component for system cards
const SystemCard = ({ title, description, stat, statLabel, color }) => (
  <div className={`bg-gradient-to-br ${color}-fade to-transparent rounded-lg p-6 border border-blue-border hover:border-blue-border-hover transition-all duration-300 hover:-translate-y-1`}>
    <h3 className={`text-xl font-mono font-bold mb-3 text-gradient ${color}-gradient`}>
      {title}
    </h3>
    <p className="mb-4 text-light/80">{description}</p>
    <div className="flex items-center">
      <span className={`text-2xl font-bold mr-2 text-gradient ${color}-gradient`}>{stat}</span>
      <span className="text-sm text-light/60">{statLabel}</span>
    </div>
  </div>
);

// Secure Header Component
const SecureHeader = ({ qualificationScore }) => (
  <header className="container mx-auto py-6 px-4 flex justify-between items-center relative z-10">
    <div className="flex items-center">
      <div className="w-8 h-8 mr-2 bg-coral rounded-md flex items-center justify-center">
        <span className="font-bold text-dark">AQ</span>
      </div>
      <h1 className="text-xl font-bold font-mono">AIQBrain</h1>
    </div>
    
    <nav className="hidden md:block">
      <ul className="flex space-x-6">
        <li><SecureNavLink href="/vault">Vault</SecureNavLink></li>
        <li><SecureNavLink href="/strategy">Strategy</SecureNavLink></li>
        <li><SecureNavLink href="/results">Results</SecureNavLink></li>
        <li>
          <SecureNavButton href="/request">
            {qualificationScore >= 5 ? "Priority Access" : "Request Access"}
          </SecureNavButton>
        </li>
      </ul>
    </nav>
    
    <button className="md:hidden text-light" aria-label="Mobile menu">
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
      </svg>
    </button>
  </header>
);

// Secure Nav Link Component
const SecureNavLink = ({ href, children }) => (
  <li>
    <a 
      href={href} 
      className="nav-link hover:text-coral transition-colors duration-200"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  </li>
);

// Secure Nav Button Component
const SecureNavButton = ({ href, children }) => (
  <a 
    href={href}
    className="nav-cta bg-coral hover:shadow-coral-glow transition-all duration-200"
    rel="noopener noreferrer"
  >
    {children}
  </a>
);

// Hero Section Component
const HeroSection = ({ renderPrimaryCTA, qualificationScore }) => (
  <section className="container mx-auto px-4 py-16 md:py-24 relative z-10">
    <div className="max-w-3xl">
      <h1 className="font-mono font-bold text-4xl md:text-5xl leading-tight mb-6">
        <span className="text-gradient coral-gradient">
          Claude Monetization Systems
        </span> for Strategic Operators
      </h1>
      <p className="text-lg mb-8 text-light/90">
        Advanced traffic routing and conversion frameworks that leverage Claude's capabilities while maintaining strict platform compliance and long-term viability.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        {renderPrimaryCTA()}
        <SecureSecondaryCTA href="/request">
          Request Access
        </SecureSecondaryCTA>
      </div>
      
      {/* Trust indicators */}
      <TrustIndicators />
    </div>
  </section>
);

// Trust Indicators Component
const TrustIndicators = () => (
  <div className="mt-12 flex flex-wrap items-center gap-6 text-sm text-light/70">
    <TrustItem icon="check" text="100% Platform Compliant" />
    <TrustItem icon="bolt" text="18-37% Conversion Uplift" />
    <TrustItem icon="lock" text="Application-Only Access" />
  </div>
);

// Trust Item Component
const TrustItem = ({ icon, text }) => {
  const iconPaths = {
    check: "M5 13l4 4L19 7",
    bolt: "M13 10V3L4 14h7v7l9-11h-7z",
    lock: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
  };

  return (
    <div className="flex items-center">
      <svg className="w-4 h-4 mr-2 text-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={iconPaths[icon]} />
      </svg>
      <span>{text}</span>
    </div>
  );
};

// Dynamic Content Section Component
const DynamicContentSection = ({ qualificationScore }) => (
  <section className="bg-gradient-to-b from-dark-secondary to-dark py-16">
    <div className="container mx-auto px-4">
      <h2 className="font-mono font-bold text-3xl mb-12 text-center">
        {qualificationScore >= 5 ? 
          "You Qualify For Advanced Systems" : 
          "Core Monetization Frameworks"}
      </h2>
      
      <div className="grid md:grid-cols-3 gap-8">
        {qualificationScore >= 5 ? (
          <>
            <SystemCard 
              title="Premium Routing" 
              description="Advanced multi-signal traffic routing with machine learning optimization" 
              stat="31%"
              statLabel="ROI Increase"
              color="coral"
            />
            <SystemCard 
              title="Geo-Targeted Offers" 
              description="Automated geo-specific offer presentation with dynamic fallbacks" 
              stat="42%"
              statLabel="Conversion Boost"
              color="blue"
            />
            <SystemCard 
              title="Elite Compliance" 
              description="Enterprise-level compliance architecture with automated audits" 
              stat="100%"
              statLabel="Platform Safety"
              color="green"
            />
          </>
        ) : (
          <>
            <SystemCard 
              title="Basic Routing" 
              description="Essential traffic qualification and routing fundamentals" 
              stat="18%"
              statLabel="Avg. Uplift"
              color="blue"
            />
            <SystemCard 
              title="Core Frameworks" 
              description="Proven monetization architectures with compliance guardrails" 
              stat="23%"
              statLabel="CR Increase"
              color="blue"
            />
            <SystemCard 
              title="Analytics Suite" 
              description="Conversion tracking and optimization diagnostics" 
              stat="27%"
              statLabel="CPA Reduction"
              color="blue"
            />
          </>
        )}
      </div>
    </div>
  </section>
);

// Secure Secondary CTA Component
const SecureSecondaryCTA = ({ href, children }) => (
  <a 
    href={href} 
    className="cta-secondary border border-blue text-blue hover:bg-blue/10 transition-colors duration-200"
    rel="noopener noreferrer"
  >
    {children}
  </a>
);

// Results Section Component
const ResultsSection = ({ qualificationScore }) => (
  <section className="container mx-auto px-4 py-16">
    <div className="flex flex-col md:flex-row gap-12 items-center">
      <div className="md:w-1/2">
        <h2 className="font-mono font-bold text-3xl mb-6">
          {qualificationScore >= 5 ? 
            "Operator-Grade Performance Metrics" : 
            "Proven Monetization Results"}
        </h2>
        <p className="mb-6 text-light/90">
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
        <SecureTextLink href="/results">
          View detailed case studies
        </SecureTextLink>
      </div>
      <div className="md:w-1/2 bg-dark-secondary p-6 rounded-lg border border-blue-border">
        <ConversionFunnel qualificationScore={qualificationScore} />
      </div>
    </div>
  </section>
);

// Secure Text Link Component
const SecureTextLink = ({ href, children }) => (
  <div className="mt-8">
    <a 
      href={href} 
      className="text-blue font-semibold flex items-center group transition-colors duration-200"
      rel="noopener noreferrer"
    >
      {children}
      <svg className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" fill="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
      </svg>
    </a>
  </div>
);

// Result Item Component
const ResultItem = ({ text }) => (
  <li className="flex items-start">
    <svg className="w-5 h-5 text-coral mr-2 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
    </svg>
    <span className="text-light/90">{text}</span>
  </li>
);

// Conversion Funnel Component
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
              'bg-gradient-to-r from-coral to-coral-dark rounded-b-lg' : 
              'bg-blue/10'} flex items-center justify-center relative`}
            style={{ width: `${value}%` }}
          >
            <span className="font-mono font-bold text-sm">
              {labels[index]}
            </span>
            <span className="absolute right-3 text-light font-bold">
              {value}%
            </span>
          </div>
          {index < funnelData.length - 1 && (
            <svg className="w-8 h-8 text-blue/30 mx-auto" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v10.586l3.293-3.293a1 1 0 111.414 1.414l-5 5a1 1 0 01-1.414 0l-5-5a1 1 0 111.414-1.414L9 14.586V4a1 1 0 011-1z" clipRule="evenodd"></path>
            </svg>
          )}
        </div>
      ))}
    </div>
  );
};

// Access CTA Section Component
const AccessCTASection = ({ qualificationScore }) => (
  <section className="bg-gradient-to-r from-dark-secondary to-dark-semi py-16 border-y border-blue-border">
    <div className="container mx-auto px-4 text-center">
      <h2 className="font-mono font-bold text-3xl mb-4">
        {qualificationScore >= 7 ? 
          "You Pre-Qualify For Elite Access" : 
          "Request System Access"}
      </h2>
      <p className="max-w-2xl mx-auto mb-8 text-light/90">
        AIQBrain maintains strict access controls to ensure community quality and system integrity.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <SecurePrimaryCTA href="/request">
          {qualificationScore >= 7 ? "Fast-Track Application" : "Begin Application"}
        </SecurePrimaryCTA>
        {qualificationScore >= 5 && (
          <SecureSecondaryCTA href="/vault-preview">
            Preview Vault Contents
          </SecureSecondaryCTA>
        )}
      </div>
      {qualificationScore >= 5 && (
        <div className="mt-6 text-sm text-blue flex items-center justify-center">
          <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
          </svg>
          <span>Your qualification score: {qualificationScore}/10</span>
        </div>
      )}
    </div>
  </section>
);

// Secure Primary CTA Component
const SecurePrimaryCTA = ({ href, children }) => (
  <a 
    href={href} 
    className="cta-premium bg-gradient-to-r from-coral to-coral-dark hover:shadow-coral-glow transition-all duration-200"
    rel="noopener noreferrer"
  >
    {children}
  </a>
);

// Sticky CTA Component
const StickyCTA = ({ isScrolled, qualificationScore }) => (
  <div className={`fixed bottom-0 left-0 right-0 bg-dark border-t border-blue-border p-4 transition-transform duration-300 z-50 ${isScrolled ? 'translate-y-0' : 'translate-y-full'}`}>
    <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
      <div>
        <h3 className="font-mono font-bold text-lg">
          {qualificationScore >= 5 ? 
            "You Qualify For Advanced Access" : 
            "Ready To Improve Your Monetization?"}
        </h3>
        <p className="text-light/80">
          {qualificationScore >= 5 ? 
            "Begin your fast-track application now" : 
            "Request access to AIQBrain systems"}
        </p>
      </div>
      <SecurePrimaryCTA href="/request">
        {qualificationScore >= 5 ? 'Fast-Track Application' : 'Request Access'}
      </SecurePrimaryCTA>
    </div>
  </div>
);

// Secure Footer Component
const SecureFooter = () => (
  <footer className="bg-dark border-t border-blue-border py-12">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center mb-4">
            <div className="w-6 h-6 mr-2 bg-coral rounded-md flex items-center justify-center">
              <span className="font-bold text-dark text-xs">AQ</span>
            </div>
            <span className="font-mono">AIQBrain</span>
          </div>
          <p className="text-sm text-light/60">
            Advanced monetization systems for Claude operators.
          </p>
        </div>
        
        <div>
          <h4 className="font-mono font-bold text-sm mb-4">SYSTEMS</h4>
          <ul className="space-y-2">
            <FooterLink href="/vault">Vault Access</FooterLink>
            <FooterLink href="/strategy">Core Frameworks</FooterLink>
            <FooterLink href="/routing">Traffic Routing</FooterLink>
            <FooterLink href="/analytics">Performance Analytics</FooterLink>
          </ul>
        </div>
        
        <div>
          <h4 className="font-mono font-bold text-sm mb-4">RESOURCES</h4>
          <ul className="space-y-2">
            <FooterLink href="/compliance">Compliance Guide</FooterLink>
            <FooterLink href="/case-studies">Case Studies</FooterLink>
            <FooterLink href="/faq">Operator FAQ</FooterLink>
            <FooterLink href="/updates">System Updates</FooterLink>
          </ul>
        </div>
        
        <div>
          <h4 className="font-mono font-bold text-sm mb-4">LEGAL</h4>
          <ul className="space-y-2">
            <FooterLink href="/terms">Terms of Service</FooterLink>
            <FooterLink href="/privacy">Privacy Policy</FooterLink>
            <FooterLink href="/disclaimer">Disclaimer</FooterLink>
            <FooterLink href="/contact">Contact</FooterLink>
          </ul>
        </div>
      </div>
      
      <div className="mt-12 pt-6 border-t border-blue-border text-center text-xs text-light/50">
        <p>© {new Date().getFullYear()} AIQBrain. All rights reserved.</p>
        <p className="mt-2">Not affiliated with Anthropic, OpenAI, or other mentioned platforms.</p>
      </div>
    </div>
  </footer>
);

// Footer Link Component
const FooterLink = ({ href, children }) => (
  <li>
    <a 
      href={href} 
      className="footer-link text-light/60 hover:text-coral transition-colors duration-200"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  </li>
);

export default Homepage;
