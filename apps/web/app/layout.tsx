import './globals.css';
import { ReactNode } from 'react';
import { Providers } from '../components/providers';

export const metadata = {
  title: 'SocialMentorify Platform',
  description: 'Marketplace SMM y streaming multi-rol'
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className="bg-slate-950 text-slate-100 min-h-screen">
        <Providers>
          <div className="min-h-screen bg-slate-950/90 bg-[radial-gradient(circle_at_top,_rgba(108,93,211,0.2),_transparent)]">
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
