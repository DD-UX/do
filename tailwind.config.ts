/** @type {import('tailwindcss').Config} */

module.exports = {
  darkMode: 'class',
  content: ['./node_modules/flowbite-react/**/*.{js,ts,jsx,tsx}', './src/**/*.{js,ts,jsx,tsx}'],
  variants: {},
  plugins: [require('flowbite/plugin')]
};
