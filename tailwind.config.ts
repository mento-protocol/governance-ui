import type { Config } from "tailwindcss";
import { tailwindPreset } from "@mento-protocol/ui-toolkit";
import typography from "@tailwindcss/typography";
import animate from "tailwindcss-animate";
import fs from "fs";

const config = {
  presets: [tailwindPreset],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    fs.realpathSync("./node_modules/@mento-protocol/ui-toolkit/dist/index.cjs"), // Adds compatibility for local development of the toolkit
  ],
  theme: {
    extend: {
      fontFamily: { fg: ["var(--font-fg)"], inter: ["var(--font-inter)"] },
      colors: {
        gray: {
          alt66: "#88888866",
        },
      },
    },
  },
  plugins: [typography, animate],
} satisfies Config;

export default config;
