'use client';

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { motion } from 'framer-motion';

interface WalletTransaction {
  id: string;
  type: 'credit' | 'debit';
  amount: number;
  reason: string;
  createdAt: string;
}

interface WalletResponse {
  balance: number;
  currency: string;
  transactions: WalletTransaction[];
}

const fetchWallet = async (): Promise<WalletResponse> => {
  const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/wallet`);
  return data;
};

export const WalletTransactions = () => {
  const { data, isLoading } = useQuery({ queryKey: ['wallet'], queryFn: fetchWallet });

  if (isLoading) {
    return <div className="glass-panel p-6">Cargando billetera...</div>;
  }

  return (
    <div className="glass-panel p-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm uppercase text-slate-400">Balance disponible</p>
          <p className="text-3xl font-semibold text-white">
            {data?.balance.toLocaleString('es-ES', { style: 'currency', currency: data?.currency ?? 'USD' })}
          </p>
        </div>
        <button className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white shadow-glass transition hover:bg-primary/80">
          Solicitar retiro
        </button>
      </div>
      <div className="mt-6 space-y-3">
        {data?.transactions.map((tx) => (
          <motion.div key={tx.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center justify-between rounded-2xl bg-slate-900/60 px-4 py-3">
            <div>
              <p className="text-sm font-medium text-white">{tx.reason}</p>
              <p className="text-xs text-slate-400">{new Date(tx.createdAt).toLocaleString('es-ES')}</p>
            </div>
            <p className={`text-sm font-semibold ${tx.type === 'credit' ? 'text-emerald-400' : 'text-rose-400'}`}>
              {tx.type === 'credit' ? '+' : '-'}
              {tx.amount.toLocaleString('es-ES', { style: 'currency', currency: data?.currency ?? 'USD' })}
            </p>
          </motion.div>
        ))}
        {!data?.transactions.length && <p className="text-sm text-slate-400">Sin movimientos todavía.</p>}
      </div>
    </div>
  );
};
