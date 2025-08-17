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
        // -------------------------
        // DARK THEME TOKENS
        // -------------------------
        'dark-bg': '#000000',
        'dark-text-white': '#ffffff',
        'dark-text-primary': '#86efac',
        'dark-text-secondary': '#9ca3af',
        'dark-text-tertiary': '#6b7280',
        'dark-text-command': '#eab308',
        'dark-border': '#22c55e',
        'dark-border-darker': '#166534',
        'dark-active': '#15803d',
        'dark-error': '#dc2626',
        'dark-success': '#4ade80',
        'dark-input-bg': '#111827',
        'dark-hover': 'rgba(34, 197, 94, 0.1)',
        'dark-accent': '#22d3ee',

        // -------------------------
        // LIGHT THEME TOKENS
        // -------------------------
        'light-bg': '#ffffff',
        'light-text-black': '#0a0a0a',
        'light-text-primary': '#065f46',
        'light-text-secondary': '#4b5563',
        'light-text-tertiary': '#9ca3af',
        'light-text-command': '#b45309',
        'light-border': '#10b981',
        'light-border-darker': '#059669',
        'light-border-lighter': '#6ee7b7',
        'light-active': '#d1fae5',
        'light-error': '#dc2626',
        'light-success': '#059669',
        'light-input-bg': '#ffffff',
        'light-hover': 'rgba(5, 150, 105, 0.1)',
        'light-accent': '#0284c7',

        // -------------------------
        // AMBER THEME TOKENS (retro / phosphor)
        // -------------------------
        'amber-bg': '#1C1C1C',
        'amber-surface': '#2A2A2A',
        'amber-text-primary': '#FFFFFF',
        'amber-text-secondary': '#D6D6D6',
        'amber-text-tertiary': '#A3A3A3',
        'amber-text-command': '#D94A1E',
        'amber-border': '#D94A1E',
        'amber-border-darker': '#7A2B12',
        'amber-active': '#FF5C28',
        'amber-error': '#FF3B30',
        'amber-success': '#34C759',
        'amber-input-bg': '#242424',
        'amber-hover': 'rgba(217, 74, 30, 0.12)',
        'amber-accent': '#FF784E',
        'amber-tag-border': '#D6D6D6',

        // -------------------------
        // BSOD THEME TOKENS (blue & white)
        // -------------------------
        'bsod-bg': '#0B4DA8',
        'bsod-surface': '#08429A',
        'bsod-text-primary': '#FFFFFF',
        'bsod-text-secondary': '#CFE9FF',
        'bsod-text-tertiary': '#9EC7FF',
        'bsod-text-command': '#E1F0FF',
        'bsod-border': '#E6F3FF',
        'bsod-border-darker': '#7FB3FF',
        'bsod-active': '#0066FF',
        'bsod-error': '#FF6B6B',
        'bsod-success': '#00D084',
        'bsod-input-bg': '#073A93',
        'bsod-hover': 'rgba(230, 243, 255, 0.06)',
        'bsod-accent': '#88B8FF',
        'bsod-tag-border': '#C7E1FF',
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
    },
  },

  plugins: [],
};

export default config;
