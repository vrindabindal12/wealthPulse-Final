'use client';
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const features = [
    {
      icon: "🤖",
      title: "AI-Driven Insights",
      description:
        "Advanced AI algorithms analyze market trends and provide personalized investment recommendations tailored to your financial goals.",
    },
    {
      icon: "⚡",
      title: "Automated Portfolio Management",
      description:
        "Smart automation handles your portfolio rebalancing, risk assessment, and optimization with real-time market analysis.",
    },
    {
      icon: "📊",
      title: "Live Market Analysis",
      description:
        "Real-time market data, interactive charts, and comprehensive analysis tools to keep you informed about market movements.",
    },
    {
      icon: "🛡️",
      title: "Risk Assessment",
      description:
        "Advanced risk management tools with real-time monitoring to protect your investments and optimize returns.",
    },
    {
      icon: "🎓",
      title: "Educational Resources",
      description:
        "Beginner-friendly tutorials, interactive tools, and expert guidance to enhance your financial literacy.",
    },
    {
      icon: "🔒",
      title: "Secure Transactions",
      description:
        "Bank-level security with seamless funding options and multi-asset class support for safe and transparent investing.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation */}
      <nav className="relative z-50 bg-black/30 backdrop-blur-md border-b border-white/20 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <motion.div
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-2xl font-bold text-white"
              >
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 animate-gradient-x">
                  WealthPulse
                </span>
              </motion.div>
            </div>

            {/* Desktop Navigation */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="hidden md:flex space-x-8"
            >
              <Link
                href="/crypto"
                className="text-white hover:text-purple-300 transition-colors duration-200 font-medium"
              >
                Crypto
              </Link>
              <Link
                href="/stocks"
                className="text-white hover:text-purple-300 transition-colors duration-200 font-medium"
              >
                Stocks
              </Link>

            </motion.div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-white hover:text-purple-300 transition-colors"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </motion.button>
            </div>
          </div>

          {/* Mobile Navigation */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="md:hidden"
              >
                <div className="px-2 pt-2 pb-3 space-y-1 bg-black/40 rounded-lg mb-4 shadow-xl">
                  <Link
                    href="/crypto"
                    className="block text-white hover:text-purple-300 transition-colors duration-200 font-medium py-2 px-3"
                  >
                    Crypto
                  </Link>
                  <Link
                    href="/stocks"
                    className="block text-white hover:text-purple-300 transition-colors duration-200 font-medium py-2 px-3"
                  >
                    Stocks
                  </Link>
                  <Link
                    href="/mutual-funds"
                    className="block text-white hover:text-purple-300 transition-colors duration-200 font-medium py-2 px-3"
                  >
                    Mutual Funds
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="max-w-7xl mx-auto"
        >
          <div className="text-center">
            <motion.h1
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.9 }}
              className="text-4xl md:text-6xl font-bold text-white mb-6"
            >
              Smart Investing Made
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 animate-gradient-x">
                Simple & Intelligent
              </span>
            </motion.h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto animate-fade-in">
              Bridge the gap between financial literacy and intelligent investing with our AI-driven platform featuring personalized recommendations, live market analysis, and automated portfolio management.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.button
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
                whileHover={{ scale: 1.07 }}
              >
                Start Investing Today
              </motion.button>
              <motion.button
                className="border-2 border-purple-400 text-purple-400 px-8 py-4 rounded-lg font-semibold hover:bg-purple-400 hover:text-white transition-all duration-200"
                whileHover={{ scale: 1.07 }}
              >
                Learn More
              </motion.button>
            </div>
          </div>
        </motion.div>
        {/* animated finance visuals can be added */}
        <div className="absolute right-0 top-0">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 0.5, x: 0 }}
            transition={{ duration: 2 }}
            className="hidden md:block"
          >
            {/* Example: animated bar chart */}
            <svg width="140" height="60" viewBox="0 0 140 60" fill="none">
              <rect x="10" y="20" width="20" height="40" rx="6" fill="#A855F7" opacity="0.6">
                <animate attributeName="height" values="30;40;25;40" dur="2s" repeatCount="indefinite" />
              </rect>
              <rect x="40" y="10" width="20" height="50" rx="6" fill="#EC4899" opacity="0.6">
                <animate attributeName="height" values="40;50;40;50" dur="2s" repeatCount="indefinite" />
              </rect>
              <rect x="70" y="5" width="20" height="55" rx="6" fill="#F59E42" opacity="0.6">
                <animate attributeName="height" values="45;55;45;55" dur="2s" repeatCount="indefinite" />
              </rect>
            </svg>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black/20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Powerful Features for Smart Investing</h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Our platform combines cutting-edge technology with user-friendly design to make investing accessible to everyone
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-200 transform hover:scale-105 shadow-xl"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Investment Categories */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Explore Investment Categories</h2>
            <p className="text-lg text-gray-300">
              Choose your investment path with our comprehensive multi-asset class support
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              whileHover={{ scale: 1.045, background: "linear-gradient(135deg, #f59e42 33%, #ffefb6 100%)" }}
            >
              <Link href="/crypto" className="group">
                <div className="bg-gradient-to-br from-orange-500/20 to-yellow-500/20 border border-orange-500/30 rounded-xl p-8 hover:from-orange-500/30 hover:to-yellow-500/30 transition-all duration-200 transform hover:scale-105 shadow-lg">
                  <div className="text-5xl mb-4">₿</div>
                  <h3 className="text-2xl font-bold text-white mb-3">Cryptocurrency</h3>
                  <p className="text-gray-300 mb-4">
                    Trade Bitcoin, Ethereum, and other digital assets with advanced analytics and real-time market data.
                  </p>
                  <div className="text-orange-400 font-medium group-hover:text-orange-300">
                    Explore Crypto →
                  </div>
                </div>
              </Link>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.045, background: "linear-gradient(135deg, #6ee7b7 33%, #3b82f6 100%)" }}
            >
              <Link href="/stocks" className="group">
                <div className="bg-gradient-to-br from-green-500/20 to-blue-500/20 border border-green-500/30 rounded-xl p-8 hover:from-green-500/30 hover:to-blue-500/30 transition-all duration-200 transform hover:scale-105 shadow-lg">
                  <div className="text-5xl mb-4">📈</div>
                  <h3 className="text-2xl font-bold text-white mb-3">Stock Market</h3>
                  <p className="text-gray-300 mb-4">
                    Invest in individual stocks with AI-powered research, analysis, and personalized recommendations.
                  </p>
                  <div className="text-green-400 font-medium group-hover:text-green-300">
                    Explore Stocks →
                  </div>
                </div>
              </Link>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.045, background: "linear-gradient(135deg, #a855f7 33%, #ec4899 100%)" }}
            >
              <Link href="/mutual-funds" className="group">
                <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-xl p-8 hover:from-purple-500/30 hover:to-pink-500/30 transition-all duration-200 transform hover:scale-105 shadow-lg">
                  <div className="text-5xl mb-4">🏦</div>
                  <h3 className="text-2xl font-bold text-white mb-3">Mutual Funds</h3>
                  <p className="text-gray-300 mb-4">
                    Diversified investment options with professional management and automated portfolio optimization.
                  </p>
                  <div className="text-purple-400 font-medium group-hover:text-purple-300">
                    Explore Funds →
                  </div>
                </div>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black/20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ x: -30, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.65 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Why Choose WealthPulse?</h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="text-2xl">✨</div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Personalized Experience</h3>
                    <p className="text-gray-300">
                      AI-driven recommendations tailored to your financial goals and risk tolerance
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="text-2xl">🚀</div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Automated Solutions</h3>
                    <p className="text-gray-300">
                      Set it and forget it with our intelligent automation and portfolio management
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="text-2xl">👥</div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Community & Education</h3>
                    <p className="text-gray-300">
                      Learn from experts and connect with a community of collaborative investors
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="text-2xl">🔐</div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Security & Transparency</h3>
                    <p className="text-gray-300">
                      Bank-level security with complete transparency in all transactions
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 border border-purple-500/30 rounded-2xl p-8 shadow-lg"
            >
              <h3 className="text-2xl font-bold text-white mb-6">
                Get Started in 3 Simple Steps
              </h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                    1
                  </div>
                  <span className="text-gray-300">
                    Create your account and set investment goals
                  </span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                    2
                  </div>
                  <span className="text-gray-300">
                    Fund your account securely
                  </span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                    3
                  </div>
                  <span className="text-gray-300">
                    Start investing with AI-powered recommendations
                  </span>
                </div>
              </div>
              <motion.button
                className="w-full mt-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-200"
                whileHover={{ scale: 1.05 }}
              >
                Start Your Journey
              </motion.button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/40 border-t border-white/10 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="text-2xl font-bold text-white mb-4">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                  WealthPulse
                </span>
              </div>
              <p className="text-gray-400 mb-4 max-w-md">
                Bridging the gap between financial literacy and intelligent investing. Make informed, data-driven investment decisions effortlessly.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Platform</h4>
              <div className="space-y-2">
                <Link href="/crypto" className="block text-gray-400 hover:text-white transition-colors">
                  Cryptocurrency
                </Link>
                <Link href="/stocks" className="block text-gray-400 hover:text-white transition-colors">
                  Stock Market
                </Link>
                <Link href="/mutual-funds" className="block text-gray-400 hover:text-white transition-colors">
                  Mutual Funds
                </Link>
              </div>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <div className="space-y-2">
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">
                  About Us
                </a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">
                  Contact
                </a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">
                  Support
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-white/10 mt-8 pt-8 text-center">
            <p className="text-gray-400">
              © 2024 WealthPulse. All rights reserved. | Making investing intelligent and accessible.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
