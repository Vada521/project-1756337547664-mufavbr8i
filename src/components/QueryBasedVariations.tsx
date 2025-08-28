"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { StoryHook, ValueStack, SocialProofElement, ScarcityCounter } from "./BrunsonElements";

interface QueryVariation {
  id: string;
  keywords: string[];
  intent: 'cost' | 'speed' | 'protection' | 'search' | 'legal' | 'competitor';
  hero: {
    headline: string;
    subheadline: string;
    urgency: string;
    buttonText: string;
    backgroundColor: string;
    showStory?: boolean;
  };
  layout: {
    showValueStack: boolean;
    showScarcity: boolean;
    showSocialProof: boolean;
    primaryColor: string;
  };
  quiz: {
    firstQuestionOverride?: string;
    progressText: string;
  };
}

const QUERY_VARIATIONS: QueryVariation[] = [
  {
    id: 'cost_focused',
    keywords: ['cost', 'price', 'fee', 'cheap', 'affordable', 'budget', 'how much'],
    intent: 'cost',
    hero: {
      headline: 'Affordable Trademark Protection',
      subheadline: 'Transparent pricing • No hidden fees • Payment plans available',
      urgency: '💰 Lock in 2024 rates - prices increase 15% next month',
      buttonText: 'See Pricing & Save Money',
      backgroundColor: 'from-green-500 to-emerald-600',
    },
    layout: {
      showValueStack: true, // Most important for cost-conscious
      showScarcity: true,
      showSocialProof: true,
      primaryColor: 'green'
    },
    quiz: {
      firstQuestionOverride: 'What\'s your budget for trademark protection?',
      progressText: 'Calculating your custom pricing...'
    }
  },
  {
    id: 'speed_focused', 
    keywords: ['fast', 'quick', 'speed', 'urgent', 'rush', 'asap', 'emergency'],
    intent: 'speed',
    hero: {
      headline: 'Emergency Trademark Filing',
      subheadline: 'Get your application filed within 24 hours • Express processing available',
      urgency: '🚨 URGENT: File today before your competitor does',
      buttonText: 'File My Trademark NOW',
      backgroundColor: 'from-red-500 to-red-600',
    },
    layout: {
      showValueStack: false,
      showScarcity: true, // High urgency
      showSocialProof: true,
      primaryColor: 'red'
    },
    quiz: {
      progressText: 'Fast-tracking your application process...'
    }
  },
  {
    id: 'protection_focused',
    keywords: ['protect', 'protection', 'secure', 'safe', 'steal', 'copy', 'infringement'],
    intent: 'protection', 
    hero: {
      headline: 'Stop Trademark Theft Before It Happens',
      subheadline: 'Don\'t let competitors steal your customers with copycat brands',
      urgency: '⚠️ Every day unprotected puts your business at risk',
      buttonText: 'Protect My Brand Now',
      backgroundColor: 'from-blue-600 to-blue-800',
      showStory: true, // Story about losing $2M
    },
    layout: {
      showValueStack: false,
      showScarcity: false,
      showSocialProof: true,
      primaryColor: 'blue'
    },
    quiz: {
      firstQuestionOverride: 'How exposed is your brand to competitors?',
      progressText: 'Building your protection strategy...'
    }
  },
  {
    id: 'search_focused',
    keywords: ['search', 'check', 'available', 'lookup', 'database', 'existing'],
    intent: 'search',
    hero: {
      headline: 'FREE Professional Trademark Search',
      subheadline: 'Find out if your name is available before you file • Get results in 24hrs',
      urgency: '🔍 Limited: Only 50 free searches per week',
      buttonText: 'Get My FREE Search',
      backgroundColor: 'from-purple-500 to-purple-600',
    },
    layout: {
      showValueStack: false,
      showScarcity: true, // Limited searches
      showSocialProof: true,
      primaryColor: 'purple'
    },
    quiz: {
      firstQuestionOverride: 'What brand name do you want to search?',
      progressText: 'Searching trademark database...'
    }
  },
  {
    id: 'legal_focused',
    keywords: ['lawyer', 'attorney', 'legal', 'expert', 'professional', 'consultation'],
    intent: 'legal',
    hero: {
      headline: 'Expert Trademark Attorneys',
      subheadline: '15+ years experience • 99% approval rate • Personalized legal strategy',
      urgency: '👨‍💼 Book consultation with senior partner this week',
      buttonText: 'Speak to Attorney Today',
      backgroundColor: 'from-indigo-600 to-indigo-800',
    },
    layout: {
      showValueStack: false,
      showScarcity: true,
      showSocialProof: true,
      primaryColor: 'indigo'
    },
    quiz: {
      firstQuestionOverride: 'What legal challenges are you facing?',
      progressText: 'Matching you with the right attorney...'
    }
  },
  {
    id: 'competitor_focused',
    keywords: ['competitor', 'someone else', 'taken', 'similar', 'conflict', 'dispute'],
    intent: 'competitor',
    hero: {
      headline: 'Beat Your Competition to the Trademark Office',
      subheadline: 'File first, win the rights • Don\'t let others claim your brand',
      urgency: '🏁 Race against time - competitors are filing daily',
      buttonText: 'File Before Competition',
      backgroundColor: 'from-orange-500 to-red-500',
      showStory: true,
    },
    layout: {
      showValueStack: false,
      showScarcity: true,
      showSocialProof: true,
      primaryColor: 'orange'
    },
    quiz: {
      firstQuestionOverride: 'Are competitors using similar brand names?',
      progressText: 'Analyzing competitive landscape...'
    }
  }
];

