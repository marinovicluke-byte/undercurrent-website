/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        parchment: '#E8E0D0',
        'warm-sand': '#D4C9B0',
        sage: '#8FAF9F',
        charcoal: '#1C1C1A',
        'off-white': '#F7F3ED',
        olive: '#6B7C4A',
      },
      fontFamily: {
        cormorant: ['"Cormorant Garamond"', 'serif'],
        dm: ['"DM Sans"', 'sans-serif'],
        mono: ['"DM Mono"', 'monospace'],
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
        '6xl': '3rem',
        '7xl': '4rem',
      },
    },
  },
  plugins: [],
}
