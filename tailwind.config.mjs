/** @type {import('tailwindcss').Config} */
const config = {

  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // This section is intentionally left empty.
        // All theme colors are handled by CSS variables in globals.css.
      },
      fontSize: {
        '2xs': '0.625rem', // 10px
      },
      fontFamily: {
        mono: [
          'var(--font-mono)',
          'IBM Plex Mono',
          'monospace'
        ],
      },
      borderRadius: {
        'terminal': '4px',
      },
      animation: {
        'pulse-progress': 'pulse 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
export default config;