export function useQueryVariation() {
  const [variation, setVariation] = useState<QueryVariation | null>(null);
  const [query, setQuery] = useState<string>('');

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Get search query from multiple sources
    const urlParams = new URLSearchParams(window.location.search);
    const searchQuery = (
      urlParams.get('q') || 
      urlParams.get('query') || 
      urlParams.get('keyword') || 
      urlParams.get('utm_term') ||
      document.referrer.includes('google.com') ? extractGoogleQuery(document.referrer) : ''
    ).toLowerCase();

    setQuery(searchQuery);

    if (!searchQuery) {
      setVariation(null);
      return;
    }

    // Find matching variation
    const matchedVariation = QUERY_VARIATIONS.find(variation =>
      variation.keywords.some(keyword => searchQuery.includes(keyword))
    );

    setVariation(matchedVariation || null);

    // Track the variation selection
    if (typeof window !== 'undefined' && window.localStorage) {
      const trackingData = {
        query: searchQuery,
        variation: matchedVariation?.id || 'default',
        timestamp: new Date().toISOString()
      };
      
      localStorage.setItem('query_variation_tracking', JSON.stringify(trackingData));
    }

  }, []);

  return { variation, query };
}

// Extract search query from Google referrer
function extractGoogleQuery(referrer: string): string {
  try {
    const url = new URL(referrer);
    return url.searchParams.get('q') || '';
  } catch {
    return '';
  }
}

// Main component that renders different layouts based on query
export function QueryBasedLayout({ children }: { children: React.ReactNode }) {
  const { variation, query } = useQueryVariation();

  if (!variation) {
    return <div>{children}</div>; // Default layout
  }

  const colorClasses = {
    green: 'text-green-600 border-green-200 bg-green-50',
    red: 'text-red-600 border-red-200 bg-red-50', 
    blue: 'text-blue-600 border-blue-200 bg-blue-50',
    purple: 'text-purple-600 border-purple-200 bg-purple-50',
    indigo: 'text-indigo-600 border-indigo-200 bg-indigo-50',
    orange: 'text-orange-600 border-orange-200 bg-orange-50'
  };

  return (
    <div className="query-variation-layout">
      {/* Debug info - only in development */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed top-0 left-0 bg-black text-white text-xs p-2 z-50">
          Query: "{query}" | Variation: {variation.id}
        </div>
      )}

      {/* Custom Hero Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={`bg-gradient-to-r ${variation.hero.backgroundColor} text-white py-16 px-4`}
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold mb-4"
          >
            {variation.hero.headline}
          </motion.h1>
          
          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl mb-6 text-white/90"
          >
            {variation.hero.subheadline}
          </motion.p>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-white/10 border border-white/20 rounded-lg p-4 mb-8 max-w-2xl mx-auto"
          >
            <p className="font-bold text-yellow-200 text-lg">
              {variation.hero.urgency}
            </p>
          </motion.div>

          <motion.button
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-gray-900 text-xl font-bold py-4 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            onClick={() => {
              document.getElementById('quiz-section')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            {variation.hero.buttonText} →
          </motion.button>
        </div>
      </motion.div>

      {/* Story Hook - only for certain variations */}
      {variation.hero.showStory && (
        <div className="max-w-6xl mx-auto px-4 py-8">
          <StoryHook />
        </div>
      )}

      {/* Dynamic Content Grid */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div id="quiz-section">
              {children}
            </div>
          </div>

          {/* Sidebar - conditional content */}
          <div className="space-y-8">
            {variation.layout.showScarcity && <ScarcityCounter />}
            {variation.layout.showSocialProof && <SocialProofElement />}
            {variation.layout.showValueStack && <ValueStack />}
          </div>
        </div>
      </div>

      {/* Query-specific CSS variables */}
      <style jsx global>{`
        :root {
          --primary-color: var(--color-${variation.layout.primaryColor}-600);
          --primary-light: var(--color-${variation.layout.primaryColor}-100);
        }
      `}</style>
    </div>
  );
}

// Export variation data for other components to use
export { QUERY_VARIATIONS };