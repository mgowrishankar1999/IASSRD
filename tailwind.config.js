/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        winky: ['"Winky Rough"', "sans-serif"],
      },
      backgroundImage: {
        "navbar-gradient": "linear-gradient(90deg, #0a2546 0%, #0f3a6d 58%)",
        "navbar-search": "linear-gradient(#0f3a6d)",
        "custom-bg": "url('./src/assets/custombg.jpg')",
      },
      backgroundColor: {
        hero: "#2562aa",
      },
      textColor: {
        title: "#155099",
        authortitle: "#171717",
      },
    },
  },
  plugins: [],
};
