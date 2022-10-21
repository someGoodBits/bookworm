/** @type {import('tailwindcss').Config} */ 
module.exports = {
  content: [
    "index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary : {
          500 : "#E70355",
          700 : "#CA024A",
          900 : "#7E012E",
        }
      }
    },
  },
  plugins: [],
}