import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#6C5DD3',
          foreground: '#FFFFFF'
        }
      },
      backgroundImage: {
        glass: 'linear-gradient(135deg, rgba(108,93,211,0.12), rgba(16,24,40,0.85))'
      },
      boxShadow: {
        glass: '0 10px 40px rgba(108,93,211,0.35)'
      }
    }
  },
  plugins: []
};

export default config;
