/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0d0d0d",
        card: "#161616",
        cardHover: "#1f1f1f",
        cardSubtle: "#121212",
        cardDark: "#1b1b1b",
        muted: "#a9a9a9",
        borderSubtle: "#262626",
        borderDark: "#3a3a3a",
        accent: "#ffffff",
      },
      fontFamily: {
        sans: ['Urbanist', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      letterSpacing: {
        tighter: '-0.04em',
        tight: '-0.035em',
        wide: '0.08em',
        wider: '0.16em',
      },
    },
  },
  plugins: [],
}

