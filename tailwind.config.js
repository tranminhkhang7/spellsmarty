const plugin = require('tailwindcss/plugin');
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#2C542F',
        secondary: '#F2F4E6',
        browne: '#b7783a',
        primaryColor: '#1C0735',
        secondaryColor: '#faf9fc',
        goldenColor: '#E3B23C',
        searchBarColor: '#373737',
        searchBarPlaceHolder: '#fff',
        navBarColor: '#0e0e0e',
      },
      minWidth: {
        12: '3rem',
        36: '9rem',
        44: '11rem',
        56: '14rem',
        60: '15rem',
        72: '18rem',
        80: '20rem',
      },
      maxWidth: {
        12: '3rem',
        36: '9rem',
        44: '11rem',
        56: '14rem',
        60: '15rem',
        72: '18rem',
        80: '20rem',
        100: '30rem',
      },
    },
  },
  plugins: [
    // eslint-disable-next-line global-require
    // require('@tailwindcss/forms'),
    // add custom variant for expanding sidebar
    plugin(({ addVariant, e }) => {
      addVariant('sidebar-expanded', ({ modifySelectors, separator }) => {
        modifySelectors(
          ({ className }) => `.sidebar-expanded .${e(`sidebar-expanded${separator}${className}`)}`
        );
      });
    }),
  ],
};
