import type { Config } from "tailwindcss";

function generateCustomSpacing() {
  const spacing: { [key: string]: string } = {};
  for (let i = 1; i <= 20; i++) {
    spacing[`x${i}`] = `${5 * i}px`;
  }
  return spacing as any;
}

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: { fg: ["var(--font-fg)"], inter: ["var(--font-inter)"] },
      spacing: generateCustomSpacing(),
    },
    colors: {
      primary: {
        light: "#4D62F0",
        DEFAULT: "#4D62F0",
        dark: "#2A326A",
      },
      secondary: {
        light: "#FCD7FC",
        DEFAULT: "#FCD7FC",
        dark: "#845F84",
      },
      "light-red": "#FF848A",
      "light-green": "#D2FCBF",
      success: {
        light: "#d2fcbd",
        DEFAULT: "#d2fcbd",
        dark: "#64805d",
      },
      error: {
        light: "#ff848a",
        DEFAULT: "#ff848a",
        dark: "#893e43",
      },
      warning: {
        light: "#f9fa96",
        DEFAULT: "#f9fa96",
        dark: "#878751",
      },
      info: {
        light: "#d5f0f6",
        DEFAULT: "#d5f0f6",
        dark: "#5c6c74",
      },

      black: "#02010A",
      white: "#FFFFFF",
      "light-gray": "#B3B3B3",
      gray: "#808080",

      transparent: "transparent",
      current: "currentColor",
    },
    keyframes: {
      "spin-slow": {
        "0%": { transform: "rotate(0deg)" },
        "100%": { transform: "rotate(360deg)" },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
export default config;
