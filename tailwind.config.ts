import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "var(--clr-primary)",
        secondary: "var(--clr-secondary)",
        header: "var(--clr-header)",
        akcent: "var(--clr-akcent)",
        golden: "var(--clr-golden)",
        button: "var(--clr-button)",
      },
      boxShadow: {
        "inner-button": "inset 0 0 1rem var(--clr-button)",
        "inner-header": "inset 0 0 1rem var(--clr-header)",
      },
      dropShadow: {
        logo: "0 0 0.5rem var(--clr-button)",
      },
      backgroundImage: {
        "gradient-primary": "var(--gradient-primary)",
        "gradient-secondary": "var(--gradient-secondary)",
      },
      keyframes: {
        "slide-left": {
          "0%": { opacity: "0", transform: "translateX(20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        "slide-right": {
          "0%": { opacity: "0", transform: "translateX(-20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
      },
      animation: {
        "slide-left": "slide-left 0.6s ease-out forwards",
        "slide-right": "slide-right 0.6s ease-out forwards",
      },
    },
  },
  plugins: [],
} satisfies Config;
