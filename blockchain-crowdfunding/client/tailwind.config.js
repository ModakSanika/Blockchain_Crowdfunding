module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        purple: {
          100: "#f3e8ff",
          600: "#8b5cf6",
          900: "#4c1d95",
        },
        pink: {
          600: "#db2777",
        },
        yellow: {
          400: "#facc15",
        },
        blue: {
          400: "#60a5fa",
          600: "#2563eb",
        },
      },
    },
  },
  plugins: [],
};