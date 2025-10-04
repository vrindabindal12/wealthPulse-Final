'use client';
import Link from "next/link";
import { useState } from "react";
import { Search, TrendingUp, BarChart3, Shield, BookOpen, Lock } from "lucide-react";

export default function Home() {

  const features = [
    {
      icon: <TrendingUp className="w-8 h-8 text-cyan-400" />,
      title: "AI-Driven Insights",
      description:
        "Advanced AI algorithms analyze market trends and provide personalized investment recommendations tailored to your financial goals.",
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-cyan-400" />,
      title: "Automated Portfolio Management",
      description:
        "Smart automation handles your portfolio rebalancing, risk assessment, and optimization with real-time market analysis.",
    },
    {
      icon: <Search className="w-8 h-8 text-cyan-400" />,
      title: "Live Market Analysis",
      description:
        "Real-time market data, interactive charts, and comprehensive analysis tools to keep you informed about market movements.",
    },
    {
      icon: <Shield className="w-8 h-8 text-cyan-400" />,
      title: "Risk Assessment",
      description:
        "Advanced risk management tools with real-time monitoring to protect your investments and optimize returns.",
    },
    {
      icon: <BookOpen className="w-8 h-8 text-cyan-400" />,
      title: "Educational Resources",
      description:
        "Beginner-friendly tutorials, interactive tools, and expert guidance to enhance your financial literacy.",
    },
    {
      icon: <Lock className="w-8 h-8 text-cyan-400" />,
      title: "Secure Transactions",
      description:
        "Bank-level security with seamless funding options and multi-asset class support for safe and transparent investing.",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-20">
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
              Smart Investment Platform
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-4xl mx-auto">
              Bridge the gap between financial literacy and intelligent investing with our AI-driven platform featuring personalized recommendations, live market analysis, and automated portfolio management.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-cyan-700 hover:to-blue-700 transition-all duration-200">
                Start Investing Today
              </button>
              <button className="bg-slate-800/50 border border-slate-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-slate-700/50 transition-all duration-200">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Powerful Features for Smart Investing</h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Our platform combines cutting-edge technology with user-friendly design to make investing accessible to everyone
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:bg-slate-700/50 transition-all duration-200"
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Investment Categories */}
      <section className="p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Explore Investment Categories</h2>
            <p className="text-lg text-gray-300">
              Choose your investment path with our comprehensive multi-asset class support
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link href="/crypto" className="group">
              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:bg-slate-700/50 transition-all duration-200">
                <div className="text-4xl mb-4 text-cyan-400">₿</div>
                <h3 className="text-2xl font-bold text-white mb-3">Cryptocurrency</h3>
                <p className="text-gray-300 mb-4">
                  Trade Bitcoin, Ethereum, and other digital assets with advanced analytics and real-time market data.
                </p>
                <div className="text-cyan-400 font-medium group-hover:text-cyan-300">
                  Explore Crypto →
                </div>
              </div>
            </Link>

            <Link href="/stocks" className="group">
              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:bg-slate-700/50 transition-all duration-200">
                <div className="text-4xl mb-4 text-cyan-400">📈</div>
                <h3 className="text-2xl font-bold text-white mb-3">Stock Market</h3>
                <p className="text-gray-300 mb-4">
                  Invest in individual stocks with AI-powered research, analysis, and personalized recommendations.
                </p>
                <div className="text-cyan-400 font-medium group-hover:text-cyan-300">
                  Explore Stocks →
                </div>
              </div>
            </Link>

            <Link href="/mutual-funds" className="group">
              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:bg-slate-700/50 transition-all duration-200">
                <div className="text-4xl mb-4 text-cyan-400">🏦</div>
                <h3 className="text-2xl font-bold text-white mb-3">Mutual Funds</h3>
                <p className="text-gray-300 mb-4">
                  Diversified investment options with professional management and automated portfolio optimization.
                </p>
                <div className="text-cyan-400 font-medium group-hover:text-cyan-300">
                  Explore Funds →
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Why Choose WealthPulse?</h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <TrendingUp className="w-6 h-6 text-cyan-400 mt-1" />
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Personalized Experience</h3>
                    <p className="text-gray-300">
                      AI-driven recommendations tailored to your financial goals and risk tolerance
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <BarChart3 className="w-6 h-6 text-cyan-400 mt-1" />
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Automated Solutions</h3>
                    <p className="text-gray-300">
                      Set it and forget it with our intelligent automation and portfolio management
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <BookOpen className="w-6 h-6 text-cyan-400 mt-1" />
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Community & Education</h3>
                    <p className="text-gray-300">
                      Learn from experts and connect with a community of collaborative investors
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Lock className="w-6 h-6 text-cyan-400 mt-1" />
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Security & Transparency</h3>
                    <p className="text-gray-300">
                      Bank-level security with complete transparency in all transactions
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-white mb-6">
                Get Started in 3 Simple Steps
              </h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="bg-cyan-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                    1
                  </div>
                  <span className="text-gray-300">
                    Create your account and set investment goals
                  </span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="bg-cyan-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                    2
                  </div>
                  <span className="text-gray-300">
                    Fund your account securely
                  </span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="bg-cyan-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                    3
                  </div>
                  <span className="text-gray-300">
                    Start investing with AI-powered recommendations
                  </span>
                </div>
              </div>
              <button className="w-full mt-6 bg-gradient-to-r from-cyan-600 to-blue-600 text-white py-3 rounded-lg font-semibold hover:from-cyan-700 hover:to-blue-700 transition-all duration-200">
                Start Your Journey
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-800/50 backdrop-blur-sm border-t border-slate-700">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 mb-4">
                WealthPulse
              </div>
              <p className="text-gray-400 mb-4 max-w-md">
                Bridging the gap between financial literacy and intelligent investing. Make informed, data-driven investment decisions effortlessly.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Platform</h4>
              <div className="space-y-2">
                <Link href="/crypto" className="block text-gray-400 hover:text-cyan-400 transition-colors">
                  Cryptocurrency
                </Link>
                <Link href="/stocks" className="block text-gray-400 hover:text-cyan-400 transition-colors">
                  Stock Market
                </Link>
                <Link href="/mutual-funds" className="block text-gray-400 hover:text-cyan-400 transition-colors">
                  Mutual Funds
                </Link>
              </div>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <div className="space-y-2">
                <a href="#" className="block text-gray-400 hover:text-cyan-400 transition-colors">
                  About Us
                </a>
                <a href="#" className="block text-gray-400 hover:text-cyan-400 transition-colors">
                  Contact
                </a>
                <a href="#" className="block text-gray-400 hover:text-cyan-400 transition-colors">
                  Support
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-slate-700 mt-8 pt-8 text-center">
            <p className="text-gray-400">
              © 2024 WealthPulse. All rights reserved. | Making investing intelligent and accessible.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}