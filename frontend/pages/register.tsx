import { useState } from 'react';
import { useRouter } from 'next/router';
import { AppLayout } from '../components/layout/AppLayout';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { api } from '../services/api';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/auth/register', { email, password });
      router.push('/login');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al registrarse');
    }
  };

  return (
    <AppLayout>
      <div className="max-w-md mx-auto">
        <Card>
          <h2 className="text-2xl font-semibold mb-4">Crea tu cuenta neón</h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email futurista"
              className="w-full bg-black/30 border border-white/10 rounded px-3 py-2"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full bg-black/30 border border-white/10 rounded px-3 py-2"
            />
            {error && <p className="text-red-400 text-sm">{error}</p>}
            <Button type="submit" className="w-full">
              Crear cuenta
            </Button>
          </form>
        </Card>
      </div>
    </AppLayout>
  );
}
