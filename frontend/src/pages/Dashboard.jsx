const StatCard = ({ title, value }) => (
  <div className="glass-card p-4">
    <p className="text-white/60 text-sm">{title}</p>
    <p className="text-2xl font-bold text-neon">{value}</p>
  </div>
);

const Dashboard = () => (
  <main className="max-w-6xl mx-auto p-6 space-y-6">
    <div className="glass-card p-6">
      <h1 className="text-3xl font-bold text-neon">Panel unificado</h1>
      <p className="text-white/70 mt-2">Roles diferenciados: Usuario, Vendedor, Administrador y SuperAdministrador con controles avanzados.</p>
    </div>
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard title="Ventas diarias" value="$0" />
      <StatCard title="Wallet usuario" value="$0" />
      <StatCard title="Wallet vendedor" value="$0" />
      <StatCard title="Suscripción vendedor" value="Activa" />
    </div>
    <div className="glass-card p-6 space-y-3">
      <h2 className="text-xl font-semibold">Estado de integraciones</h2>
      <ul className="text-sm text-white/70 grid sm:grid-cols-2 gap-2">
        <li>Stripe listo para recargas</li>
        <li>PayPal listo para recargas y retiros</li>
        <li>Mercado Pago Perú integrado</li>
        <li>Cryptomus listo para pagos cripto</li>
        <li>Conversión multi-moneda en vivo</li>
        <li>Firewall y rate limiting aplicados en backend</li>
      </ul>
    </div>
  </main>
);

export default Dashboard;
