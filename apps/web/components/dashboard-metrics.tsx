'use client';

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { ArrowUpRight, TicketCheck, Wallet, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

interface MetricsResponse {
  mrr: number;
  ordersToday: number;
  walletBalance: number;
  openTickets: number;
}

const fetchMetrics = async (): Promise<MetricsResponse> => {
  const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/admin/metrics`);
  return data;
};

export const DashboardMetrics = () => {
  const { data, isLoading } = useQuery({ queryKey: ['metrics'], queryFn: fetchMetrics });

  const metrics = [
    {
      title: 'MRR',
      value: data?.mrr ?? 0,
      icon: ArrowUpRight,
      description: 'Ingresos recurrentes del mes'
    },
    {
      title: 'Ventas hoy',
      value: data?.ordersToday ?? 0,
      icon: Zap,
      description: 'Pedidos confirmados en las últimas 24h'
    },
    {
      title: 'Balance billetera',
      value: data?.walletBalance ?? 0,
      icon: Wallet,
      description: 'Total disponible para retiros'
    },
    {
      title: 'Tickets abiertos',
      value: data?.openTickets ?? 0,
      icon: TicketCheck,
      description: 'Casos pendientes del equipo de soporte'
    }
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {metrics.map((metric, index) => (
        <motion.div
          key={metric.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
          className="glass-panel p-6"
        >
          <div className="flex items-center justify-between">
            <p className="text-sm uppercase tracking-wider text-slate-400">{metric.title}</p>
            <metric.icon className="h-5 w-5 text-primary" />
          </div>
          <p className="mt-4 text-3xl font-semibold text-white">
            {isLoading ? '...' : metric.value.toLocaleString('es-ES', { style: 'currency', currency: 'USD' })}
          </p>
          <p className="mt-2 text-sm text-slate-400">{metric.description}</p>
        </motion.div>
      ))}
    </div>
  );
};
