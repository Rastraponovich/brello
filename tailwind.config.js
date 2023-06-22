/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "cells-pattern": "url('/images/cell-pattern-bg.svg')",
        "auth-pattern": "url('/images/geometric-shapes.svg')",
        "auth-pattern-small": "url('/images/geometric-shapes-small.svg')",
        "geometric-square": "url('/images/geometric-square.svg')",
      },
      fontFamily: {
        inter: ["Inter var, sans-serif"],
      },
    },
  },
  plugins: [],
};
