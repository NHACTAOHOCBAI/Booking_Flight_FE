const plugin = require('tailwindcss/plugin')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  corePlugins: {
    container: false
  },
  theme: {
    extend: {
      keyframes: {
        scroll: {
          '0%': { transform: 'translateX(100px)' },
          '100%': { transform: 'translateX(-1200px)' }
        }
      },
      animation: {
        scroll: 'scroll 20s linear infinite'
      },
      colors: {
        orange: '#ee4d2d'
      },
      backgroundImage: {
        'custom-bg': "url('./src/assets/background.png')"
      }
    }
  },

  plugins: [
    plugin(function ({ addComponents, theme }) {
      addComponents({
        '.container': {
          maxWidth: theme('columns.7xl'),
          marginLeft: 'auto',
          marginRight: 'auto',
          paddingLeft: theme('spacing.4'),
          paddingRight: theme('spacing.4')
        }
      })
    }),
    require('@tailwindcss/line-clamp')
  ]
}
