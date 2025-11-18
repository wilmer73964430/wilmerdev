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
      <section className="py-6">
        <div className="space-y-6">
          <Badge tone="purple">Compra única garantizada</Badge>

          {/* Productos de prueba justo después del badge (solo este bloque permanece) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-2">
            {[
              { id: 1, title: 'Glow Pack Alpha', price: '9.99', desc: 'Loops y texturas neón para tus producciones.' },
              { id: 2, title: 'Starter Kit Beta', price: '14.99', desc: 'Plantillas y presets listos para usar.' },
              { id: 3, title: 'Pro Bundle Gamma', price: '29.99', desc: 'Colección pro con assets exclusivos.' },
              { id: 4, title: 'Ultimate Omega', price: '49.99', desc: 'Paquete completo — todo lo anterior y más.' }
            ].map((p) => (
              <Card key={p.id}>
                <div className="h-28 w-full rounded-md bg-gradient-to-br from-neon-green to-neon-teal flex items-center justify-center p-4 text-slate-900 font-semibold text-center">
                  <span className="text-lg">{p.title}</span>
                </div>

                <div className="mt-3 text-center">
                  <p className="text-sm text-slate-300 mb-3">{p.desc}</p>
                  <div className="flex items-center justify-center gap-4">
                    <div className="text-lg font-bold text-slate-100">${p.price}</div>
                    <Link href="/checkout">
                      <Button className="px-3 py-1 text-sm">Comprar</Button>
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </AppLayout>
  );
}
