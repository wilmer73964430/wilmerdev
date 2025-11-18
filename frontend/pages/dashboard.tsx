import useSWR from 'swr';
import { api } from '../services/api';
import { AppLayout } from '../components/layout/AppLayout';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';

const fetcher = (url: string) => api.get(url).then((res) => res.data);

export default function Dashboard() {
  const { data, error } = useSWR('/products', fetcher);

  return (
    <AppLayout>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-neon-blue uppercase">Catálogo digital</p>
          <h2 className="text-3xl font-bold">Explora los assets neón</h2>
        </div>
        <Badge tone="pink">Compra máxima: 1 total</Badge>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {error && <p>Error al cargar productos</p>}
        {!data && <p className="text-slate-400">Cargando universo...</p>}
        {data?.map((product: any) => (
          <Card key={product.id}>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xl font-semibold">{product.title}</h3>
              <Badge tone="purple">${product.price}</Badge>
            </div>
            <p className="text-sm text-slate-300 mb-3">{product.description}</p>
            <Button className="w-full">Añadir al checkout</Button>
          </Card>
        ))}
      </div>
    </AppLayout>
  );
}
