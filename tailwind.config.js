/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Oswald', 'sans-serif'],
        'display': ['Oswald', 'sans-serif'],
      },
      colors: {
        'primary': '#3B3561',    // Space cadet (purple)
        'secondary': '#D1D1D1',  // Timberwolf (light gray)
        'accent': '#51A3A3',     // Verdigris (teal)
        'text-light': '#D1D1D1', // Light text
        'text-dark': '#3B3561',  // Dark text
      },
      animation: {
        'spin-slow': 'spin 8s linear infinite',
      },
      backgroundColor: theme => ({
        ...theme('colors'),
      }),
      textColor: theme => ({
        ...theme('colors'),
      }),
      borderColor: theme => ({
        ...theme('colors'),
      }),
    },
  },
  plugins: [],
}
