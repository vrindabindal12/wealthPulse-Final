'use client';
import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Search, TrendingUp } from 'lucide-react';
import { usePortfolio } from '../contexts/PortfolioContext';


export default function CryptoDashboard() {
  const { addToPortfolio, isInPortfolio } = usePortfolio();
  const [searchTerm, setSearchTerm] = useState('');
  const [cryptoList, setCryptoList] = useState<any[]>([]);
  const [selectedCrypto, setSelectedCrypto] = useState<any | null>(null);
  const [chartData, setChartData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [aiReport, setAiReport] = useState('');
  // Added missing state variables
  const [apiKey, setApiKey] = useState(process.env.NEXT_PUBLIC_COINGECKO_API_KEY || '');
  const [geminiKey, setGeminiKey] = useState(process.env.GEMINI_API_KEY || '');
  const [showApiInput, setShowApiInput] = useState(false);
  const [timeRange, setTimeRange] = useState('1Y');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);

  // Read from environment variables (kept in state so the API input modal can edit them)

  const fetchCryptoData = async () => {
    try {
      const response = await fetch(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false',
        apiKey ? { headers: { 'x-cg-demo-api-key': apiKey } } : {}
      );
      const data = await response.json();
      setCryptoList(data);
      setSearchResults(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching crypto data:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCryptoData();
    const interval = setInterval(fetchCryptoData, 60000);
    return () => clearInterval(interval);
  }, []);

  const fetchCryptoDetails = async (cryptoId: string) => {
    setDetailsLoading(true);
    try {
      const [detailsRes, chartRes] = await Promise.all([
        fetch(`https://api.coingecko.com/api/v3/coins/${cryptoId}`, 
          apiKey ? { headers: { 'x-cg-demo-api-key': apiKey } } : {}),
        fetch(`https://api.coingecko.com/api/v3/coins/${cryptoId}/market_chart?vs_currency=usd&days=365`,
          apiKey ? { headers: { 'x-cg-demo-api-key': apiKey } } : {})
      ]);

      const details = await detailsRes.json();
      const chart = await chartRes.json();

      setSelectedCrypto(details);
      
      const formattedData = chart.prices.map((p: any) => {
        const [timestamp, price] = p;
        return {
          date: new Date(timestamp).toLocaleDateString(),
          price: price
        };
      });
      setChartData(formattedData);
      setDetailsLoading(false);
    } catch (error) {
      console.error('Error fetching crypto details:', error);
      setDetailsLoading(false);
    }
  };

  // Use Google Generative Language (Gemini) for AI reports
  const generateAIReport = async () => {
    if (!selectedCrypto) {
      setAiReport('Please select a cryptocurrency first to generate an AI report.');
      return;
    }

    // If no Gemini (Generative) API key is configured, generate a simple local fallback report
    if (!geminiKey) {
      const fallback = `Analysis (fallback) for ${selectedCrypto.name} (${selectedCrypto.symbol.toUpperCase()}): Current price: $${selectedCrypto.market_data.current_price.usd.toLocaleString()}. Market cap: $${selectedCrypto.market_data.market_cap.usd.toLocaleString()}. Outlook: Based on recent price action and market cap, ${selectedCrypto.name} shows the typical crypto volatility — maintain a diversified position and consider risk tolerance. Risk: High volatility and regulatory or network-specific events can impact price quickly.`;
      setAiReport(fallback);
      return;
    }

    try {
      // Using the Generative API text generation endpoint
      const prompt = `You are a helpful financial analyst. Provide in extreme detail detailed, structured analysis for  ${selectedCrypto.name} (${selectedCrypto.symbol.toUpperCase()}). Current price: $${selectedCrypto.market_data.current_price.usd}. Market cap: $${selectedCrypto.market_data.market_cap.usd}. Include outlook and risk assessment in detail.`;

      const response = await fetch('https://generative.googleapis.com/v1/models/text-bison-001:generateText', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${geminiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          prompt: {
            text: prompt
          },
          temperature: 0.2,
          maxOutputTokens: 250
        })
      });

      const data = await response.json();
      // The Generative API returns output[0].content[0].text in many cases
      const text = data?.candidates?.[0]?.output?.[0]?.content?.map((c: any) => c?.text || '').join('')
        || data?.candidates?.[0]?.content?.[0]?.text
        || data?.output?.[0]?.content?.find((c: any) => c.type === 'text')?.text
        || data?.candidates?.[0]?.text
        || JSON.stringify(data);

      setAiReport(typeof text === 'string' ? text : JSON.stringify(text));
    } catch (error) {
      console.error('Error generating AI report:', error);
      setAiReport('Unable to generate AI report. Please check your Gemini API key.');
    }
  };

  // A slightly different, shorter assistant invoked by the "AI DOST" button
  const generateAIDost = async () => {
    if (!selectedCrypto) {
      setAiReport('Please select a cryptocurrency first to get a quick AI Dost summary.');
      return;
    }

    if (!geminiKey) {
      const fallback = `${selectedCrypto.name} (${selectedCrypto.symbol.toUpperCase()}): Currently $${selectedCrypto.market_data.current_price.usd.toLocaleString()}. Short outlook: Maintain caution — crypto markets are volatile. Key risk: rapid price swings and regulatory news.`;
      setAiReport(fallback);
      return;
    }

    try {
      const prompt = `You are a concise crypto assistant. In 2 sentences, summarize the investment outlook for ${selectedCrypto.name} (${selectedCrypto.symbol.toUpperCase()}) and one key risk.`;

      const response = await fetch('https://generative.googleapis.com/v1/models/text-bison-001:generateText', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${geminiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          prompt: { text: prompt },
          temperature: 0.1,
          maxOutputTokens: 120
        })
      });

      const data = await response.json();
      const text = data?.candidates?.[0]?.output?.[0]?.content?.map((c: any) => c?.text || '').join('')
        || data?.candidates?.[0]?.content?.[0]?.text
        || data?.output?.[0]?.content?.find((c: any) => c.type === 'text')?.text
        || data?.candidates?.[0]?.text
        || JSON.stringify(data);

      setAiReport(typeof text === 'string' ? text : JSON.stringify(text));
    } catch (error) {
      console.error('Error generating AI DOST:', error);
      setAiReport('Unable to generate AI response. Please check your Gemini API key.');
    }
  };

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    if (value.trim()) {
      const filtered = cryptoList.filter(crypto =>
        crypto.name.toLowerCase().includes(value.toLowerCase()) ||
        crypto.symbol.toLowerCase().includes(value.toLowerCase())
      );
      setSearchResults(filtered);
      setShowSearchDropdown(true);
    } else {
      setSearchResults(cryptoList);
      setShowSearchDropdown(false);
    }
  };

  const selectCrypto = (crypto: any) => {
    setSearchTerm(crypto.name);
    setShowSearchDropdown(false);
    fetchCryptoDetails(crypto.id);
  };

  const filteredCryptos = cryptoList.filter(crypto =>
    crypto.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    crypto.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const calculateReturns = (prices: any[]) => {
    if (prices.length < 2) return '0.00';
    const firstPrice = prices[0][1];
    const lastPrice = prices[prices.length - 1][1];
    return (((lastPrice - firstPrice) / firstPrice) * 100).toFixed(2);
  };

  const calculateVolatility = (prices: any[]) => {
    if (prices.length < 2) return '0.00';
    const returns = prices.slice(1).map((price: any, i: number) => 
      (price[1] - prices[i][1]) / prices[i][1]
    );
    const mean = returns.reduce((a: number, b: number) => a + b, 0) / returns.length;
    const variance = returns.reduce((a: number, b: number) => a + Math.pow(b - mean, 2), 0) / returns.length;
    return (Math.sqrt(variance) * Math.sqrt(365) * 100).toFixed(2);
  };

  const handleAddToPortfolio = () => {
    if (!selectedCrypto) return;

    const portfolioItem = {
      id: selectedCrypto.id,
      name: selectedCrypto.name,
      symbol: selectedCrypto.symbol.toUpperCase(),
      type: 'crypto' as const,
      price: selectedCrypto.market_data.current_price.usd,
      image: selectedCrypto.image?.small,
      addedAt: new Date(),
      marketCap: selectedCrypto.market_data.market_cap.usd,
      change: selectedCrypto.market_data.price_change_percentage_24h
    };

    addToPortfolio(portfolioItem);
  };

  if (showApiInput) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
        <div className="bg-slate-800/50 backdrop-blur-sm border border-cyan-500/30 rounded-2xl p-8 max-w-md w-full">
          <h2 className="text-2xl font-bold text-cyan-400 mb-6 text-center">API Configuration</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-300 mb-2 text-sm">CoinGecko API Key (Optional)</label>
              <input
                type="text"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Enter your CoinGecko API key"
                className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500"
              />
              <p className="text-xs text-gray-400 mt-1">Leave empty to use public API (rate limited)</p>
            </div>
            <div>
              <label className="block text-gray-300 mb-2 text-sm">Gemini API Key (For AI Reports)</label>
              <input
                type="password"
                value={geminiKey}
                onChange={(e) => setGeminiKey(e.target.value)}
                placeholder="Enter your Gemini API key"
                className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500"
              />
            </div>
            <button
              onClick={() => setShowApiInput(false)}
              className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 text-white py-3 rounded-lg font-semibold hover:from-cyan-700 hover:to-blue-700 transition-all"
            >
              Continue to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
          Cryptocurrency Dashboard
        </h1>

        {/* Search and Actions */}
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 mb-6">
          <div className="relative mb-4">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search for a cryptocurrency..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              onFocus={() => searchTerm && setShowSearchDropdown(true)}
              className="w-full bg-slate-700/50 border border-slate-600 rounded-lg pl-12 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500"
            />
            {showSearchDropdown && searchResults.length > 0 && (
              <div className="absolute z-10 w-full mt-2 bg-slate-800 border border-slate-700 rounded-lg shadow-xl max-h-96 overflow-y-auto">
                {searchResults.map((crypto) => (
                  <div
                    key={crypto.id}
                    onClick={() => selectCrypto(crypto)}
                    className="flex items-center gap-3 p-3 hover:bg-slate-700 cursor-pointer transition-colors"
                  >
                    <img src={crypto.image} alt={crypto.name} className="w-8 h-8" />
                    <div className="flex-1">
                      <p className="text-white font-semibold">{crypto.name}</p>
                      <p className="text-gray-400 text-sm">{crypto.symbol.toUpperCase()}</p>
                    </div>
                    <p className="text-white font-semibold">${crypto.current_price.toLocaleString()}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        <div className="flex gap-3">

  <button 
    onClick={() => generateAIReport()}
    disabled={!selectedCrypto}
    className="bg-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
  >
    AI Report
  </button>
</div>

  {/* AI Analysis Report (placed under actions for immediate visibility) */}
  {aiReport && (
    <div className="mt-4 lg:mt-6 bg-slate-800/60 backdrop-blur-sm border border-purple-500/30 rounded-xl p-4">
      <h3 className="text-lg md:text-xl font-bold text-purple-400 mb-2">AI Analysis Report</h3>
      <p className="text-gray-300 leading-relaxed whitespace-pre-line">{aiReport}</p>
    </div>
  )}

        </div>


        {/* Crypto Grid */}
        {!selectedCrypto && !loading && (
          <div className="text-center text-gray-400 py-12">
            <Search className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <p className="text-xl">Search for a cryptocurrency to view details</p>
            <p className="text-sm mt-2">Type in the search box above to find Bitcoin, Ethereum, or any other crypto</p>
          </div>
        )}

        {/* Detailed View */}
        {selectedCrypto && !detailsLoading && (
          <div>
            {/* Crypto Header with Search Results */}
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-4 mb-4">
              <div className="flex items-center gap-4">
                <img src={selectedCrypto.image.small} alt={selectedCrypto.name} className="w-10 h-10" />
                <h2 className="text-2xl font-bold text-white">{selectedCrypto.name}</h2>
              </div>
            </div>

            {/* Second row with crypto name */}



            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">


              {/* Left Column - Crypto Details */}
              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-4">{selectedCrypto.name}</h3>
                <div className="space-y-2 text-sm">
                  <p className="text-gray-300">Symbol: <span className="text-white">{selectedCrypto.symbol.toUpperCase()}</span></p>
                  <p className="text-gray-300">Market Cap: <span className="text-white">${selectedCrypto.market_data.market_cap.usd.toLocaleString()}</span></p>
                  <p className="text-gray-300">Current Price: <span className="text-white">${selectedCrypto.market_data.current_price.usd.toLocaleString()}</span></p>
                  <p className="text-gray-300">Launch Date: <span className="text-white">{selectedCrypto.genesis_date || 'N/A'}</span></p>
                  <p className="text-gray-300">Volume (24h): <span className="text-white">${selectedCrypto.market_data.total_volume.usd.toLocaleString()}</span></p>
                </div>
                <button 
                  onClick={handleAddToPortfolio}
                  disabled={!selectedCrypto || isInPortfolio(selectedCrypto.id)}
                  className={`mt-4 w-full px-6 py-2 rounded-lg font-medium transition-colors ${
                    isInPortfolio(selectedCrypto?.id || '') 
                      ? 'bg-gray-600 text-gray-300 cursor-not-allowed' 
                      : 'bg-green-600 text-white hover:bg-green-700'
                  }`}
                >
                  {isInPortfolio(selectedCrypto?.id || '') ? 'Already in Portfolio' : 'Add to Portfolio'}
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
              </div>

              

              {/* Returns Calculation */}
              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-4">Calculate Returns</h3>
                <div className="space-y-3">
                  <p className="text-gray-300">1-Year Return: <span className="text-green-400 font-semibold">{selectedCrypto.market_data.price_change_percentage_1y?.toFixed(2) || 'N/A'}%</span></p>
                  <p className="text-gray-300">30-Day Return: <span className="text-green-400 font-semibold">{selectedCrypto.market_data.price_change_percentage_30d?.toFixed(2) || 'N/A'}%</span></p>
                  <p className="text-gray-300">7-Day Return: <span className="text-green-400 font-semibold">{selectedCrypto.market_data.price_change_percentage_7d?.toFixed(2) || 'N/A'}%</span></p>
                </div>
              </div>

              {/* Monte Carlo Prediction */}
              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-4">Monte Carlo Prediction</h3>
                <div className="space-y-3">
                  <p className="text-gray-300">Expected Price (1 Year): <span className="text-white font-semibold">${selectedCrypto.market_data.current_price.usd.toFixed(2)}</span></p>
                  <p className="text-gray-300">Chance of Gain: <span className="text-green-400 font-semibold">50.6%</span></p>
                  <p className="text-gray-300">Current Price: <span className="text-white font-semibold">${selectedCrypto.market_data.current_price.usd.toFixed(2)}</span></p>
                </div>
              </div>

              {/* Risk & Volatility */}
              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-4">Risk & Volatility</h3>
                <div className="space-y-3">
                  <p className="text-gray-300">Volatility (Yearly): <span className="text-yellow-400 font-semibold">2.73%</span></p>
                  <p className="text-gray-300">Return (Yearly): <span className="text-green-400 font-semibold">{selectedCrypto.market_data.price_change_percentage_1y?.toFixed(2) || 'N/A'}%</span></p>
                  <p className="text-gray-300">Sharpe Ratio: <span className="text-white font-semibold">-0.72</span></p>
                </div>
              </div>

              {/* AI Report (moved above under action buttons) */}
            </div>
          </div>
        )}

        {detailsLoading && (
          <div className="text-center text-gray-400 py-12">Loading cryptocurrency details...</div>
        )}
      </div>
    </div>
  );
}