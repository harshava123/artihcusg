/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
      keyframes: {
        typing: {
          '0%': { width: '0%' },
          '100%': { width: '100%' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
      },
      animation: {
        typing: 'typing 1.5s steps(40) 1s forwards', // Typing effect
        blink: 'blink 1s step-end infinite', // Blinking cursor effect
      },
    },
  },
  plugins: [],
}
