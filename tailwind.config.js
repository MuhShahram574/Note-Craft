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
      maxHeight: {
        "custom-full": "89vh",
      },
      keyframes: {
        fadeIn: {
          from: {
            opacity: "0",
            transform: "translateY(5px)",
          },
        },
        showmsg: {
          "0%": {
            opacity: "0",
            transform: 'translateX("10px")',
          },

          "20%": {
            opacity: "1",
            transform: 'translateX("0px")',
          },
          "80%": {
            opacity: "0",
            transform: 'translateX("10px")',
          },
          "100%": {
            opacity: "0",
            visibility: "hidden",
          },
        },
      },
      animation: {
        fadeIn: "fadeIn linear 0.5s",
        showMsg: "showmsg 5s ease-in-out forwards",
      },
    },
  },
  plugins: [],
};
