import Link from 'next/link';
import { motion } from 'framer-motion';

export const Hero = () => {
  return (
    <section className="relative overflow-hidden rounded-2xl p-8 glass-panel">
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">ADDUX — Marketplace de cuentas premium</h1>
          <p className="text-lg text-slate-300 max-w-lg">Compra y vende cuentas de streaming y cursos con seguridad y soporte 24/7.</p>
          <div className="flex gap-4">
            <Link href="/marketplace" className="inline-block bg-gradient-to-r from-neon-green to-neon-teal text-slate-900 px-6 py-3 rounded-md font-semibold">Explorar catálogo</Link>
            <Link href="/register" className="inline-block border border-white/10 px-5 py-3 rounded-md text-sm">Crear cuenta</Link>
          </div>
          <div className="flex gap-6 text-xs text-slate-400 mt-4">
            <span className="uppercase tracking-wider">Pagos seguros</span>
            <span className="uppercase tracking-wider">Entrega instantánea</span>
            <span className="uppercase tracking-wider">Soporte 24/7</span>
          </div>
        </div>
        <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}>
          <div className="grid grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-40 bg-gradient-to-br from-white/3 to-transparent rounded-md flex items-end p-4 neon-border">
                <div>
                  <p className="text-xs text-slate-400">Cuenta #{i}</p>
                  <h3 className="text-lg font-semibold">Premium {i}</h3>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
