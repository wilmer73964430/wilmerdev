import Link from 'next/link';
import { Button } from '@acme/ui';

const plans = [
  {
    name: 'Plan Básico',
    slug: 'plan-basico',
    price: '$9/mes',
    features: ['Entrega digital inmediata', '1 producto', 'Soporte estándar']
  },
  {
    name: 'Plan Estándar',
    slug: 'plan-estandar',
    price: '$19/mes',
    features: ['Entrega prioritaria', '3 productos', 'Reportes básicos']
  },
  {
    name: 'Plan Premium',
    slug: 'plan-premium',
    price: '$39/mes',
    features: ['Automatización avanzada', 'Webhooks firmados', 'Reportes completos']
  }
];

export default function PlanesPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-indigo-600">Catálogo</p>
          <h1 className="text-3xl font-bold">Planes y suscripciones</h1>
          <p className="text-muted-foreground">Precios claros, entrega digital asegurada.</p>
        </div>
        <Button asChild>
          <Link href="/carrito">Ir al carrito</Link>
        </Button>
      </div>
      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {plans.map((plan) => (
          <article key={plan.slug} className="rounded-xl border bg-card p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">{plan.name}</h2>
              <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">
                {plan.price}
              </span>
            </div>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              {plan.features.map((feature) => (
                <li key={feature}>• {feature}</li>
              ))}
            </ul>
            <Button className="mt-6 w-full" asChild>
              <Link href={`/checkout?plan=${plan.slug}`}>Elegir</Link>
            </Button>
          </article>
        ))}
      </div>
    </div>
  );
}
