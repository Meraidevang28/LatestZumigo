const colors = require('./src/assets/theme/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: [
    './App.{js,jsx,ts,tsx}',
    './<custom-folder>/**/*.{js,jsx,ts,tsx}',
    './src/**/*.{js,jsx,ts,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {colors},
    fontFamily: {
      'junegull-Regular': ['junegull-Regular'],
      'Proxima-Nova-Light': ['Proxima-Nova-Light'],
      'Proxima-Nova-Regular': ['Proxima-Nova-Regular'],
      'Proxima-Nova-Medium': ['Proxima-Nova-Medium'],
      'Proxima-Nova-Semibold': ['Proxima-Nova-Semibold'],
      'Proxima-Nova-Bold': ['Proxima-Nova-Bold'],
      'Proxima-Nova-Alt-Regular': ['Proxima-Nova-Alt-Regular'],
      'Figtree-Light': ['Figtree-Light'],
      'Figtree-Regular': ['Figtree-Regular'],
      'Figtree-Medium': ['Figtree-Medium'],
      'Figtree-SemiBold': ['Figtree-SemiBold'],
      'Figtree-Bold': ['Figtree-Bold'],
      'Figtree-ExtraBold': ['Figtree-ExtraBold'],
      'PTSans-Bold': ['PTSans-Bold'],
      'Nunito-Regular': ['Nunito-Regular'],
      'Nunito-Bold': ['Nunito-Bold'],
    },
  },
  plugins: [],
};
