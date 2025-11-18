import { motion } from 'framer-motion';
import { ButtonHTMLAttributes } from 'react';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'ghost' };

export const Button = ({ children, variant = 'primary', ...rest }: Props) => (
  <motion.button
    whileHover={{ scale: 1.02, boxShadow: '0 0 25px rgba(77,226,255,0.6)' }}
    whileTap={{ scale: 0.98 }}
    className={`px-4 py-2 rounded-md font-semibold transition bg-gradient-to-r from-neon-blue to-neon-purple text-slate-900 shadow-neon ${
      variant === 'ghost' ? 'bg-transparent border border-neon-blue text-neon-blue' : ''
    }`}
    {...rest}
  >
    {children}
  </motion.button>
);
