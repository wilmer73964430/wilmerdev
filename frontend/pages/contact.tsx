import Link from 'next/link';
import { AppLayout } from '../components/layout/AppLayout';

export default function Contact() {
  return (
    <AppLayout>
      <section className="max-w-3xl mx-auto text-center py-24">
        <h1 className="text-2xl font-bold">Contacto</h1>
        <p className="text-slate-300 mt-4">Formulario de contacto y canales (placeholder).</p>
        <div className="mt-8">
          <Link href="/" className="text-neon underline">Volver al inicio</Link>
        </div>
      </section>
    </AppLayout>
  );
}
