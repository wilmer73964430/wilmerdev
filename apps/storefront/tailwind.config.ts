import type { Config } from 'tailwindcss';
import preset from '../../packages/config/tailwind/preset.js';

const config: Config = {
  presets: [preset],
  content: ['./app/**/*.{ts,tsx}', '../../packages/ui/src/**/*.{ts,tsx}'],
  theme: {
    extend: {}
  }
};

export default config;
