'use client';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from './button';

export function ThemeToggle() {
  const { setTheme, theme, resolvedTheme } = useTheme();
  const current = theme === 'system' ? resolvedTheme : theme;

  return (
    <Button
      type="button"
      variant="ghost"
      aria-label="Cambiar tema"
      onClick={() => setTheme(current === 'dark' ? 'light' : 'dark')}
    >
      {current === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </Button>
  );
}
