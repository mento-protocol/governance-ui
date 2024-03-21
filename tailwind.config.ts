import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
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
      "transparent": "transparent",
      "primary-blue": "#4D62F0",
      "light-red": "#FF848A",
      "light-green": "#D2FCBF",
      "mento-mint": "#D2FCBD",
      "mento-red": "#FF848A",
      "mento-blue": "#4D62F0"
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
