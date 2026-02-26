import { useCrypto } from '../context/CryptoContext';

const Analysis = () => {
  const { currency, setCurrency } = useCrypto();

  return (
    <div className="max-w-4xl mx-auto space-y-10">
      <div className="text-center space-y-4 pt-10">
        <h1 className="text-4xl font-black tracking-tight text-white">Market Analysis & Settings</h1>
        <p className="text-slate-400">Manage your preferred global base currency for the dashboard.</p>
      </div>

      <div className="bg-slate-900 border border-slate-800 p-10 rounded-3xl flex flex-col items-center gap-8 shadow-2xl">
        <div className="text-center space-y-2">
          <h3 className="text-xl font-bold text-slate-200">Base Currency Selection</h3>
          <p className="text-sm text-slate-500">Select the currency to display asset prices in.</p>
        </div>
        
        <div className="flex bg-slate-800 p-2 rounded-2xl gap-2 w-full max-w-md">
          {['USD', 'EUR', 'PHP'].map((curr) => (
            <button
              key={curr}
              onClick={() => setCurrency(curr)}
              className={`flex-1 py-4 rounded-xl font-bold uppercase transition-all duration-300 ${
                currency === curr 
                ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-900/40' 
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700'
              }`}
            >
              {curr}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Analysis;