'use client';
import Link from "next/link";
import { useState } from "react";

export default function StocksPage() {
  const [selectedStock, setSelectedStock] = useState('AAPL');

  const stockData = [
    { symbol: 'AAPL', name: 'Apple Inc.', price: '$175.25', change: '+1.2%', sector: 'Technology' },
    { symbol: 'GOOGL', name: 'Alphabet Inc.', price: '$138.45', change: '+0.8%', sector: 'Technology' },
    { symbol: 'MSFT', name: 'Microsoft Corp.', price: '$368.90', change: '+1.5%', sector: 'Technology' },
    { symbol: 'TSLA', name: 'Tesla Inc.', price: '$248.50', change: '+2.3%', sector: 'Automotive' },
    { symbol: 'NVDA', name: 'NVIDIA Corp.', price: '$875.30', change: '+3.1%', sector: 'Technology' },
    { symbol: 'AMZN', name: 'Amazon.com Inc.', price: '$155.80', change: '+0.9%', sector: 'E-commerce' },
  ];

  const features = [
    {
      icon: "📊",
      title: "Stock Analysis",
      description: "Comprehensive fundamental and technical analysis with AI-powered insights for every stock."
    },
    {
      icon: "🎯",
      title: "Smart Recommendations",
      description: "Personalized stock picks based on your investment goals and risk tolerance."
    },
    {
      icon: "📈",
      title: "Portfolio Tracking",
      description: "Real-time portfolio monitoring with performance analytics and rebalancing suggestions."
    },
    {
      icon: "🔔",
      title: "Price Alerts",
      description: "Custom alerts for price movements, earnings announcements, and market events."
    }
  ];

  const sectors = [
    { name: 'Technology', allocation: '35%', performance: '+12.5%' },
    { name: 'Healthcare', allocation: '20%', performance: '+8.2%' },
    { name: 'Finance', allocation: '15%', performance: '+6.8%' },
    { name: 'Consumer', allocation: '18%', performance: '+9.1%' },
    { name: 'Energy', allocation: '12%', performance: '+15.3%' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-green-900 to-slate-900">
      {/* Navigation */}
      <nav className="relative z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link href="/" className="flex items-center">
              <div className="text-2xl font-bold text-white">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400">
                  WealthPulse
                </span>
              </div>
            </Link>

            <div className="flex space-x-8">
              <Link 
                href="/" 
                className="text-white hover:text-green-300 transition-colors duration-200 font-medium"
              >
                Home
              </Link>
              <Link 
                href="/crypto" 
                className="text-white hover:text-green-300 transition-colors duration-200 font-medium"
              >
                Crypto
              </Link>
              <Link 
                href="/stocks" 
                className="text-green-400 font-semibold"
              >
                Stocks
              </Link>
              <Link 
                href="/mutual-funds" 
                className="text-white hover:text-green-300 transition-colors duration-200 font-medium"
              >
                Mutual Funds
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400">
                Stock Market
              </span>
              <br />Investment Platform
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto">
              Invest in individual stocks with AI-powered research, comprehensive analysis, and personalized recommendations tailored to your financial goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:from-green-700 hover:to-blue-700 transition-all duration-200 transform hover:scale-105 shadow-lg">
                Start Stock Investing
              </button>
              <button className="border-2 border-green-400 text-green-400 px-8 py-4 rounded-lg font-semibold hover:bg-green-400 hover:text-white transition-all duration-200">
                Research Stocks
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Market Overview */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-black/20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center">
            Top Performing Stocks
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stockData.map((stock) => (
              <div
                key={stock.symbol}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-200 cursor-pointer"
                onClick={() => setSelectedStock(stock.symbol)}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="text-2xl font-bold text-white">{stock.symbol}</div>
                  <div className="text-green-400 font-semibold">{stock.change}</div>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{stock.name}</h3>
                <p className="text-gray-400 text-sm mb-3">{stock.sector}</p>
                <p className="text-xl font-bold text-white">{stock.price}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Investment Features */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Advanced Stock Investment Tools
            </h2>
            <p className="text-lg text-gray-300">
              Professional-grade tools for intelligent stock market investing
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-green-500/20 to-blue-500/20 border border-green-500/30 rounded-xl p-6 hover:from-green-500/30 hover:to-blue-500/30 transition-all duration-200 transform hover:scale-105"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sector Analysis */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-black/20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Sector Diversification Analysis
              </h2>
              <div className="space-y-4">
                {sectors.map((sector, index) => (
                  <div key={index} className="bg-white/5 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-white font-semibold">{sector.name}</span>
                      <div className="flex space-x-4">
                        <span className="text-gray-300">{sector.allocation}</span>
                        <span className="text-green-400 font-semibold">{sector.performance}</span>
                      </div>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-green-400 to-blue-400 h-2 rounded-full" 
                        style={{width: sector.allocation}}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-green-600/20 to-blue-600/20 border border-green-500/30 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-white mb-6">Investment Strategy</h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="text-2xl">🎯</div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-2">Value Investing</h4>
                    <p className="text-gray-300">Find undervalued stocks with strong fundamentals and growth potential</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="text-2xl">📈</div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-2">Growth Stocks</h4>
                    <p className="text-gray-300">Identify companies with high growth potential and expanding markets</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="text-2xl">💰</div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-2">Dividend Income</h4>
                    <p className="text-gray-300">Build a portfolio of dividend-paying stocks for steady income</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Research Tools */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
            Comprehensive Stock Research
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <div className="text-4xl mb-4">📋</div>
              <h3 className="text-xl font-semibold text-white mb-3">Fundamental Analysis</h3>
              <p className="text-gray-300">P/E ratios, earnings growth, revenue analysis, and financial health metrics</p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-xl font-semibold text-white mb-3">Technical Charts</h3>
              <p className="text-gray-300">Advanced charting tools with indicators, patterns, and trend analysis</p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <div className="text-4xl mb-4">📰</div>
              <h3 className="text-xl font-semibold text-white mb-3">Market News</h3>
              <p className="text-gray-300">Real-time news, earnings reports, and analyst recommendations</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-black/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Start Your Stock Investment Journey
          </h2>
          <p className="text-lg text-gray-300 mb-8">
            Join successful investors using WealthPulse for data-driven stock market decisions
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:from-green-700 hover:to-blue-700 transition-all duration-200 transform hover:scale-105">
              Open Investment Account
            </button>
            <Link href="/" className="border-2 border-green-400 text-green-400 px-8 py-4 rounded-lg font-semibold hover:bg-green-400 hover:text-white transition-all duration-200 inline-block">
              Back to Home
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/40 border-t border-white/10 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <Link href="/" className="text-2xl font-bold text-white">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400">
              WealthPulse
            </span>
          </Link>
          <p className="text-gray-400 mt-2">
            © 2024 WealthPulse. Professional stock market investment platform.
          </p>
        </div>
      </footer>
    </div>
  );
}