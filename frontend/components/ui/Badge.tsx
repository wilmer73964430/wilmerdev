import { ReactNode } from 'react';

export const Badge = ({ children, tone = 'blue' }: { children: ReactNode; tone?: 'blue' | 'purple' | 'pink' }) => {
  const colors: Record<string, string> = {
    blue: 'bg-neon-blue/10 text-neon-blue border border-neon-blue/50',
    purple: 'bg-neon-purple/10 text-neon-purple border border-neon-purple/50',
    pink: 'bg-neon-pink/10 text-neon-pink border border-neon-pink/50'
  };
  return <span className={`px-3 py-1 text-xs font-semibold rounded-full ${colors[tone]}`}>{children}</span>;
};
