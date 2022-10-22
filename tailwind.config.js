/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx, ts, tsx}",
    "./views/**/*.{js,jsx, ts, tsx}",
    "./public/image/**/*.{js,jsx, ts, tsx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        13: "repeat(13, minmax(0, 1fr))",
      },
      colors: {
        "light-grey": "#F8F8F8",
      },
      screens: {
        sm: "568px",
        md: "768px",
        lg: "976px",
        xxl: "1340px",
      },
    },
  },
  plugins: [],
};
