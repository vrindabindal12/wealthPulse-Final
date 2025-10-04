'use client';
import Link from "next/link";
import { useState } from "react";

export default function MutualFundsPage() {
  const [selectedCategory, setSelectedCategory] = useState('equity');

  const fundData = [
    { 
      name: 'WealthPulse Growth Fund', 
      category: 'Equity', 
      return: '12.5%', 
      risk: 'Moderate', 
      aum: '$2.5B',
      minInvestment: '$100'
    },
    { 
      name: 'WealthPulse Balanced Fund', 
      category: 'Hybrid', 
      return: '9.8%', 
      risk: 'Low-Moderate', 
      aum: '$1.8B',
      minInvestment: '$50'
    },
    { 
      name: 'WealthPulse Bond Fund', 
      category: 'Debt', 
      return: '6.2%', 
      risk: 'Low', 
      aum: '$3.2B',
      minInvestment: '$25'
    },
    { 
      name: 'WealthPulse Tech Fund', 
      category: 'Sector', 
      return: '15.7%', 
      risk: 'High', 
      aum: '$950M',
      minInvestment: '$200'
    },
    { 
      name: 'WealthPulse International Fund', 
      category: 'Global', 
      return: '11.2%', 
      risk: 'Moderate-High', 
      aum: '$1.4B',
      minInvestment: '$150'
    },
    { 
      name: 'WealthPulse Index Fund', 
      category: 'Index', 
      return: '10.8%', 
      risk: 'Moderate', 
      aum: '$4.1B',
      minInvestment: '$10'
    }
  ];

  const features = [
    {
      icon: "👥",
      title: "Professional Management",
      description: "Expert fund managers with decades of experience managing diversified portfolios."
    },
    {
      icon: "📊",
      title: "Diversified Portfolios",
      description: "Spread risk across multiple securities and asset classes for optimal returns."
    },
    {
      icon: "🔄",
      title: "Automated Investing",
      description: "Set up systematic investment plans (SIP) for regular, disciplined investing."
    },
    {
      icon: "📈",
      title: "Performance Tracking",
      description: "Real-time portfolio monitoring with detailed performance analytics and reports."
    }
  ];

  const categories = [
    { id: 'equity', name: 'Equity Funds', description: 'High growth potential with moderate to high risk' },
    { id: 'debt', name: 'Debt Funds', description: 'Steady returns with lower risk profile' },
    { id: 'hybrid', name: 'Hybrid Funds', description: 'Balanced mix of equity and debt investments' },
    { id: 'index', name: 'Index Funds', description: 'Track market indices with low expense ratios' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation */}
      <nav className="relative z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link href="/" className="flex items-center">
              <div className="text-2xl font-bold text-white">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                  WealthPulse
                </span>
              </div>
            </Link>

            <div className="flex space-x-8">
              <Link 
                href="/" 
                className="text-white hover:text-purple-300 transition-colors duration-200 font-medium"
              >
                Home
              </Link>
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
              <Link 
                href="/mutual-funds" 
                className="text-purple-400 font-semibold"
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
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                Mutual Funds
              </span>
              <br />Investment Platform
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto">
              Diversified investment options with professional management and automated portfolio optimization. Build wealth systematically with our curated mutual fund selections.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-200 transform hover:scale-105 shadow-lg">
                Start SIP Investment
              </button>
              <button className="border-2 border-purple-400 text-purple-400 px-8 py-4 rounded-lg font-semibold hover:bg-purple-400 hover:text-white transition-all duration-200">
                Explore Funds
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Fund Categories */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-black/20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center">
            Fund Categories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {categories.map((category) => (
              <div
                key={category.id}
                className={`bg-white/5 backdrop-blur-sm border rounded-xl p-6 hover:bg-white/10 transition-all duration-200 cursor-pointer ${
                  selectedCategory === category.id ? 'border-purple-400 bg-purple-500/20' : 'border-white/10'
                }`}
                onClick={() => setSelectedCategory(category.id)}
              >
                <h3 className="text-lg font-semibold text-white mb-2">{category.name}</h3>
                <p className="text-gray-300 text-sm">{category.description}</p>
              </div>
            ))}
          </div>

          <h3 className="text-2xl font-bold text-white mb-6">Top Performing Funds</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {fundData.map((fund, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-200"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="bg-purple-500/20 text-purple-400 px-3 py-1 rounded-full text-sm font-medium">
                    {fund.category}
                  </span>
                  <div className="text-green-400 font-semibold">{fund.return}</div>
                </div>
                <h3 className="text-lg font-semibold text-white mb-3">{fund.name}</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Risk Level:</span>
                    <span className="text-white">{fund.risk}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">AUM:</span>
                    <span className="text-white">{fund.aum}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Min Investment:</span>
                    <span className="text-white">{fund.minInvestment}</span>
                  </div>
                </div>
                <button className="w-full mt-4 bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors">
                  Invest Now
                </button>
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
              Mutual Fund Investment Benefits
            </h2>
            <p className="text-lg text-gray-300">
              Professional management meets intelligent automation for optimal returns
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-xl p-6 hover:from-purple-500/30 hover:to-pink-500/30 transition-all duration-200 transform hover:scale-105"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SIP Calculator */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-black/20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Systematic Investment Plan (SIP)
              </h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="text-2xl">💰</div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Regular Investment</h3>
                    <p className="text-gray-300">Invest a fixed amount regularly to build wealth systematically</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="text-2xl">📊</div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Rupee Cost Averaging</h3>
                    <p className="text-gray-300">Reduce market timing risk through disciplined investing</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="text-2xl">🚀</div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Compound Growth</h3>
                    <p className="text-gray-300">Harness the power of compounding for long-term wealth creation</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 border border-purple-500/30 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-white mb-6">SIP Calculator</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-white mb-2">Monthly Investment</label>
                  <input 
                    type="range" 
                    min="500" 
                    max="50000" 
                    defaultValue="5000" 
                    className="w-full accent-purple-400"
                  />
                  <div className="text-purple-400 font-semibold">₹5,000</div>
                </div>
                <div>
                  <label className="block text-white mb-2">Investment Period</label>
                  <input 
                    type="range" 
                    min="1" 
                    max="30" 
                    defaultValue="10" 
                    className="w-full accent-purple-400"
                  />
                  <div className="text-purple-400 font-semibold">10 Years</div>
                </div>
                <div>
                  <label className="block text-white mb-2">Expected Return</label>
                  <input 
                    type="range" 
                    min="8" 
                    max="20" 
                    defaultValue="12" 
                    className="w-full accent-purple-400"
                  />
                  <div className="text-purple-400 font-semibold">12% p.a.</div>
                </div>
                <div className="bg-black/20 rounded-lg p-4 mt-6">
                  <div className="text-center">
                    <div className="text-gray-300 mb-2">Projected Value</div>
                    <div className="text-3xl font-bold text-white">₹11,61,695</div>
                    <div className="text-green-400 text-sm mt-1">Total Investment: ₹6,00,000</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Investment Process */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-12">
            How to Start Investing in Mutual Funds
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <div className="bg-purple-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl mx-auto mb-4">1</div>
              <h3 className="text-lg font-semibold text-white mb-3">Choose Fund Category</h3>
              <p className="text-gray-300">Select fund type based on your risk appetite and investment goals</p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <div className="bg-purple-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl mx-auto mb-4">2</div>
              <h3 className="text-lg font-semibold text-white mb-3">Complete KYC</h3>
              <p className="text-gray-300">Complete your Know Your Customer verification process online</p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <div className="bg-purple-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl mx-auto mb-4">3</div>
              <h3 className="text-lg font-semibold text-white mb-3">Start SIP</h3>
              <p className="text-gray-300">Set up systematic investment plan with automated monthly transfers</p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <div className="bg-purple-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl mx-auto mb-4">4</div>
              <h3 className="text-lg font-semibold text-white mb-3">Monitor & Optimize</h3>
              <p className="text-gray-300">Track performance and rebalance portfolio with AI recommendations</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-black/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Start Building Wealth with Mutual Funds
          </h2>
          <p className="text-lg text-gray-300 mb-8">
            Begin your systematic investment journey with professionally managed, diversified portfolios
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-200 transform hover:scale-105">
              Start SIP Today
            </button>
            <Link href="/" className="border-2 border-purple-400 text-purple-400 px-8 py-4 rounded-lg font-semibold hover:bg-purple-400 hover:text-white transition-all duration-200 inline-block">
              Back to Home
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/40 border-t border-white/10 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <Link href="/" className="text-2xl font-bold text-white">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              WealthPulse
            </span>
          </Link>
          <p className="text-gray-400 mt-2">
            © 2024 WealthPulse. Professional mutual fund investment platform.
          </p>
        </div>
      </footer>
    </div>
  );
}