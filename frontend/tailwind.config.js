/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Dark theme colors
        dark: {
          bg: '#0f1419',
          surface: '#1a1f2e',
          border: '#2d3748',
          text: '#e2e8f0',
          muted: '#94a3b8'
        }
      }
    },
  },
  plugins: [],
}
