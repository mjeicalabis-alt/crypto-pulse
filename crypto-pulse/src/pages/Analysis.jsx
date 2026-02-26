import { useCrypto } from '../context/CryptoContext';

const Analysis = () => {
  const { currency, setCurrency } = useCrypto();

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white">
      <h2 className="text-2xl mb-4">Settings</h2>

      <select
        value={currency}
        onChange={(e) => setCurrency(e.target.value)}
        className="p-3 text-black rounded"
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="PHP">PHP</option>
      </select>
    </div>
  );
};

export default Analysis;