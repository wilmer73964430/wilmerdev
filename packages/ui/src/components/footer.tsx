import Link from 'next/link';

const legalLinks = [
  { href: '/legal/terminos', label: 'Términos' },
  { href: '/legal/privacidad', label: 'Privacidad' }
];

export function Footer() {
  return (
    <footer className="border-t bg-muted/50">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-semibold">DigitalSubs</p>
          <p className="text-sm text-muted-foreground">Suscripciones digitales seguras</p>
        </div>
        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
          {legalLinks.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-foreground">
              {item.label}
            </Link>
          ))}
          <Link href="/contacto" className="hover:text-foreground">
            Contacto
          </Link>
          <a href="https://twitter.com" className="hover:text-foreground" aria-label="Twitter">
            Twitter
          </a>
        </div>
      </div>
    </footer>
  );
}
