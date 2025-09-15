/** @type {import('tailwindcss').Config} */

/*
  Tailwind configuration for unified data-theme approach.

  Notes:
  - We disable Tailwind's built-in `darkMode` because theming is handled
    via the `data-theme="<id>"` attribute and `.theme-<id>` legacy classes.
  - Color tokens are named by theme + semantic token (e.g. 'dark-bg', 'amber-text-primary').
  - Keep token names in sync with your globals.css theme overrides.
*/

const config = {
  // We use [data-theme="..."] instead of Tailwind's built-in `dark:` variant.
  darkMode: "media",

  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  theme: {
    extend: {
      colors: {
        // Most theming is handled by CSS variables in globals.css
        // Only keep tokens that are actually used for backward compatibility
      },

      // Font sizes intentionally set to fixed pixel values for terminal-like UI
      fontSize: {
        'xs': '12px',
        'sm': '14px',
        'base': '16px',
        'lg': '18px',
        'xl': '20px',
      },

      // Ensure monospace stack is stable across platforms
      fontFamily: {
        mono: [
          'var(--font-mono)',
          '"IBM Plex Mono"',
          'ui-monospace',
          'SFMono-Regular',
          'Menlo',
          'Monaco',
          'Consolas',
          '"Liberation Mono"',
          '"Courier New"',
          'monospace'
        ],
      },

      // Small, consistent rounded corners
      borderRadius: {
        'DEFAULT': '0.25rem',
      },
      
      // Animations
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'pulse-progress': 'pulseProgress 1.5s ease-in-out infinite',
        'screen-exit': 'screen-exit 200ms cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'screen-enter': 'screen-enter 200ms cubic-bezier(0.4, 0, 0.2, 1) forwards',
      },
    },
  },

  plugins: [],
};

export default config;