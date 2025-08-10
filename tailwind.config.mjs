/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Dark Theme (Default)
        'dark-bg': '#000000',
        'dark-text-white': '#ffffff',                     // pure white 
        'dark-text-primary': '#86efac',                   // green-300 
        'dark-text-secondary': '#9ca3af',                 // gray-400
        'dark-text-tertiary': '#6b7280',                  // gray-500 
        'dark-text-command': '#eab308',                   // yellow-500 
        'dark-border': '#22c55e',                         // green-500
        'dark-border-darker': '#166534',                  // green-800
        'dark-active': '#15803d',                         // green-800
        'dark-error': '#dc2626',                          // red-600 
        'dark-success': '#4ade80',                        // green-400
        'dark-input-bg': '#111827',                       // gray-900
        'dark-hover': 'rgba(34, 197, 94, 0.1)',            // Example: green-500 with 10% opacity
        'dark-accent': '#22d3ee',                         // cyan-400 

        // Light Theme
        'light-bg': '#ffffff',              // white background for maximum contrast
        'light-text-black': '#0a0a0a',      // almost black for clear text
        'light-text-primary': '#065f46',    // green for accents
        'light-text-secondary': '#4b5563',  // gray for secondary text
        'light-text-command': '#b45309',    // darker yellow for better contrast
        'light-border': '#10b981',          // green for borders
        'light-border-lighter': '#6ee7b7',  // green-300 for tag borders
        'light-active': '#d1fae5',          // green-100 
        'light-error': '#dc2626',           // red-600
        'light-success': '#059669',         // green-600
        'light-input-bg': '#ffffff',        // white
        'light-hover': 'rgba(5, 150, 105, 0.1)', // green-600 with 10% opacity
        'light-accent': '#0284c7',               // sky-400
      },

      fontSize: {
        'xs': '12px', // Status Labels
        'sm': '14px', // Base Text
        'base': '16px',// Command Text
        'lg': '18px', // Headers
        'xl': '20px', // Data Values
      },
      // Ensuring the font family is always monospace
      fontFamily: {
        mono: ['var(--font-mono)', '"IBM Plex Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', '"Liberation Mono"', '"Courier New"', 'monospace'],
      },

      // Setting border radius
      borderRadius: {
        'DEFAULT': '0.25rem', // 4px
      },
    },
  },
  plugins: [],
};

export default config;