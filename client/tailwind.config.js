/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      sm: {'min': '50px', 'max': '600px'},
      md: {'min': '580px', 'max': '800px'},
      lg: '800px',
      xl: '1280px',
    },
    extend: {
      colors: {
        'c1': '#FF2E63',
        'c2': '#08D9D6',
        'c3': '#252A34',
        'c4': '#EAEAEA',
      },
      fontFamily: {
        ubuntu: ['Ubuntu', 'sans-serif'],
      },

    },
  },
  plugins: [],
}
