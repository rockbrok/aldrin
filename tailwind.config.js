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
    extend: {},
  },
  plugins: [require("tailwindcss"), require("autoprefixer")],
};
