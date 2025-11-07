# 🌈 Theme System Guide

This guide provides a complete overview of the Interactive Terminal Portfolio's theme system, how it works, and how to work with it.

---

## Table of Contents

1. [Quick Tour (3-Min Overview)](#1-quick-tour-3-min-overview)
2. [Architecture Deep Dive](#2-architecture-deep-dive)
3. [All 8 Theme Palettes](#3-all-8-theme-palettes)
4. [Theme Customization Guide](#4-theme-customization-guide)
5. [Performance Impact Notes](#5-performance-impact-notes)

---

## 1. Quick Tour (3-Min Overview)

The portfolio uses a sophisticated theming system built on CSS variables and the `data-theme` attribute. Here's what you need to know in 3 minutes:

### How Theme Switching Works
1. **Theme Selection:** User selects theme (dark/light/amber/etc.) via theme switcher
2. **State Update:** `SessionContext` updates `theme` state
3. **DOM Update:** `ThemeManager` sets `data-theme="selected-theme"` on `<html>`
4. **CSS Activation:** CSS variables update instantly via `[data-theme="dark"]` selectors
5. **Result:** Entire UI re-renders with new colors (flicker-free)

### Theme Intent for Complex Effects
Some components need to know if a theme is "light-intent" or "dark-intent" for effects like glow vs shadow:
- **Dark Intent:** `dark`, `amber`, `bsod`, `synthwave`, `operator`, `radar`
- **Light Intent:** `light`, `kyoto`

### Semantic Classes
**Always use these theme-aware classes (not hardcoded colors):**
```javascript
<div className="bg-background text-text border-terminal-green">
  {/* Component content */}
</div>
```

### Supported Themes
8 themes available: dark, light, amber, bsod, synthwave, operator, kyoto, radar

---

## 2. Architecture Deep Dive

### 2.1. CSS Variables Architecture

Instead of Tailwind's `dark:` variant, we use CSS variables controlled by the `data-theme` attribute:

**Three-Layer CSS Structure:**

1. **Layer 1: tailwind.config.mjs**
   - Raw color tokens: `'dark-bg': '#000000'`, `'amber-text': '#FFB86C'`
   - Master color library

2. **Layer 2: globals.css Semantic Variables**
   - CSS custom properties: `--color-bg`, `--color-text-primary`
   - No color values, only variable names

3. **Layer 3: globals.css Theme Assignments**
   ```css
   [data-theme='dark'] {
     --color-bg: theme('colors.dark-bg');
     --color-text-primary: theme('colors.dark-text-primary');
     /* ... 17 variables */
   }
   ```

### 2.2. React Integration

**ThemeManager Component** (`src/app/components/ThemeManager.js`):
```javascript
function ThemeManager() {
  const { theme } = useSession();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return null; // Invisible orchestrator
}
```

**Theme Switcher Component** (`src/app/components/ui/ThemeSwitcher.js`):
```javascript
export default function ThemeSwitcher() {
  const { theme, setTheme } = useSession();

  const themes = ['dark', 'light', 'amber', 'bsod', 'synthwave', 'operator', 'kyoto', 'radar'];

  return (
    <select value={theme} onChange={(e) => setTheme(e.target.value)}>
      {themes.map(t => <option key={t} value={t}>{t}</option>)}
    </select>
  );
}
```

### 2.3. Theme Intent System

**Why Intent Matters:**
Some visual effects differ between light and dark backgrounds:
- Dark themes: Text glows, shadows for depth
- Light themes: Subtle shadows, contrast adjustments

**Implementation in SessionContext:**
```javascript
export const themeConfig = {
  dark: { intent: 'dark' },
  light: { intent: 'light' },
  amber: { intent: 'dark' },
  bsod: { intent: 'dark' },
  synthwave: { intent: 'dark' },
  operator: { intent: 'dark' },
  kyoto: { intent: 'light' },
  radar: { intent: 'dark' }
};
```

**Usage in Components:**
```javascript
function MorphingTerminal() {
  const { theme } = useSession();
  const isDark = themeConfig[theme]?.intent === 'dark';

  // Apply different effects based on intent
  return (
    <div className={isDark ? 'text-glow-effect' : 'subtle-shadow-effect'}>
      {/* Terminal content */}
    </div>
  );
}
```

---

## 3. All 8 Theme Palettes

Each theme provides 17 semantic color variables + 3 texture variables.

### 3.1. Dark Theme (Default)

| CSS Variable | Value |
|--------------|--------|
| `--color-bg` | `#000000` |
| `--color-text-white` | `#ffffff` |
| `--color-text-primary` | `#86efac` |
| `--color-text-secondary` | `#9ca3af` |
| `--color-text-tertiary` | `#6b7280` |
| `--color-text-command` | `#eab308` |
| `--color-border` | `#22c55e` |
| `--color-border-darker` | `#166534` |
| `--color-active` | `#15803d` |
| `--color-error` | `#dc2626` |
| `--color-success` | `#4ade80` |
| `--color-input-bg` | `#111827` |
| `--color-hover` | `rgba(34, 197, 94, 0.1)` |
| `--color-accent` | `#22d3ee` |
| `--color-btn-bg` | `rgba(255, 255, 255, 0.07)` |
| `--color-btn-bg-hover` | `rgba(255, 255, 255, 0.09)` |
| **Texture Effects** | |
| `--texture-line-color` | `34, 197, 94` |
| `--texture-opacity` | `0.03` |
| `--texture-grid-size` | `100px` |

### 3.2. Light Theme

| CSS Variable | Value |
|--------------|--------|
| `--color-bg` | `#ffffff` |
| `--color-text-white` | `#0a0a0a` |
| `--color-text-primary` | `#065f46` |
| `--color-text-secondary` | `#4b5563` |
| `--color-text-tertiary` | `#6b7280` |
| `--color-text-command` | `#b45309` |
| `--color-border` | `#10b981` |
| `--color-border-darker` | `#059669` |
| `--color-active` | `#d1fae5` |
| `--color-error` | `#ef4444` |
| `--color-success` | `#22c55e` |
| `--color-input-bg` | `#f9fafb` |
| `--color-hover` | `rgba(5, 150, 105, 0.1)` |
| `--color-accent` | `#0891b2` |
| `--color-btn-bg` | `rgba(5, 150, 105, 0.05)` |
| `--color-btn-bg-hover` | `rgba(15, 150, 105, 0.1)` |
| **Texture Effects** | |
| `--texture-line-color` | `59, 130, 246` |
| `--texture-opacity` | `0.02` |
| `--texture-grid-size` | `120px` |

### 3.3. Amber Theme

| CSS Variable | Value |
|--------------|--------|
| `--color-bg` | `#1C140D` |
| `--color-text-white` | `#FFB86C` |
| `--color-text-primary` | `#FFB86C` |
| `--color-text-secondary` | `#D9A15D` |
| `--color-text-tertiary` | `#B38A4D` |
| `--color-text-command` | `#FFD173` |
| `--color-border` | `#FF9F1C` |
| `--color-border-darker` | `#8B5A00` |
| `--color-active` | `#FF8C00` |
| `--color-error` | `#FF6B6B` |
| `--color-success` | `#50FA7B` |
| `--color-input-bg` | `#261A12` |
| `--color-hover` | `rgba(255, 184, 108, 0.08)` |
| `--color-accent` | `#8BE9FD` |
| `--color-btn-bg` | `rgba(255, 184, 108, 0.05)` |
| `--color-btn-bg-hover` | `rgba(255, 184, 108, 0.1)` |
| **Texture Effects** | |
| `--texture-line-color` | `251, 146, 60` |
| `--texture-opacity` | `0.05` |
| `--texture-grid-size` | `100px` |

### 3.4. BSOD Theme

| CSS Variable | Value |
|--------------|--------|
| `--color-bg` | `#0B4DA8` |
| `--color-text-white` | `#FFFFFF` |
| `--color-text-primary` | `#FFFFFF` |
| `--color-text-secondary` | `#CFE9FF` |
| `--color-text-tertiary` | `#9EC7FF` |
| `--color-text-command` | `#E1F0FF` |
| `--color-border` | `#E6F3FF` |
| `--color-border-darker` | `#7FB3FF` |
| `--color-active` | `#0066FF` |
| `--color-error` | `#FF6B6B` |
| `--color-success` | `#00D084` |
| `--color-input-bg` | `#073A93` |
| `--color-hover` | `rgba(230, 243, 255, 0.06)` |
| `--color-accent` | `#88B8FF` |
| `--color-btn-bg` | `rgba(230, 243, 255, 0.08)` |
| `--color-btn-bg-hover` | `rgba(230, 243, 255, 0.15)` |
| **Texture Effects** | |
| `--texture-line-color` | `255, 255, 255` |
| `--texture-opacity` | `0.08` |
| `--texture-grid-size` | `80px` |

### 3.5. Synthwave Theme

| CSS Variable | Value |
|--------------|--------|
| `--color-bg` | `#1A103C` |
| `--color-text-white` | `#FF00E5` |
| `--color-text-primary` | `#FF00E5` |
| `--color-text-secondary` | `#00BFFF` |
| `--color-text-tertiary` | `#7B61FF` |
| `--color-text-command` | `#F7B801` |
| `--color-border` | `#FF00E5` |
| `--color-border-darker` | `#00BFFF` |
| `--color-active` | `#4C00A4` |
| `--color-error` | `#FF1B1B` |
| `--color-success` | `#39FF14` |
| `--color-input-bg` | `#2C1E5C` |
| `--color-hover` | `rgba(255, 0, 229, 0.1)` |
| `--color-accent` | `#00F6FF` |
| `--color-btn-bg` | `rgba(255, 0, 229, 0.08)` |
| `--color-btn-bg-hover` | `rgba(255, 0, 229, 0.12)` |
| **Texture Effects** | |
| `--texture-line-color` | `236, 72, 153` |
| `--texture-opacity` | `0.04` |
| `--texture-grid-size` | `100px` |

### 3.6. Operator Theme

| CSS Variable | Value |
|--------------|--------|
| `--color-bg` | `#1E0000` |
| `--color-text-white` | `#FF4100` |
| `--color-text-primary` | `#FF4100` |
| `--color-text-secondary` | `#FFA500` |
| `--color-text-tertiary` | `#B37400` |
| `--color-text-command` | `#FF4100` |
| `--color-border` | `#FF4100` |
| `--color-border-darker` | `#FFA500` |
| `--color-active` | `#5D1800` |
| `--color-error` | `#FFFF00` |
| `--color-success` | `#A8FF00` |
| `--color-input-bg` | `#1A1A1A` |
| `--color-hover` | `rgba(255, 65, 0, 0.1)` |
| `--color-accent` | `#FFA500` |
| `--color-btn-bg` | `rgba(255, 65, 0, 0.08)` |
| `--color-btn-bg-hover` | `rgba(255, 65, 0, 0.12)` |
| **Texture Effects** | |
| `--texture-line-color` | `251, 191, 36` |
| `--texture-opacity` | `0.03` |
| `--texture-grid-size` | `100px` |

### 3.7. Kyoto Theme

| CSS Variable | Value |
|--------------|--------|
| `--color-bg` | `#B0B0B0` |
| `--color-text-white` | `#1A1A1A` |
| `--color-text-primary` | `#1A1A1A` |
| `--color-text-secondary` | `#4A4A4A` |
| `--color-text-tertiary` | `#7A7A7A` |
| `--color-text-command` | `#D95D39` |
| `--color-border` | `#1A1A1A` |
| `--color-border-darker` | `#4A4A4A` |
| `--color-active` | `#8E8E8E` |
| `--color-error` | `#A80000` |
| `--color-success` | `#0A6D0A` |
| `--color-input-bg` | `#8E8E8E` |
| `--color-hover` | `rgba(74, 74, 74, 0.1)` |
| `--color-accent` | `#39D9D9` |
| `--color-btn-bg` | `rgba(26, 26, 26, 0.05)` |
| `--color-btn-bg-hover` | `rgba(26, 26, 26, 0.1)` |
| **Texture Effects** | |
| `--texture-line-color` | `220, 38, 38` |
| `--texture-opacity` | `0.03` |
| `--texture-grid-size` | `110px` |

### 3.8. Radar Theme

| CSS Variable | Value |
|--------------|--------|
| `--color-bg` | `#3C4D3A` |
| `--color-text-white` | `#B3E2A7` |
| `--color-text-primary` | `#B3E2A7` |
| `--color-text-secondary` | `#8BAA85` |
| `--color-text-tertiary` | `#5A5A5A` |
| `--color-text-command` | `#D98E39` |
| `--color-border` | `#2A2A2A` |
| `--color-border-darker` | `#2A2A2A` |
| `--color-active` | `#2F3D2D` |
| `--color-error` | `#D94639` |
| `--color-success` | `#65B354` |
| `--color-input-bg` | `#32402F` |
| `--color-hover` | `rgba(179, 226, 167, 0.1)` |
| `--color-accent` | `#54B3B3` |
| `--color-btn-bg` | `rgba(179, 226, 167, 0.05)` |
| `--color-btn-bg-hover` | `rgba(179, 226, 167, 0.1)` |
| **Texture Effects** | |
| `--texture-line-color` | `34, 197, 94` |
| `--texture-opacity` | `0.04` |
| `--texture-grid-size` | `90px` |

---

## 4. Theme Customization Guide

### 4.1. Adding a New Theme

To add a new theme (e.g., "neon"):

**1. Add to tailwind.config.mjs:**
```javascript
// theme('colors.neon-bg'), etc.
'neon-bg': '#0F0F23',
'neon-text-primary': '#39FF14',
// etc.
```

**2. Add to SessionContext config:**
```javascript
export const themeConfig = {
  // ... existing themes
  neon: { intent: 'dark' }, // or 'light'
};
```

**3. Add to globals.css:**
```css
[data-theme='neon'] {
  --color-bg: theme('colors.neon-bg');
  --color-text-primary: theme('colors.neon-text-primary');
  /* All 17 color variables + 3 texture variables */
}
```

**4. Update ThemeSwitcher:**
```javascript
const themes = [
  'dark', 'light', 'amber', 'bsod', 'synthwave',
  'operator', 'kyoto', 'radar', 'neon'  // Add here
];
```

### 4.2. Modifying Existing Themes

**Update color values:**
1. Modify tailwind.config.mjs color tokens
2. Update corresponding `[data-theme='...']` section in globals.css
3. All components automatically pick up changes

**Change theme intent:**
- Update `themeConfig` in SessionContext
- Affects components using theme intent (effects/glows)

### 4.3. Best Practices

**Do This:**
- Use CSS variables, not hardcoded colors
- Test all themes when adding components
- Consider accessibility contrast in new themes
- Use numeric opacity for hover states

**Avoid This:**
- Hardcoded colors like `bg-red-500`
- Not testing components in all themes
- Inconsistent hover/active states
- Not using theme intent for complex effects

---

## 5. Performance Impact Notes

### 5.1. Instant Switching (No Reloads)

- CSS variables update instantly via `setAttribute()`
- No JavaScript re-execution or layout recalculations
- Only CSS repaint triggered (very fast)

### 5.2. Bundle Size

- CSS variables are zero extra bundle size
- Theme palette data is static CSS
- No runtime performance impact

### 5.3. Browser Support

- All major browsers support CSS variables
- Fallback to default theme if unsupported (rare)

### 5.4. Accessibility

- Maintain 4.5:1 minimum contrast ratios
- Consider color blind users when adding themes
- Test with automated accessibility tools

---

## Related Documentation

- **[DESIGN-SYSTEM.md](../DESIGN-SYSTEM.md)** - Complete component library using this theme system
- **[ARCHITECTURE.md](../ARCHITECTURE.md)** - Theme system integration with app architecture
- **[PERSISTENT-SHELL.md](../PERSISTENT-SHELL.md)** - How themes integrate with React state management

For questions about theme implementation, see the AI agent documentation at `docs/ai-agent/`.
