const defaultTheme = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors');

module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      sans: ['Inter var', ...defaultTheme.fontFamily.sans],
    },
    stroke: {
      primary: colors.blue,
      neutral: colors.gray,
    },
    extend: {
      colors: {
        primary: colors.blue,
        neutral: colors.gray,
        success: colors.green,
        error: colors.red,
        warning: colors.yellow,
        info: colors.blue,
      },
      fontSize: {
        xxs: '.625rem',
      },
      boxSizing: ['inherit'],
    },
  },
};
