/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        Spicy_Rice:["Spicy Rice", "serif"]
      },
    },
  },
  plugins: [require('daisyui'),],
}