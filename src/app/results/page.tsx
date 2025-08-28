"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Results() {

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
      {/* Header */}
      <header className="w-full py-6 px-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-blue-900">
            Trademark Factory
          </Link>
          <div className="text-sm text-blue-600">
            Quiz Results
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-12">
        {/* Results Summary */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mb-6">
            🎉 Congratulations!
          </h1>
          <p className="text-xl text-blue-700 mb-4">
            Your Brand is Ready for Trademark Protection
          </p>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Based on your quiz responses, your trademark application has excellent potential for success. 
            Watch the video below to learn about our streamlined process and next steps.
          </p>
        </motion.div>

        {/* Video Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden mb-12"
        >
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-2xl font-bold text-blue-900 mb-2">
              📺 How Trademark Protection Works
            </h2>
            <p className="text-gray-600">
              Watch our expert explain the trademark registration process and how we can help protect your brand
            </p>
          </div>
          <div className="aspect-video bg-gradient-to-br from-blue-50 to-blue-100 relative">
            <iframe
              src="https://www.youtube.com/embed/L_LUpnjgPso"
              title="Trademark Protection Process Explained - Complete Guide"
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
            <div className="absolute inset-0 pointer-events-none border-4 border-blue-200 rounded-lg opacity-50" />
          </div>
          <div className="p-4 bg-blue-50">
            <p className="text-sm text-blue-800 text-center">
              ⏱️ 8 minutes • Learn about the complete trademark registration process
            </p>
          </div>
        </motion.div>

        {/* Key Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid md:grid-cols-3 gap-8 mb-12"
        >
          <div className="bg-white rounded-lg p-6 shadow-lg border border-blue-100 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4 mx-auto">
              <span className="text-green-600 text-2xl">✅</span>
            </div>
            <h3 className="text-xl font-semibold text-blue-900 mb-2">High Success Rate</h3>
            <p className="text-gray-600">99% of our applications are successfully registered</p>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-lg border border-blue-100 text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 mx-auto">
              <span className="text-blue-600 text-2xl">⚡</span>
            </div>
            <h3 className="text-xl font-semibold text-blue-900 mb-2">Fast Processing</h3>
            <p className="text-gray-600">Average filing time of 24 hours or less</p>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-lg border border-blue-100 text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4 mx-auto">
              <span className="text-purple-600 text-2xl">🔒</span>
            </div>
            <h3 className="text-xl font-semibold text-blue-900 mb-2">Full Protection</h3>
            <p className="text-gray-600">Comprehensive monitoring and enforcement included</p>
          </div>
        </motion.div>

        {/* Calendly Scheduler */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="bg-white rounded-2xl shadow-xl p-8 md:p-12"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-blue-900 mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-lg text-gray-600">
              Schedule a free consultation with our trademark experts
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div 
              className="calendly-inline-widget rounded-lg overflow-hidden shadow-inner" 
              data-url="https://calendly.com/d/csxz-2r3-2rk/trademark-strategy-call"
              style={{ minWidth: '320px', height: '700px' }}
            />
          </div>

          <div className="text-center mt-8">
            <p className="text-sm text-gray-500">
              🔒 Secure scheduling • No obligation consultation • Free strategy session
            </p>
          </div>
        </motion.div>

        {/* Trust Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-16"
        >
          <p className="text-sm text-gray-500 mb-4">Trusted by entrepreneurs worldwide</p>
          <div className="flex justify-center items-center space-x-8 text-gray-400">
            <span>★★★★★ 4.9/5 Rating</span>
            <span>•</span>
            <span>10,000+ Success Stories</span>
            <span>•</span>
            <span>A+ BBB Rating</span>
          </div>
        </motion.div>
      </main>
    </div>
  );
}