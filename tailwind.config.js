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
      },
    },
  },
  plugins: [
    // eslint-disable-next-line global-require
    require('@tailwindcss/forms'),
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
