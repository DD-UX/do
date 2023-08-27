/** @type {import('tailwindcss').Config} */

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}'],
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  darkMode: ['class', '[class*="dark"]'],
  // safelist: [{pattern: /\b(?:(bg|text|border)-)[a-z-\d]/g, variants: ['hover']}],
  variants: {
    extend: {
      theme: {
        colors: {
          white: 'var(--white)',
          black: 'var(--black)',
          violet: 'var(--violet)',
          pelorous: 'var(--pelorous)',
          conifer: 'var(--conifer)',
          'chetwode-blue': 'var(--chetwode-blue)',
          anzac: 'var(--anzac)',
          froly: 'var(--froly)',
          hopbush: 'var(--hopbush)',
          primary: {
            DEFAULT: 'var(--primary-color)',
            100: 'var(--primary-100)',
            200: 'var(--primary-200)',
            300: 'var(--primary-300)',
            400: 'var(--primary-400)',
            500: 'var(--primary-500)',
            600: 'var(--primary-600)',
            700: 'var(--primary-700)',
            800: 'var(--primary-800)',
            900: 'var(--primary-900)'
          },
          secondary: {
            DEFAULT: 'var(--secondary-color)',
            100: 'var(--secondary-100)',
            200: 'var(--secondary-200)',
            300: 'var(--secondary-300)',
            400: 'var(--secondary-400)',
            500: 'var(--secondary-500)',
            600: 'var(--secondary-600)',
            700: 'var(--secondary-700)',
            800: 'var(--secondary-800)',
            900: 'var(--secondary-900)'
          },
          background: {
            DEFAULT: 'var(--background-color)',
            100: 'var(--background-100)',
            200: 'var(--background-200)',
            300: 'var(--background-300)',
            400: 'var(--background-400)',
            500: 'var(--background-500)',
            600: 'var(--background-600)',
            700: 'var(--background-700)',
            800: 'var(--background-800)',
            900: 'var(--background-900)'
          },
          text: {
            DEFAULT: 'var(--text-color)',
            100: 'var(--text-100)',
            200: 'var(--text-200)',
            300: 'var(--text-300)',
            400: 'var(--text-400)',
            500: 'var(--text-500)',
            600: 'var(--text-600)',
            700: 'var(--text-700)',
            800: 'var(--text-800)',
            900: 'var(--text-900)'
          },
          accent: {
            DEFAULT: 'var(--accent-color)',
            100: 'var(--accent-100)',
            200: 'var(--accent-200)',
            300: 'var(--accent-300)',
            400: 'var(--accent-400)',
            500: 'var(--accent-500)',
            600: 'var(--accent-600)',
            700: 'var(--accent-700)',
            800: 'var(--accent-800)',
            900: 'var(--accent-900)'
          },
          success: {
            DEFAULT: 'var(--success-color)',
            100: 'var(--success-100)',
            200: 'var(--success-200)',
            300: 'var(--success-300)',
            400: 'var(--success-400)',
            500: 'var(--success-500)',
            600: 'var(--success-600)',
            700: 'var(--success-700)',
            800: 'var(--success-800)',
            900: 'var(--success-900)'
          },
          warning: {
            DEFAULT: 'var(--warning-color)',
            100: 'var(--warning-100)',
            200: 'var(--warning-200)',
            300: 'var(--warning-300)',
            400: 'var(--warning-400)',
            500: 'var(--warning-500)',
            600: 'var(--warning-600)',
            700: 'var(--warning-700)',
            800: 'var(--warning-800)',
            900: 'var(--warning-900)'
          },
          error: {
            DEFAULT: 'var(--error-color)',
            100: 'var(--error-100)',
            200: 'var(--error-200)',
            300: 'var(--error-300)',
            400: 'var(--error-400)',
            500: 'var(--error-500)',
            600: 'var(--error-600)',
            700: 'var(--error-700)',
            800: 'var(--error-800)',
            900: 'var(--error-900)'
          }
        },
        extend: {
          boxShadow: {
            'sm-negative': '0 -1px 2px 0 rgb(0 0 0 / 0.05);',
            negative: '0 -1px 3px 0 rgb(0 0 0 / 0.1), 0 -1px -2px -1px rgb(0 0 0 / 0.1);',
            'md-negative': '0 -4px 6px -1px rgb(0 0 0 / 0.1), 0 -2px 4px -2px rgb(0 0 0 / 0.1);',
            'lg-negative':
              '0 -10px -15px -3px rgb(0 0 0 / 0.1), 0 -4px -6px -4px rgb(0 0 0 / 0.1);',
            'xl-negative':
              '0 -20px -25px -5px rgb(0 0 0 / 0.1), 0 -8px -10px -6px rgb(0 0 0 / 0.1);',
            '2xl-negative': '0 -25px -50px -12px rgb(0 0 0 / 0.25);',
            'inner-negative': 'inset 0 -2px -4px 0 rgb(0 0 0 / 0.05);'
          }
        }
      }
    }
  },
  plugins: []
};
