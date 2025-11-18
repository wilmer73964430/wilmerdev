import Head from 'next/head';
import { ReactNode } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import Particles from '../ui/Particles';

export const AppLayout = ({ children }: { children: ReactNode }) => (
  <div className="min-h-screen text-slate-100 relative">
    <Head>
      <title>ADDUX.SHOP - Marketplace</title>
      <meta name="description" content="Marketplace para cuentas premium y cursos" />
    </Head>
    {/* Particle background sits behind content (reduced density) */}
    <Particles density={0.0004} />
    <Header />
    <main className="relative px-6 md:px-12 py-8 max-w-6xl mx-auto space-y-8 z-10">{children}</main>
    <Footer />
  </div>
);
