/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
  ],
  theme: {
    extend: {
      backgroundImage: {
        history: "url('/public/assets/images/cold-brew.webp')",
        main: "url('/public/assets/images/bg-main-coffee.jpeg')",
        profile: "url('/public/assets/images/bg-profile.webp')",
        cart: "url('/public/assets/images/bg-cart.webp')",
      },
      boxShadow: {
        primary: "0px 6px 20px 0px #00000020;",
      },
      spacing: {
        22: "7rem",
      },
      colors: {
        primary: "#4F5665",
        "primary-context": "#7C828A",
        secondary: "#753F2A",
        "secondary-200": "#f4a200",
        tertiary: "#FD743E",
        quartenary: "#0b132a",
      },
      borderWidth: {
        1: "1px",
      },
    },
  },
  daisyui: {
    themes: [
      {
        coffeeup: {
          primary: "#6A4029",
          secondary: "#FD743E",
          accent: "#0b132a",
          neutral: "#9f9f9f",
          "base-100": "#fff",
          info: "#3ABFF8",
          success: "#36D399",
          warning: "#FBBD23",
          error: "#F87272",
          "plain-white": "#FFF",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
