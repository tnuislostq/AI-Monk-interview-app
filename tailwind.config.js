/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src-client/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ["var(--font-heading)", "Cabinet Grotesk", "Satoshi", "Inter", "sans-serif"],
        sans: ["Satoshi", "Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
        serif: ["Newsreader", "Playfair Display", "serif"],
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-12px) rotate(4deg)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.8' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        driftLeaf: {
          '0%': { transform: 'translate(0, 0) rotate(0deg)', opacity: '0' },
          '15%': { opacity: '0.8' },
          '85%': { opacity: '0.8' },
          '100%': { transform: 'translate(-120vw, 40vh) rotate(360deg)', opacity: '0' }
        }
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        pulseGlow: 'pulseGlow 3s ease-in-out infinite',
        fadeInUp: 'fadeInUp 0.4s ease forwards',
        driftLeaf: 'driftLeaf 14s linear infinite',
      },
    },
  },
  plugins: [],
}
