/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{ts,tsx,js,jsx}'],
  theme: {
    extend: {
      colors: {
        uscRed: '#990000',
        uscGold: '#FFC72C',
      },
    },
  },
  plugins: [],
}


