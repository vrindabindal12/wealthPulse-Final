'use client';
import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Search, TrendingUp } from 'lucide-react';

export default function StocksDashboard() {
  const [searchTerm, setSearchTerm] = useState('');
  const [stockList, setStockList] = useState<any[]>([]);
  const [selectedStock, setSelectedStock] = useState<any | null>(null);
  const [chartData, setChartData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [aiReport, setAiReport] = useState('');
  const [timeRange, setTimeRange] = useState('1Y');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);

  // Read from environment variables
  const stockApiKey = process.env.NEXT_PUBLIC_STOCKDATA_API_KEY || '';
  const geminiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || '';

  // Popular stocks to display initially
  const popularStocks = ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'TSLA', 'META', 'NVDA', 'JPM', 'V', 'WMT'];

  const fetchStockData = async () => {
    try {
      const promises = popularStocks.map(symbol =>
        fetch(`https://api.stockdata.org/v1/data/quote?symbols=${symbol}&api_token=${stockApiKey}`)
          .then(res => res.json())
      );

      const results = await Promise.all(promises);
      const stocks = results
        .filter(result => result.data && result.data.length > 0)
        .map(result => result.data[0]);

      setStockList(stocks);
      setSearchResults(stocks);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching stock data:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (stockApiKey) {
      fetchStockData();
      const interval = setInterval(fetchStockData, 60000);
      return () => clearInterval(interval);
    } else {
      setLoading(false);
    }
  }, []);

  const searchStocks = async (query: string) => {
    if (!query.trim() || !stockApiKey) return;

    try {
      const response = await fetch(
        `https://api.stockdata.org/v1/data/quote?symbols=${query.toUpperCase()}&api_token=${stockApiKey}`
      );
      const data = await response.json();

      if (data.data && data.data.length > 0) {
        setSearchResults(data.data);
      }
    } catch (error) {
      console.error('Error searching stocks:', error);
    }
  };

  const fetchStockDetails = async (symbol: string) => {
    setDetailsLoading(true);
    try {
      // Fetch current data
      const quoteRes = await fetch(
        `https://api.stockdata.org/v1/data/quote?symbols=${symbol}&api_token=${stockApiKey}`
      );
      const quoteData = await quoteRes.json();

      // Fetch historical data (1 year)
      const historicalRes = await fetch(
        `https://api.stockdata.org/v1/data/eod?symbols=${symbol}&api_token=${stockApiKey}&date_from=${getPastDate(365)}&date_to=${getTodayDate()}`
      );
      const historicalData = await historicalRes.json();

      if (quoteData.data && quoteData.data.length > 0) {
        setSelectedStock(quoteData.data[0]);

        if (historicalData.data) {
          const formattedData = historicalData.data.map((item: any) => ({
            date: new Date(item.date).toLocaleDateString(),
            price: item.close
          }));
          setChartData(formattedData.reverse());
        }
      }

      setDetailsLoading(false);
    } catch (error) {
      console.error('Error fetching stock details:', error);
      setDetailsLoading(false);
    }
  };

  const getPastDate = (days: number) => {
    const date = new Date();
    date.setDate(date.getDate() - days);
    return date.toISOString().split('T')[0];
  };

  const getTodayDate = () => {
    return new Date().toISOString().split('T')[0];
  };

  const generateAIReport = async () => {
    if (!selectedStock) {
      setAiReport('Please select a stock first to generate an AI report.');
      return;
    }

    if (!geminiKey) {
      const fallback = `Analysis for ${selectedStock.name} (${selectedStock.ticker}): Current price: $${selectedStock.price.toFixed(2)}. Market cap: $${(selectedStock.market_cap || 0).toLocaleString()}. Outlook: Based on recent price action, ${selectedStock.name} shows typical market volatility. Consider diversification and risk tolerance. Risk: Market volatility and company-specific events can impact price quickly.`;
      setAiReport(fallback);
      return;
    }

    try {
      const prompt = `Provide a brief investment analysis for ${selectedStock.name} (${selectedStock.ticker}). Current price: $${selectedStock.price.toFixed(2)}. 52-week high: $${selectedStock['52_week_high']}, 52-week low: $${selectedStock['52_week_low']}. Include outlook and risk assessment in 3-4 sentences.`;

      const response = await fetch('https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': geminiKey
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: prompt
            }]
          }]
        })
      });

      const data = await response.json();
      const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || 'Unable to generate report.';
      setAiReport(text);
    } catch (error) {
      console.error('Error generating AI report:', error);
      setAiReport('Unable to generate AI report. Please check your Gemini API key.');
    }
  };

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    if (value.trim()) {
      const filtered = stockList.filter(stock =>
        stock.name.toLowerCase().includes(value.toLowerCase()) ||
        stock.ticker.toLowerCase().includes(value.toLowerCase())
      );
      setSearchResults(filtered);
      setShowSearchDropdown(true);

      // Also search the API for more results
      const debounce = setTimeout(() => searchStocks(value), 500);
      return () => clearTimeout(debounce);
    } else {
      setSearchResults(stockList);
      setShowSearchDropdown(false);
    }
  };

  const selectStock = (stock: any) => {
    setSearchTerm(stock.name);
    setShowSearchDropdown(false);
    fetchStockDetails(stock.ticker);
  };

  const calculateReturns = (current: number, past: number) => {
    if (!past) return '0.00';
    return (((current - past) / past) * 100).toFixed(2);
  };

  if (!stockApiKey) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
        <div className="bg-slate-800/50 backdrop-blur-sm border border-cyan-500/30 rounded-2xl p-8 max-w-md w-full text-center">
          <h2 className="text-2xl font-bold text-red-400 mb-4">API Key Required</h2>
          <p className="text-gray-300 mb-4">
            Please add your StockData.org API key to your .env.local file:
          </p>
          <code className="block bg-slate-900 p-3 rounded text-cyan-400 text-sm">
            NEXT_PUBLIC_STOCKDATA_API_KEY=your_api_key
          </code>
          <p className="text-gray-400 text-sm mt-4">
            Get your free API key at: <a href="https://www.stockdata.org/" target="_blank" className="text-cyan-400 hover:underline">stockdata.org</a>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
          Stock Market Dashboard
        </h1>

        {/* Search and Actions */}
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 mb-6">
          <div className="relative mb-4">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search for a stock (e.g., AAPL, TSLA)..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              onFocus={() => searchTerm && setShowSearchDropdown(true)}
              className="w-full bg-slate-700/50 border border-slate-600 rounded-lg pl-12 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500"
            />
            {showSearchDropdown && searchResults.length > 0 && (
              <div className="absolute z-10 w-full mt-2 bg-slate-800 border border-slate-700 rounded-lg shadow-xl max-h-96 overflow-y-auto">
                {searchResults.map((stock) => (
                  <div
                    key={stock.ticker}
                    onClick={() => selectStock(stock)}
                    className="flex items-center gap-3 p-3 hover:bg-slate-700 cursor-pointer transition-colors"
                  >
                    <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center text-white font-bold">
                      {stock.ticker.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <p className="text-white font-semibold">{stock.name}</p>
                      <p className="text-gray-400 text-sm">{stock.ticker}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-semibold">${stock.price?.toFixed(2)}</p>
                      <p className={`text-sm ${stock.change_percent >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {stock.change_percent >= 0 ? '+' : ''}{stock.change_percent?.toFixed(2)}%
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="flex gap-3">
            <button 
              onClick={() => generateAIReport()}
              disabled={!selectedStock}
              className="bg-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              AI Report
            </button>
          </div>

          {/* AI Analysis Report */}
          {aiReport && (
            <div className="mt-4 lg:mt-6 bg-slate-800/60 backdrop-blur-sm border border-purple-500/30 rounded-xl p-4">
              <h3 className="text-lg md:text-xl font-bold text-purple-400 mb-2">AI Analysis Report</h3>
              <p className="text-gray-300 leading-relaxed whitespace-pre-line">{aiReport}</p>
            </div>
          )}
        </div>

        {/* Stock Grid */}
        {!selectedStock && !loading && (
          <div className="text-center text-gray-400 py-12">
            <Search className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <p className="text-xl">Search for a stock to view details</p>
            <p className="text-sm mt-2">Type a stock symbol (e.g., AAPL, MSFT) in the search box above</p>
          </div>
        )}

        {loading && (
          <div className="text-center text-gray-400 py-12">Loading stock data...</div>
        )}

        {/* Detailed View */}
        {selectedStock && !detailsLoading && (
          <div>
            {/* Stock Header */}
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-4 mb-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                  {selectedStock.ticker.charAt(0)}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">{selectedStock.name}</h2>
                  <p className="text-gray-400">{selectedStock.ticker}</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left Column - Stock Details */}
              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-4">{selectedStock.name}</h3>
                <div className="space-y-2 text-sm">
                  <p className="text-gray-300">Symbol: <span className="text-white">{selectedStock.ticker}</span></p>
                  <p className="text-gray-300">Market Cap: <span className="text-white">${(selectedStock.market_cap || 0).toLocaleString()}</span></p>
                  <p className="text-gray-300">Current Price: <span className="text-white">${selectedStock.price?.toFixed(2)}</span></p>
                  <p className="text-gray-300">52 Week High: <span className="text-white">${selectedStock['52_week_high']?.toFixed(2) || 'N/A'}</span></p>
                  <p className="text-gray-300">52 Week Low: <span className="text-white">${selectedStock['52_week_low']?.toFixed(2) || 'N/A'}</span></p>
                  <p className="text-gray-300">Volume: <span className="text-white">{(selectedStock.volume || 0).toLocaleString()}</span></p>
                  <p className={`text-gray-300`}>
                    Day Change: <span className={selectedStock.change_percent >= 0 ? 'text-green-400' : 'text-red-400'}>
                      {selectedStock.change_percent >= 0 ? '+' : ''}{selectedStock.change_percent?.toFixed(2)}%
                    </span>
                  </p>
                </div>
                <button className="mt-4 w-full bg-green-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors">
                  Add to Portfolio
                </button>
              </div>

              {/* Historical Price Chart */}
              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold text-white">Historical Price</h3>
                  <div className="flex gap-2">
                    {[].map((range) => (
                      <button
                        key={range}
                        onClick={() => setTimeRange(range)}
                        className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                          timeRange === range
                            ? 'bg-cyan-600 text-white'
                            : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
                        }`}
                      >
                        {range}
                      </button>
                    ))}
                  </div>
                </div>
                {chartData.length > 0 ? (
                  <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={chartData}>
                      <XAxis dataKey="date" stroke="#6b7280" tick={{ fill: '#9ca3af' }} />
                      <YAxis stroke="#6b7280" tick={{ fill: '#9ca3af' }} />
                      <Tooltip
                        contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
                        labelStyle={{ color: '#e5e7eb' }}
                      />
                      <Line type="monotone" dataKey="price" stroke="#06b6d4" strokeWidth={2} dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-64 flex items-center justify-center text-gray-400">
                    No historical data available
                  </div>
                )}
              </div>

              {/* Returns Calculation */}
              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-4">Calculate Returns</h3>
                <div className="space-y-3">
                  <p className="text-gray-300">
                    Day Return: <span className={`font-semibold ${selectedStock.change_percent >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {selectedStock.change_percent >= 0 ? '+' : ''}{selectedStock.change_percent?.toFixed(2)}%
                    </span>
                  </p>
                  <p className="text-gray-300">
                    52-Week Return: <span className="text-green-400 font-semibold">
                      {calculateReturns(selectedStock.price, selectedStock['52_week_low'])}%
                    </span>
                  </p>
                  <p className="text-gray-300">Current Price: <span className="text-white font-semibold">${selectedStock.price?.toFixed(2)}</span></p>
                </div>
              </div>

              {/* Performance Metrics */}
              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-4">Performance Metrics</h3>
                <div className="space-y-3">
                  <p className="text-gray-300">P/E Ratio: <span className="text-white font-semibold">{selectedStock.pe_ratio?.toFixed(2) || 'N/A'}</span></p>
                  <p className="text-gray-300">EPS: <span className="text-white font-semibold">${selectedStock.eps?.toFixed(2) || 'N/A'}</span></p>
                  <p className="text-gray-300">Dividend Yield: <span className="text-white font-semibold">{selectedStock.dividend_yield?.toFixed(2) || '0.00'}%</span></p>
                </div>
              </div>

              {/* Risk & Volatility */}
              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-4">Risk & Volatility</h3>
                <div className="space-y-3">
                  <p className="text-gray-300">Beta: <span className="text-yellow-400 font-semibold">{selectedStock.beta?.toFixed(2) || 'N/A'}</span></p>
                  <p className="text-gray-300">52-Week Range: <span className="text-white font-semibold">
                    ${selectedStock['52_week_low']?.toFixed(2)} - ${selectedStock['52_week_high']?.toFixed(2)}
                  </span></p>
                  <p className="text-gray-300">Average Volume: <span className="text-white font-semibold">{(selectedStock.volume || 0).toLocaleString()}</span></p>
                </div>
              </div>
            </div>
          </div>
        )}

        {detailsLoading && (
          <div className="text-center text-gray-400 py-12">Loading stock details...</div>
        )}
      </div>
    </div>
  );
}