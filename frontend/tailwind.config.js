/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0b1021',
          50: '#f7fbfd',
          100: '#eef7fb',
          200: '#cdeff6',
          500: '#4de2ff'
        },
        neon: {
          cyan: '#4de2ff',
          purple: '#a855f7',
          pink: '#ff4dff',
          lime: '#7fff6b'
        }
      },
      fontFamily: {
        sans: ['Poppins', 'Inter', 'ui-sans-serif', 'system-ui'],
        display: ['Poppins', 'ui-serif']
      },
      boxShadow: {
        neon: '0 0 25px rgba(77, 226, 255, 0.6)',
        soft: '0 20px 60px rgba(0,0,0,0.5)'
      }
    }
  },
  plugins: []
};
