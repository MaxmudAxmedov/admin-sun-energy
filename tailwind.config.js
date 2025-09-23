/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      borderRadius: {},
      colors: {
        aside: "var(--aside-color)",
        active: "var(--active-text)",
        icons: "var(--icons-colors)",
        button: "var(--button-colors)",
        background: "var(--background)",
        black: "var(--black)",
        white: "var(--box-shadow)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
