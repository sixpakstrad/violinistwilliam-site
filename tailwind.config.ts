import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        espresso: "#fbf7ef",
        "espresso-soft": "#fffdf7",
        "charcoal-brown": "#e8dccb",
        bronze: "#b85f2e",
        "bronze-soft": "#b85f2e",
        gold: "#b85f2e",
        ivory: "#2f2923",
        "ivory-muted": "#74685c",
        "smoke-brown": "#9b9084",
        linen: "#fffaf3",
        champagne: "#d8c595",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        script: ["var(--font-script)", "Snell Roundhand", "serif"],
        sans: ["var(--font-sans)", "Inter", "Arial", "sans-serif"],
      },
      boxShadow: {
        candle: "0 28px 90px rgba(99, 77, 47, 0.14), 0 1px 0 rgba(255, 255, 255, 0.82) inset",
        bronze: "0 24px 70px rgba(47, 41, 35, 0.16), 0 10px 28px rgba(47, 41, 35, 0.08)",
      },
      backgroundImage: {
        "radial-candle":
          "radial-gradient(circle at 52% 18%, rgba(255, 255, 255, 0.92), transparent 32%), radial-gradient(circle at 84% 14%, rgba(216, 197, 149, 0.24), transparent 28%), linear-gradient(180deg, #fffdf7 0%, #fbf7ef 46%, #f2e8d8 100%)",
        "paper-grain":
          "linear-gradient(115deg, rgba(255,255,255,0.42), rgba(255,255,255,0) 38%), radial-gradient(circle at 0% 0%, rgba(216,197,149,0.18), transparent 30%)",
      },
    },
  },
  plugins: [],
};

export default config;
