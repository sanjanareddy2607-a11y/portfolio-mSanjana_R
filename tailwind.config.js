/** @type {import('tailwindcss').Config} */
const config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        midnightNavy: "#071426",
        nearBlack: "#05080D",
        emeraldGreen: "#19D18B",
        electricBlue: "#258BFF",
        white: "#FFFFFF",
        mutedGrey: "#A8B4C3",
        warmYellow: "#F4D35E",
      },
      fontFamily: {
        display: ["Space Grotesk", "Inter", "sans-serif"],
        body: ["Inter", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
    },
  },
};

export default config;
