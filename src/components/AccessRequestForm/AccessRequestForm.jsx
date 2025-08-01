import { useState, useEffect, useCallback } from 'react';
import Head from 'next/head';
import FingerprintJS from '@fingerprintjs/fingerprintjs';
import { useRouter } from 'next/router';

const AccessRequestForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    experience: '',
    niche: '',
    currentResults: '',
    goals: '',
    compliance: false,
    referralCode: router.query.ref || ''
  });
  
  const [fingerprint, setFingerprint] = useState(null);
  const [geoData, setGeoData] = useState(null);
  const [qualificationScore, setQualificationScore] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [timer, setTimer] = useState(0);
  
  // Enhanced fingerprinting
  const generateFingerprint = useCallback(async () => {
    try {
      const fp = await FingerprintJS.load({ apiKey: 'your_fpjs_public_key' });
      const { visitorId, confidence } = await fp.get();
      
      setFingerprint({
        visitorId,
        confidence: Math.round(confidence.score * 100),
        device: {
          userAgent: navigator.userAgent,
          screenResolution: `${window.screen.width}x${window.screen.height}`,
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          language: navigator.language,
          deviceMemory: navigator.deviceMemory || 'unknown',
          hardwareConcurrency: navigator.hardwareConcurrency || 'unknown'
        }
      });
      
      // Initial score based on device
      let score = 0;
      const isMobile = window.innerWidth < 768;
      const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;
      score += isMobile ? 1 : isTablet ? 2 : 3;
      
      if (!/bot|crawler|spider|headless/i.test(navigator.userAgent)) score += 2;
      
      setQualificationScore(score);
    } catch (error) {
      console.error('Fingerprinting error:', error);
      setQualificationScore(1);
    }
  }, []);

  // Geo detection
  const fetchGeoData = useCallback(async () => {
    try {
      const response = await fetch('https://ipapi.co/json/');
      const data = await response.json();
      setGeoData({
        country: data.country_name,
        region: data.region,
        city: data.city,
        timezone: data.timezone,
        isEU: Boolean(data.in_eu),
        ip: data.ip
      });
      
      // Geo-based scoring
      const targetCountries = ['United States', 'Canada', 'United Kingdom', 'Germany', 'Australia'];
      setQualificationScore(prev => prev + (targetCountries.includes(data.country_name) ? 2 : 1));
    } catch (error) {
      console.error('Geo detection error:', error);
    }
  }, []);

  // Form timer
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(prev => prev + 1);
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);

  // Initialize fingerprint and geo
  useEffect(() => {
    generateFingerprint();
    fetchGeoData();
    
    // Track form view
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'formView',
      formType: 'accessRequest',
      fingerprint: fingerprint ? 'detected' : 'unknown'
    });
  }, [generateFingerprint, fetchGeoData, fingerprint]);

  // Handle form changes
  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear errors when field is updated
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
    
    // Dynamic scoring
    if (name === 'experience') {
      const expScore = { beginner: 1, intermediate: 3, advanced: 5 }[value] || 0;
      setQualificationScore(prev => (prev - (prev % 5)) + expScore);
    }
    
    if (name === 'niche') {
      const highValueKeywords = ['finance', 'insurance', 'legal', 'health', 'b2b', 'saas', 'lead gen'];
      const nicheValue = highValueKeywords.some(keyword => value.toLowerCase().includes(keyword)) ? 3 : 1;
      setQualificationScore(prev => (prev - (prev % 3)) + nicheValue);
    }
    
    if (name === 'currentResults') {
      const hasNumbers = /\d+%|\$\d+|\d+\s*(?:visitors|users|leads|sales|customers)/i.test(value);
      const resultsScore = hasNumbers ? 3 : 1;
      setQualificationScore(prev => (prev - (prev % 3)) + resultsScore);
    }
  }, [formErrors]);

  // Password generation
  const generatePassword = useCallback(() => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789!@#$%^&*';
    let pass = '';
    for (let i = 0; i < 12; i++) {
      pass += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setPassword(pass);
  }, []);

  // Form validation
  const validateForm = useCallback(() => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!formData.fullName.trim()) errors.fullName = 'Full name is required';
    if (!formData.email.trim()) errors.email = 'Email is required';
    else if (!emailRegex.test(formData.email)) errors.email = 'Invalid email format';
    if (!formData.experience) errors.experience = 'Experience level is required';
    if (!formData.niche.trim()) errors.niche = 'Niche is required';
    if (!formData.currentResults.trim()) errors.currentResults = 'Current results are required';
    if (!formData.goals.trim()) errors.goals = 'Goals are required';
    if (!formData.compliance) errors.compliance = 'You must agree to terms';
    
    // Additional validation for better quality submissions
    if (formData.fullName.length < 3) errors.fullName = 'Please enter your full name';
    if (formData.niche.length < 3) errors.niche = 'Please be more specific';
    if (formData.currentResults.length < 10) errors.currentResults = 'Please provide detailed results';
    if (formData.goals.length < 10) errors.goals = 'Please provide detailed goals';
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  }, [formData]);

  // Form submission
  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      // Generate secure password if not already set
      if (!password) generatePassword();
      
      // Prepare submission data
      const submissionData = {
        ...formData,
        password: password || 'pending-generation',
        fingerprint,
        geoData,
        qualificationScore,
        formTime: timer,
        submissionDate: new Date().toISOString(),
        pageUrl: window.location.href,
        utmParams: Object.fromEntries(new URLSearchParams(window.location.search))
      };
      
      // In production, this would be an actual API call
      console.log('Submitting:', submissionData);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Track successful submission
      window.dataLayer.push({
        event: 'formSubmission',
        formType: 'accessRequest',
        qualificationScore,
        formTime: timer
      });
      
      setSubmitted(true);
    } catch (error) {
      console.error('Submission error:', error);
      window.dataLayer.push({
        event: 'formError',
        formType: 'accessRequest',
        error: error.message
      });
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, password, fingerprint, geoData, qualificationScore, timer, validateForm, generatePassword]);

  // Submitted state
  if (submitted) {
    return (
      <div className="bg-[#0a0e12] min-h-screen flex items-center justify-center p-4">
        <div className="max-w-md bg-[#121820] rounded-lg p-8 border border-[rgba(88,166,255,0.2)] text-center">
          <div className="w-16 h-16 bg-[rgba(255,123,114,0.2)] rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-[#ff7b72]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h2 className="font-['Space_Mono'] font-bold text-2xl mb-4">Application Submitted</h2>
          <p className="mb-6">
            Thank you for your interest in AIQBrain. Our team will review your application within 48 hours.
            <br /><br />
            Your qualification score: <span className="text-[#ff7b72] font-bold">{qualificationScore}/10</span>
          </p>
          
          {password && (
            <div className="mb-6 p-4 bg-[#0a0e12] rounded border border-[rgba(88,166,255,0.2)] text-left">
              <h3 className="font-['Space_Mono'] font-bold text-sm mb-2">YOUR TEMPORARY PASSWORD</h3>
              <div className="flex items-center justify-between bg-[#0d1117] p-2 rounded">
                <code className="font-mono text-[#58a6ff]">{password}</code>
                <button 
                  onClick={() => navigator.clipboard.writeText(password)}
                  className="text-[#58a6ff] hover:text-[#3d8eff] ml-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path>
                  </svg>
                </button>
              </div>
              <p className="mt-2 text-xs text-[rgba(230,237,243,0.6)]">
                Save this password securely. You'll need it if approved.
              </p>
            </div>
          )}
          
          <a 
            href="/" 
            className="bg-[#ff7b72] text-[#0a0e12] px-6 py-3 rounded font-semibold hover:brightness-110 transition duration-200 inline-block"
          >
            Return Home
          </a>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>AIQBrain | Access Request</title>
        <meta name="description" content="Request access to AIQBrain's premium Claude monetization systems" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <link rel="preconnect" href="https://fpjs.io" />
        <link rel="preconnect" href="https://ipapi.co" />
      </Head>

      <div className="bg-[#0a0e12] min-h-screen text-[#e6edf3] py-12">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="bg-[#121820] rounded-lg overflow-hidden border border-[rgba(88,166,255,0.2)] shadow-2xl">
            {/* Form Header */}
            <div className="bg-gradient-to-r from-[#121820] to-[#0d1117] p-6 border-b border-[rgba(88,166,255,0.2)]">
              <div className="flex items-center mb-2">
                <div className="w-8 h-8 mr-2 bg-[#ff7b72] rounded-md flex items-center justify-center">
                  <span className="font-bold text-[#0a0e12]">AQ</span>
                </div>
                <h1 className="text-xl font-bold font-['Space_Mono']">AIQBrain Access Request</h1>
              </div>
              <p className="text-[rgba(230,237,243,0.8)]">
                Complete this form to request access. All applications are manually reviewed to ensure quality standards.
              </p>
            </div>
            
            {/* Form Content */}
            <form onSubmit={handleSubmit} className="p-6">
              <div className="space-y-6">
                {/* Full Name */}
                <FormField
                  label="Full Name"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  error={formErrors.fullName}
                  required
                />
                
                {/* Email */}
                <FormField
                  label="Email"
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  error={formErrors.email}
                  required
                />
                
                {/* Experience Level */}
                <div>
                  <label htmlFor="experience" className="block text-sm font-medium mb-1">
                    Experience Level <span className="text-[#ff7b72]">*</span>
                  </label>
                  <select
                    id="experience"
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    className={`form-select ${formErrors.experience ? 'error' : ''}`}
                  >
                    <option value="">Select your experience level</option>
                    <option value="beginner">Beginner (just starting with AI monetization)</option>
                    <option value="intermediate">Intermediate (some successful campaigns)</option>
                    <option value="advanced">Advanced (running multiple profitable systems)</option>
                  </select>
                  {formErrors.experience && (
                    <p className="mt-1 text-sm text-[#ff7b72]">{formErrors.experience}</p>
                  )}
                </div>
                
                {/* Niche */}
                <FormField
                  label="Primary Niche/Market"
                  id="niche"
                  name="niche"
                  value={formData.niche}
                  onChange={handleChange}
                  error={formErrors.niche}
                  required
                  placeholder="e.g., SaaS, finance, health supplements"
                />
                
                {/* Current Results */}
                <FormField
                  label="Current Monetization Results"
                  id="currentResults"
                  name="currentResults"
                  value={formData.currentResults}
                  onChange={handleChange}
                  error={formErrors.currentResults}
                  required
                  textarea
                  placeholder="Describe your current results (e.g., 'Generating $5k/mo from AI content')"
                />
                
                {/* Goals */}
                <FormField
                  label="Goals with AIQBrain"
                  id="goals"
                  name="goals"
                  value={formData.goals}
                  onChange={handleChange}
                  error={formErrors.goals}
                  required
                  textarea
                  placeholder="What do you hope to achieve with AIQBrain?"
                />
                
                {/* Referral Code */}
                {router.query.ref && (
                  <FormField
                    label="Referral Code"
                    id="referralCode"
                    name="referralCode"
                    value={formData.referralCode}
                    onChange={handleChange}
                    disabled
                  />
                )}
                
                {/* Password Generation */}
                <div>
                  <label htmlFor="password" className="block text-sm font-medium mb-1">
                    Secure Password
                  </label>
                  <div className="flex">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      value={password}
                      readOnly
                      className="form-input flex-1 rounded-r-none"
                      placeholder="Click generate to create"
                    />
                    <button
                      type="button"
                      onClick={generatePassword}
                      className="bg-[#58a6ff] text-[#0a0e12] px-4 py-2 rounded-r font-medium hover:bg-[#3d8eff] transition"
                    >
                      Generate
                    </button>
                  </div>
                  <p className="mt-1 text-xs text-[rgba(230,237,243,0.6)]">
                    We'll generate a secure password for your account if approved.
                  </p>
                </div>
                
                {/* Compliance Checkbox */}
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="compliance"
                      name="compliance"
                      type="checkbox"
                      checked={formData.compliance}
                      onChange={handleChange}
                      className="form-checkbox h-4 w-4 text-[#ff7b72] focus:ring-[#ff7b72] border-[rgba(88,166,255,0.3)] rounded"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="compliance" className="font-medium">
                      I agree to AIQBrain's <a href="/terms" target="_blank" rel="noopener noreferrer" className="text-[#58a6ff] hover:underline">Terms</a> and <a href="/privacy" target="_blank" rel="noopener noreferrer" className="text-[#58a6ff] hover:underline">Privacy Policy</a> <span className="text-[#ff7b72]">*</span>
                    </label>
                    {formErrors.compliance && (
                      <p className="mt-1 text-sm text-[#ff7b72]">{formErrors.compliance}</p>
                    )}
                  </div>
                </div>
                
                {/* Qualification Score */}
                <div className="bg-[rgba(88,166,255,0.1)] p-4 rounded border border-[rgba(88,166,255,0.2)]">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Application Strength</span>
                    <span className="text-sm font-bold">{qualificationScore}/10</span>
                  </div>
                  <div className="w-full bg-[rgba(88,166,255,0.2)] rounded-full h-2.5">
                    <div 
                      className="bg-gradient-to-r from-[#58a6ff] to-[#3d8eff] h-2.5 rounded-full" 
                      style={{ width: `${Math.min(100, (qualificationScore / 10) * 100)}%` }}
                    ></div>
                  </div>
                  <p className="mt-2 text-xs text-[rgba(230,237,243,0.7)]">
                    Higher scores increase approval chances. Complete all fields thoroughly to improve your score.
                    {qualificationScore >= 7 && ' Your score qualifies for fast-track review!'}
                  </p>
                </div>
                
                {/* Submission Info */}
                <div className="text-xs text-[rgba(230,237,243,0.5)]">
                  <p className="flex items-center">
                    <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z" clipRule="evenodd"></path>
                    </svg>
                    <span>All fields are required. Applications with incomplete information will be rejected.</span>
                  </p>
                </div>
                
                {/* Submit Button */}
                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-[#ff7b72] to-[#ff4d4d] text-[#0a0e12] px-6 py-3 rounded font-semibold hover:brightness-110 transition duration-200 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-[#0a0e12]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </>
                    ) : 'Submit Application'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

// Reusable form field component
const FormField = ({ label, id, name, type = 'text', value, onChange, error, required = false, placeholder = '', textarea = false, disabled = false }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium mb-1">
      {label} {required && <span className="text-[#ff7b72]">*</span>}
    </label>
    {textarea ? (
      <textarea
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        rows={3}
        className={`form-textarea ${error ? 'error' : ''}`}
        placeholder={placeholder}
        disabled={disabled}
      />
    ) : (
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        className={`form-input ${error ? 'error' : ''}`}
        placeholder={placeholder}
        disabled={disabled}
      />
    )}
    {error && (
      <p className="mt-1 text-sm text-[#ff7b72]">{error}</p>
    )}
  </div>
);

export default AccessRequestForm;
