"use client";

import { useState, useEffect, createContext, useContext } from "react";

// A/B Test Configuration
interface ABTest {
  id: string;
  name: string;
  variants: {
    [key: string]: {
      weight: number; // 0-100
      config: any;
    };
  };
  active: boolean;
}

interface AnalyticsEvent {
  event: string;
  properties: { [key: string]: any };
  timestamp: number;
  abTests: { [testId: string]: string }; // which variant user sees
}

// A/B Test Definitions
const AB_TESTS: ABTest[] = [
  {
    id: "exit_intent_timing",
    name: "Exit Intent Popup Timing",
    variants: {
      "immediate": { weight: 33, config: { delay: 0 } },
      "3_seconds": { weight: 33, config: { delay: 3000 } },
      "5_seconds": { weight: 34, config: { delay: 5000 } }
    },
    active: true
  },
  {
    id: "quiz_motivation_frequency",
    name: "Quiz Motivation Frequency",
    variants: {
      "every_answer": { weight: 50, config: { showEvery: 1 } },
      "every_other": { weight: 50, config: { showEvery: 2 } }
    },
    active: true
  },
  {
    id: "timer_duration", 
    name: "Urgency Timer Duration",
    variants: {
      "10_minutes": { weight: 33, config: { duration: 10 * 60 } },
      "15_minutes": { weight: 33, config: { duration: 15 * 60 } },
      "30_minutes": { weight: 34, config: { duration: 30 * 60 } }
    },
    active: true
  },
  {
    id: "headline_style",
    name: "Homepage Headline Style", 
    variants: {
      "fear": { weight: 25, config: { 
        headline: "Don't Let Competitors Steal Your Brand",
        subheadline: "Protect your trademark before it's too late"
      }},
      "benefit": { weight: 25, config: {
        headline: "Get Your Trademark in 90 Days",
        subheadline: "Fast, reliable trademark registration"
      }},
      "social_proof": { weight: 25, config: {
        headline: "Join 10,000+ Protected Brands", 
        subheadline: "Trusted by entrepreneurs worldwide"
      }},
      "curiosity": { weight: 25, config: {
        headline: "The Secret to Trademark Success",
        subheadline: "What 99% of businesses get wrong"
      }}
    },
    active: true
  }
];

// Analytics Context
interface AnalyticsContextType {
  track: (event: string, properties?: { [key: string]: any }) => void;
  getVariant: (testId: string) => string;
  getVariantConfig: (testId: string) => any;
  abTests: { [testId: string]: string };
}

const AnalyticsContext = createContext<AnalyticsContextType | null>(null);

