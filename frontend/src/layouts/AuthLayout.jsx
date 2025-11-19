import { useState } from 'react';
import axios from 'axios';

const AuthLayout = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [token, setToken] = useState('');

  const submit = async () => {
    const res = await axios.post('/api/auth/login', form).catch(() => ({ data: {} }));
    setToken(res.data?.token || '');
  };

  return (
    <div className="max-w-md mx-auto mt-10 glass-card p-6 space-y-4">
      <h1 className="text-2xl font-bold text-neon">Acceso seguro JWT</h1>
      <input
        className="w-full px-3 py-2 rounded bg-white/5 border border-white/10"
        placeholder="Correo"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <input
        className="w-full px-3 py-2 rounded bg-white/5 border border-white/10"
        type="password"
        placeholder="Contraseña"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />
      <button onClick={submit} className="w-full py-2 rounded bg-neon text-charcoal font-semibold">Iniciar sesión</button>
      {token && <p className="text-xs break-all text-white/70">Token: {token}</p>}
    </div>
  );
};

export default AuthLayout;
