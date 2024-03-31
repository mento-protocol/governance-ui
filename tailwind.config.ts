import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "/src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: { fg: ["var(--font-fg)"], inter: ["var(--font-inter)"] },
    },
    colors: {
      primary: "#4D62F0",
      "primary-dark": "#2A326A",
      secondary: "#FCD7FC",
      "secondary-dark": "#845F84",
      "light-red": "#FF848A",
      "light-green": "#D2FCBF",

      success: "#d2fcbd",
      "success-dark": "#64805d",
      error: "#ff848a",
      "error-dark": "#893e43",
      warning: "#f9fa96",
      "warning-dark": "#878751",
      info: "#d5f0f6",
      "info-dark": "#5c6c74",

      black: "#02010A",
      white: "#FFFFFF",
      "light-gray": "#B3B3B3",
      grey: "#808080",
    },
    keyframes: {
      "spin-slow": {
        "0%": { transform: "rotate(0deg)" },
        "100%": { transform: "rotate(360deg)" },
      },
    },
    animation: {
      "spin-slow": "spin-slow 1.5s linear infinite",
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
export default config;
