"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

interface Question {
  id: number;
  question: string;
  options: string[];
  description?: string;
}

const questions: Question[] = [
  {
    id: 1,
    question: "What type of trademark are you looking to register?",
    options: ["Word Mark (text only)", "Design Mark (logo/image)", "Combined Mark (text + logo)", "I'm not sure"],
    description: "Understanding the type of trademark helps us guide you through the right process."
  },
  {
    id: 2,
    question: "How long have you been using your brand name or logo in business?",
    options: ["Less than 6 months", "6 months to 1 year", "1-3 years", "More than 3 years"],
    description: "Prior use can strengthen your trademark application and establish rights."
  },
  {
    id: 3,
    question: "In which industries or categories will you use your trademark?",
    options: ["Technology/Software", "Retail/Consumer Products", "Professional Services", "Food & Beverage", "Multiple industries"],
    description: "Trademark protection is category-specific, so we need to identify the right classes."
  },
  {
    id: 4,
    question: "Have you conducted a trademark search to check for similar marks?",
    options: ["Yes, extensively", "Yes, basic search", "No, but planning to", "No, I need help with this"],
    description: "A comprehensive search is crucial to avoid conflicts with existing trademarks."
  },
  {
    id: 5,
    question: "Are you currently using your trademark in interstate commerce?",
    options: ["Yes, across multiple states", "Yes, but limited states", "No, but planning to soon", "I'm not sure what this means"],
    description: "Interstate use affects your filing strategy and the strength of your application."
  },
  {
    id: 6,
    question: "What's your primary goal for trademark protection?",
    options: ["Prevent competitors from copying", "Expand business nationally", "Protect before product launch", "Investment/funding requirements"],
    description: "Your goals help us recommend the best protection strategy for your business."
  }
];

const motivationalMessages = [
  "Great start! You're taking the right steps to protect your brand 🚀",
  "Excellent! This information helps us customize your trademark strategy 💡",
  "Perfect! You're building a strong foundation for trademark protection 🏗️",
  "Amazing progress! We're getting closer to your personalized recommendation 🎯",
  "Outstanding! Your trademark application is looking more promising 📈",
  "Final question! You're about to unlock your trademark success plan 🎉"
];

const progressMessages = [
  "You're 17% closer to trademark protection!",
  "You're 33% closer to trademark protection!",
  "You're 50% closer to trademark protection!",
  "You're 67% closer to trademark protection!",
  "You're 83% closer to trademark protection!",
  "You're ready for trademark success!"
];

export default function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [direction, setDirection] = useState(1);
  const [showMotivation, setShowMotivation] = useState(false);

  const handleAnswer = (answer: string) => {
    setAnswers(prev => ({
      ...prev,
      [questions[currentQuestion].id]: answer
    }));

    // Show motivational message
    setShowMotivation(true);
    
    setTimeout(() => {
      setShowMotivation(false);
      
      if (currentQuestion < questions.length - 1) {
        setDirection(1);
        setCurrentQuestion(prev => prev + 1);
      } else {
        // Quiz completed, redirect to results
        setTimeout(() => {
          window.location.href = '/results';
        }, 1500);
      }
    }, 2000);
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setDirection(-1);
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
      {/* Header */}
      <header className="w-full py-6 px-4">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-blue-900">
            Trademark Factory
          </Link>
          <div className="text-sm text-blue-600">
            Question {currentQuestion + 1} of {questions.length}
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="max-w-4xl mx-auto px-4 mb-8">
        <div className="w-full bg-blue-100 rounded-full h-3 overflow-hidden shadow-inner">
          <motion.div
            className="bg-gradient-to-r from-blue-600 via-blue-500 to-blue-700 h-full rounded-full relative"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.8, type: "spring", stiffness: 100, damping: 20 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-pulse" />
          </motion.div>
        </div>
        <div className="flex justify-between mt-2 text-sm">
          <span className="text-blue-600 font-medium">{progressMessages[currentQuestion]}</span>
          <span className="text-blue-500">{questions.length - currentQuestion - 1} questions remaining</span>
        </div>
      </div>

      {/* Motivational Overlay */}
      <AnimatePresence>
        {showMotivation && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-blue-900 bg-opacity-90"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="bg-white rounded-2xl p-8 mx-4 max-w-md text-center shadow-2xl"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 400, damping: 10 }}
                className="text-6xl mb-4"
              >
                ✨
              </motion.div>
              <h3 className="text-2xl font-bold text-blue-900 mb-3">
                {motivationalMessages[currentQuestion]}
              </h3>
              <p className="text-gray-600 mb-4">
                {progressMessages[currentQuestion]}
              </p>
              <div className="w-full bg-blue-100 rounded-full h-2">
                <motion.div
                  className="bg-gradient-to-r from-blue-600 to-blue-700 h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Quiz Content */}
      <main className="max-w-4xl mx-auto px-4 pb-16">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentQuestion}
            custom={direction}
            initial={{ opacity: 0, x: direction > 0 ? 50 : -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction > 0 ? -50 : 50 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl shadow-xl p-8 md:p-12"
          >
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">
                {questions[currentQuestion].question}
              </h1>
              {questions[currentQuestion].description && (
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  {questions[currentQuestion].description}
                </p>
              )}
            </div>

            <div className="space-y-4 max-w-2xl mx-auto">
              {questions[currentQuestion].options.map((option, index) => (
                <motion.button
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleAnswer(option)}
                  className="group w-full p-5 text-left bg-gradient-to-r from-white to-gray-50 hover:from-blue-50 hover:to-blue-100 border-2 border-gray-200 hover:border-blue-400 rounded-xl transition-all duration-300 hover:shadow-lg"
                >
                  <div className="flex items-center">
                    <div className="w-7 h-7 rounded-full border-2 border-gray-300 group-hover:border-blue-500 mr-4 flex-shrink-0 flex items-center justify-center transition-all duration-300">
                      <motion.div 
                        className="w-3.5 h-3.5 rounded-full bg-blue-600 opacity-0 group-hover:opacity-100"
                        initial={{ scale: 0 }}
                        whileHover={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                      />
                    </div>
                    <span className="text-gray-900 group-hover:text-blue-900 font-medium transition-colors duration-300">
                      {option}
                    </span>
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Navigation */}
            <div className="flex justify-between mt-12">
              <button
                onClick={handleBack}
                disabled={currentQuestion === 0}
                className={`px-6 py-3 rounded-full border-2 transition-all duration-300 ${
                  currentQuestion === 0
                    ? 'border-gray-200 text-gray-400 cursor-not-allowed'
                    : 'border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white'
                }`}
              >
                ← Previous
              </button>
              
              <div className="text-sm text-gray-500 self-center">
                {Object.keys(answers).length} of {questions.length} answered
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}