import type { Config } from "tailwindcss";
import { tailwindConfig } from "@mento-protocol/ui-toolkit";

const config: Config = {
  darkMode: "class",
  presets: [tailwindConfig],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@mento-protocol/ui-toolkit/dist/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
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
        black: {
          off: "#121316",
          DEFAULT: "#02010A",
        },
        white: "#FFFFFF",
        gray: {
          alt66: "#88888866", // Need to confirm where these 8 style ones came from
          lighter: "#CCCFDE",
          light: "#B3B3B3",
          DEFAULT: "#808080",
          regular: "#808080",
          dark: "#636366",
        },
        mento: {
          blue: "#4D62F0",
          cyan: "#A5E5F7",
          bright: "#F9FAA2",
          mint: "#D2FCBD",
          blush: "#FCD7FC",
          dark: "#02010A",
        },
      },
    },
  },
};
export default config;
