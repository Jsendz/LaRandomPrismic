/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    
 
    // Or if using `src` directory:
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/slices/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 10s linear infinite', // Slower spin
      },

      fontFamily: {
        sans: ['var(--font-dm-sans)'], // Use in Tailwind
      },
    },
  },
  plugins: [],
}

