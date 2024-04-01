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
        "ss":"320px",
        "xs":"350px",
        "ms":"375px",
        "s":"425px",
        "middle":"545px",
        "smalltab":"644px",
        'tablet': '768px',
        "random":"1220px",
        'laptop': '1024px',
        "breakpoint":"1132px",
        'desktop': '1440px',
      },
      width: {
        'random': '50%',
        "one-third":"30%",
      },
      fontFamily: {  
        'Titillium': ['Titillium Web', 'sans-serif'], 
    } 
    },
  },
  plugins: [],
};
export default config;
