import { Sidebar } from '@acme/ui';
import type { ReactNode } from 'react';

const links = [
  { href: '/admin', label: 'Dashboard' },
  { href: '/admin/productos', label: 'Productos' },
  { href: '/admin/pedidos', label: 'Pedidos' },
  { href: '/admin/usuarios', label: 'Usuarios' },
  { href: '/admin/cupones', label: 'Cupones' },
  { href: '/admin/reportes', label: 'Reportes' },
  { href: '/admin/ajustes', label: 'Ajustes' },
  { href: '/admin/logs', label: 'Logs' }
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <div className="grid gap-6 md:grid-cols-[240px_1fr]">
        <Sidebar title="Menú admin" links={links} />
        <div className="rounded-xl border bg-card p-6 shadow-sm">{children}</div>
      </div>
    </div>
  );
}
