"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex items-center justify-center px-4">
      <div className="text-center max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="mb-8">
            <h1 className="text-8xl font-bold text-blue-200 mb-4">404</h1>
            <h2 className="text-3xl font-bold text-blue-900 mb-6">Page Not Found</h2>
            <p className="text-lg text-gray-600 mb-8">
              Oops! The page you&apos;re looking for doesn&apos;t exist. Let&apos;s get you back on track to protect your brand.
            </p>
          </div>
          
          <div className="space-y-4">
            <Link
              href="/"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-full shadow-lg hover:from-blue-700 hover:to-blue-800 transform hover:scale-105 transition-all duration-300 mr-4"
            >
              ← Back to Home
            </Link>
            
            <Link
              href="/quiz"
              className="inline-flex items-center px-6 py-3 border-2 border-blue-600 text-blue-600 font-semibold rounded-full hover:bg-blue-600 hover:text-white transition-all duration-300"
            >
              Take Quiz
            </Link>
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-sm text-gray-500">
              Need help? Contact our support team for assistance.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}