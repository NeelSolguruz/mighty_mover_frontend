import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      screens: {
        ss: "320px",
        xs: "350px",
        ms: "375px",
        s: "425px",
        middle: "545px",
        smalltab: "644px",
        tablet: "768px",
        random: "1220px",
        laptop: "1024px",
        breakpoint: "1132px",
        desktop: "1440px",
      },
      width: {
        random: "50%",
        "one-third": "30%",
      },
      fontFamily: {
        Titillium: ["Titillium Web", "sans-serif"],
      },
      // fontSize: {
      //   sm: [
      //     "14px",
      //     {
      //       lineHeight: "20px",
      //     },
      //   ],
      //   md: [
      //     "16px",
      //     {
      //       lineHeight: "24px",
      //     },
      //   ],
      //   lg: [
      //     "18px",
      //     {
      //       lineHeight: "28px",
      //     },
      //   ],
      //   xl: [
      //     "20px",
      //     {
      //       lineHeight: "32px",
      //     },
      //   ],
      //   "2xl": [
      //     "24px",
      //     {
      //       lineHeight: "36px",
      //     },
      //   ],
      //   "3xl": [
      //     "30px",
      //     {
      //       lineHeight: "40px",
      //     },
      //   ],
      // },
      // fontSize: {
      //   xs: "12px",
      //   sm: "14px",
      //   base: "16px",
      //   lg: "18px",
      //   xl: "20px",
      //   "2xl": "24px",
      //   "3xl": "30px",
      //   "4xl": "36px",
      //   "5xl": "48px",
      //   "6xl": "64px",
      // },
    },
  },
  plugins: [],
};
export default config;
