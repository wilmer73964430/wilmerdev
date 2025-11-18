import { motion } from 'framer-motion';
import Link from 'next/link';
import { AppLayout } from '../components/layout/AppLayout';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Hero } from '../components/home/Hero';

export default function Home() {
  return (
    <AppLayout>
      <Hero />
      <div className="h-6" />
      <section className="grid md:grid-cols-2 gap-10 items-center">
        <div className="space-y-6">
          <Badge tone="purple">Compra única garantizada</Badge>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Marketplace neón para creadores que aman la velocidad y la seguridad.
          </h1>
          <p className="text-lg text-slate-300 max-w-xl">
            Vende y adquiere e-books, samples, assets y plantillas con un flujo de pago blindado, tokens seguros y un panel que
            brilla en la oscuridad.
          </p>
          <div className="flex gap-3">
            <Link href="/dashboard">
              <Button>Explorar catálogo</Button>
            </Link>
            <Link href="/checkout">
              <Button variant="ghost">Ir a checkout</Button>
            </Link>
          </div>
          <div className="flex gap-4 text-xs text-slate-400 uppercase tracking-wide">
            <span>SSL + JWT httpOnly</span>
            <span>Stripe Ready</span>
            <span>Compra Máx: 1</span>
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-2 gap-4"
        >
          {[1, 2, 3, 4].map((i) => (
            <Card key={i}>
              <p className="text-sm text-slate-400">Asset #{i}</p>
              <h3 className="text-xl font-semibold">Glow Pack {i}</h3>
              <p className="text-sm text-slate-300">Loops, plantillas y recursos premium listos para descargar.</p>
            </Card>
          ))}
        </motion.div>
      </section>
    </AppLayout>
  );
}
