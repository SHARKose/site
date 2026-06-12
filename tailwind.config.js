/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      boxShadow: {
        glow: '0 20px 80px rgba(109, 193, 255, 0.18)',
      },
      backgroundImage: {
        'glass-gradient': 'radial-gradient(circle at top left, rgba(255,255,255,0.18), transparent 40%), radial-gradient(circle at bottom right, rgba(17, 24, 39, 0.18), transparent 40%)',
      },
    }
  },
  plugins: [require('@tailwindcss/typography')],
}
