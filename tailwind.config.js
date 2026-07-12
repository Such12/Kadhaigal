/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          brick: '#B7410E',   // primary accent - CTAs, highlights, headings accent
          navy: '#142950',    // dark text, footer/CTA background
          sage: '#9DC183',    // secondary accent - icons, community pillar
          cream: '#F5F5DC',   // main background
        },
      },
      fontFamily: {
        display: ['"Noto Serif"', 'ui-serif', 'Georgia', 'serif'],
        head: ['"TAN St. Canard"', 'ui-serif', 'Georgia', 'serif'],
        body: ['"Plus Jakarta Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        hand: ['"Caveat"', 'cursive'],
      },
      boxShadow: {
        polaroid: '0 20px 40px -10px rgba(20, 41, 80, 0.35)',
        card: '0 4px 20px -4px rgba(20, 41, 80, 0.12)',
      },
    },
  },
  plugins: [],
}

