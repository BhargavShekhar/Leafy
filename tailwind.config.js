/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        curvy: ['Dancing Script', 'cursive'],
        test : ["Micro 5 Charted"]
      }
    },
  },
  plugins: [],
}

