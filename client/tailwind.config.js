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
        },
        // Tema del curso avanzado: leen las variables de .tema-avanzado (client/src/tema-avanzado.css).
        av: {
          fondo: 'rgb(var(--av-fondo) / <alpha-value>)',
          'fondo-2': 'rgb(var(--av-fondo-2) / <alpha-value>)',
          panel: 'rgb(var(--av-panel) / <alpha-value>)',
          linea: 'rgb(var(--av-linea) / <alpha-value>)',
          texto: 'rgb(var(--av-texto) / <alpha-value>)',
          'texto-2': 'rgb(var(--av-texto-2) / <alpha-value>)',
          acento: 'rgb(var(--av-acento) / <alpha-value>)',
          'acento-2': 'rgb(var(--av-acento-2) / <alpha-value>)',
          'sobre-acento': 'rgb(var(--av-sobre-acento) / <alpha-value>)',
          alerta: 'rgb(var(--av-alerta) / <alpha-value>)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        'av-titulo': 'var(--av-fuente-titulo)',
        'av-texto': 'var(--av-fuente-texto)',
        'av-mono': 'var(--av-fuente-mono)',
      }
    },
  },
  plugins: [
    require("tailwindcss-animate"),
  ],
}
