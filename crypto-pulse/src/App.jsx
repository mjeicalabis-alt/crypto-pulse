import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { CryptoProvider } from './context/CryptoContext';
import { Menu, X } from 'lucide-react';
import Home from './pages/Home';
import Analysis from './pages/Analysis';

function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <CryptoProvider>
      <Router>
        <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col">
          <nav className="sticky top-0 z-50 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
              {/* Logo */}
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-cyan-600 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-900/50">
                  <span className="font-black text-lg sm:text-xl italic text-white">C</span>
                </div>
                <h1 className="text-xl sm:text-2xl font-extrabold tracking-widest text-white">
                  CRYPTO<span className="text-cyan-500">-PULSE</span>
                </h1>
              </div>

              {/* Desktop Menu */}
              <div className="hidden md:flex gap-6 text-lg">
                <Link 
                  to="/" 
                  className="font-medium text-slate-300 hover:text-cyan-400 transition duration-300"
                >
                  Market
                </Link>
                <Link 
                  to="/analysis" 
                  className="font-medium text-slate-300 hover:text-cyan-400 transition duration-300"
                >
                  Analysis
                </Link>
              </div>

              {/* Mobile Menu Toggle Button */}
              <div className="md:hidden flex items-center">
                <button 
                  onClick={() => setIsOpen(!isOpen)} 
                  className="text-slate-300 hover:text-white focus:outline-none transition"
                  aria-label="Toggle Menu"
                >
                  {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
              </div>
            </div>

            {/* Mobile Menu Dropdown */}
            {isOpen && (
              <div className="md:hidden bg-slate-800 border-t border-slate-700 absolute w-full shadow-2xl">
                <div className="px-4 pt-2 pb-6 space-y-2">
                  <Link 
                    to="/" 
                    onClick={() => setIsOpen(false)} 
                    className="block px-3 py-3 rounded-md text-base font-medium text-slate-300 hover:text-white hover:bg-slate-700 transition"
                  >
                    Market
                  </Link>
                  <Link 
                    to="/analysis" 
                    onClick={() => setIsOpen(false)} 
                    className="block px-3 py-3 rounded-md text-base font-medium text-slate-300 hover:text-white hover:bg-slate-700 transition"
                  >
                    Analysis
                  </Link>
                </div>
              </div>
            )}
          </nav>

          <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/analysis" element={<Analysis />} />
            </Routes>
          </main>
        </div>
      </Router>
    </CryptoProvider>
  );
}

export default App;