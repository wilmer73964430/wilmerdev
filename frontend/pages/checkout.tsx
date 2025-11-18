import { useState } from 'react';
import useSWR from 'swr';
import { AppLayout } from '../components/layout/AppLayout';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { api } from '../services/api';

const fetcher = (url: string) => api.get(url).then((res) => res.data);

export default function Checkout() {
  const { data: products } = useSWR('/products', fetcher);
  const [selected, setSelected] = useState<Record<string, number>>({});
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const toggle = (id: string) => {
    setSelected((prev) => ({ ...prev, [id]: prev[id] ? 0 : 1 }));
  };

  const submit = async () => {
    setError('');
    setMessage('');
    const items = Object.entries(selected)
      .filter(([, qty]) => qty > 0)
      .map(([productId, quantity]) => ({ productId, quantity }));
    try {
      const res = await api.post('/checkout', { items });
      setMessage(`Orden creada. Total $${res.data.total}. Completa el pago en Stripe.`);
    } catch (e: any) {
      setError(e.response?.data?.message || 'Error en checkout');
    }
  };

  return (
    <AppLayout>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-neon-purple uppercase">Flujo blindado</p>
          <h2 className="text-3xl font-bold">Checkout ultramoderno</h2>
        </div>
        <Badge>Máx 1 compra total</Badge>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-3">
          {products?.map((p: any) => (
            <Card key={p.id}>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-semibold">{p.title}</h3>
                  <p className="text-sm text-slate-400">{p.description}</p>
                </div>
                <div className="text-right">
                  <p className="text-neon-blue font-semibold">${p.price}</p>
                  <Button variant={selected[p.id] ? 'primary' : 'ghost'} onClick={() => toggle(p.id)}>
                    {selected[p.id] ? 'Remover' : 'Agregar'}
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
        <Card>
          <h3 className="text-xl font-semibold mb-2">Resumen</h3>
          <p className="text-slate-400 text-sm mb-3">Verificamos mínimos, máximos y tu límite de compra única.</p>
          <Button className="w-full" onClick={submit}>
            Confirmar selección y pagar
          </Button>
          {message && <p className="text-neon-blue text-sm mt-3">{message}</p>}
          {error && <p className="text-red-400 text-sm mt-3">{error}</p>}
        </Card>
      </div>
    </AppLayout>
  );
}
