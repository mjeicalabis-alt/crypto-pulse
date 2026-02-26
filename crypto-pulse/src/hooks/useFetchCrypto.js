import { useState, useEffect } from 'react';
import { useCrypto } from '../context/CryptoContext';

export const useFetchCrypto = () => {
  const { setCoins, currency } = useCrypto();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMarket = async () => {
      setLoading(true);
      setError(null); // Clear previous errors
      try {
        // Hitting the CoinGecko API directly instead of the Vite proxy
        const res = await fetch(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.toLowerCase()}&order=market_cap_desc&per_page=10&page=1`
        );

        if (!res.ok) {
          if (res.status === 429) {
            throw new Error("Rate Limit Exceeded: You are making too many requests. Please wait 1-2 minutes.");
          }
          throw new Error(`API Error: ${res.status} ${res.statusText}`);
        }

        const data = await res.json();
        setCoins(data);
        setLoading(false);

      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchMarket();
  }, [currency, setCoins]);

  return { loading, error };
};