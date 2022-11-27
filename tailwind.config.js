/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/*.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screen: {
      xs: "328px",
      sm: "500px",
      md: "640px",
      lg: "768px",
      xl: "976px",
    },
    colors: {
      white: "#fff",
      black: "#000",
      lightgrey: "#f2f2f2",
      grey: "#e5e5e5",
      darkgrey: "#403f4c",
      yellow: "#fca311",
      blue: "#14213d",
      transparent: "transparent",
    },
    extend: {},
  },
  plugins: [
    require("tailwindcss"),
    require("@tailwindcss/line-clamp"),
    require("autoprefixer"),
  ],
};
