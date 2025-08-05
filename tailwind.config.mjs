/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // Extending the color palette with our design system colors
      colors: {
        // Dark Theme (Default)
        'dark-bg': '#000000',
        'dark-text-white': '#ffffff',                     // pure white for dark theme
        'dark-text-primary': '#86efac',                   // green-300 // UPDATED for better readability
        'dark-text-secondary': '#9ca3af',                 // gray-400
        'dark-text-tertiary': '#6b7280',                  // gray-500 // ADDED for logs/navigation/etc
        'dark-text-command': '#eab308',                   // yellow-500 // UPDATED to improve punch
        'dark-border': '#22c55e',                         // green-500
        'dark-border-darker': '#166534',                  // green-800
        'dark-active': '#15803d',                         // green-800
        'dark-error': '#dc2626',                          // red-600 // UPDATED for sharper error contrast
        'dark-success': '#4ade80',                        // green-400
        'dark-input-bg': '#111827',                       // gray-900
        'dark-hover': 'rgba(34, 197, 94, 0.1)',            // Example: green-500 with 10% opacity
        'dark-accent': '#22d3ee',                         // cyan-400 // ADDED for links/interactive text

        // Light Theme
        'light-bg': '#f3f4f6',                            // gray-100
        'light-text-black': '#000000',                    // pure black for light theme
        'light-text-primary': '#166534',                  // green-800
        'light-text-secondary': '#4b5563',                // gray-600
        'light-text-command': '#ca8a04',                  // yellow-600
        'light-border': '#16a34a',                        // green-600 // UPDATED from green-700 to improve contrast
        'light-border-lighter': '#4ade80',                // green-400
        'light-active': '#dcfce7',                        // green-100
        'light-error': '#dc2626',                         // red-600
        'light-success': '#16a34a',                       // green-600
        'light-input-bg': '#ffffff',                      // white
        'light-hover': 'rgba(22, 163, 74, 0.1)',           // Example: green-600 with 10% opacity
        'light-accent': '#0ea5e9',                        // sky-500 // ADDED for light-mode links/interactive
      },
      // Extending font sizes based on the design system
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