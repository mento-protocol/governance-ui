import type { Config } from "tailwindcss";
import { tailwindPreset } from "@mento-protocol/ui-toolkit";

const config = {
  presets: [tailwindPreset],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@mento-protocol/ui-toolkit/dist/**/*.{js,ts,jsx,tsx,mdx}",
    "../ui-toolkit/src/**/*.{js,ts,jsx,tsx,mdx}", // TODO: Remove this once build tests are complete
  ],
  theme: {
    extend: {
      colors: {
        gray: {
          alt66: "#88888866",
        },
      },
    },
  },
} satisfies Config;

export default config;
