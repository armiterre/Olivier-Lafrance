/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#060010', // Dark premium background
        textPrimary: '#ffffff',
        accent: '#89ff69', // Neon green accent inspired by terminal/neon themes
      },
      fontFamily: {
        main: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
