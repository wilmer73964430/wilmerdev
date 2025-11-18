import { motion } from 'framer-motion';
import { ReactNode } from 'react';

export const Card = ({ children }: { children: ReactNode }) => (
  <motion.div
    whileHover={{ y: -4, boxShadow: '0 15px 40px rgba(0,0,0,0.35), 0 0 20px rgba(16,185,129,0.08)' }}
    className="glass-panel neon-border rounded-xl p-5 transition-transform"
  >
    {children}
  </motion.div>
);
