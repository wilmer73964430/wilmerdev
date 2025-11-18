import useSWR from 'swr';
import { AppLayout } from '../components/layout/AppLayout';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { api } from '../services/api';

const fetcher = (url: string) => api.get(url).then((res) => res.data);

export default function Order() {
  const { data: orders } = useSWR('/orders/me', fetcher);

  const download = async (token?: string) => {
    if (!token) return;
    const res = await api.get(`/orders/download?token=${token}`);
    alert(`Links seguros: ${res.data.downloadUrls?.join(', ')}`);
  };

  return (
    <AppLayout>
      <h2 className="text-3xl font-bold mb-4">Tu compra única</h2>
      <div className="space-y-4">
        {orders?.map((order: any) => (
          <Card key={order.id}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Orden #{order.id.substring(0, 6)}</p>
                <p className="text-xl font-semibold">Total ${order.total}</p>
                <div className="flex gap-2 mt-2">
                  <Badge tone={order.status === 'access_available' ? 'blue' : 'purple'}>
                    {order.status === 'pending' && 'Pendiente de pago'}
                    {order.status === 'paid' && 'Pagado'}
                    {order.status === 'access_available' && 'Acceso disponible'}
                  </Badge>
                  <Badge tone="pink">Items: {order.items.length}</Badge>
                </div>
              </div>
              {order.downloadUrl && (
                <Button onClick={() => download(order.downloadUrl)}>Descargar</Button>
              )}
            </div>
          </Card>
        ))}
      </div>
    </AppLayout>
  );
}
