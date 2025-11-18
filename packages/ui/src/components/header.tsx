import Link from 'next/link';
import { ThemeToggle } from './theme-toggle';
import { Button } from './button';

const navItems = [
  { href: '/', label: 'Inicio' },
  { href: '/planes', label: 'Planes' },
  { href: '/faq', label: 'FAQ' },
  { href: '/contacto', label: 'Contacto' }
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="text-lg font-semibold">
          DigitalSubs
        </Link>
        <nav aria-label="Navegación principal" className="hidden gap-6 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button asChild variant="secondary">
            <Link href="/login">Mi cuenta</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
