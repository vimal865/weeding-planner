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
          rose:         '#B5394F',   // warm crimson / rose accent
          'rose-light': '#F8E8EC',   // very light blush tint
          'rose-dark':  '#901535',   // darker rose for hover
          wine:         '#6B1E2C',   // primary burgundy
          'wine-dark':  '#4A1020',   // deep burgundy
          gold:         '#C8962E',
          'gold-light': '#FDF3DC',
          olive:        '#4A4E3F',   // olive green for badges / tags
          'olive-light':'#EEF0E8',   // light olive tint
          cream:        '#FDF8F8',   // very light blush white (body bg)
          'cream-dark': '#E8D5DA',   // light rose beige
        },
      },
      fontFamily: {
        serif:  ['var(--font-playfair)', 'Georgia', 'serif'],
        sans:   ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card:  '0 2px 16px 0 rgba(107,30,44,0.09)',
        float: '0 8px 32px 0 rgba(107,30,44,0.14)',
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
