/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'regal-green': '#779341',
        'light-green': '#52c41a',
        'light-pink': '#FF5A5F',
        primary: 'rgba(52,86,139, 1)',
      },
    },
  },
  plugins: [],
};
