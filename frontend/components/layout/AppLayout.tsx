import Head from 'next/head';
import { ReactNode } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';

export const AppLayout = ({ children }: { children: ReactNode }) => (
  <div className="min-h-screen text-slate-100">
    <Head>
      <title>ADDUX.SHOP - Marketplace</title>
      <meta name="description" content="Marketplace para cuentas premium y cursos" />
    </Head>
    <Header />
    <main className="px-6 md:px-12 py-8 max-w-6xl mx-auto space-y-8">{children}</main>
    <Footer />
  </div>
);
