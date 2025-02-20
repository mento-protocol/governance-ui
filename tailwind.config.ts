import type { Config } from "tailwindcss";
import { tailwindConfig } from "@mento-protocol/ui-toolkit";

const config = {
  darkMode: "class",
  presets: [tailwindConfig],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@mento-protocol/ui-toolkit/dist/**/*.{js,ts,jsx,tsx,mdx}",
    "../ui-toolkit/src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    {
      pattern: /^\[.*\]$/, // Match all arbitrary values
      variants: ['hover', 'focus', 'active', 'before', 'after'],
    },
    {
      // Match specific arbitrary value patterns commonly used in components
      pattern: /^(w|h)-\[.*\]$/,
      variants: ['hover', 'focus', 'active', 'before', 'after'],
    },
    {
      pattern: /^(p|m)[xy]?-\[.*\]$/,
      variants: ['hover', 'focus', 'active', 'before', 'after'],
    },
    {
      pattern: /^text-\[.*\]$/,
      variants: ['hover', 'focus', 'active', 'before', 'after'],
    },
    {
      pattern: /^(top|left|right|bottom)-\[.*\]$/,
      variants: ['hover', 'focus', 'active', 'before', 'after'],
    },
    {
      pattern: /^before:.*\[.*\]$/,
      variants: ['hover', 'focus', 'active'],
    },
    {
      pattern: /^after:.*\[.*\]$/,
      variants: ['hover', 'focus', 'active'],
    }
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
  plugins: [
    require("@tailwindcss/typography"),
    require("tailwindcss-animate"),
  ],
} satisfies Config;

export default config;
