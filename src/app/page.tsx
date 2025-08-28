"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useTrafficPersonalization } from "@/components/TrafficPersonalization";
import { QueryBasedLayout, useQueryVariation } from "@/components/QueryBasedVariations";
import { useAnalytics, useABTest } from "@/components/ABTestFramework";
import { RiskReversal } from "@/components/BrunsonElements";

export default function Home() {
  const personalization = useTrafficPersonalization();
  const { variation } = useQueryVariation();
  const { track } = useAnalytics();
  const headlineTest = useABTest('headline_style');

  // If we have a query variation, use that layout
  if (variation) {
    return (
      <QueryBasedLayout>
        <QuizCTASection />
      </QueryBasedLayout>
    );
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
      {/* Header */}
      <header className="w-full py-6 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-2xl font-bold text-blue-900"
          >
            Trademark Factory
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-sm text-blue-600"
          >
            FastTrack Quiz
          </motion.div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold text-blue-900 mb-6"
          >
            {headlineTest.config.headline || personalization.headline}
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-blue-700 mb-4"
          >
            {headlineTest.config.subheadline || personalization.subheadline}
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="bg-gradient-to-r from-orange-100 to-red-100 border border-orange-200 rounded-lg p-4 mb-8 max-w-2xl mx-auto"
          >
            <p className="text-orange-800 font-medium text-center">
              {personalization.urgency}
            </p>
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto"
          >
            Take our comprehensive quiz to discover if your brand is ready for trademark protection 
            and get personalized guidance for your intellectual property journey.
          </motion.p>

          {/* Benefits Cards */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="grid md:grid-cols-3 gap-8 mb-16"
          >
            <div className="bg-white rounded-lg p-6 shadow-lg border border-blue-100">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                <span className="text-blue-600 text-xl">🛡️</span>
              </div>
              <h3 className="text-xl font-semibold text-blue-900 mb-2">Brand Protection</h3>
              <p className="text-gray-600">Secure your brand identity and prevent unauthorized use</p>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-lg border border-blue-100">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                <span className="text-blue-600 text-xl">⚡</span>
              </div>
              <h3 className="text-xl font-semibold text-blue-900 mb-2">Fast Process</h3>
              <p className="text-gray-600">Streamlined application process with expert guidance</p>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-lg border border-blue-100">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                <span className="text-blue-600 text-xl">✅</span>
              </div>
              <h3 className="text-xl font-semibold text-blue-900 mb-2">Expert Support</h3>
              <p className="text-gray-600">Professional legal support throughout the entire process</p>
            </div>
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Link 
              href="/quiz"
              onClick={() => track('cta_click', { 
                location: 'hero', 
                variant: headlineTest.variant,
                personalization: personalization.focusArea 
              })}
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-xl font-semibold rounded-full shadow-lg hover:from-blue-700 hover:to-blue-800 transform hover:scale-105 transition-all duration-300"
            >
              {personalization.buttonText}
              <span className="ml-2">→</span>
            </Link>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="mt-16 text-center"
          >
            <p className="text-sm text-gray-500 mb-4">Trusted by thousands of businesses</p>
            <div className="flex justify-center items-center space-x-8 text-gray-400">
              <span>★★★★★ 4.9/5 Rating</span>
              <span>•</span>
              <span>10,000+ Trademarks Filed</span>
              <span>•</span>
              <span>99% Success Rate</span>
            </div>
          </motion.div>

          {/* Risk Reversal */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="mt-16"
          >
            <RiskReversal />
          </motion.div>
        </div>
      </main>
    </div>
  );
}

// Quiz CTA Section for query-based variations
function QuizCTASection() {
  const { track } = useAnalytics();
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-xl p-8 md:p-12 text-center"
    >
      <h2 className="text-3xl font-bold text-gray-900 mb-4">
        Get Your Personalized Trademark Strategy
      </h2>
      <p className="text-lg text-gray-600 mb-8">
        Take our 2-minute quiz to get a custom plan for your brand protection
      </p>
      
      <Link
        href="/quiz"
        onClick={() => track('quiz_start', { location: 'query_variation' })}
        className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-xl font-semibold rounded-full shadow-lg hover:from-blue-700 hover:to-blue-800 transform hover:scale-105 transition-all duration-300"
      >
        Start My Custom Quiz →
      </Link>
    </motion.div>
  );
}
