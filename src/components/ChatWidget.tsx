"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

declare global {
  interface Window {
    Calendly: {
      initInlineWidget: (options: { url: string; parentElement: Element }) => void;
    };
  }
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [showInitialMessage, setShowInitialMessage] = useState(false);
  const [showCalendly, setShowCalendly] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  // Show initial message after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowInitialMessage(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  // Initialize Calendly widget when it becomes visible
  useEffect(() => {
    if (showCalendly && typeof window !== 'undefined' && window.Calendly) {
      const calendlyElement = document.querySelector('.calendly-inline-widget');
      if (calendlyElement) {
        window.Calendly.initInlineWidget({
          url: 'https://calendly.com/d/csxz-2r3-2rk/trademark-strategy-call',
          parentElement: calendlyElement
        });
      }
    }
  }, [showCalendly]);

  const handleOpenChat = () => {
    setIsOpen(true);
    setShowInitialMessage(false);
  };

  const handleUserMessage = () => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setShowCalendly(true);
    }, 2000);
  };

  return (
    <>
      {/* Initial message bubble */}
      <AnimatePresence>
        {showInitialMessage && !isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 50, y: 20 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, x: 50, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed bottom-24 right-6 z-40"
          >
            <div className="bg-white rounded-2xl shadow-xl border border-blue-100 p-4 max-w-xs cursor-pointer"
                 onClick={handleOpenChat}>
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                  <Image 
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"
                    alt="Support Agent"
                    width={40}
                    height={40}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 mb-1">Mike Johnson</p>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Hi! Would you like to schedule a call about your trademark case?
                  </p>
                </div>
              </div>
              <div className="mt-2 flex justify-end">
                <span className="text-xs text-gray-400">Just now</span>
              </div>
            </div>
            {/* Close button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowInitialMessage(false);
              }}
              className="absolute -top-2 -right-2 w-6 h-6 bg-gray-400 hover:bg-gray-500 text-white rounded-full flex items-center justify-center text-xs transition-colors"
            >
              ×
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: 20, y: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, x: 20, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className={`fixed bottom-24 right-6 z-50 max-w-[calc(100vw-2rem)] ${showCalendly ? 'w-[480px]' : 'w-96'}`}
          >
            <div className="bg-white rounded-2xl shadow-2xl border border-blue-100 overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4 text-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden">
                      <Image 
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"
                        alt="Support Agent"
                        width={40}
                        height={40}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold">Mike Johnson</h3>
                      <p className="text-sm text-blue-100">Trademark Specialist</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-blue-100 hover:text-white transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div className={`p-4 overflow-y-auto bg-gray-50 ${showCalendly ? 'h-[600px]' : 'h-80'}`}>
                {/* Agent message */}
                <div className="mb-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                      <Image 
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face"
                        alt="Support Agent"
                        width={32}
                        height={32}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="bg-white rounded-2xl rounded-tl-md px-4 py-3 max-w-xs shadow-sm">
                      <p className="text-sm text-gray-800">
                        Hi there! I&apos;m Mike from Trademark Factory. Would you like to schedule a call to discuss your trademark case? I can help you understand the process and next steps.
                      </p>
                      <span className="text-xs text-gray-500 mt-1 block">Just now</span>
                    </div>
                  </div>
                </div>

                {/* Typing indicator */}
                {isTyping && (
                  <div className="mb-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                        <Image 
                          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face"
                          alt="Support Agent"
                          width={32}
                          height={32}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="bg-white rounded-2xl rounded-tl-md px-4 py-3 shadow-sm">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Calendly Widget */}
                {showCalendly && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-4"
                  >
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                        <Image 
                          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face"
                          alt="Support Agent"
                          width={32}
                          height={32}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="bg-white rounded-2xl rounded-tl-md px-2 py-3 flex-1 shadow-sm">
                        <p className="text-sm text-gray-800 mb-3 px-2">
                          Perfect! Choose a convenient time for your trademark strategy call:
                        </p>
                        <div 
                          className="calendly-inline-widget rounded-lg overflow-hidden" 
                          data-url="https://calendly.com/d/csxz-2r3-2rk/trademark-strategy-call"
                          style={{ minWidth: '320px', height: '500px' }}
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Input Area */}
              {!showCalendly && (
                <div className="p-4 border-t border-gray-100 bg-white">
                  <div className="flex space-x-3">
                    <input
                      type="text"
                      placeholder="Type your message..."
                      className="flex-1 px-4 py-2 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          handleUserMessage();
                        }
                      }}
                    />
                    <button
                      onClick={handleUserMessage}
                      className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Toggle Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, type: "spring", stiffness: 300, damping: 25 }}
        onClick={handleOpenChat}
        className={`fixed bottom-6 right-6 z-40 w-14 h-14 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full shadow-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 flex items-center justify-center ${
          isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </motion.div>
        
        {/* Pulse effect */}
        <div className="absolute inset-0 rounded-full bg-blue-600 opacity-30 animate-ping"></div>
      </motion.button>
    </>
  );
}