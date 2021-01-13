const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  purge: ["./src/**/*.tsx"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    fontFamily: {
      mono: ["ArialRounded", "Roboto Mono", ...defaultTheme.fontFamily.mono],
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
