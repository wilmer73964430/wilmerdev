import { motion } from 'framer-motion';
import { ButtonHTMLAttributes } from 'react';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'ghost' };

export const Button = ({ children, variant = 'primary', ...rest }: Props) => (
  <motion.button
    whileHover={{ scale: 1.02, boxShadow: '0 0 25px rgba(16,185,129,0.6)' }}
    whileTap={{ scale: 0.98 }}
    className={`px-4 py-2 rounded-md font-semibold transition bg-gradient-to-r from-neon-green to-neon-teal text-slate-900 shadow-neon ${
      variant === 'ghost' ? 'bg-transparent border border-neon-green text-neon' : ''
    }`}
    {...(rest as any)}
  >
    {children}
  </motion.button>
);
