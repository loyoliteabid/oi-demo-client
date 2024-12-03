/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#FFF312",
        navyBlue: "#100c2a",
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"], // Define the Inter font family
      },
    },
  },
  plugins: [],
};
