/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      xs: { min: '352px' },

      sm: { min: '480px' },

      md: { min: '768px' },

      lg: { min: '992px' },

      xl: { min: '1280px' },

      '2xl': { min: '1536px' }
    },
    fontFamily: {
      inter: ['Inter', 'sans-serif']
    },
    extend: {
      colors: {
        brand: '#e21e48'
      },
      gridTemplateColumns: {
        'auto-fill-minmax': 'repeat(auto-fill, minmax(16rem, 1fr))'
      }
    }
  },
  plugins: []
};
