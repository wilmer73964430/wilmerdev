'use client';
import Link from 'next/link';
import { useState } from 'react';
import { cn } from '../lib/utils';
import { Menu, X } from 'lucide-react';

export type SidebarLink = { href: string; label: string; ariaLabel?: string };

export function Sidebar({
  title,
  links
}: {
  title: string;
  links: SidebarLink[];
}) {
  const [open, setOpen] = useState(true);

  return (
    <aside className="w-64" aria-label={title}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="mb-3 inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm font-medium md:hidden"
        aria-expanded={open}
        aria-controls="sidebar-menu"
      >
        {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />} Menú
      </button>
      <nav
        id="sidebar-menu"
        className={cn(
          'sticky top-24 flex flex-col gap-1 rounded-lg border bg-card p-2 shadow-sm transition-all',
          !open && 'hidden md:flex'
        )}
      >
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            aria-label={link.ariaLabel ?? link.label}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
