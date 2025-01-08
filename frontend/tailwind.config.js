export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "var(--clr-primary)",
        secondary: "var(--clr-secondary)",
        header: "var(--clr-header)",
        akcent: "var(--clr-akcent)",
        button: "var(--clr-button)",
      },
      boxShadow: {
        "inner-button": "inset 0 0 1rem var(--clr-button)",
        "inner-header": "inset 0 0 1rem var(--clr-header)",
      },
    },
  },
  plugins: [],
};
