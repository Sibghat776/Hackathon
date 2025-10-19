/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // NEW MEDICAL & TRUSTWORTHY PALETTE
        primary: "#004D7A",
        secondary: "#4ECDC4",
        accent: "#F9A8D4",
        background: "#F0F4F8",
        dark: "#1E293B",
      },
      boxShadow: {
        smooth: "0 4px 15px rgba(0,0,0,0.1)",
        'clean-blue': '0 10px 30px rgba(0, 77, 122, 0.15)',
      },
      spacing: {
        'hero-pt': '6rem',   // 24 -> 6rem
        'hero-pt-md': '10rem', // 40 -> 10rem
        'hero-pb': '8rem',    // 32 -> 8rem
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(to bottom right, #0A1017, #10161F, #0A1017)',
      },
    },
  },
  plugins: [],
}