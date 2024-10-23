/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#3E97FF",
          light: "#EEF6FF"
        },
        danger: "#F1416C",
        gray: {
          100: "#F9F9F9",
          500: "#A1A5B7",
          600: "#7E8299",
          800: "#3F4254"
        }
      }
    }
  },
  plugins: []
};
