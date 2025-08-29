"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ExitIntentPopupProps {
  onClose?: () => void;
}

export default function ExitIntentPopup({ onClose }: ExitIntentPopupProps) {
  const [showPopup, setShowPopup] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 minutes in seconds

  // Exit intent detection
  useEffect(() => {
    let hasShown = false;
    
    const handleMouseLeave = (e: MouseEvent) => {
      // Only trigger if mouse leaves from the top of the screen
      if (e.clientY <= 0 && !hasShown && !isSubmitted) {
        setShowPopup(true);
        hasShown = true;
      }
    };

    // Also trigger on tab visibility change (user switching tabs)
    const handleVisibilityChange = () => {
      if (document.hidden && !hasShown && !isSubmitted) {
        setTimeout(() => {
          if (document.hidden) { // Still hidden after delay
            setShowPopup(true);
            hasShown = true;
          }
        }, 2000);
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [isSubmitted]);

  // Countdown timer
  useEffect(() => {
    if (timeLeft <= 0) return;
    
    const timer = setTimeout(() => {
      setTimeLeft(prevTime => prevTime - 1);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Here you would typically send the email to your backend
    console.log('Email submitted:', email);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsSubmitted(true);
    
    // Auto close after showing success message
    setTimeout(() => {
      handleClose();
    }, 3000);
  };

  const handleClose = () => {
    setShowPopup(false);
    onClose?.();
  };

  // Don't render if already submitted
  if (isSubmitted && !showPopup) {
    return null;
  }

  return (
    <AnimatePresence>
      {showPopup && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }}
        >
          {/* Popup Content */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden"
          >
            {!isSubmitted ? (
              <>
                {/* Header */}
                <div className="bg-gradient-to-r from-red-500 to-red-600 px-6 py-4 text-white relative">
                  <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                  
                  <div className="text-center">
                    <h2 className="text-2xl font-bold mb-1">⚠️ Wait!</h2>
                    <p className="text-red-100">Don&apos;t leave without this...</p>
                  </div>
                </div>

                {/* Content */}
                <div className="px-6 py-6">
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      Get Your FREE Trademark Search
                    </h3>
                    <div className="text-lg text-gray-600 mb-3">
                      Worth <span className="line-through text-red-500">$500</span> <span className="text-green-600 font-bold">FREE</span>
                    </div>
                    <p className="text-gray-600">
                      Find out if your brand name can be trademarked before someone else takes it!
                    </p>
                  </div>

                  {/* Urgency Timer */}
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                    <div className="text-center">
                      <p className="text-sm font-medium text-red-800 mb-2">
                        🔥 Limited Time Offer Expires In:
                      </p>
                      <div className="text-3xl font-bold text-red-600 font-mono">
                        {formatTime(timeLeft)}
                      </div>
                    </div>
                  </div>

                  {/* Benefits */}
                  <div className="mb-6 space-y-2">
                    <div className="flex items-center text-sm text-gray-700">
                      <span className="text-green-500 mr-2">✓</span>
                      Professional trademark database search
                    </div>
                    <div className="flex items-center text-sm text-gray-700">
                      <span className="text-green-500 mr-2">✓</span>
                      Detailed availability report
                    </div>
                    <div className="flex items-center text-sm text-gray-700">
                      <span className="text-green-500 mr-2">✓</span>
                      Expert recommendations
                    </div>
                    <div className="flex items-center text-sm text-gray-700">
                      <span className="text-green-500 mr-2">✓</span>
                      No obligations - completely free
                    </div>
                  </div>

                  {/* Email Form */}
                  <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email for FREE search"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center"
                      />
                    </div>
                    
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white font-bold py-3 px-6 rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-lg"
                    >
                      🎁 Claim My FREE $500 Search
                    </motion.button>
                  </form>

                  <p className="text-xs text-gray-500 text-center mt-3">
                    No spam. Unsubscribe anytime. We respect your privacy.
                  </p>
                </div>
              </>
            ) : (
              /* Success State */
              <div className="px-6 py-8 text-center">
                <div className="text-6xl mb-4">🎉</div>
                <h3 className="text-2xl font-bold text-green-600 mb-3">
                  Success! Check Your Email
                </h3>
                <p className="text-gray-600 mb-4">
                  We&apos;ve sent you the free trademark search form. 
                  You&apos;ll hear back from our experts within 24 hours!
                </p>
                <div className="text-sm text-gray-500">
                  This window will close automatically...
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}