import { ReactNode } from 'react';

export const Badge = ({ children, tone = 'blue' }: { children: ReactNode; tone?: 'blue' | 'purple' | 'pink' }) => {
  // Normalize all badge tones to the new green neon palette so the app uses
  // a consistent primary green color. We keep the `tone` prop for API
  // compatibility but map all values to the green classes.
  const colors: Record<string, string> = {
    blue: 'bg-neon-green/10 text-neon border border-neon-green/50',
    purple: 'bg-neon-green/10 text-neon border border-neon-green/50',
    pink: 'bg-neon-green/10 text-neon border border-neon-green/50'
  };
  return <span className={`px-3 py-1 text-xs font-semibold rounded-full ${colors[tone]}`}>{children}</span>;
};
