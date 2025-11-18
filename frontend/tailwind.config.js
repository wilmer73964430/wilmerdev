/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        neon: {
          blue: '#4de2ff',
          purple: '#a855f7',
          pink: '#ff4dff'
        }
      },
      fontFamily: {
        futuristic: ['"Space Grotesk"', 'Inter', 'sans-serif']
      },
      boxShadow: {
        neon: '0 0 25px rgba(77, 226, 255, 0.6)'
      }
    }
  },
  plugins: []
};
