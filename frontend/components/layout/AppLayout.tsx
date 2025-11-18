import Head from 'next/head';
import Link from 'next/link';
import { ReactNode } from 'react';
import { Button } from '../ui/Button';

export const AppLayout = ({ children }: { children: ReactNode }) => (
  <div className="min-h-screen text-slate-100">
    <Head>
      <title>Neon Digital Market</title>
      <meta name="description" content="Marketplace futurista de productos digitales" />
    </Head>
    <header className="flex items-center justify-between px-8 py-5 sticky top-0 bg-black/60 backdrop-blur-md z-20 border-b border-white/5">
      <div className="text-xl font-bold tracking-tight">NEON<span className="text-neon-blue">//</span>VAULT</div>
      <nav className="flex items-center gap-4 text-sm uppercase">
        <Link href="/" className="hover:text-neon-blue">Inicio</Link>
        <Link href="/dashboard" className="hover:text-neon-purple">Dashboard</Link>
        <Link href="/checkout" className="hover:text-neon-pink">Checkout</Link>
        <Link href="/admin" className="hover:text-neon-blue">Admin</Link>
        <Button variant="ghost">Entrar</Button>
      </nav>
    </header>
    <main className="px-6 md:px-12 py-8 max-w-6xl mx-auto space-y-8">{children}</main>
    <footer className="px-8 py-6 text-xs text-slate-400 flex justify-between">
      <span>© 2088 Neon Vault. Compra única, acceso total.</span>
      <span className="text-neon-blue">Seguridad ultra // SSL + Tokens</span>
    </footer>
  </div>
);
