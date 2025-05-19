/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class", // This enables the class-based dark mode
  theme: {
    extend: {
      colors: {
        "black-100": "#0A0A0A",
        "black-200": "#080808",
        "black-300": "#121212",
        "white-50": "#FAFAFA",
        "blue-50": "#1C34FF",
        "pink-100": "#FF28D5",
        glow: "#ffffff",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      dropShadow: {
        glow: "0 0 8px rgba(255, 255, 255, 0.7)",
      },
    },
  },
  plugins: [],
};
