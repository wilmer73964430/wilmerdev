import Link from 'next/link';
import { AppLayout } from '../components/layout/AppLayout';

export default function Marketplace() {
  return (
    <AppLayout>
      <section className="max-w-4xl mx-auto text-center py-24">
        <h1 className="text-3xl md:text-4xl font-bold">Marketplace</h1>
        <p className="text-slate-300 mt-4">Aquí verás el catálogo de assets y productos (placeholder).</p>
        <div className="mt-8">
          <Link href="/" className="text-neon underline">Volver al inicio</Link>
        </div>
      </section>
    </AppLayout>
  );
}
