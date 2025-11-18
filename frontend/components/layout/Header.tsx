import Link from 'next/link';

export const Header = () => {
  return (
    <header className="flex items-center justify-between px-6 md:px-12 py-4 sticky top-0 z-30 bg-black/50 backdrop-blur-md border-b border-white/5">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-md bg-gradient-to-br from-neon-green to-neon-teal flex items-center justify-center font-bold text-sm text-slate-900">AD</div>
        <Link href="/" className="text-lg font-bold tracking-tight">ADDUX<span className="text-neon">.SHOP</span></Link>
      </div>

      <nav className="hidden md:flex items-center gap-6 text-sm text-slate-200">
        <Link href="/marketplace" className="hover:text-neon">Marketplace</Link>
        <Link href="/credits" className="hover:text-neon">Créditos</Link>
        <Link href="/about" className="hover:text-neon">Acerca</Link>
      </nav>

      <div className="flex items-center gap-3">
        <Link href="/login" className="text-sm px-3 py-1 rounded-md border border-white/6 hover:bg-white/5">Iniciar sesión</Link>
        <Link href="/register" className="inline-block bg-gradient-to-r from-neon-green to-neon-teal text-slate-900 px-3 py-1 rounded-md font-semibold">Registrarse</Link>
      </div>
    </header>
  );
};
