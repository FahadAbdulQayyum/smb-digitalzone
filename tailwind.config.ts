import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    'bg-purple-400',
    'bg-cyan-400',
    'bg-teal-400',
    'bg-orange-400',
    'bg-pink-400',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-border': 'linear-gradient(to right, #ff7e5f, #feb47b)',
      },
      screens: {
        // Define custom breakpoints here
        'xs': '375px',   // Extra small devices (e.g., iPhone SE)
        'sm': '640px',   // Small devices (e.g., phones)
        'md': '768px',   // Medium devices (e.g., tablets)
        'lg': '1024px',  // Large devices (e.g., laptops)
        'xl': '1280px',  // Extra large devices (e.g., desktops)
        '2xl': '1536px', // 2x large devices (e.g., large monitors)
        '3xl': '1920px', // 3x large devices (e.g., ultra-wide monitors)
      },
      colors: {
        background: "#F4F4F4",
        boxColor: "#19161C",
        grayColor: "#7E89AC",
        reportColor: "#19161C",
        purpleColor: "#CB3CFF",
        blueColor: "#0038FF",
        tealColor: "#00C2FF",
        greenColor: "#14CA74",
        greenColorT: "#05C16833",
        redColor: "#FF5A65",
        redColorT: "#FF5A6533",
        textClr: "#737A91",
        textClr2: "#585D6E",
        textClr3: "#737A91",
        primary: "#FFFFFF",
        foreground: "#0154AA",
      },
      padding: {
        standardPadding: '2rem',
      },
    },
  },
  plugins: [],
};
export default config;
