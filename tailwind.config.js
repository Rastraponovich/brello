/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "cells-pattern": "url('/images/cell-pattern-bg.svg')",
      },
      fontFamily: {
        inter: ["Inter var, sans-serif"],
      },
    },
  },
  plugins: [],
};
