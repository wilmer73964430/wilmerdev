/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#041028',
          50: '#f3fbf7',
          100: '#e6f7ee',
          200: '#cff2dd',
          500: '#10b981'
        },
        neon: {
          green: '#10b981',
          teal: '#06b6d4',
          lime: '#7fff6b'
        }
      },
      fontFamily: {
        sans: ['Poppins', 'Inter', 'ui-sans-serif', 'system-ui'],
        display: ['Poppins', 'ui-serif']
      },
      boxShadow: {
        neon: '0 0 25px rgba(16, 185, 129, 0.6)',
        soft: '0 20px 60px rgba(0,0,0,0.5)'
      }
    }
  },
  plugins: []
};
