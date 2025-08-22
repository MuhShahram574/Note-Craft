/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/**/*.{html,js}"],
  safelist: [
    
    "bg-red-500",
    "bg-red-600",
    "bg-blue-500",
    "bg-blue-600",
    "bg-green-500",
    "bg-green-600",
  ],
  theme: {
    extend: {
      backgroundColor: {
        // dark: "#495057",
        dark: "#343a40",
        aside: "#eebefa",
      },
      screens: {
        "3xl": "1920px",
      },
      fontFamily: {
        roboto: "Roboto, sans-serif",
      },
      boxShadow: {
        // "custom-Black": "0 2px 7px rgba(255, 255, 255, 0.12)",
        "custom-Black": "0 2px 7px rgba(0, 0, 0, 0.42)",
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
        showMsg: "showmsg 3s ease-in-out forwards",
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        ".scrollbar-hide": {
          "-ms-overflow-style": "none" /* IE and Edge */,
          "scrollbar-width": "none" /* Firefox */,
        },
        ".scrollbar-hide::-webkit-scrollbar": {
          display: "none" /* Chrome, Safari, Opera */,
        },
      });
    },
  ],
};
