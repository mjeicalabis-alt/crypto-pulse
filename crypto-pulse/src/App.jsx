import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { CryptoProvider } from './context/CryptoContext';
import Home from './pages/Home';
import Analysis from './pages/Analysis';

function App() {
  return (
    <CryptoProvider>
      <Router>
        <div className="min-h-screen bg-slate-950 text-slate-100">
          <nav className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 shadow-lg">
            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-cyan-600 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-900/50">
                  <span className="font-black text-xl italic text-white">C</span>
                </div>
                <h1 className="text-2xl font-extrabold tracking-widest text-white">
                  CRYPTO<span className="text-cyan-500">-PULSE</span>
                </h1>
              </div>

              <div className="flex gap-6 text-lg">
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
            </div>
          </nav>

          <main className="max-w-7xl mx-auto px-6 py-8">
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