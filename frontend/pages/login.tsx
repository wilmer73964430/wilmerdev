import { useState } from 'react';
import { useRouter } from 'next/router';
import { AppLayout } from '../components/layout/AppLayout';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { api } from '../services/api';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/auth/login', { email, password });
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al iniciar sesión');
    }
  };

  return (
    <AppLayout>
      <div className="max-w-md mx-auto">
        <Card>
          <h2 className="text-2xl font-semibold mb-4">Inicia sesión en el portal</h2>
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
              Entrar
            </Button>
          </form>
        </Card>
      </div>
    </AppLayout>
  );
}
