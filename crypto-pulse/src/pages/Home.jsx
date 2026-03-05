import { useState, useRef, useEffect } from 'react';
import { useFetchCrypto } from '../hooks/useFetchCrypto';
import { useCrypto } from '../context/CryptoContext';
import MarketChart from '../components/MarketChart';

const Home = () => {
  const { coins, currency } = useCrypto(); 
  const { loading, error } = useFetchCrypto();
  
  const [search, setSearch] = useState(() => {
    return localStorage.getItem('crypto-search') || "";
  });
  
  const inputRef = useRef(null);
  const currencySymbol = currency === 'USD' ? '$' : currency === 'EUR' ? '€' : '₱';

  const filteredCoins = coins.filter(coin =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    if (!loading && inputRef.current) {
      inputRef.current.focus();
    }
  }, [loading]);

  useEffect(() => {
    localStorage.setItem('crypto-search', search);
  }, [search]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 sm:h-16 sm:w-16 border-t-4 border-cyan-400 border-solid mx-auto mb-6"></div>
          <h2 className="text-lg sm:text-xl tracking-wide text-slate-300">Scanning Blockchain...</h2>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 sm:p-6 text-red-400 text-center min-h-[60vh] flex items-center justify-center">
        <h2 className="text-xl sm:text-2xl font-semibold">{error}</h2>
      </div>
    );
  }

  return (
    <div className="space-y-6 sm:space-y-10">
      {/* Search Bar */}
      <div className="max-w-2xl mx-auto w-full">
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400 text-lg sm:text-xl">🔎</span>
          <input
            ref={inputRef}
            type="text"
            placeholder="Search cryptocurrency..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3 sm:py-4 bg-slate-900 border border-slate-700 rounded-xl sm:rounded-2xl text-slate-100 text-base sm:text-lg shadow-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
        {/* Chart Section */}
        <section className="lg:col-span-8 bg-slate-900 border border-slate-800 p-4 sm:p-6 rounded-2xl sm:rounded-3xl shadow-2xl flex flex-col">
          <div className="flex flex-wrap justify-between items-center gap-3 mb-4 sm:mb-2">
            <h2 className="text-xl sm:text-2xl font-bold text-white">Market Overview</h2>
            <div className="flex items-center gap-2 px-3 py-1 bg-cyan-500/10 rounded-full">
               <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></span>
               <span className="text-[10px] sm:text-xs font-bold text-cyan-400 uppercase tracking-wider">Live Data</span>
            </div>
          </div>
          <MarketChart />
        </section>

        {/* Assets Grid / Sidebar */}
        <aside className="lg:col-span-4 flex flex-col bg-slate-900 border border-slate-800 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden min-h-[400px]">
          <div className="p-4 sm:p-6 border-b border-slate-800">
            <h2 className="text-lg sm:text-xl font-bold text-white">Top Assets ({currency})</h2>
          </div>
          <div className="overflow-y-auto max-h-[400px] sm:max-h-[600px] custom-scrollbar p-3 sm:p-4 space-y-2 sm:space-y-3 flex-grow">
            {filteredCoins.map(coin => (
              <div
                key={coin.id}
                className="bg-slate-800/50 hover:bg-slate-800 p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-slate-700/50 hover:border-cyan-500/50 transition duration-300 flex items-center justify-between group cursor-pointer"
              >
                <div className="flex items-center gap-3 sm:gap-4">
                  <img src={coin.image} alt={coin.name} className="w-8 h-8 sm:w-10 sm:h-10 rounded-full group-hover:scale-110 transition-transform" />
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-slate-100 truncate max-w-[100px] sm:max-w-[150px]">{coin.name}</h3>
                    <span className="uppercase text-[10px] sm:text-xs font-medium text-slate-400">{coin.symbol}</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-base sm:text-lg font-bold text-white">
                    {currencySymbol}{coin.current_price.toLocaleString()}
                  </p>
                  <p className={`text-xs sm:text-sm font-semibold ${coin.price_change_percentage_24h > 0 ? "text-green-400" : "text-red-400"}`}>
                    {coin.price_change_percentage_24h > 0 ? "+" : ""}{coin.price_change_percentage_24h.toFixed(2)}%
                  </p>
                </div>
              </div>
            ))}
            {filteredCoins.length === 0 && (
              <p className="text-slate-400 text-center py-10 text-sm sm:text-base">No coins found.</p>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Home;