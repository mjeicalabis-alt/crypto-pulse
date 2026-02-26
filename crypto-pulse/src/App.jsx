import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { CryptoProvider } from './context/CryptoContext';
import Home from './pages/Home';
import Analysis from './pages/Analysis';

function App() {
  return (
    <CryptoProvider>
      <Router>
        <nav className="bg-gradient-to-r from-indigo-900 to-purple-900 text-white shadow-lg">
  <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
    <h1 className="text-2xl font-extrabold tracking-widest">
      CRYPTO-PULSE
    </h1>

    <div className="flex gap-6 text-lg">
      <Link 
        to="/" 
        className="hover:text-cyan-400 transition duration-300"
      >
        Market
      </Link>

      <Link 
        to="/analysis" 
        className="hover:text-cyan-400 transition duration-300"
      >
        Analysis
      </Link>
    </div>
  </div>
</nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/analysis" element={<Analysis />} />
        </Routes>
      </Router>
    </CryptoProvider>
  );
}

export default App;