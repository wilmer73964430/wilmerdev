import Link from 'next/link';
import { ArrowRight, Coins, LineChart, ShieldCheck, Wallet } from 'lucide-react';
import { Suspense } from 'react';
import { DashboardMetrics } from '../../components/dashboard-metrics';

const quickLinks = [
  {
    title: 'Marketplace SMM',
    description: 'Gestiona campañas, pedidos y automatizaciones.',
    href: '/services?type=smm'
  },
  {
    title: 'Streaming Hub',
    description: 'Inventario multi-proveedor con descuentos por plan.',
    href: '/services?type=streaming'
  },
  {
    title: 'Panel Secundario',
    description: 'Configura tu marca blanca con onboarding guiado.',
    href: '/secondary'
  }
];

export default function DashboardPage() {
  return (
    <main className="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-10">
      <header className="glass-panel p-8">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Bienvenido</p>
            <h1 className="text-4xl font-semibold text-white">Control central SocialMentorify</h1>
            <p className="mt-2 max-w-2xl text-slate-300">
              Monitorea tus ventas, gestiona suscripciones de streaming, cursos SMM y operaciones multi-tenant desde una interfaz
              futurista.
            </p>
          </div>
          <div className="grid gap-3 text-sm text-slate-300">
            <span className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-primary" /> RBAC activado</span>
            <span className="flex items-center gap-2"><Wallet className="h-4 w-4 text-primary" /> Billetera sincronizada</span>
            <span className="flex items-center gap-2"><LineChart className="h-4 w-4 text-primary" /> Métricas en tiempo real</span>
          </div>
        </div>
      </header>

      <section className="grid gap-6 md:grid-cols-3">
        {quickLinks.map((card) => (
          <Link key={card.title} href={card.href} className="glass-panel group flex flex-col p-6 transition hover:-translate-y-1">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/20 text-primary">
              <ArrowRight className="h-5 w-5" />
            </div>
            <h2 className="mt-4 text-xl font-semibold text-white">{card.title}</h2>
            <p className="mt-2 text-sm text-slate-300">{card.description}</p>
            <span className="mt-6 inline-flex items-center text-sm text-primary group-hover:translate-x-1">
              Abrir panel <ArrowRight className="ml-1 h-4 w-4" />
            </span>
          </Link>
        ))}
      </section>

      <Suspense fallback={<div className="glass-panel p-6">Cargando métricas...</div>}>
        <DashboardMetrics />
      </Suspense>

      <section className="glass-panel grid gap-8 p-8 md:grid-cols-2">
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">Planes y beneficios</h2>
          <p className="text-slate-300">
            Elige entre Plan Pro, Panel Secundario, paquetes de reseller y afiliado. Descuentos automáticos, onboarding marca blanca
            y comisiones escalonadas listos desde el día uno.
          </p>
          <ul className="space-y-3 text-sm text-slate-300">
            <li className="flex items-center gap-2"><Coins className="h-4 w-4 text-primary" /> Descuento -30% Plan Pro</li>
            <li className="flex items-center gap-2"><Wallet className="h-4 w-4 text-primary" /> Billetera y retiros con KYC</li>
            <li className="flex items-center gap-2"><LineChart className="h-4 w-4 text-primary" /> Reportes MRR, churn, cohortes</li>
          </ul>
        </div>
        <div className="glass-panel bg-slate-900/50 p-6">
          <h3 className="text-lg font-medium text-white">Roadmap inmediato</h3>
          <ol className="mt-4 space-y-3 text-sm text-slate-300">
            <li>1. Completar onboarding de Panel Secundario</li>
            <li>2. Conectar pasarela Stripe/PayPal</li>
            <li>3. Configurar proveedores de streaming y stock</li>
          </ol>
        </div>
      </section>
    </main>
  );
}
