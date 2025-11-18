import Link from 'next/link';
import { AppLayout } from '../components/layout/AppLayout';

export default function Legal() {
  return (
    <AppLayout>
      <section className="max-w-3xl mx-auto text-center py-24 space-y-6">
        <h1 className="text-2xl font-bold">Legal</h1>
        <p className="text-slate-300">Políticas y términos (placeholder). Selecciona:</p>
        <div className="flex justify-center gap-6">
          <Link href="/legal/privacidad" className="text-neon underline">Privacidad</Link>
          <Link href="/legal/terminos" className="text-neon underline">Términos</Link>
        </div>
        <div>
          <Link href="/" className="text-slate-400 underline">Volver al inicio</Link>
        </div>
      </section>
    </AppLayout>
  );
}
