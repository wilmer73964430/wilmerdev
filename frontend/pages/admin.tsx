import { useMemo } from 'react';
import useSWR from 'swr';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import { AppLayout } from '../components/layout/AppLayout';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { api } from '../services/api';

const fetcher = (url: string) => api.get(url).then((res) => res.data);

export default function Admin() {
  const { data } = useSWR('/admin/metrics', fetcher);
  const topData = useMemo(() => data?.topProducts || [], [data]);
  return (
    <AppLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-sm text-neon-blue uppercase">Panel admin</p>
          <h2 className="text-3xl font-bold">Radar de ventas y descargas</h2>
        </div>
        <Badge tone="purple">Compra cap {data?.purchaseCap ?? 1}</Badge>
      </div>
      <div className="grid md:grid-cols-3 gap-4">
        <Card>
          <p className="text-slate-400 text-sm">Ventas totales</p>
          <p className="text-3xl font-bold">{data?.totalOrders ?? '-'}</p>
        </Card>
        <Card>
          <p className="text-slate-400 text-sm">Ingresos</p>
          <p className="text-3xl font-bold">${data?.revenue ?? '-'}</p>
        </Card>
        <Card>
          <p className="text-slate-400 text-sm">Usuarios</p>
          <p className="text-3xl font-bold">{data?.users ?? '-'}</p>
        </Card>
      </div>
      <Card>
        <h3 className="text-xl font-semibold mb-3">Productos más descargados</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={topData}>
              <XAxis dataKey="title" stroke="#4de2ff" />
              <YAxis stroke="#4de2ff" />
              <Tooltip contentStyle={{ background: '#0b1021', border: '1px solid #4de2ff' }} />
              <Bar dataKey="downloads" fill="#a855f7" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </AppLayout>
  );
}
