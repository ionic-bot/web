import colorPalette from './colorPalette.json' assert { type: 'json' };

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: colorPalette
    },
  },
  plugins: [],
}

