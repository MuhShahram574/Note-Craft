/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/*html"],
  theme: {
    extend: {
      screens: {
        "3xl": "1920px",
      },
      fontFamily: {
        roboto: "Roboto, sans-serif",
      },
      boxShadow: {
        "custom-Black": "0 2px 7px rgba(0, 0, 0, 0.22)",
      },
      minHeight: {
        "custom-full": "89vh",
      },
    },
  },
  plugins: [],
};
