'use client';
import { useState, useEffect, useRef } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Search, TrendingUp } from 'lucide-react';

export default function MutualFundsDashboard() {
  const [searchTerm, setSearchTerm] = useState('');
  const [fundList, setFundList] = useState<any[]>([]);
  const [selectedFund, setSelectedFund] = useState<any | null>(null);
  const [chartData, setChartData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [aiReport, setAiReport] = useState('');
  const [timeRange, setTimeRange] = useState('1Y');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const searchTimeoutRef = useRef<number | null>(null);

  // Read from environment variables
  const fmpApiKey = process.env.NEXT_PUBLIC_FMP_API_KEY || '';
  const geminiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || '';

  // Popular mutual funds to display initially
  const popularFunds = ['VFIAX', 'FXAIX', 'VTSAX', 'VTSMX', 'VFINX', 'AGTHX', 'FCNTX', 'DODGX', 'POAGX', 'VWELX'];

  const fetchMutualFundData = async () => {
    try {
      // Fetch mutual fund quotes
      const symbols = popularFunds.join(',');
      const response = await fetch(
        `https://financialmodelingprep.com/api/v3/quote/${symbols}?apikey=${fmpApiKey}`
      );
      const data = await response.json();

      // Normalize API response to array to avoid runtime errors when APIs
      // return an object or error payload.
      const list = Array.isArray(data) ? data : [];
      setFundList(list);
      setSearchResults(list);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching mutual fund data:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (fmpApiKey) {
      fetchMutualFundData();
      const interval = setInterval(fetchMutualFundData, 60000);
      return () => clearInterval(interval);
    } else {
      setLoading(false);
    }
  }, []);

  const searchFunds = async (query: string) => {
    if (!query.trim() || !fmpApiKey) return;
    setSearchLoading(true);
    try {
      const response = await fetch(
        `https://financialmodelingprep.com/api/v3/search?query=${query}&limit=20&exchange=MUTUAL_FUND&apikey=${fmpApiKey}`
      );
      const data = await response.json();

      if (data && data.length > 0) {
        // Fetch quotes for found symbols
        const symbols = data.slice(0, 10).map((item: any) => item.symbol).join(',');
        const quotesRes = await fetch(
          `https://financialmodelingprep.com/api/v3/quote/${symbols}?apikey=${fmpApiKey}`
        );
        const quotes = await quotesRes.json();
        const normalized = Array.isArray(quotes) ? quotes : [];
        setSearchResults(normalized);
        setShowSearchDropdown(true);
      } else {
        setSearchResults([]);
        setShowSearchDropdown(true);
      }
    } catch (error) {
      console.error('Error searching mutual funds:', error);
      setSearchResults([]);
      setShowSearchDropdown(true);
    } finally {
      setSearchLoading(false);
    }
  };

  const fetchFundDetails = async (symbol: string) => {
    setDetailsLoading(true);
    try {
      // Fetch fund profile
      const [profileRes, quoteRes, historicalRes] = await Promise.all([
        fetch(`https://financialmodelingprep.com/api/v3/profile/${symbol}?apikey=${fmpApiKey}`),
        fetch(`https://financialmodelingprep.com/api/v3/quote/${symbol}?apikey=${fmpApiKey}`),
        fetch(`https://financialmodelingprep.com/api/v3/historical-price-full/${symbol}?apikey=${fmpApiKey}`)
      ]);

      const profile = await profileRes.json();
      const quote = await quoteRes.json();
      const historical = await historicalRes.json();

      const fundData = {
        ...profile[0],
        ...quote[0]
      };

      setSelectedFund(fundData);

      if (historical.historical) {
        const formattedData = historical.historical
          .slice(0, 365)
          .reverse()
          .map((item: any) => ({
            date: new Date(item.date).toLocaleDateString(),
            price: item.close
          }));
        setChartData(formattedData);
      }

      setDetailsLoading(false);
    } catch (error) {
      console.error('Error fetching fund details:', error);
      setDetailsLoading(false);
    }
  };

  const generateAIReport = async () => {
    if (!selectedFund) {
      setAiReport('Please select a mutual fund first to generate an AI report.');
      return;
    }

    if (!geminiKey) {
      const fallback = `Analysis for ${selectedFund.name} (${selectedFund.symbol}): Current NAV: $${selectedFund.price?.toFixed(2)}. Expense Ratio: ${selectedFund.expenseRatio ? (selectedFund.expenseRatio * 100).toFixed(2) : 'N/A'}%. Outlook: This mutual fund provides ${selectedFund.sector || 'diversified'} exposure with professional management. Consider your investment horizon and risk tolerance. Risk: Market fluctuations, management changes, and expense ratios affect returns. Mutual funds are best for long-term investors.`;
      setAiReport(fallback);
      return;
    }

    try {
      const prompt = `Provide a brief investment analysis for the mutual fund ${selectedFund.name} (${selectedFund.symbol}). Current NAV: $${selectedFund.price?.toFixed(2)}. Sector focus: ${selectedFund.sector || 'diversified'}. Year-to-date change: ${selectedFund.changesPercentage?.toFixed(2)}%. Include outlook and risk assessment in 3-4 sentences.`;

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

  // Update the search term (onChange). The actual filtering + API search is handled
  // by a debounced useEffect below to ensure proper cleanup and avoid returning
  // a cleanup function from the handler (which is ineffective for onChange).
  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };

  // Debounced effect: filter local fund list immediately, then debounce API search
  useEffect(() => {
    // Clear any existing timeout
    if (searchTimeoutRef.current) {
      window.clearTimeout(searchTimeoutRef.current);
      searchTimeoutRef.current = null;
    }

    const q = searchTerm.trim();
    if (!q) {
      setSearchResults(fundList);
      setShowSearchDropdown(false);
      return;
    }

    // Local filter for instant results
    const filtered = fundList.filter(fund =>
      fund.name?.toLowerCase().includes(q.toLowerCase()) ||
      fund.symbol?.toLowerCase().includes(q.toLowerCase())
    );
    setSearchResults(filtered);
    setShowSearchDropdown(true);

    // Debounce remote search for more results
    const id = window.setTimeout(() => {
      searchFunds(q);
    }, 500);
    searchTimeoutRef.current = id;

    return () => {
      if (searchTimeoutRef.current) {
        window.clearTimeout(searchTimeoutRef.current);
        searchTimeoutRef.current = null;
      }
    };
  }, [searchTerm, fundList]);

  const selectFund = (fund: any) => {
    setSearchTerm(fund.name);
    setShowSearchDropdown(false);
    fetchFundDetails(fund.symbol);
  };

  const calculateReturns = (current: number, past: number) => {
    if (!past) return '0.00';
    return (((current - past) / past) * 100).toFixed(2);
  };

  if (!fmpApiKey) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
        <div className="bg-slate-800/50 backdrop-blur-sm border border-cyan-500/30 rounded-2xl p-8 max-w-md w-full text-center">
          <h2 className="text-2xl font-bold text-red-400 mb-4">API Key Required</h2>
          <p className="text-gray-300 mb-4">
            Please add your Financial Modeling Prep API key to your .env.local file:
          </p>
          <code className="block bg-slate-900 p-3 rounded text-cyan-400 text-sm">
            NEXT_PUBLIC_FMP_API_KEY=your_api_key
          </code>
          <p className="text-gray-400 text-sm mt-4">
            Get your free API key at: <a href="https://financialmodelingprep.com/developer/docs/" target="_blank" className="text-cyan-400 hover:underline">financialmodelingprep.com</a>
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
          Mutual Funds Dashboard
        </h1>

        {/* Search and Actions */}
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 mb-6">
          <div className="relative mb-4">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search for a mutual fund (e.g., VFIAX, FXAIX)..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              onFocus={() => searchTerm && setShowSearchDropdown(true)}
              className="w-full bg-slate-700/50 border border-slate-600 rounded-lg pl-12 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500"
            />
            {showSearchDropdown && (
              <div className="absolute z-10 w-full mt-2 bg-slate-800 border border-slate-700 rounded-lg shadow-xl max-h-96 overflow-y-auto">
                {searchLoading && (
                  <div className="p-3 text-gray-300">Searching...</div>
                )}
                {!searchLoading && searchResults.length === 0 && (
                  <div className="p-3 text-gray-400">No results found</div>
                )}
                {!searchLoading && searchResults.length > 0 && (
                  searchResults.map((fund) => (
                    <div
                      key={fund.symbol}
                      onClick={() => selectFund(fund)}
                      className="flex items-center gap-3 p-3 hover:bg-slate-700 cursor-pointer transition-colors"
                    >
                      <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center text-white font-bold">
                        {fund.symbol?.charAt(0) || 'F'}
                      </div>
                      <div className="flex-1">
                        <p className="text-white font-semibold">{fund.name || fund.symbol}</p>
                        <p className="text-gray-400 text-sm">{fund.symbol}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-white font-semibold">${fund.price?.toFixed(2)}</p>
                        <p className={`text-sm ${fund.changesPercentage >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                          {fund.changesPercentage >= 0 ? '+' : ''}{fund.changesPercentage?.toFixed(2)}%
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
          <div className="flex gap-3">
            <button 
              onClick={() => generateAIReport()}
              disabled={!selectedFund}
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

        {/* Fund Grid */}
        {!selectedFund && !loading && (
          <div className="text-center text-gray-400 py-12">
            <Search className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <p className="text-xl">Search for a mutual fund to view details</p>
            <p className="text-sm mt-2">Type a fund symbol (e.g., VFIAX, FXAIX) in the search box above</p>
          </div>
        )}

        {loading && (
          <div className="text-center text-gray-400 py-12">Loading mutual fund data...</div>
        )}

        {/* Detailed View */}
        {selectedFund && !detailsLoading && (
          <div>
            {/* Fund Header */}
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-4 mb-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                  {selectedFund.symbol?.charAt(0) || 'F'}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">{selectedFund.name || selectedFund.symbol}</h2>
                  <p className="text-gray-400">{selectedFund.symbol}</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left Column - Fund Details */}
              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-4">{selectedFund.name || selectedFund.symbol}</h3>
                <div className="space-y-2 text-sm">
                  <p className="text-gray-300">Symbol: <span className="text-white">{selectedFund.symbol}</span></p>
                  <p className="text-gray-300">NAV (Net Asset Value): <span className="text-white">${selectedFund.price?.toFixed(2)}</span></p>
                  <p className="text-gray-300">Market Cap: <span className="text-white">${(selectedFund.mktCap || 0).toLocaleString()}</span></p>
                  <p className="text-gray-300">Sector: <span className="text-white">{selectedFund.sector || 'Diversified'}</span></p>
                  <p className="text-gray-300">Expense Ratio: <span className="text-white">{selectedFund.expenseRatio ? (selectedFund.expenseRatio * 100).toFixed(2) : 'N/A'}%</span></p>
                  <p className="text-gray-300">52 Week High: <span className="text-white">${selectedFund.yearHigh?.toFixed(2) || 'N/A'}</span></p>
                  <p className="text-gray-300">52 Week Low: <span className="text-white">${selectedFund.yearLow?.toFixed(2) || 'N/A'}</span></p>
                  <p className={`text-gray-300`}>
                    YTD Change: <span className={selectedFund.changesPercentage >= 0 ? 'text-green-400' : 'text-red-400'}>
                      {selectedFund.changesPercentage >= 0 ? '+' : ''}{selectedFund.changesPercentage?.toFixed(2)}%
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
                  <h3 className="text-xl font-bold text-white">Historical NAV</h3>
                  <div className="flex gap-2">
                    {['1M', '3M', '6M', '1Y'].map((range) => (
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
                    YTD Return: <span className={`font-semibold ${selectedFund.changesPercentage >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {selectedFund.changesPercentage >= 0 ? '+' : ''}{selectedFund.changesPercentage?.toFixed(2)}%
                    </span>
                  </p>
                  <p className="text-gray-300">
                    52-Week Return: <span className="text-green-400 font-semibold">
                      {calculateReturns(selectedFund.price, selectedFund.yearLow)}%
                    </span>
                  </p>
                  <p className="text-gray-300">Current NAV: <span className="text-white font-semibold">${selectedFund.price?.toFixed(2)}</span></p>
                </div>
              </div>

              {/* Fund Characteristics */}
              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-4">Fund Characteristics</h3>
                <div className="space-y-3">
                  <p className="text-gray-300">Asset Class: <span className="text-white font-semibold">{selectedFund.sector || 'Mixed'}</span></p>
                  <p className="text-gray-300">Volume: <span className="text-white font-semibold">{(selectedFund.volume || 0).toLocaleString()}</span></p>
                  <p className="text-gray-300">Average Volume: <span className="text-white font-semibold">{(selectedFund.avgVolume || 0).toLocaleString()}</span></p>
                </div>
              </div>

              {/* Risk & Performance */}
              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-4">Risk & Performance</h3>
                <div className="space-y-3">
                  <p className="text-gray-300">Beta: <span className="text-yellow-400 font-semibold">{selectedFund.beta?.toFixed(2) || 'N/A'}</span></p>
                  <p className="text-gray-300">52-Week Range: <span className="text-white font-semibold">
                    ${selectedFund.yearLow?.toFixed(2)} - ${selectedFund.yearHigh?.toFixed(2)}
                  </span></p>
                  <p className="text-gray-300">Expense Ratio: <span className="text-white font-semibold">{selectedFund.expenseRatio ? (selectedFund.expenseRatio * 100).toFixed(2) : 'N/A'}%</span></p>
                </div>
              </div>
            </div>
          </div>
        )}

        {detailsLoading && (
          <div className="text-center text-gray-400 py-12">Loading mutual fund details...</div>
        )}
      </div>
    </div>
  );
}