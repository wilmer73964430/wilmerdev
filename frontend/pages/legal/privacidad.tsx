import Link from 'next/link';
import { AppLayout } from '../../../components/layout/AppLayout';

export default function Privacidad() {
  return (
    <AppLayout>
      <section className="max-w-3xl mx-auto text-center py-24">
        <h1 className="text-2xl font-bold">Política de Privacidad</h1>
        <p className="text-slate-300 mt-4">Texto de privacidad (placeholder).</p>
        <div className="mt-8">
          <Link href="/legal" className="text-neon underline">Volver a Legal</Link>
        </div>
      </section>
    </AppLayout>
  );
}