// A/B Test Provider
export function ABTestProvider({ children }: { children: React.ReactNode }) {
  const [abTests, setABTests] = useState<{ [testId: string]: string }>({});
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Initialize A/B tests on client side
    if (typeof window === 'undefined') return;

    const storedTests = localStorage.getItem('ab_tests');
    let userTests: { [testId: string]: string } = {};

    if (storedTests) {
      try {
        userTests = JSON.parse(storedTests);
      } catch (e) {
        console.error('Failed to parse stored A/B tests:', e);
      }
    }

    // Assign user to variants for new tests
    AB_TESTS.forEach(test => {
      if (!test.active) return;
      
      if (!userTests[test.id]) {
        // Assign to variant based on weights
        const random = Math.random() * 100;
        let currentWeight = 0;
        
        for (const [variantId, variant] of Object.entries(test.variants)) {
          currentWeight += variant.weight;
          if (random <= currentWeight) {
            userTests[test.id] = variantId;
            break;
          }
        }
      }
    });

    setABTests(userTests);
    localStorage.setItem('ab_tests', JSON.stringify(userTests));
    setIsInitialized(true);

    // Track initial page view with A/B test assignments
    track('page_view', {
      page: window.location.pathname,
      referrer: document.referrer,
      url: window.location.href
    });
  }, []);

  const track = (event: string, properties: { [key: string]: any } = {}) => {
    if (typeof window === 'undefined') return;

    const analyticsEvent: AnalyticsEvent = {
      event,
      properties: {
        ...properties,
        url: window.location.href,
        user_agent: navigator.userAgent,
        timestamp: Date.now()
      },
      timestamp: Date.now(),
      abTests
    };

    // Store in localStorage for now (in production, send to your analytics service)
    const events = JSON.parse(localStorage.getItem('analytics_events') || '[]');
    events.push(analyticsEvent);
    
    // Keep only last 1000 events
    if (events.length > 1000) {
      events.splice(0, events.length - 1000);
    }
    
    localStorage.setItem('analytics_events', JSON.stringify(events));

    // Send to external analytics (Google Analytics, Mixpanel, etc.)
    if ((window as any).gtag) {
      (window as any).gtag('event', event, {
        ...properties,
        custom_parameter_ab_tests: JSON.stringify(abTests)
      });
    }

    console.log('📊 Analytics Event:', analyticsEvent);
  };

  const getVariant = (testId: string): string => {
    return abTests[testId] || 'default';
  };

  const getVariantConfig = (testId: string): any => {
    const variant = getVariant(testId);
    const test = AB_TESTS.find(t => t.id === testId);
    return test?.variants[variant]?.config || {};
  };

  if (!isInitialized) {
    return null; // Don't render until A/B tests are initialized
  }

  return (
    <AnalyticsContext.Provider value={{ track, getVariant, getVariantConfig, abTests }}>
      {children}
    </AnalyticsContext.Provider>
  );
}

// Hook to use analytics
export function useAnalytics() {
  const context = useContext(AnalyticsContext);
  if (!context) {
    throw new Error('useAnalytics must be used within ABTestProvider');
  }
  return context;
}

// Hook for specific A/B test
export function useABTest(testId: string) {
  const { getVariant, getVariantConfig } = useAnalytics();
  return {
    variant: getVariant(testId),
    config: getVariantConfig(testId),
    isVariant: (variantId: string) => getVariant(testId) === variantId
  };
}

// Analytics Dashboard Component (for development)
export function AnalyticsDashboard() {
  const [events, setEvents] = useState<AnalyticsEvent[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const storedEvents = JSON.parse(localStorage.getItem('analytics_events') || '[]');
    setEvents(storedEvents);
  }, []);

  if (process.env.NODE_ENV !== 'development') {
    return null; // Only show in development
  }

  const eventCounts = events.reduce((acc, event) => {
    acc[event.event] = (acc[event.event] || 0) + 1;
    return acc;
  }, {} as { [key: string]: number });

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 left-4 bg-purple-600 text-white p-2 rounded-full shadow-lg z-50"
        title="Analytics Dashboard"
      >
        📊
      </button>

      {isOpen && (
        <div className="fixed bottom-16 left-4 bg-white border border-gray-200 rounded-lg shadow-xl p-4 max-w-sm z-50">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-bold">📊 Analytics</h3>
            <button onClick={() => setIsOpen(false)} className="text-gray-500">×</button>
          </div>
          
          <div className="space-y-2">
            <div>
              <strong>Events ({events.length} total):</strong>
              {Object.entries(eventCounts).map(([event, count]) => (
                <div key={event} className="text-xs flex justify-between">
                  <span>{event}:</span>
                  <span>{count}</span>
                </div>
              ))}
            </div>
            
            <div>
              <strong>A/B Tests:</strong>
              {AB_TESTS.map(test => (
                <div key={test.id} className="text-xs">
                  {test.name}: <span className="font-mono">{test.id}</span>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => {
              localStorage.removeItem('analytics_events');
              setEvents([]);
            }}
            className="mt-3 text-xs bg-red-100 text-red-600 px-2 py-1 rounded"
          >
            Clear Data
          </button>
        </div>
      )}
    </>
  );
}

// Export types for use in other components
export type { AnalyticsEvent, ABTest };