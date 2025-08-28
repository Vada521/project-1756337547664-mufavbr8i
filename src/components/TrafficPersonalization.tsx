"use client";

import { useEffect, useState } from "react";

// interface TrafficSource {
//   source: string;
//   keyword?: string;
//   campaign?: string;
// }

interface PersonalizationContent {
  headline: string;
  subheadline: string;
  urgency: string;
  buttonText: string;
  focusArea: string;
}

const personalizationMap: { [key: string]: PersonalizationContent } = {
  'trademark-registration': {
    headline: 'Fast-Track Your Trademark Registration',
    subheadline: 'Complete the process in 7-10 months with our proven system',
    urgency: '⚡ File your application within 24 hours',
    buttonText: 'Start Registration Process',
    focusArea: 'process'
  },
  'trademark-cost': {
    headline: 'Affordable Trademark Protection',
    subheadline: 'Transparent pricing • No hidden fees • Money-back guarantee',
    urgency: '💰 Lock in today\'s rates - prices increase next month',
    buttonText: 'See Pricing & Save',
    focusArea: 'cost'
  },
  'protect-brand-name': {
    headline: 'Protect Your Brand Before It\'s Too Late',
    subheadline: 'Don\'t let competitors steal your brand identity and customers',
    urgency: '🚨 Every day unprotected is a risk to your business',
    buttonText: 'Protect My Brand Now',
    focusArea: 'protection'
  },
  'trademark-search': {
    headline: 'Free Professional Trademark Search',
    subheadline: 'Find out if your brand name is available before filing',
    urgency: '🔍 Get results in 24 hours - limited spots available',
    buttonText: 'Get Free Search',
    focusArea: 'search'
  },
  'trademark-lawyer': {
    headline: 'Expert Trademark Attorneys',
    subheadline: '99% success rate • 10+ years experience • Personalized service',
    urgency: '👨‍💼 Book consultation with senior attorney this week',
    buttonText: 'Speak to Attorney',
    focusArea: 'expertise'
  },
  'default': {
    headline: 'Protect Your Brand with Confidence',
    subheadline: 'Take our quiz to discover your trademark readiness',
    urgency: '✨ Join 10,000+ successful trademark applications',
    buttonText: 'Start Your Quiz',
    focusArea: 'general'
  }
};

export function useTrafficPersonalization(): PersonalizationContent {
  const [content, setContent] = useState<PersonalizationContent>(personalizationMap.default);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Get traffic source from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const utmSource = urlParams.get('utm_source');
    const utmCampaign = urlParams.get('utm_campaign');
    const keyword = urlParams.get('q') || urlParams.get('keyword');
    
    // Get referrer
    const referrer = document.referrer;
    
    // Determine personalization key
    let personalizationKey = 'default';
    
    if (keyword) {
      if (keyword.includes('cost') || keyword.includes('price') || keyword.includes('fee')) {
        personalizationKey = 'trademark-cost';
      } else if (keyword.includes('registration') || keyword.includes('register')) {
        personalizationKey = 'trademark-registration';
      } else if (keyword.includes('protect') || keyword.includes('protection')) {
        personalizationKey = 'protect-brand-name';
      } else if (keyword.includes('search') || keyword.includes('check')) {
        personalizationKey = 'trademark-search';
      } else if (keyword.includes('lawyer') || keyword.includes('attorney')) {
        personalizationKey = 'trademark-lawyer';
      }
    } else if (utmCampaign) {
      if (personalizationMap[utmCampaign]) {
        personalizationKey = utmCampaign;
      }
    }
    
    setContent(personalizationMap[personalizationKey]);
    
    // Store for analytics
    if (window.localStorage) {
      window.localStorage.setItem('traffic_personalization', JSON.stringify({
        key: personalizationKey,
        source: utmSource,
        campaign: utmCampaign,
        keyword: keyword,
        referrer: referrer,
        timestamp: new Date().toISOString()
      }));
    }
  }, []);

  return content;
}

export function getTrafficInsights() {
  if (typeof window === 'undefined' || !window.localStorage) return null;
  
  try {
    const stored = window.localStorage.getItem('traffic_personalization');
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
}