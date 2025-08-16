// src/app/test-theme/page.js
// This is a temporary test page to verify theme switching works correctly
'use client';

import { useSession } from '../context/SessionContext';

export default function ThemeTestPage() {
  const { theme, toggleTheme } = useSession();

  return (
    <div className="min-h-screen bg-main p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header with theme toggle */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-primary">
            Theme Test Page
          </h1>
          <button
            onClick={toggleTheme}
            className="px-4 py-2 rounded border-2 border-primary bg-input text-command hover:bg-active transition-colors"
          >
            Current: {theme} (Click to toggle)
          </button>
        </div>

        {/* Utility Classes Test Grid */}
        <div className="grid grid-cols-2 gap-4">
          {/* Text Colors */}
          <div className="border border-primary rounded p-4">
            <h2 className="text-lg font-bold text-command mb-3">Text Colors</h2>
            <div className="space-y-2">
              <p className="text-primary">text-primary (green)</p>
              <p className="text-secondary">text-secondary (gray)</p>
              <p className="text-command">text-command (yellow)</p>
              <p className="text-tertiary">text-tertiary (lighter gray)</p>
              <p className="text-error">text-error (red)</p>
              <p className="text-success">text-success (green)</p>
              <p className="text-accent">text-accent (cyan/sky)</p>
              <p className="text-white-black">text-white-black (inverted)</p>
            </div>
          </div>

          {/* Background Colors */}
          <div className="border border-primary rounded p-4">
            <h2 className="text-lg font-bold text-command mb-3">Backgrounds</h2>
            <div className="space-y-2">
              <div className="bg-main p-2 border border-secondary">bg-main</div>
              <div className="bg-input p-2 border border-secondary">bg-input</div>
              <div className="bg-active p-2 border border-secondary">bg-active</div>
              <div className="bg-hover p-2 border border-secondary">bg-hover (hover me)</div>
            </div>
          </div>

          {/* Border Colors */}
          <div className="border border-primary rounded p-4">
            <h2 className="text-lg font-bold text-command mb-3">Borders</h2>
            <div className="space-y-2">
              <div className="border-2 border-primary p-2">border-primary</div>
              <div className="border-2 border-secondary p-2">border-secondary</div>
              <div className="border-2 border-darker p-2">border-darker</div>
            </div>
          </div>

          {/* Component Examples */}
          <div className="border border-primary rounded p-4">
            <h2 className="text-lg font-bold text-command mb-3">Components</h2>
            <div className="space-y-3">
              <button className="btn-command">Command Button</button>
              <input 
                type="text" 
                className="input-base w-full" 
                placeholder="Input field"
              />
              <div className="panel-full p-3">
                Panel with full styling
              </div>
            </div>
          </div>
        </div>

        {/* Raw Tailwind vs Utility Classes Comparison */}
        <div className="border-2 border-primary rounded p-4">
          <h2 className="text-lg font-bold text-command mb-3">
            Comparison: Old vs New Approach
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-bold text-error mb-2">❌ Old (conditional)</h3>
              <p className={theme === 'dark' ? 'text-dark-text-command' : 'text-light-text-command'}>
                Using ternary: theme === &apos;dark&apos; ? &apos;text-dark-text-command&apos; : &apos;text-light-text-command&apos;
              </p>
            </div>
            <div>
              <h3 className="font-bold text-success mb-2">✅ New (utility class)</h3>
              <p className="text-command">
                Using utility: text-command
              </p>
            </div>
          </div>
        </div>

        {/* Debug Info */}
        <div className="mt-8 p-4 bg-input border border-secondary rounded font-mono text-xs">
          <p className="text-secondary">Debug Info:</p>
          <p>Current theme: <span className="text-command">{theme}</span></p>
          <p>HTML classes: <span className="text-accent" id="html-classes"></span></p>
          <p>Body classes: <span className="text-accent" id="body-classes"></span></p>
        </div>
      </div>

      {/* Script to update debug info */}
      <script dangerouslySetInnerHTML={{
        __html: `
          setInterval(() => {
            const htmlClasses = document.getElementById('html-classes');
            const bodyClasses = document.getElementById('body-classes');
            if (htmlClasses) htmlClasses.textContent = document.documentElement.className || '(none)';
            if (bodyClasses) bodyClasses.textContent = document.body.className || '(none)';
          }, 100);
        `
      }} />
    </div>
  );
}