/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        pine: {
          50: '#f0f7f3',
          100: '#dcefe4',
          200: '#b9dfcc',
          300: '#8cc6ab',
          400: '#57a585',
          500: '#358568',
          600: '#256a54',
          700: '#1f5545',
          800: '#1a4438',
          900: '#14352c',
          950: '#0b201a',
        },
        sage: {
          100: '#eef2e6',
          200: '#dde6cd',
          300: '#c2d3a8',
          400: '#a3bc7f',
        },
        ivory: '#faf7f0',
        cream: '#f3ecdf',
        clay: {
          400: '#d99a76',
          500: '#c97e56',
          600: '#b26640',
        },
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 18px 45px -18px rgba(20, 53, 44, 0.25)',
        card: '0 10px 30px -12px rgba(20, 53, 44, 0.18)',
      },
    },
  },
  plugins: [],
}
