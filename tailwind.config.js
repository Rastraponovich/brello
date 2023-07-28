/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: ["class", '[data-mode="dark"]'],
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
      spacing: {
        4.5: "1.125rem",
      },
      borderWidth: {
        "1.5px": "1.5px",
        6: "6px",
        10: "10px",
      },
      colors: {
        facebook: {
          600: "#1877F2",
          700: "#0C63D4",
        },
        twitter: {
          600: "#1DA1F2",
          700: "#0C8BD9",
        },
        dribbble: {
          600: "#EA4C89",
          700: "#E62872",
        },
      },
    },
  },
};
