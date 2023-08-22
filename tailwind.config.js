/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{svelte,js,ts,jsx,tsx}",
  ],
  safelist: [
    { pattern: /bg-.+-200/ },
    "bg-slate-600",
    "bg-slate-700",
  ],
  theme: {
    extend: {
      colors: {
        sprout1: '#bef063',
        sprout2: '#c1e157',
        sprout3: '#c5cf4a',
        sprout4: '#c9c340',
        sprout5: '#c5c287',
      }
    },
  },
  plugins: [],
}

