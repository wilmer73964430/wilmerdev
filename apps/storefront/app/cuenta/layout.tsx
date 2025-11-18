import { Sidebar } from '@acme/ui';
import type { ReactNode } from 'react';

const links = [
  { href: '/cuenta', label: 'Resumen' },
  { href: '/cuenta/pedidos', label: 'Pedidos' },
  { href: '/cuenta/suscripciones', label: 'Suscripciones' },
  { href: '/cuenta/facturacion', label: 'Facturación' },
  { href: '/cuenta/soporte', label: 'Soporte' },
  { href: '/cuenta/perfil', label: 'Perfil' }
];

export default function CuentaLayout({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="grid gap-6 md:grid-cols-[220px_1fr]">
        <Sidebar title="Navegación de cuenta" links={links} />
        <div className="rounded-xl border bg-card p-6 shadow-sm">{children}</div>
      </div>
    </div>
  );
}
