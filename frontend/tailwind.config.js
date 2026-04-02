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
        'premium': '0 10px 30px rgba(107, 31, 43, 0.2)',
        'premium-hover': '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
      },
      letterSpacing: {
        'tight-editorial': '-0.02em',
      }
    },
  },
  plugins: [],
};
