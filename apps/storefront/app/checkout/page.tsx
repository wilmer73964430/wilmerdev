import Link from 'next/link';

export const metadata = { title: 'Página' };

export default function Page() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 space-y-4">
      <h1 className="text-3xl font-bold">Contenido próximamente</h1>
      <p className="text-muted-foreground">Esta sección resume el flujo solicitado en la especificación.</p>
      <Link className="text-indigo-600 underline" href="/planes">
        Volver a planes
      </Link>
    </div>
  );
}
