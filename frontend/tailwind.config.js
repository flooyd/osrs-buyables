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
        // Light theme colors (OSRS Wiki inspired)
        light: {
          bg: '#e0dbc9',         // Parchment background
          surface: '#ede6d4',    // Lighter parchment for cards
          border: '#b8a888',     // Brown borders
          text: '#2b1e0f',       // Dark brown text
          muted: '#5c4a2f',      // Medium brown muted text
          hover: '#d5ccb5'       // Darker beige on hover
        },
        // Dark theme colors
        dark: {
          bg: '#0f1419',
          surface: '#1a1f2e',
          border: '#2d3748',
          text: '#e2e8f0',
          muted: '#94a3b8',
          hover: '#1e293b'
        }
      }
    },
  },
  plugins: [],
}
