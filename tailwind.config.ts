import type { Config } from "tailwindcss";

const spacingScale = {
  "0": "0px",
  "1": "4px",
  "2": "8px",
  "3": "12px",
  "4": "16px",
  "5": "24px",
  "6": "32px",
  "7": "48px",
  "8": "64px",
  "9": "96px",
  "10": "128px",
};

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./features/**/*.{ts,tsx}"],
  theme: {
    spacing: spacingScale,
    extend: {
      colors: {
        state: {
          success: "#10b981",
          warning: "#d97706",
          error: "#ef4444",
          info: "#3b82f6",
        },
      },
    },
  },
  plugins: [],
};

export default config;
