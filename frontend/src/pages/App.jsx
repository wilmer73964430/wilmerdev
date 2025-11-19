import { Routes, Route, Link } from 'react-router-dom';
import Marketplace from './Marketplace.jsx';
import Dashboard from './Dashboard.jsx';
import AuthLayout from '../layouts/AuthLayout.jsx';

const App = () => (
  <div className="min-h-screen bg-gradient-to-br from-charcoal via-black to-charcoal">
    <header className="sticky top-0 z-10 bg-black/70 backdrop-blur-lg border-b border-white/5">
      <div className="max-w-6xl mx-auto flex items-center justify-between p-4">
        <Link to="/" className="text-neon font-bold text-xl">NeoMarket SaaS</Link>
        <nav className="flex gap-4 text-sm">
          <Link to="/" className="hover:text-neon">Marketplace</Link>
          <Link to="/dashboard" className="hover:text-neon">Panel</Link>
          <Link to="/auth" className="hover:text-neon">Acceso</Link>
        </nav>
      </div>
    </header>
    <Routes>
      <Route path="/" element={<Marketplace />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/auth" element={<AuthLayout />} />
    </Routes>
    <footer className="border-t border-white/5 bg-black/60 py-6 mt-10">
      <div className="max-w-6xl mx-auto text-sm text-white/60 flex justify-between">
        <span>Infraestructura lista para hosting compartido cPanel</span>
        <span>Multi-rol · Multi-moneda · Seguridad JWT</span>
      </div>
    </footer>
  </div>
);

export default App;
