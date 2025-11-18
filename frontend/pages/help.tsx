import Link from 'next/link';
import { AppLayout } from '../components/layout/AppLayout';

export default function Help() {
  return (
    <AppLayout>
      <section className="max-w-3xl mx-auto text-center py-24">
        <h1 className="text-2xl font-bold">Centro de ayuda</h1>
        <p className="text-slate-300 mt-4">Preguntas frecuentes y ayuda (placeholder).</p>
        <div className="mt-8">
          <Link href="/contact" className="text-neon underline">Contactar soporte</Link>
        </div>
      </section>
    </AppLayout>
  );
}
