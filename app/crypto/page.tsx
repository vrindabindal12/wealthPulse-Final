'use client';
import Link from "next/link";
import { useState } from "react";

export default function CryptoPage() {
  const [selectedCrypto, setSelectedCrypto] = useState('bitcoin');

  const cryptoData = [
    { id: 'bitcoin', name: 'Bitcoin', symbol: 'BTC', price: '$43,250.00', change: '+2.5%', icon: '₿' },
    { id: 'ethereum', name: 'Ethereum', symbol: 'ETH', price: '$2,680.00', change: '+1.8%', icon: 'Ξ' },
    { id: 'cardano', name: 'Cardano', symbol: 'ADA', price: '$0.48', change: '+5.2%', icon: '₳' },
    { id: 'solana', name: 'Solana', symbol: 'SOL', price: '$98.50', change: '+3.1%', icon: '◎' },
  ];

  const features = [
    {
      icon: "🔄",
      title: "Real-Time Trading",
      description: "Execute trades instantly with our advanced trading engine and real-time market data."
    },
    {
      icon: "📊",
      title: "Advanced Analytics",
      description: "Deep market analysis with AI-powered insights and predictive modeling for better decisions."
    },
    {
      icon: "🛡️",
      title: "Secure Storage",
      description: "Multi-signature wallets and cold storage solutions to keep your crypto assets safe."
    },
    {
      icon: "📱",
      title: "Mobile Trading",
      description: "Trade on the go with our responsive mobile interface and push notifications."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-orange-900 to-slate-900">
      {/* Navigation */}
      <nav className="relative z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link href="/" className="flex items-center">
              <div className="text-2xl font-bold text-white">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400">
                  WealthPulse
                </span>
              </div>
            </Link>

            <div className="flex space-x-8">
              <Link 
                href="/" 
                className="text-white hover:text-orange-300 transition-colors duration-200 font-medium"
              >
                Home
              </Link>
              <Link 
                href="/crypto" 
                className="text-orange-400 font-semibold"
              >
                Crypto
              </Link>
              <Link 
                href="/stocks" 
                className="text-white hover:text-orange-300 transition-colors duration-200 font-medium"
              >
                Stocks
              </Link>
              <Link 
                href="/mutual-funds" 
                className="text-white hover:text-orange-300 transition-colors duration-200 font-medium"
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
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400">
                Cryptocurrency
              </span>
              <br />Trading Platform
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto">
              Trade Bitcoin, Ethereum, and other digital assets with AI-powered analytics, real-time market data, and advanced security features.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="bg-gradient-to-r from-orange-600 to-yellow-600 text-white px-8 py-4 rounded-lg font-semibold hover:from-orange-700 hover:to-yellow-700 transition-all duration-200 transform hover:scale-105 shadow-lg">
                Start Trading Crypto
              </button>
              <button className="border-2 border-orange-400 text-orange-400 px-8 py-4 rounded-lg font-semibold hover:bg-orange-400 hover:text-white transition-all duration-200">
                View Market Data
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Live Crypto Prices */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-black/20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center">
            Live Cryptocurrency Prices
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {cryptoData.map((crypto) => (
              <div
                key={crypto.id}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-200 cursor-pointer"
                onClick={() => setSelectedCrypto(crypto.id)}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="text-3xl">{crypto.icon}</div>
                  <div className="text-green-400 font-semibold">{crypto.change}</div>
                </div>
                <h3 className="text-lg font-semibold text-white mb-1">{crypto.name}</h3>
                <p className="text-gray-400 text-sm mb-2">{crypto.symbol}</p>
                <p className="text-xl font-bold text-white">{crypto.price}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trading Features */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Advanced Crypto Trading Features
            </h2>
            <p className="text-lg text-gray-300">
              Everything you need for professional cryptocurrency trading
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-orange-500/20 to-yellow-500/20 border border-orange-500/30 rounded-xl p-6 hover:from-orange-500/30 hover:to-yellow-500/30 transition-all duration-200 transform hover:scale-105"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Market Analysis */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-black/20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                AI-Powered Market Analysis
              </h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="text-2xl">🤖</div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Smart Predictions</h3>
                    <p className="text-gray-300">Advanced AI algorithms analyze market patterns to predict price movements</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="text-2xl">📈</div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Technical Analysis</h3>
                    <p className="text-gray-300">Comprehensive charts with indicators, patterns, and trend analysis</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="text-2xl">⚡</div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Real-Time Alerts</h3>
                    <p className="text-gray-300">Instant notifications for price movements and trading opportunities</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-orange-600/20 to-yellow-600/20 border border-orange-500/30 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-white mb-6">Market Insights</h3>
              <div className="space-y-4">
                <div className="bg-black/20 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-300">Bitcoin Trend</span>
                    <span className="text-green-400 font-semibold">Bullish</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-green-400 h-2 rounded-full" style={{width: '75%'}}></div>
                  </div>
                </div>
                <div className="bg-black/20 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-300">Market Volatility</span>
                    <span className="text-yellow-400 font-semibold">Medium</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-yellow-400 h-2 rounded-full" style={{width: '60%'}}></div>
                  </div>
                </div>
                <div className="bg-black/20 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-300">Trading Volume</span>
                    <span className="text-blue-400 font-semibold">High</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-blue-400 h-2 rounded-full" style={{width: '85%'}}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Start Crypto Trading?
          </h2>
          <p className="text-lg text-gray-300 mb-8">
            Join thousands of traders using WealthPulse for intelligent cryptocurrency investments
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-orange-600 to-yellow-600 text-white px-8 py-4 rounded-lg font-semibold hover:from-orange-700 hover:to-yellow-700 transition-all duration-200 transform hover:scale-105">
              Open Trading Account
            </button>
            <Link href="/" className="border-2 border-orange-400 text-orange-400 px-8 py-4 rounded-lg font-semibold hover:bg-orange-400 hover:text-white transition-all duration-200 inline-block">
              Back to Home
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/40 border-t border-white/10 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <Link href="/" className="text-2xl font-bold text-white">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400">
              WealthPulse
            </span>
          </Link>
          <p className="text-gray-400 mt-2">
            © 2024 WealthPulse. Professional cryptocurrency trading platform.
          </p>
        </div>
      </footer>
    </div>
  );
}