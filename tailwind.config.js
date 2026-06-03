/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          rose:   '#B76E79',
          'rose-light': '#F9E4E8',
          'rose-dark':  '#8A4A54',
          wine:   '#6B2737',
          'wine-dark':  '#4A1020',
          gold:   '#C8962E',
          'gold-light': '#FDF3DC',
          cream:  '#FFF8F2',
          'cream-dark': '#F5EDE4',
        },
      },
      fontFamily: {
        serif:  ['var(--font-playfair)', 'Georgia', 'serif'],
        sans:   ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card:  '0 2px 16px 0 rgba(107,39,55,0.08)',
        float: '0 8px 32px 0 rgba(107,39,55,0.12)',
      },
      borderRadius: {
        xl2: '1.25rem',
        xl3: '1.5rem',
      },
      animation: {
        'fade-up': 'fadeUp 0.5s ease-out forwards',
        'fade-in': 'fadeIn 0.4s ease-out forwards',
      },
      keyframes: {
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
