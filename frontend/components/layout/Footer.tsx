import Link from 'next/link';

export const Footer = () => {
  return (
    <footer className="mt-12 border-t border-white/6 pt-8 pb-6 text-slate-400">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <h4 className="text-sm font-semibold text-slate-200">ADDUX.SHOP</h4>
          <p className="text-xs text-slate-400 mt-2">La plataforma líder para comprar y vender cuentas premium y cursos online.</p>
        </div>

        <div>
          <h5 className="text-sm font-medium text-slate-200">Enlaces</h5>
          <ul className="mt-3 text-xs space-y-2">
            <li><Link href="/" className="hover:text-neon-cyan">Inicio</Link></li>
            <li><Link href="/marketplace" className="hover:text-neon-cyan">Marketplace</Link></li>
            <li><Link href="/credits" className="hover:text-neon-cyan">Créditos</Link></li>
          </ul>
        </div>

        <div>
          <h5 className="text-sm font-medium text-slate-200">Soporte</h5>
          <ul className="mt-3 text-xs space-y-2">
            <li><Link href="/help" className="hover:text-neon-cyan">Centro de ayuda</Link></li>
            <li><Link href="/contact" className="hover:text-neon-cyan">Contacto</Link></li>
            <li><Link href="/legal" className="hover:text-neon-cyan">Términos</Link></li>
          </ul>
        </div>
      </div>

      <div className="mt-8 max-w-6xl mx-auto flex flex-col md:flex-row justify-between text-xs text-slate-500">
        <span>© {new Date().getFullYear()} ADDUX.SHOP. Todos los derechos reservados.</span>
        <span className="mt-3 md:mt-0">Versión 1.0.0</span>
      </div>
    </footer>
  );
};
