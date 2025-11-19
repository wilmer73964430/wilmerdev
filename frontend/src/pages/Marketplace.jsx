import { useEffect, useState } from 'react';
import axios from 'axios';

const CurrencyBadge = ({ currency }) => (
  <span className="px-2 py-1 rounded-full bg-white/10 text-neon text-xs">{currency}</span>
);

const Marketplace = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios.get('/api/products').then((res) => setProducts(res.data)).catch(() => setProducts([]));
  }, []);

  return (
    <main className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="glass-card p-6">
        <h1 className="text-3xl font-bold text-neon">Marketplace de productos digitales</h1>
        <p className="text-white/70 mt-2">Moneda base USD con conversión automática en vivo según configuración de superadmin.</p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <div key={product.id} className="glass-card p-4 space-y-2">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-lg">{product.title}</h2>
              <CurrencyBadge currency={product.currency || 'USD'} />
            </div>
            <p className="text-white/60 text-sm line-clamp-3">{product.description}</p>
            <p className="text-2xl text-neon font-bold">{product.displayPrice || product.priceUsd} {product.currency || 'USD'}</p>
            <div className="text-xs text-white/50">Stock: {product.stock ?? '∞'} · Garantía: {product.warrantyDays} días</div>
            <button className="w-full py-2 rounded-lg bg-neon text-charcoal font-semibold hover:opacity-90 transition">Agregar al carrito</button>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Marketplace;
