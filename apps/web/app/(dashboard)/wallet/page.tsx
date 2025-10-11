import { Suspense } from 'react';
import { WalletTransactions } from '../../../components/wallet-transactions';

export default function WalletPage() {
  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-8 px-6 py-10">
      <div className="glass-panel p-6">
        <h1 className="text-3xl font-semibold text-white">Billetera del vendedor</h1>
        <p className="mt-2 text-sm text-slate-300">
          Consulta tu balance disponible, revisa transacciones acreditadas en tiempo real y gestiona solicitudes de retiro.
        </p>
      </div>
      <Suspense fallback={<div className="glass-panel p-6">Cargando transacciones...</div>}>
        <WalletTransactions />
      </Suspense>
    </div>
  );
}
