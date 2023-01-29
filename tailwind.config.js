
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'darkgreen': '#1A724C',
        'lightdarkgreen': '#429346',
        'puregreen': '73bf53',
        'lightgreen': '#ADE067',
        'background': '#005546',
        'white': '#D5E7D8',
        'faded-white': 'rgba(255,255,255,0.8)',
        'faded-black': 'rgba(0,0,0,.8)'
      },
      fontFamily: {
        adlery: ['Adlery', 'sans-serif'],
        caesar: ['CaesarDressing', 'sans-serif'],
        almarai: ['Almarai', 'sans-serif'],
        adventpro: ['Advent Pro', 'sans-serif'],
        alphaslabone: ['Alfa Slab One', 'sans-serif']
      },
      animation: {
        'enlarge-once': 'enlarge .3s ease-out'
      },
      keyframes: {
        enlarge: {
          '0%': { transform: 'scale(0)' },
          '100%': { transform: 'scale(1)' },
        }
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar')({ nocompatible: true })
  ],
}
