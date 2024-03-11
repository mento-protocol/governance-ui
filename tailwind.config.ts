import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      transparent: "transparent",
      black: "#02010A",
      white: "#FFFFFF",
      lightGrey: "#B3B3B3",
      grey: "#808080",
      primary: "#4D62F0",
      primaryDark: "#2A326A",
      secondary: "#FCD7FC",
      secondaryDark: "#845F84",
      success: "#D2FCBD",
      successDark: "#64805d",
      error: "#FF848A",
      errorDark: "#893e43",
      warning: "#f9fa96",
      warningDark: "#878751",
      info: "#D5F0F6",
      infoDark: "#5c6c74",
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
export default config;
