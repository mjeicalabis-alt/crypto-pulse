import { useState, useRef, useEffect } from 'react';
import { useFetchCrypto } from '../hooks/useFetchCrypto';
import { useCrypto } from '../context/CryptoContext';
import MarketChart from '../components/MarketChart';

const Home = () => {
  const { coins } = useCrypto();
  const { loading, error } = useFetchCrypto();
  const [search, setSearch] = useState("");
  const inputRef = useRef(null);

  const filteredCoins = coins.filter(coin =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  // ONLY run focus AFTER loading is finished AND input exists
  useEffect(() => {
    if (!loading && inputRef.current) {
      inputRef.current.focus();
    }
  }, [loading]);

if (loading) {
  return (
    <div className="flex items-center justify-center h-screen bg-black text-white">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-cyan-400 border-solid mx-auto mb-6"></div>
        <h2 className="text-xl tracking-wide">
          Scanning Blockchain...
        </h2>
      </div>
    </div>
  );
}

  if (error) {
    return (
      <div className="p-6 bg-gray-900 min-h-screen text-red-500 text-center">
        <h2>{error}</h2>
      </div>
    );
  }

return (
  <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white px-4 md:px-10 py-8">

    {/* Search Bar */}
    <div className="max-w-xl mx-auto mb-10">
      <input
        ref={inputRef}
        type="text"
        placeholder="🔎 Search cryptocurrency..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-4 rounded-xl text-black text-lg shadow-lg focus:outline-none focus:ring-4 focus:ring-cyan-400 transition"
      />
    </div>

    {/* Coins Grid */}
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

      {filteredCoins.map(coin => (
        <div
          key={coin.id}
          className="bg-gray-800 p-6 rounded-2xl shadow-xl hover:scale-105 hover:shadow-cyan-500/30 transition duration-300"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold">{coin.name}</h3>
            <span className="uppercase text-sm text-gray-400">
              {coin.symbol}
            </span>
          </div>

          <p className="text-2xl font-semibold mb-2">
            ${coin.current_price.toLocaleString()}
          </p>

          <p
            className={`font-medium ${
              coin.price_change_percentage_24h > 0
                ? "text-green-400"
                : "text-red-400"
            }`}
          >
            {coin.price_change_percentage_24h.toFixed(2)}%
          </p>
        </div>
      ))}
    </div>

    {/* Chart Section */}
    <div className="mt-16 bg-gray-900 p-6 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Market Overview
      </h2>
      <MarketChart />
    </div>
  </div>
);
};

export default Home;