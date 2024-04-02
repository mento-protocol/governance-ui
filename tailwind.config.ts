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
      spacing: {
        ...generateCustomSpacing(),
        initial: "initial",
      },
      transitionTimingFunction: {
        "ease-in-sine": "cubic-bezier(0.12, 0, 0.39, 0)",
        "ease-out-sine": "cubic-bezier(0.61, 1, 0.88, 1)",
        "ease-in-out-sine": "cubic-bezier(0.37, 0, 0.63, 1)",

        "ease-in-quad": "cubic-bezier(0.11, 0, 0.5, 0)",
        "ease-out-quad": "cubic-bezier(0.5, 1, 0.89, 1)",
        "ease-in-out-quad": "cubic-bezier(0.45, 0, 0.55, 1)",

        "ease-in-cubic": "cubic-bezier(0.32, 0, 0.67, 0)",
        "ease-out-cubic": "cubic-bezier(0.33, 1, 0.68, 1)",
        "ease-in-out-cubic": "cubic-bezier(0.65, 0, 0.35, 1)",

        "ease-in-quart": "cubic-bezier(0.5, 0, 0.75, 0)",
        "ease-out-quart": "cubic-bezier(0.25, 1, 0.5, 1)",
        "ease-in-out-quart": "cubic-bezier(0.76, 0, 0.24, 1)",

        "ease-in-quint": "cubic-bezier(0.64, 0, 0.78, 0)",
        "ease-out-quint": "cubic-bezier(0.22, 1, 0.36, 1)",
        "ease-in-out-quint": "cubic-bezier(0.83, 0, 0.17, 1)",

        "ease-in-expo": "cubic-bezier(0.7, 0, 0.84, 0)",
        "ease-out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
        "ease-in-out-expo": "cubic-bezier(0.87, 0, 0.13, 1)",

        "ease-in-circ": "cubic-bezier(0.55, 0, 1, 0.45)",
        "ease-out-circ": "cubic-bezier(0, 0.55, 0.45, 1)",
        "ease-in-out-circ": "cubic-bezier(0.85, 0, 0.15, 1)",

        "ease-in-back": "cubic-bezier(0.36, 0, 0.66, -0.56)",
        "ease-out-back": "cubic-bezier(0.34, 1.56, 0.64, 1)",
        "ease-in-out-back": "cubic-bezier(0.68, -0.6, 0.32, 1.6)",

        "ease-in-elastic": "cubic-bezier(0.36, 0.66, 0.04, 1.44)",
        "ease-out-elastic": "cubic-bezier(0.6, -0.44, 0.96, 0.24)",
        "ease-in-out-elastic": "cubic-bezier(0.78, 0.14, 0.15, 0.86)",

        "ease-in-bounce": "cubic-bezier(0.71, -0.46, 0.88, 0.6)",
        "ease-out-bounce": "cubic-bezier(0.12, 0.84, 0.29, 1.16)",
        "ease-in-out-bounce": "cubic-bezier(0.81, -0.44, 0.19, 1.44)",
      },
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
      gray: {
        light: "#B3B3B3",
        DEFAULT: "#808080",
        regular: "#808080",
      },
      transparent: "transparent",
      current: "currentColor",
      inherit: "inherit",
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
