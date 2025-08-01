import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaLock, 
  FaCheck, 
  FaArrowRight, 
  FaChartLine,
  FaUserShield,
  FaClipboardCheck,
  FaWater
} from 'react-icons/fa';
import { MdSecurity } from 'react-icons/md';
import { generateWatermark } from '../utils/securityUtils';
import { trackEvent } from '../utils/analytics';
import Tooltip from '../components/Tooltip';
import SystemModal from '../components/SystemModal';
import LoadingSpinner from '../components/LoadingSpinner';

const VaultPreview = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [revealedSystems, setRevealedSystems] = useState([1]); // Start with first system revealed
  const [selectedSystem, setSelectedSystem] = useState(null);
  const [watermark, setWatermark] = useState('');
  const containerRef = useRef(null);

  // Generate watermark on mount
  useEffect(() => {
    setWatermark(generateWatermark('vault-preview'));
    trackEvent('VaultPreview_View');
  }, []);

  // Intersection Observer for progressive disclosure
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const systemId = parseInt(entry.target.dataset.systemId);
            if (!revealedSystems.includes(systemId)) {
              setRevealedSystems(prev => [...prev, systemId]);
              trackEvent('VaultPreview_SystemRevealed', { systemId });
            }
          }
        });
      },
      { threshold: 0.5, rootMargin: '0px 0px -100px 0px' }
    );

    const systemCards = document.querySelectorAll('.system-card');
    systemCards.forEach(card => observer.observe(card));

    return () => observer.disconnect();
  }, [revealedSystems]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    trackEvent('VaultPreview_AccessRequested', { email });

    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsSubmitted(true);
      setRevealedSystems(prev => [...prev, 3]); // Reveal bonus system
      trackEvent('VaultPreview_AccessGranted', { email });
    } catch (error) {
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSystemClick = (system) => {
    setSelectedSystem(system);
    trackEvent('VaultPreview_SystemPreviewed', { systemId: system.id });
  };

  const systemPreviews = [
    {
      id: 1,
      title: "SV-Framework",
      description: "A 3-part Claude-based survey system that achieves 22.4% conversion on cold traffic",
      metrics: [
        { label: "Avg. Conversion Rate", value: "22.4%" },
        { label: "Implementation Time", value: "48h" },
        { label: "ROI Timeline", value: "7-14 days" }
      ],
      previewContent: "The SV-Framework leverages multi-step qualification to route traffic based on engagement signals. This system implements a progressive disclosure methodology that...",
      fullContent: [
        "Complete 3-stage survey architecture with Claude integration points",
        "Traffic routing logic based on response patterns",
        "Conversion optimization techniques specific to survey flows",
        "Implementation checklist and technical requirements",
        "Case studies from health and financial niches"
      ],
      isLocked: false,
      accessLevel: "basic"
    },
    {
      id: 2,
      title: "Authority Engine",
      description: "Persona-based Claude implementation for high-ticket affiliate offers",
      metrics: [
        { label: "Avg. EPC", value: "$1.87" },
        { label: "Implementation Time", value: "72h" },
        { label: "ROI Timeline", value: "10-21 days" }
      ],
      previewContent: "The Authority Engine system establishes credibility through structured Claude interactions, creating high-conversion pathways for affiliate products in specialized niches...",
      fullContent: [
        "Persona development framework for authority positioning",
        "Conversation flow templates for different offer types",
        "Affiliate integration best practices",
        "Compliance guidelines for regulated niches",
        "Performance benchmarks across industries"
      ],
      isLocked: !revealedSystems.includes(2),
      accessLevel: "basic"
    },
    {
      id: 3,
      title: "Conversion Velocity Accelerator",
      description: "7-step optimization protocol for existing Claude monetization systems",
      metrics: [
        { label: "Avg. Improvement", value: "+31.7%" },
        { label: "Implementation Time", value: "24h" },
        { label: "ROI Timeline", value: "3-7 days" }
      ],
      previewContent: "The CVA protocol systematically identifies and eliminates conversion bottlenecks in existing Claude implementations through targeted optimization of key user decision points...",
      fullContent: [
        "Diagnostic framework for conversion analysis",
        "7-step optimization protocol with implementation guides",
        "A/B testing methodology for Claude interactions",
        "Performance tracking and iteration system",
        "Case studies showing before/after results"
      ],
      isLocked: !revealedSystems.includes(3),
      accessLevel: "premium"
    }
  ];

  const vaultContents = [
    "7 Survey-based monetization systems (22.4% avg. conversion)",
    "5 Authority-based affiliate frameworks (18.7% avg. conversion)",
    "3 Content qualification systems (31.5% traffic quality improvement)",
    "2 Niche-specific implementation guides with swipe files",
    "Complete analytics setup and tracking implementation",
    "Advanced compliance and risk management protocols",
    "Operator community access for strategy sharing"
  ];

  return (
    <div className="min-h-screen bg-[#0a0e12] text-[#e6edf3]" ref={containerRef}>
      <div className="relative">
        {/* Neural pattern background */}
        <div className="absolute inset-0 neural-pattern opacity-[0.07] pointer-events-none" />
        
        <div className="container mx-auto px-4 py-16">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold font-['Space_Mono'] mb-4">
              <span className="text-[#ff7b72]">AIQBrain</span> Vault Preview
            </h1>
            <p className="text-lg md:text-xl max-w-3xl mx-auto text-[rgba(230,237,243,0.8)]">
              Proven Claude-centric monetization systems for discerning operators. 
              <span className="text-[#ff7b72]"> Access three sample frameworks below.</span>
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            <AnimatePresence>
              {systemPreviews.map((system) => (
                <motion.div
                  key={system.id}
                  className="system-card relative rounded-lg bg-[#121820] p-6 border border-opacity-20 border-[#58a6ff]"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: system.id * 0.1 }}
                  exit={{ opacity: 0 }}
                  data-system-id={system.id}
                >
                  {system.isLocked ? (
                    <div className="absolute inset-0 bg-[#0a0e12] bg-opacity-90 backdrop-filter backdrop-blur-sm flex flex-col items-center justify-center rounded-lg border border-[#f9c74f] z-10">
                      <FaLock className="text-4xl text-[#f9c74f] mb-4" />
                      <p className="text-center font-medium">
                        {system.id === 3 ? (
                          "Join the waitlist to unlock"
                        ) : (
                          "Scroll to reveal this system"
                        )}
                      </p>
                    </div>
                  ) : (
                    <>
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="text-xl font-bold font-['Space_Mono'] text-[#ff7b72]">
                          {system.title}
                        </h3>
                        <span className="text-xs px-2 py-1 bg-[rgba(88,166,255,0.1)] text-[#58a6ff] rounded-md border border-[#58a6ff] border-opacity-30">
                          {system.accessLevel === 'premium' ? 'Premium' : 'Basic'}
                        </span>
                      </div>
                      
                      <p className="text-[rgba(230,237,243,0.8)] mb-4">
                        {system.description}
                      </p>
                      
                      <div className="grid grid-cols-3 gap-2 mb-4">
                        {system.metrics.map((metric, idx) => (
                          <div key={idx} className="bg-[#0a0e12] rounded-md p-2 text-center">
                            <p className="text-xs text-[rgba(230,237,243,0.6)]">{metric.label}</p>
                            <p className="font-bold text-[#58a6ff]">{metric.value}</p>
                          </div>
                        ))}
                      </div>
                      
                      <div className="bg-[#0d1117] rounded-md p-3 mb-4 border border-opacity-20 border-[#58a6ff]">
                        <p className="text-sm font-['Inter_Tight']">
                          {system.previewContent}
                        </p>
                      </div>
                      
                      <div className="flex justify-end">
                        <button 
                          onClick={() => handleSystemClick(system)}
                          className="text-[#ff7b72] font-medium flex items-center hover:text-[#ff4d4d] transition-colors"
                        >
                          View Framework <FaArrowRight className="ml-2" />
                        </button>
                      </div>

                      <div className="absolute bottom-2 right-2 text-[rgba(230,237,243,0.1)] text-xs transform rotate-12 pointer-events-none select-none">
                        {watermark}
                      </div>
                    </>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          
          {/* Lead capture section */}
          <motion.div
            className="max-w-2xl mx-auto bg-[#121820] rounded-lg p-8 border border-opacity-20 border-[#58a6ff]"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h2 className="text-2xl font-bold font-['Space_Mono'] mb-4">
              <span className="text-[#f9c74f]">Request Access</span> to Complete Vault
            </h2>
            
            <div className="mb-6 text-[rgba(230,237,243,0.8)]">
              <p className="mb-4">
                The AIQBrain Vault contains 17 additional Claude monetization systems with complete implementation guides and case metrics. Access is currently invitation-only.
              </p>
              
              <div className="flex items-center space-x-4 text-sm mb-4">
                <div className="flex items-center">
                  <MdSecurity className="mr-2" />
                  <Tooltip content="All content is watermarked and traceable to your account">
                    <span className="cursor-help border-b border-dashed border-[rgba(230,237,243,0.3)]">
                      Protected Content
                    </span>
                  </Tooltip>
                </div>
                <div className="flex items-center">
                  <FaUserShield className="mr-2" />
                  <span>Application-based access</span>
                </div>
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="text-lg font-bold mb-3 font-['Space_Mono'] flex items-center">
                <FaClipboardCheck className="mr-2 text-[#58a6ff]" />
                Vault Contains:
              </h3>
              <ul className="space-y-2">
                {vaultContents.map((item, idx) => (
                  <li key={idx} className="flex items-start">
                    <FaCheck className="text-[#58a6ff] mt-1 mr-2 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            {!isSubmitted ? (
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="email" className="block mb-2 text-sm font-medium">
                    Enter your email to join the access waitlist:
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full h-12 px-4 rounded-md border border-[rgba(88,166,255,0.3)] bg-[rgba(12,17,23,0.6)] text-[#e6edf3] focus:outline-none focus:border-[#58a6ff] focus:ring-2 focus:ring-[rgba(88,166,255,0.2)]"
                    placeholder="your@email.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full h-12 bg-gradient-to-r from-[#ff7b72] to-[#ff4d4d] text-[#0a0e12] font-semibold rounded-md transition-all hover:brightness-110 hover:shadow-[0_0_8px_rgba(255,123,114,0.4)] disabled:opacity-70 flex items-center justify-center"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <LoadingSpinner className="mr-2" />
                      Processing...
                    </>
                  ) : (
                    "Request Access"
                  )}
                </button>
              </form>
            ) : (
              <div className="text-center p-4 bg-[rgba(88,166,255,0.1)] rounded-md border border-[#58a6ff]">
                <FaCheck className="text-[#58a6ff] text-2xl mx-auto mb-2" />
                <h3 className="text-lg font-bold mb-2">Access Request Received</h3>
                <p className="mb-4">Thank you for your interest. We've unlocked an additional framework for you above.</p>
                <Link 
                  to="/strategy" 
                  className="inline-block px-6 py-2 bg-gradient-to-r from-[#ff7b72] to-[#ff4d4d] text-[#0a0e12] font-semibold rounded-md transition-all hover:brightness-110"
                >
                  Continue to Strategy Hub
                </Link>
              </div>
            )}
          </motion.div>
        </div>
      </div>
      
      {/* Sticky CTA bar */}
      <motion.div 
        className="fixed bottom-0 left-0 right-0 bg-[#0a0e12] border-t border-[rgba(88,166,255,0.2)] shadow-[0_-4px_12px_rgba(0,0,0,0.4)] py-4 px-4 z-30"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="mb-3 md:mb-0">
            <p className="font-medium">
              <span className="text-[#ff7b72]">17 additional systems</span> available in the full vault
            </p>
          </div>
          <Link 
            to="/request" 
            className="px-6 py-3 bg-gradient-to-r from-[#ff7b72] to-[#ff4d4d] text-[#0a0e12] font-semibold rounded-md transition-all hover:brightness-110 hover:shadow-[0_0_8px_rgba(255,123,114,0.4)]"
            onClick={() => trackEvent('VaultPreview_StickyCTA_Click')}
          >
            Request Full Access
          </Link>
        </div>
      </motion.div>

      {/* System Modal */}
      <AnimatePresence>
        {selectedSystem && (
          <SystemModal 
            system={selectedSystem} 
            onClose={() => setSelectedSystem(null)}
            watermark={watermark}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default VaultPreview;
