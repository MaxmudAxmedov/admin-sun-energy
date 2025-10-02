/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            borderRadius: {},
            boxShadow: {
                header: "0 14px 6px -10px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
            },
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
