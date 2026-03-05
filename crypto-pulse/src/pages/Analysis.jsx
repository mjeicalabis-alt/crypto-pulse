import { useCrypto } from '../context/CryptoContext';

const Analysis = () => {
  const { currency, setCurrency } = useCrypto();

  return (
    <div className="max-w-4xl mx-auto space-y-8 sm:space-y-10">
      <div className="text-center space-y-3 sm:space-y-4 pt-6 sm:pt-10">
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white">Market Analysis & Settings</h1>
        <p className="text-sm sm:text-base text-slate-400 px-4">Manage your preferred global base currency for the dashboard.</p>
      </div>

      <div className="bg-slate-900 border border-slate-800 p-6 sm:p-10 rounded-2xl sm:rounded-3xl flex flex-col items-center gap-6 sm:gap-8 shadow-2xl mx-4 sm:mx-0">
        <div className="text-center space-y-1 sm:space-y-2">
          <h3 className="text-lg sm:text-xl font-bold text-slate-200">Base Currency Selection</h3>
          <p className="text-xs sm:text-sm text-slate-500">Select the currency to display asset prices in.</p>
        </div>
        
        {/* Buttons now flex-wrap on very small screens */}
        <div className="flex flex-wrap sm:flex-nowrap bg-slate-800 p-2 rounded-2xl gap-2 w-full max-w-md">
          {['USD', 'EUR', 'PHP'].map((curr) => (
            <button
              key={curr}
              onClick={() => setCurrency(curr)}
              className={`flex-1 min-w-[30%] py-3 sm:py-4 rounded-xl text-sm sm:text-base font-bold uppercase transition-all duration-300 ${
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