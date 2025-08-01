import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaLock, 
  FaChartLine, 
  FaCode, 
  FaCheckCircle, 
  FaDownload,
  FaBook,
  FaUserShield,
  FaWater,
  FaEyeSlash,
  FaClipboardCheck
} from 'react-icons/fa';
import { FiExternalLink } from 'react-icons/fi';
import { MdSecurity } from 'react-icons/md';
import { generateWatermark } from '../utils/securityUtils';
import { trackEvent } from '../utils/analytics';
import { useAuth } from '../context/AuthContext';
import Tooltip from '../components/Tooltip';
import AccessLevelBadge from '../components/AccessLevelBadge';
import FrameworkModal from '../components/FrameworkModal';
import CaseStudyModal from '../components/CaseStudyModal';
import GuideModal from '../components/GuideModal';

const StrategyHub = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('frameworks');
  const [selectedItem, setSelectedItem] = useState(null);
  const [watermark, setWatermark] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Generate unique watermark for content protection
  useEffect(() => {
    setWatermark(generateWatermark(user?.id || 'guest'));
    setIsLoading(false);
    
    // Track page view
    trackEvent('StrategyHub_View', {
      tab: activeTab,
      accessLevel: user?.accessLevel || 'guest'
    });
  }, [user, activeTab]);

  // Filter data based on search term and access level
  const filteredData = useMemo(() => {
    const term = searchTerm.toLowerCase();
    const accessLevel = user?.accessLevel || 'basic';
    
    switch(activeTab) {
      case 'frameworks':
        return frameworkData.filter(item => 
          (item.name.toLowerCase().includes(term) || 
          (item.description.toLowerCase().includes(term)) &&
          (item.accessLevel === 'basic' || item.accessLevel === accessLevel)
        );
      case 'casestudies':
        return caseStudyData.filter(item => 
          (item.title.toLowerCase().includes(term) || 
          (item.niche.toLowerCase().includes(term)) &&
          (item.accessLevel === 'basic' || item.accessLevel === accessLevel)
        );
      case 'guides':
        return guideData.filter(item => 
          (item.title.toLowerCase().includes(term) || 
          (item.sections.some(s => s.toLowerCase().includes(term))) &&
          (item.accessLevel === 'basic' || item.accessLevel === accessLevel)
        );
      default:
        return [];
    }
  }, [activeTab, searchTerm, user?.accessLevel]);

  // Content data
  const frameworkData = [
    // ... (same as your original frameworkData)
  ];

  const caseStudyData = [
    // ... (same as your original caseStudyData)
  ];

  const guideData = [
    // ... (same as your original guideData)
  ];

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSearchTerm('');
    trackEvent('StrategyHub_TabChange', { tab });
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
    trackEvent('StrategyHub_ItemClick', { 
      type: activeTab.slice(0, -1), 
      id: item.id 
    });
  };

  const handleCloseModal = () => {
    setSelectedItem(null);
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#ff7b72]"></div>
        </div>
      );
    }

    if (filteredData.length === 0) {
      return (
        <motion.div 
          className="text-center py-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <FaBook className="mx-auto text-4xl text-[rgba(230,237,243,0.3)] mb-4" />
          <h3 className="text-xl font-medium">No {activeTab} found</h3>
          <p className="text-[rgba(230,237,243,0.6)] mt-2">
            {searchTerm ? 'Try a different search term' : 'Check back later for new content'}
          </p>
        </motion.div>
      );
    }

    switch(activeTab) {
      case 'frameworks':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {filteredData.map((framework) => (
                <motion.div
                  key={framework.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="strategy-card relative rounded-lg bg-[#121820] p-6 border border-opacity-20 border-[#58a6ff] overflow-hidden"
                >
                  <AccessLevelBadge 
                    accessLevel={framework.accessLevel} 
                    className="absolute top-3 right-3 z-10" 
                  />

                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-bold font-['Space_Mono'] text-[#ff7b72]">
                      {framework.name}
                    </h3>
                    <span className="text-xs px-2 py-1 bg-[rgba(88,166,255,0.1)] text-[#58a6ff] rounded-md border border-[#58a6ff] border-opacity-30">
                      {framework.category}
                    </span>
                  </div>

                  <p className="text-[rgba(230,237,243,0.8)] mb-4 text-sm">
                    {framework.description}
                  </p>

                  <div className="grid grid-cols-2 gap-2 mb-4">
                    <StatBlock label="Conversion Rate" value={`${framework.conversionRate}%`} />
                    <StatBlock label="Implementation" value={`${framework.implementationTime}h`} />
                    <StatBlock label="ROI Timeline" value={framework.roiTimeline} />
                    <StatBlock label="Difficulty" value={framework.difficulty} />
                  </div>

                  <button 
                    onClick={() => handleItemClick(framework)}
                    className="w-full py-2 bg-[#ff7b72] text-[#0a0e12] font-semibold rounded-md transition-all hover:brightness-110 hover:shadow-[0_0_8px_rgba(255,123,114,0.4)]"
                  >
                    View Framework
                  </button>

                  <Watermark text={watermark} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        );

      case 'casestudies':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <AnimatePresence>
              {filteredData.map((caseStudy) => (
                <motion.div
                  key={caseStudy.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="strategy-card relative rounded-lg bg-[#121820] p-6 border border-opacity-20 border-[#58a6ff] overflow-hidden"
                >
                  <AccessLevelBadge 
                    accessLevel={caseStudy.accessLevel} 
                    className="absolute top-3 right-3 z-10" 
                  />

                  <h3 className="text-xl font-bold font-['Space_Mono'] text-[#ff7b72] mb-3">
                    {caseStudy.title}
                  </h3>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <DetailBlock label="Niche" value={caseStudy.niche} />
                    <DetailBlock label="Start Date" value={caseStudy.startDate} />
                    <DetailBlock label="Duration" value={caseStudy.duration} />
                    <DetailBlock label="Initial Traffic" value={caseStudy.initialTraffic.toLocaleString()} />
                  </div>

                  <div className="flex space-x-4 mb-6">
                    <StatHighlight 
                      label="Conversion Rate" 
                      value={`${caseStudy.conversionRate}%`} 
                      color="text-[#ff7b72]" 
                    />
                    <StatHighlight 
                      label="ROI" 
                      value={`${caseStudy.roi}%`} 
                      color="text-[#58a6ff]" 
                    />
                  </div>

                  <div className="mb-4">
                    <h4 className="text-sm font-bold mb-2">Key Findings:</h4>
                    <ul className="text-sm">
                      {caseStudy.keyFindings.map((finding, idx) => (
                        <li key={idx} className="flex items-start mb-2">
                          <FaCheckCircle className="text-[#58a6ff] mt-1 mr-2 flex-shrink-0" />
                          <span className="text-[rgba(230,237,243,0.8)]">{finding}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="text-center">
                    <button 
                      onClick={() => handleItemClick(caseStudy)}
                      className="px-4 py-2 bg-[#ff7b72] text-[#0a0e12] font-semibold rounded-md transition-all hover:brightness-110 hover:shadow-[0_0_8px_rgba(255,123,114,0.4)]"
                    >
                      View Full Case Study
                    </button>
                  </div>

                  <Watermark text={watermark} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        );

      case 'guides':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {filteredData.map((guide) => (
                <motion.div
                  key={guide.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="strategy-card relative rounded-lg bg-[#121820] p-6 border border-opacity-20 border-[#58a6ff] overflow-hidden"
                >
                  <AccessLevelBadge 
                    accessLevel={guide.accessLevel} 
                    className="absolute top-3 right-3 z-10" 
                  />

                  <h3 className="text-xl font-bold font-['Space_Mono'] text-[#ff7b72] mb-3">
                    {guide.title}
                  </h3>

                  <div className="mb-4">
                    <h4 className="text-sm font-bold mb-2">Guide Sections:</h4>
                    <ol className="text-sm list-decimal pl-4">
                      {guide.sections.map((section, idx) => (
                        <li key={idx} className="mb-1 text-[rgba(230,237,243,0.8)]">
                          {section}
                        </li>
                      ))}
                    </ol>
                  </div>

                  <div className="mb-4">
                    <h4 className="text-sm font-bold mb-2">Included Resources:</h4>
                    <ul className="text-sm">
                      {guide.resources.map((resource, idx) => (
                        <li key={idx} className="flex items-start mb-1">
                          <FaCheckCircle className="text-[#58a6ff] mt-1 mr-2 flex-shrink-0" />
                          <span className="text-[rgba(230,237,243,0.8)]">{resource}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div className="text-xs text-[rgba(230,237,243,0.6)]">
                      <FaClock className="inline mr-1" />
                      <span>{guide.estimatedTime}</span>
                    </div>
                    <button 
                      onClick={() => handleItemClick(guide)}
                      className="text-xs px-3 py-1 bg-[#58a6ff] text-[#0a0e12] rounded hover:bg-[#3d8eff] transition"
                    >
                      View Guide
                    </button>
                  </div>

                  <Watermark text={watermark} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold font-['Space_Mono'] mb-2">
          AIQBrain <span className="text-[#ff7b72]">Strategy Hub</span>
        </h1>
        <p className="text-[rgba(230,237,243,0.8)] max-w-3xl">
          Comprehensive resource center for Claude monetization frameworks, case studies, and implementation guides.
        </p>
      </div>

      <div className="mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div className="flex space-x-1 bg-[#121820] rounded-lg p-1 border border-[rgba(88,166,255,0.2)]">
            {['frameworks', 'casestudies', 'guides'].map((tab) => (
              <button
                key={tab}
                onClick={() => handleTabChange(tab)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  activeTab === tab 
                    ? 'bg-[#58a6ff] text-[#0a0e12]' 
                    : 'text-[rgba(230,237,243,0.8)] hover:bg-[rgba(88,166,255,0.1)]'
                }`}
              >
                {tab === 'frameworks' && <FaCode className="inline mr-2" />}
                {tab === 'casestudies' && <FaChartLine className="inline mr-2" />}
                {tab === 'guides' && <FaBook className="inline mr-2" />}
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          <div className="relative max-w-md w-full">
            <input
              type="text"
              placeholder={`Search ${activeTab}...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#121820] border border-[rgba(88,166,255,0.3)] rounded-md pl-10 pr-4 py-2 focus:outline-none focus:ring-1 focus:ring-[#58a6ff]"
            />
            <div className="absolute left-3 top-2.5 text-[rgba(230,237,243,0.6)]">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-4 text-sm text-[rgba(230,237,243,0.6)]">
          <div className="flex items-center">
            <FaUserShield className="mr-2" />
            <span>Your access level: </span>
            <span className="ml-1 font-medium text-[#58a6ff]">
              {user?.accessLevel ? user.accessLevel.charAt(0).toUpperCase() + user.accessLevel.slice(1) : 'Basic'}
            </span>
          </div>
          <div className="flex items-center">
            <MdSecurity className="mr-2" />
            <Tooltip content="Content is watermarked and traceable to your account">
              <span className="cursor-help border-b border-dashed border-[rgba(230,237,243,0.3)]">
                Protected Content
              </span>
            </Tooltip>
          </div>
        </div>
      </div>

      {renderContent()}

      {/* Modals */}
      {selectedItem && activeTab === 'frameworks' && (
        <FrameworkModal 
          item={selectedItem} 
          onClose={handleCloseModal}
          watermark={watermark}
        />
      )}

      {selectedItem && activeTab === 'casestudies' && (
        <CaseStudyModal 
          item={selectedItem} 
          onClose={handleCloseModal}
          watermark={watermark}
        />
      )}

      {selectedItem && activeTab === 'guides' && (
        <GuideModal 
          item={selectedItem} 
          onClose={handleCloseModal}
          watermark={watermark}
        />
      )}
    </div>
  );
};

// Helper components
const StatBlock = ({ label, value }) => (
  <div className="bg-[#0a0e12] rounded-md p-2">
    <p className="text-xs text-[rgba(230,237,243,0.6)]">{label}</p>
    <p className="font-bold text-[#58a6ff]">{value}</p>
  </div>
);

const DetailBlock = ({ label, value }) => (
  <div>
    <p className="text-xs text-[rgba(230,237,243,0.6)]">{label}</p>
    <p className="font-medium">{value}</p>
  </div>
);

const StatHighlight = ({ label, value, color }) => (
  <div className={`flex-1 bg-[#0a0e12] rounded-md p-3 text-center ${color}`}>
    <p className="text-xs text-[rgba(230,237,243,0.6)]">{label}</p>
    <p className="text-2xl font-bold">{value}</p>
  </div>
);

const Watermark = ({ text }) => (
  <div className="absolute bottom-2 right-2 text-[rgba(230,237,243,0.1)] text-xs transform rotate-12 pointer-events-none select-none">
    {text}
  </div>
);

export default StrategyHub;
