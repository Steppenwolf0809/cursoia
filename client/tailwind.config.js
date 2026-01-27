/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1a365d',
          light: '#2a4365',
        },
        secondary: {
          DEFAULT: '#3182ce',
          hover: '#2b6cb0',
        },
        accent: {
          DEFAULT: '#d69e2e',
          hover: '#b7791f',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [
    require("tailwindcss-animate"),
  ],
}
