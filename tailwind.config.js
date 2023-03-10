/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        roboto: ['Roboto'],
      },
      colors: {
        space: '#090a0f',
        galaxy: '#1b2735',
      },
    },
  },
  plugins: [],
};
