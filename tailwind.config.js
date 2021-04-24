const colors = require('tailwindcss/colors')

module.exports = {
  mode: 'jit',
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx,stories.js}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: colors.blue['600'],
        secondary: colors.gray['600'],
        success: colors.green['600'],
        info: colors.cyan['600'],
        warning: colors.yellow['600'],
        danger: colors.red['600'],
        light: colors.gray['100'],
        dark: colors.gray['800'],

        // 'link-color': colors.blue['600'],
        // 'link-decoration': 'none',
        // 'link-hover-color': colors.blue['100'],
        // 'link-hover-decoration': 'underline',

        // 'body-bg': colors.white,
        // 'body-color': colors.gray['900'],
        // 'body-text-align': 'none'
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
