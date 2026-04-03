/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'maroon': '#6B1F2B',
        'gold': '#C6A75E',
        'ivory': '#F5EFE6',
        'walnut': '#3E2F26',
        'sand': '#D8CFC4',
        'teal': '#2D4B4B',
        'purple': '#4A2C40',
      },
      fontFamily: {
        heading: ['"Cormorant Garamond"', 'serif'],
        devanagari: ['"Noto Sans Devanagari"', 'serif'],
        body: ['Inter', 'sans-serif'],
        ui: ['"Instrument Sans"', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 4px 6px -1px rgba(107, 31, 43, 0.1), 0 2px 4px -1px rgba(107, 31, 43, 0.06)',
        'premium': '0 10px 30px rgba(107, 31, 43, 0.2)',
        'premium-hover': '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
        'large': '0 20px 60px rgba(0, 0, 0, 0.3)',
        'lg': '0 10px 15px -3px rgba(107, 31, 43, 0.1), 0 4px 6px -2px rgba(107, 31, 43, 0.05)',
        'md': '0 4px 6px -1px rgba(107, 31, 43, 0.1), 0 2px 4px -1px rgba(107, 31, 43, 0.06)',
        'sm': '0 1px 2px 0 rgba(107, 31, 43, 0.05)',
      },
      letterSpacing: {
        'tight-editorial': '-0.02em',
      },
      borderRadius: {
        'xs': '0.25rem',   // 4px - small elements
        'sm': '0.5rem',    // 8px - buttons/inputs
        'md': '0.75rem',   // 12px - cards
        'lg': '1rem',      // 16px - large cards
        'xl': '1.25rem',   // 20px - major containers
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
      }
    },
  },
  plugins: [],
};
