import Link from 'next/link';
import { Button } from '@acme/ui';

const featuredPlans = [
  {
    name: 'Plan Básico',
    description: 'Entrega inmediata de códigos digitales para empezar.',
    price: '$9/mes'
  },
  { name: 'Plan Estándar', description: 'Más capacidad y soporte priorizado.', price: '$19/mes' },
  { name: 'Plan Premium', description: 'MRR predecible con features avanzados.', price: '$39/mes' }
];

export default function Page() {
  return (
    <section className="bg-gradient-to-b from-indigo-50 to-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-4 py-16">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-center">
          <div className="space-y-4">
            <p className="inline-flex items-center rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700">
              Seguridad, cumplimiento y entregas instantáneas
            </p>
            <h1 className="text-4xl font-bold leading-tight text-gray-900 sm:text-5xl">
              Suscripciones y códigos digitales listos para producción
            </h1>
            <p className="text-lg text-muted-foreground">
              Automatiza pagos con Stripe, entrega códigos únicos y gestiona pedidos con auditoría y
              reportes exportables.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild>
                <Link href="/planes">Ver planes</Link>
              </Button>
              <Button asChild variant="secondary">
                <Link href="/login">Mi cuenta</Link>
              </Button>
            </div>
          </div>
          <div className="rounded-2xl border bg-white/70 p-6 shadow-lg">
            <h2 className="text-lg font-semibold">Razones para elegirnos</h2>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              <li>✔️ Webhooks firmados y reintentos automáticos.</li>
              <li>✔️ Panel admin independiente con RBAC.</li>
              <li>✔️ Plantillas de email listas para producción.</li>
              <li>✔️ Reportes descargables en CSV/XLSX.</li>
            </ul>
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-bold">Planes destacados</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {featuredPlans.map((plan) => (
              <div key={plan.name} className="rounded-xl border bg-white p-5 shadow-sm">
                <h3 className="text-lg font-semibold">{plan.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{plan.description}</p>
                <p className="mt-4 text-2xl font-bold">{plan.price}</p>
                <Button className="mt-4 w-full" asChild>
                  <Link href="/planes">Elegir plan</Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
