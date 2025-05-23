/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        'space-grotesk': ['Space Grotesk', 'sans-serif'],
        'satoshi': ['Satoshi', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif']
      },
      maxWidth: {
        '8xl': '96rem',  // 1536px
        '9xl': '112rem', // 1792px
        '10xl': '128rem' // 2048px
      }
    },
  },
  plugins: [],
}
