"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Russell Brunson's Value Stack Component
export function ValueStack() {
  const stackItems = [
    { item: "Professional Trademark Search", value: "$500", strikethrough: true },
    { item: "Expert Legal Consultation (30 min)", value: "$350", strikethrough: true },
    { item: "Application Filing & Strategy", value: "$1,500", strikethrough: true },
    { item: "USPTO Communication Handling", value: "$800", strikethrough: true },
    { item: "Trademark Monitoring (1 year)", value: "$600", strikethrough: true },
    { item: "Brand Protection Guide (PDF)", value: "$97", strikethrough: true },
  ];

  const totalValue = 3847;
  const todayPrice = 297;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white border-2 border-yellow-400 rounded-lg p-6 shadow-xl"
    >
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          🎁 What You Get Today (Complete Value Stack)
        </h3>
        <p className="text-gray-600">Everything you need for trademark success</p>
      </div>

      <div className="space-y-3 mb-6">
        {stackItems.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex justify-between items-center py-2 border-b border-gray-100"
          >
            <span className="text-gray-700">{item.item}</span>
            <span className={`font-bold ${item.strikethrough ? 'line-through text-red-500' : 'text-green-600'}`}>
              ${item.value}
            </span>
          </motion.div>
        ))}
      </div>

      <div className="border-t-2 border-yellow-400 pt-4 mb-4">
        <div className="flex justify-between text-xl font-bold mb-2">
          <span>Total Value:</span>
          <span className="line-through text-red-500">${totalValue.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-2xl font-bold text-green-600">
          <span>Your Investment Today:</span>
          <span className="bg-yellow-100 px-3 py-1 rounded">${todayPrice}</span>
        </div>
      </div>

      <div className="text-center text-sm text-gray-600">
        <p>🚀 <strong>Save ${totalValue - todayPrice}</strong> when you act now!</p>
      </div>
    </motion.div>
  );
}

// Social Proof with Russell's "Proof" methodology
export function SocialProofElement() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  
  const testimonials = [
    {
      name: "Sarah Chen",
      company: "TechFlow Solutions",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612c633?w=60&h=60&fit=crop&crop=face",
      text: "Mike's team got my trademark approved in just 8 months. Now I have 3 registered trademarks and my business valuation increased by $2M!",
      result: "🚀 Business valuation +$2M",
      verified: true
    },
    {
      name: "David Rodriguez", 
      company: "Rodriguez Consulting",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face",
      text: "I was about to lose my brand name to a competitor. Trademark Factory saved my business and helped me secure funding!",
      result: "💰 Secured $500K funding",
      verified: true
    },
    {
      name: "Jessica Park",
      company: "Park Beauty Co.",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=60&h=60&fit=crop&crop=face", 
      text: "From application to approval, everything was handled perfectly. Now my brand is protected across 15 states!",
      result: "🛡️ Protected in 15 states",
      verified: true
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-lg font-bold text-blue-900">✨ Success Stories</h4>
        <div className="text-sm text-blue-600">
          🔄 {currentTestimonial + 1} of {testimonials.length}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentTestimonial}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.5 }}
          className="space-y-4"
        >
          <div className="flex items-start space-x-4">
            <img 
              src={testimonials[currentTestimonial].image}
              alt={testimonials[currentTestimonial].name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h5 className="font-bold text-gray-900">{testimonials[currentTestimonial].name}</h5>
                {testimonials[currentTestimonial].verified && (
                  <span className="text-blue-500 text-sm">✅ Verified</span>
                )}
              </div>
              <p className="text-sm text-gray-600 mb-1">{testimonials[currentTestimonial].company}</p>
              <p className="text-gray-700 italic">&quot;{testimonials[currentTestimonial].text}&quot;</p>
              <p className="text-green-600 font-bold text-sm mt-2">{testimonials[currentTestimonial].result}</p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="flex justify-center mt-4 space-x-2">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentTestimonial(index)}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentTestimonial ? 'bg-blue-600' : 'bg-blue-200'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

// Scarcity Counter (Russell's favorite!)
export function ScarcityCounter() {
  const [spotsLeft, setSpotsLeft] = useState(() => {
    // Simulate real scarcity - start with 8-15 spots
    return Math.floor(Math.random() * 8) + 8;
  });
  
  const [recentActions, setRecentActions] = useState<string[]>([]);

  useEffect(() => {
    // Simulate spots being taken
    const interval = setInterval(() => {
      if (spotsLeft > 3 && Math.random() < 0.3) { // 30% chance every 30 seconds
        setSpotsLeft(prev => prev - 1);
        
        const actions = [
          "Someone in New York just booked a consultation",
          "A business in California secured their trademark slot", 
          "Someone in Texas just started their application",
          "A startup in Florida just claimed their spot"
        ];
        
        const randomAction = actions[Math.floor(Math.random() * actions.length)];
        setRecentActions(prev => [randomAction, ...prev].slice(0, 3));
      }
    }, 30000); // Every 30 seconds

    return () => clearInterval(interval);
  }, [spotsLeft]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-red-50 border-2 border-red-200 rounded-lg p-4"
    >
      <div className="text-center mb-3">
        <div className="text-3xl font-bold text-red-600 mb-1">
          {spotsLeft} SPOTS LEFT
        </div>
        <p className="text-red-700 font-medium">This Week Only - Limited Availability</p>
      </div>

      {recentActions.length > 0 && (
        <div className="border-t border-red-200 pt-3 mt-3">
          <p className="text-xs text-red-600 font-medium mb-2">🔥 Recent Activity:</p>
          {recentActions.map((action, index) => (
            <motion.p
              key={index}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xs text-red-700 mb-1"
            >
              • {action}
            </motion.p>
          ))}
        </div>
      )}

      <div className="mt-3 text-center">
        <p className="text-xs text-red-600">
          ⚠️ Spots fill up fast - secure yours now
        </p>
      </div>
    </motion.div>
  );
}

// Risk Reversal (Money Back Guarantee)
export function RiskReversal() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-green-50 border border-green-200 rounded-lg p-6 text-center"
    >
      <div className="text-4xl mb-3">🛡️</div>
      <h3 className="text-xl font-bold text-green-800 mb-2">
        100% Money-Back Guarantee
      </h3>
      <p className="text-green-700 mb-4">
        If your trademark isn&apos;t approved, you get every penny back. No questions asked.
      </p>
      <div className="flex justify-center space-x-6 text-sm text-green-600">
        <div className="flex items-center">
          <span className="mr-1">✅</span> No Risk
        </div>
        <div className="flex items-center">
          <span className="mr-1">✅</span> Full Refund
        </div>
        <div className="flex items-center">
          <span className="mr-1">✅</span> 99% Success Rate
        </div>
      </div>
    </motion.div>
  );
}

// Story Hook Component
export function StoryHook() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg p-8 mb-8"
    >
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          The $2 Million Dollar Mistake That Changed Everything...
        </h2>
        <p className="text-lg text-blue-100 mb-6 leading-relaxed">
          In 2018, a tech startup was about to close a $5M funding round. Then their biggest competitor 
          filed for THEIR trademark. The deal fell through. The company folded. All because they didn&apos;t 
          protect their brand name for $500.
        </p>
        <div className="bg-white/10 rounded-lg p-4 mb-6">
          <p className="text-yellow-200 font-bold">
            &quot;I lost everything because I thought trademark was just paperwork. 
            Don&apos;t make my mistake.&quot; - Anonymous Founder
          </p>
        </div>
        <p className="text-blue-100">
          👇 Take this quiz to make sure YOUR brand is protected 👇
        </p>
      </div>
    </motion.div>
  );
}