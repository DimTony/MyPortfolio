// tailwind.config.js or tailwind.config.ts
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class", // This is critical for next-themes to work
  theme: {
    extend: {
      // Your theme extensions here
    },
  },
  plugins: [],
};
