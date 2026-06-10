/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        cream:    { DEFAULT: 'rgb(var(--bg) / <alpha-value>)',       dark: 'rgb(var(--bg-alt) / <alpha-value>)' },
        paper:    'rgb(var(--surface) / <alpha-value>)',
        navy:     { DEFAULT: 'rgb(var(--primary) / <alpha-value>)',  dark: 'rgb(var(--primary-dk) / <alpha-value>)', light: 'rgb(var(--primary-lt) / <alpha-value>)' },
        maroon:   { DEFAULT: 'rgb(var(--red) / <alpha-value>)',      dark: 'rgb(var(--red-dk) / <alpha-value>)',     light: 'rgb(var(--red-lt) / <alpha-value>)' },
        electric: { DEFAULT: 'rgb(var(--blue) / <alpha-value>)',     dark: 'rgb(var(--blue-dk) / <alpha-value>)',    light: 'rgb(var(--blue-lt) / <alpha-value>)' },
        silver:   'rgb(var(--silver) / <alpha-value>)',
        ink:      { DEFAULT: 'rgb(var(--ink) / <alpha-value>)',      soft: 'rgb(var(--ink-soft) / <alpha-value>)',   faint: 'rgb(var(--ink-faint) / <alpha-value>)' },
        line:     { DEFAULT: 'rgb(var(--line) / 0.12)',              strong: 'rgb(var(--line) / 0.22)' },
      },
      fontFamily: {
        sans:    ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
      },
      borderRadius: {
        xl2: '1.25rem',
      },
      boxShadow: {
        soft: '0 4px 24px rgba(82,108,70,0.07)',
        lift: '0 16px 56px rgba(82,108,70,0.11)',
        gold: '0 4px 24px rgba(196,156,68,0.20)',
      },
      keyframes: {
        fadeUp:    { '0%': { opacity: 0, transform: 'translateY(16px)' }, '100%': { opacity: 1, transform: 'translateY(0)' } },
        fadeIn:    { '0%': { opacity: 0 }, '100%': { opacity: 1 } },
        slideDown: { '0%': { opacity: 0, transform: 'translateY(-6px)' }, '100%': { opacity: 1, transform: 'translateY(0)' } },
        pageLoad:  { '0%': { width: '0%' }, '80%': { width: '70%' }, '100%': { width: '100%' } },
        shimmer:   { '0%': { backgroundPosition: '-200% center' }, '100%': { backgroundPosition: '200% center' } },
      },
      animation: {
        fadeUp:    'fadeUp .55s ease both',
        fadeIn:    'fadeIn .35s ease both',
        slideDown: 'slideDown .2s ease both',
        pageLoad:  'pageLoad .4s ease-out forwards',
        shimmer:   'shimmer 3s linear infinite',
      },
    },
  },
  plugins: [],
}
