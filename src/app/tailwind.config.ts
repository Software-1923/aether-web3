import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./dist/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./dist/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./dist/types/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;

