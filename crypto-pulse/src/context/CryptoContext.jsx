import { createContext, useState, useContext, useEffect } from 'react';

const CryptoContext = createContext();

export const CryptoProvider = ({ children }) => {
  const [coins, setCoins] = useState([]);
  
  // Initialize currency from localStorage, or default to 'USD'
  const [currency, setCurrency] = useState(() => {
    return localStorage.getItem('crypto-currency') || 'USD';
  });

  // Save currency to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('crypto-currency', currency);
  }, [currency]);

  return (
    <CryptoContext.Provider value={{ coins, setCoins, currency, setCurrency }}>
      {children}
    </CryptoContext.Provider>
  );
};

export const useCrypto = () => useContext(CryptoContext);