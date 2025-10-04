'use client';
import { useState } from 'react';

import { Trash2, TrendingUp, TrendingDown, Calendar, DollarSign, BarChart3 } from 'lucide-react';
import { usePortfolio } from '../contexts/PortfolioContext';

export default function Portfolio() {
  const { portfolio, removeFromPortfolio } = usePortfolio();
  const [sortBy, setSortBy] = useState<'name' | 'type' | 'addedAt' | 'price'>('addedAt');
  const [filterBy, setFilterBy] = useState<'all' | 'crypto' | 'stock'>('all');

  const filteredPortfolio = portfolio
    .filter(item => filterBy === 'all' || item.type === filterBy)
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'type':
          return a.type.localeCompare(b.type);
        case 'addedAt':
          return new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime();
        case 'price':
          return b.price - a.price;
        default:
          return 0;
      }
    });

  const totalValue = portfolio.reduce((sum, item) => sum + item.price, 0);
  const cryptoCount = portfolio.filter(item => item.type === 'crypto').length;
  const stockCount = portfolio.filter(item => item.type === 'stock').length;

  const handleRemove = (id: string) => {
    removeFromPortfolio(id);
  };

  if (portfolio.length === 0) {
    return (
      <div className="min-h-screen p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
            My Portfolio
          </h1>
          
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-12 text-center">
            <BarChart3 className="w-24 h-24 mx-auto mb-6 text-gray-400 opacity-50" />
            <h2 className="text-2xl font-bold text-white mb-4">Your Portfolio is Empty</h2>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Start building your investment portfolio by adding cryptocurrencies and stocks from our platform. 
              Visit the Crypto or Stocks pages to add your first investments.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/crypto"
                className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-cyan-700 hover:to-blue-700 transition-all duration-200"
              >
                Explore Crypto
              </a>
              <a 
                href="/stocks"
                className="bg-slate-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-slate-600 transition-all duration-200"
              >
                Explore Stocks
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
          My Portfolio
        </h1>

        {/* Portfolio Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-4">
            <div className="flex items-center gap-3">
              <DollarSign className="w-8 h-8 text-green-400" />
              <div>
                <p className="text-gray-400 text-sm">Total Value</p>
                <p className="text-white text-xl font-bold">${totalValue.toLocaleString()}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-4">
            <div className="flex items-center gap-3">
              <BarChart3 className="w-8 h-8 text-cyan-400" />
              <div>
                <p className="text-gray-400 text-sm">Total Assets</p>
                <p className="text-white text-xl font-bold">{portfolio.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                ₿
              </div>
              <div>
                <p className="text-gray-400 text-sm">Cryptocurrencies</p>
                <p className="text-white text-xl font-bold">{cryptoCount}</p>
              </div>
            </div>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                📈
              </div>
              <div>
                <p className="text-gray-400 text-sm">Stocks</p>
                <p className="text-white text-xl font-bold">{stockCount}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Sort */}
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
            <div className="flex gap-2">
              <button
                onClick={() => setFilterBy('all')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filterBy === 'all' 
                    ? 'bg-cyan-600 text-white' 
                    : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
                }`}
              >
                All ({portfolio.length})
              </button>
              <button
                onClick={() => setFilterBy('crypto')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filterBy === 'crypto' 
                    ? 'bg-cyan-600 text-white' 
                    : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
                }`}
              >
                Crypto ({cryptoCount})
              </button>
              <button
                onClick={() => setFilterBy('stock')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filterBy === 'stock' 
                    ? 'bg-cyan-600 text-white' 
                    : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
                }`}
              >
                Stocks ({stockCount})
              </button>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-gray-400 text-sm">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-slate-700 text-white px-3 py-2 rounded-lg border border-slate-600 focus:border-cyan-500 focus:outline-none"
              >
                <option value="addedAt">Date Added</option>
                <option value="name">Name</option>
                <option value="type">Type</option>
                <option value="price">Price</option>
              </select>
            </div>
          </div>
        </div>

        {/* Portfolio Items */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPortfolio.map((item) => (
            <div key={item.id} className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:bg-slate-700/50 transition-all duration-200">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  {item.image ? (
                    <img src={item.image} alt={item.name} className="w-10 h-10 rounded-full" />
                  ) : (
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${
                      item.type === 'crypto' 
                        ? 'bg-gradient-to-br from-orange-500 to-yellow-500' 
                        : 'bg-gradient-to-br from-cyan-500 to-blue-500'
                    }`}>
                      {item.symbol.charAt(0)}
                    </div>
                  )}
                  <div>
                    <h3 className="text-white font-bold">{item.name}</h3>
                    <p className="text-gray-400 text-sm">{item.symbol}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-lg text-xs font-medium ${
                  item.type === 'crypto' 
                    ? 'bg-orange-600/20 text-orange-400' 
                    : 'bg-cyan-600/20 text-cyan-400'
                }`}>
                  {item.type.toUpperCase()}
                </span>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Price</span>
                  <span className="text-white font-semibold">${item.price.toLocaleString()}</span>
                </div>
                {item.marketCap && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Market Cap</span>
                    <span className="text-white font-semibold">${item.marketCap.toLocaleString()}</span>
                  </div>
                )}
                {item.change !== undefined && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">24h Change</span>
                    <div className={`flex items-center gap-1 ${item.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {item.change >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                      <span className="font-semibold">{item.change >= 0 ? '+' : ''}{item.change.toFixed(2)}%</span>
                    </div>
                  </div>
                )}
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Added</span>
                  <div className="flex items-center gap-1 text-gray-400">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">{new Date(item.addedAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => handleRemove(item.id)}
                className="w-full bg-red-600/20 text-red-400 border border-red-600/30 px-4 py-2 rounded-lg font-medium hover:bg-red-600/30 transition-colors flex items-center justify-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                Remove from Portfolio
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}