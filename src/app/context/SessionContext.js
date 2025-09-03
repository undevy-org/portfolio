// src/app/context/SessionContext.js
'use client';

import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import packageInfo from '../../../package.json';

/**
 * SessionContext
 *
 * Centralized app session / navigation / UI state management.
 * This file contains theme management logic that is compatible with
 * the unified `data-theme` approach used in globals.css.
 */

/* Export the list of supported themes so other modules (ThemeManager, UI) can reuse it. */
export const themes = ['dark', 'light', 'amber', 'bsod', 'synthwave', 'operator', 'kyoto', 'radar'];

/* Theme intent configuration - defines the fundamental nature of each theme */
export const themeConfig = {
  dark: { intent: 'dark' },   // Dark background, bright elements
  light: { intent: 'light' }, // Light background, dark elements
  amber: { intent: 'dark' },  // Amber is dark-based despite warm colors
  bsod: { intent: 'light' },  // BSOD has bright blue background, treated as light
  synthwave: { intent: 'dark' }, // Synthwave is dark-based with neon colors
  operator: { intent: 'dark' },  // Operator is dark-based with a tech feel
  kyoto: { intent: 'light' },     // Kyoto has a light background with soft colors
  radar: { intent: 'dark' }       // Radar is dark-based with a focus on depth
};

/* Helper functions for automatic theme selection based on system preferences */

/**
 * Get a random theme matching the specified intent (dark or light)
 * @param {string} intent - The theme intent ('dark' or 'light')
 * @returns {string} A random theme name matching the intent
 */
const getRandomThemeByIntent = (intent) => {
  const matchingThemes = themes.filter(t => themeConfig[t].intent === intent);
  if (matchingThemes.length === 0) {
    // Fallback to default theme if no matches (shouldn't happen with current config)
    return intent === 'dark' ? 'dark' : 'light';
  }
  return matchingThemes[Math.floor(Math.random() * matchingThemes.length)];
};

/**
 * Detect the user's system color scheme preference
 * @returns {string} 'dark' or 'light' based on system preferences
 */
const getSystemPreference = () => {
  // Server-side rendering safety
  if (typeof window === 'undefined') return 'dark';
  
  // Check if the browser supports the media query
  if (!window.matchMedia) return 'dark';
  
  // Query the system preference
  const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  return isDark ? 'dark' : 'light';
};

export const SessionContext = createContext(null);

/* Utility: readable timestamp for log entries */
const getTimestamp = () => {
  return new Date().toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
};

const screenHierarchy = {
  // Deep-level screens 
  'RoleDetail': 'Timeline',
  'CaseDetail': 'CaseList',
  'SkillDetail': 'SkillsGrid',
  
  // Top-level screens
  'Timeline': 'MainHub',
  'CaseList': 'MainHub',
  'SkillsGrid': 'MainHub',
  'Introduction': 'MainHub',
  'SideProjects': 'MainHub',
  'Contact': 'MainHub',
};

export function SessionProvider({ children }) {
  // ========== DOMAIN ==========
  const [currentDomain, setCurrentDomain] = useState(null);
  const [domainData, setDomainData] = useState(null); 
  const [domainConfigLoading, setDomainConfigLoading] = useState(true);

  // ========== SESSION STATE ==========
  const [sessionData, setSessionData] = useState(null);
  const [authError, setAuthError] = useState(null);
  const [isTerminating, setIsTerminating] = useState(false);
  
  // Debugging: Log when sessionData changes
  useEffect(() => {
    console.log('[SESSION CONTEXT] sessionData changed to:', sessionData);
  }, [sessionData]);
  
  // ========== WEB3 LOGOUT STATE (ADDED) ==========
  // This state provides a direct communication channel between SessionContext and Entry.js
  // for Web3 logout. It's more reliable than browser events which can be missed if the
  // component isn't mounted yet. When true, Entry.js knows it needs to disconnect the wallet.
  const [web3LogoutPending, setWeb3LogoutPending] = useState(false);
  
  // ========== AUTO-FILL CODE STATE (ADDED) ==========
  // This state provides a way to pass access codes for auto-fill animation
  const [autoFillCode, setAutoFillCode] = useState(null);
  
  // Debugging: Log when autoFillCode changes
  useEffect(() => {
    console.log('[SESSION CONTEXT] autoFillCode changed to:', autoFillCode);
  }, [autoFillCode]);
  
  // ========== NAVIGATION ==========
  const [currentScreen, setCurrentScreen] = useState('Entry');
  const [navigationHistory, setNavigationHistory] = useState([]);
  const [screensVisitedCount, setScreensVisitedCount] = useState(1);
  
  // ========== SELECTED ITEMS ==========
  const [selectedCase, setSelectedCase] = useState(null);
  const [selectedRole, setSelectedRole] = useState(null);
  const [selectedSkill, setSelectedSkill] = useState(null);
  
  // ========== UI: THEME ==========
  /**
   * Theme initialization with automatic selection based on system preferences
   * Priority order:
   * 1. Previously saved theme (user has visited before)
   * 2. Random theme matching system preference (first visit)
   * 3. Fallback to 'dark' theme (if something goes wrong)
   */
  const [theme, setTheme] = useState(() => {
    try {
      if (typeof window !== 'undefined') {
        const savedTheme = window.localStorage.getItem('theme');
        
        // Check if user has a saved theme preference
        if (savedTheme && themes.includes(savedTheme)) {
          // User has visited before - use their saved theme
          console.debug('[Theme Init] Using saved theme:', savedTheme);
          return savedTheme;
        }
        
        // First visit - select random theme based on system preference
        const systemPref = getSystemPreference();
        const randomTheme = getRandomThemeByIntent(systemPref);
        console.debug('[Theme Init] First visit - selected random', systemPref, 'theme:', randomTheme);
        
        // Save the randomly selected theme immediately
        window.localStorage.setItem('theme', randomTheme);
        
        return randomTheme;
      }
    } catch (e) {
      // Ignore storage errors and fallback to default
      console.warn('[Theme Init] Error during initialization:', e);
    }
    // Fallback for SSR or errors
    return 'dark';
  });

  // Track whether the user has manually selected a theme
  // This helps us distinguish between automatic and manual theme selection
  const [isThemeManuallySet, setIsThemeManuallySet] = useState(() => {
    try {
      if (typeof window !== 'undefined') {
        // Check if the flag exists in localStorage
        const savedFlag = window.localStorage.getItem('themeManuallySet');
        
        // Only trust the explicit flag, no migration logic
        // This prevents false positives for new users
        if (savedFlag === 'true') {
          console.debug('[Theme Init] Manual theme selection flag found');
          return true;
        }
        
        console.debug('[Theme Init] No manual selection flag - using automatic mode');
        return false;
      }
    } catch (e) {
      // Ignore storage errors
      console.warn('[Theme Init] Failed to read themeManuallySet from localStorage:', e);
    }
    // Default to automatic mode
    return false;
  });

  // Track the current system preference for reference
  // This is used to detect changes and provide context in logs
  const [systemPreference, setSystemPreference] = useState(() => {
    const detectedPref = getSystemPreference();
    console.debug(`[Theme] Initial system preference: ${detectedPref}`);
    return detectedPref;
  });

  const [expandedSections, setExpandedSections] = useState({});
  const [activeTab, setActiveTab] = useState({});
  
  // ========== SYSTEM LOG ==========
  const [logEntries, setLogEntries] = useState([]);
  
  // ========== LOGGING FUNCTIONS ==========
  const addLog = useCallback((message) => {
    const newEntry = `[${getTimestamp()}] ${message}`;
    setLogEntries(prev => [...prev, newEntry].slice(-20));
  }, []);
  
  // ========== DOMAIN DETECTION ==========
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hostname = window.location.hostname;
      setCurrentDomain(hostname);
      
      const fetchDomainConfig = async () => {
        try {
          setDomainConfigLoading(true);
          
          const response = await fetch('/api/config');
          
          if (response.ok) {
            const data = await response.json();
            setDomainData(data.config);
            addLog(`DOMAIN CONFIG LOADED: ${hostname}`);
      } else {
        setDomainData({
              brandingToken: process.env.NEXT_PUBLIC_DEFAULT_PORTFOLIO_TITLE || '$terminal_portfolio',
              email: process.env.NEXT_PUBLIC_DEFAULT_CONTACT_EMAIL || 'contact@example.com',
              telegram: process.env.NEXT_PUBLIC_DEFAULT_CONTACT_TELEGRAM || 'https://t.me/example',
              website: process.env.NEXT_PUBLIC_DEFAULT_CONTACT_WEBSITE || 'https://example.com',
        });
            addLog(`DOMAIN CONFIG FALLBACK: Using defaults for ${hostname}`);
          }
        } catch (error) {
          console.error('Failed to fetch domain config:', error);
          setDomainData({
            brandingToken: process.env.NEXT_PUBLIC_DEFAULT_PORTFOLIO_TITLE || '$terminal_portfolio',
            email: process.env.NEXT_PUBLIC_DEFAULT_CONTACT_EMAIL || 'contact@example.com',
            telegram: process.env.NEXT_PUBLIC_DEFAULT_CONTACT_TELEGRAM || 'https://t.me/example',
            website: process.env.NEXT_PUBLIC_DEFAULT_CONTACT_WEBSITE || 'https://example.com',
          });
          addLog(`DOMAIN CONFIG ERROR: Using defaults`);
        } finally {
          setDomainConfigLoading(false);
        }
      };
      
      fetchDomainConfig();
    }
  }, [addLog]);
  
  // ========== NAVIGATION FUNCTIONS ==========
  const navigate = useCallback((screen, addToHistory = true) => {
    console.log('[SESSION CONTEXT] navigate called with:', screen, addToHistory, 'currentScreen:', currentScreen);
    if (currentScreen === screen) return;
    
    if (addToHistory && currentScreen !== 'Entry') {
      setNavigationHistory(prev => [...prev, currentScreen]);
    }
    
    setCurrentScreen(screen);
    setScreensVisitedCount(prev => prev + 1);
    addLog(`NAVIGATE: ${currentScreen} → ${screen}`);
    
    if (typeof window !== 'undefined') {
      const currentUrl = new URL(window.location.href);
      currentUrl.hash = screen !== 'Entry' ? screen : '';
      window.history.replaceState({}, '', currentUrl.toString());
    }
    
    if (['MainHub', 'Entry'].includes(screen)) {
      setSelectedCase(null);
      setSelectedRole(null);
      setSelectedSkill(null);
    }
  }, [currentScreen, addLog]);

  const goBack = useCallback(() => {
    if (navigationHistory.length > 0) {
      const newHistory = [...navigationHistory];
      const previousScreen = newHistory.pop();
      setNavigationHistory(newHistory);
      
      addLog(`NAVIGATE BACK: ${currentScreen} → ${previousScreen}`);
      setCurrentScreen(previousScreen);
      setScreensVisitedCount(prev => prev + 1);
      
      if (typeof window !== 'undefined') {
        const currentUrl = new URL(window.location.href);
        currentUrl.hash = previousScreen !== 'Entry' ? previousScreen : '';
        window.history.replaceState({}, '', currentUrl.toString());
      }
    } else {
      navigate('MainHub', false);
    }
  }, [navigationHistory, currentScreen, navigate, addLog]);

  const goHome = useCallback(() => {
    addLog('NAVIGATE HOME');
    setNavigationHistory([]);
    setCurrentScreen('MainHub');
    setScreensVisitedCount(prev => prev + 1);
    setSelectedCase(null);
    setSelectedRole(null);
    setSelectedSkill(null);
    if (typeof window !== 'undefined') {
      const currentUrl = new URL(window.location.href);
      currentUrl.hash = 'MainHub';
      window.history.replaceState({}, '', currentUrl.toString());
    }
  }, [addLog]);

  // New function for hierarchical "up" navigation
  const goUp = useCallback(() => {
    const parentScreen = screenHierarchy[currentScreen];
    if (parentScreen) {
      addLog(`NAVIGATE UP: ${currentScreen} → ${parentScreen}`);
      // Navigate to the parent, but don't add current screen to history
      // to avoid creating a confusing back-and-forth loop with the back button.
      navigate(parentScreen, false);
    } else {
      // If no parent is defined, "up" logically means "home".
      addLog(`NAVIGATE UP: No parent defined, navigating home.`);
      goHome();
    }
  }, [currentScreen, navigate, goHome, addLog]);

  // ========== HASH ROUTING ==========
  useEffect(() => {
    if (!sessionData || typeof window === 'undefined') return;
    
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      if (hash && hash !== currentScreen) {
        setCurrentScreen(hash);
        setScreensVisitedCount(prev => prev + 1);
        addLog(`HASH NAVIGATE: ${currentScreen} → ${hash}`);
      }
    };
    
    window.addEventListener('hashchange', handleHashChange);
    
    const initialHash = window.location.hash.slice(1);
    if (initialHash && initialHash !== currentScreen) {
      setCurrentScreen(initialHash);
      setScreensVisitedCount(prev => prev + 1);
      addLog(`INITIAL HASH: ${initialHash}`);
    }
    
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [sessionData, currentScreen, addLog]);

  // ========== THEME MANAGEMENT ==========
  /**
   * toggleTheme:
   *  - Cycles through all supported themes in order.
   *  - Uses setState updater to avoid needing `theme` as a dependency.
   *
   * setThemeExplicit:
   *  - Directly set a specific theme (if supported).
   *
   * Persisting & logging of theme changes happens in the effect below,
   * which keeps side-effects outside of the state updater.
   */
  const toggleTheme = useCallback(() => {
    setTheme(prevTheme => {
      const currentIndex = themes.indexOf(prevTheme);
      const safeIndex = currentIndex === -1 ? 0 : currentIndex;
      const nextIndex = (safeIndex + 1) % themes.length;
      const newTheme = themes[nextIndex];
      
      // Log the upcoming change
      console.debug(`[Theme] Manual toggle: ${prevTheme} → ${newTheme}`);
      
      return newTheme;
    });
    
    // Mark this as a manual selection
    setIsThemeManuallySet(true);
    
    // Persist the manual flag to localStorage
    try {
      if (typeof window !== 'undefined') {
        window.localStorage.setItem('themeManuallySet', 'true');
      }
    } catch (e) {
      console.warn('[Theme] Failed to save manual flag:', e);
    }
  }, []);

  /**
   * Explicitly set a specific theme by name
   * This is considered a manual user action and will prevent automatic theme changes
   * @param {string} newTheme - The theme name to set
   */
  const setThemeExplicit = useCallback((newTheme) => {
    if (themes.includes(newTheme)) {
      // Set the new theme
      setTheme(newTheme);
      
      // Mark this as a manual selection
      setIsThemeManuallySet(true);
      
      // Persist the manual flag to localStorage
      try {
        if (typeof window !== 'undefined') {
          window.localStorage.setItem('themeManuallySet', 'true');
          console.debug(`[Theme] Manual selection: ${newTheme}`);
        }
      } catch (e) {
        console.warn('[Theme] Failed to save manual flag:', e);
      }
      
      // Log the manual theme change
      addLog(`THEME SELECTED: ${newTheme.toUpperCase()} (Manual)`);
    } else {
      console.warn(`SessionProvider: attempt to set unknown theme "${newTheme}"`);
    }
  }, [addLog]);

  /* Helper function to get the intent for the current theme */
  const getThemeIntent = useCallback(() => {
    return themeConfig[theme]?.intent || 'dark';
  }, [theme]);

  /**
   * Reset theme selection to automatic mode
   * The theme will follow system preferences and can change automatically
   */
  const resetToAutoTheme = useCallback(() => {
    // Clear the manual flag
    setIsThemeManuallySet(false);
    
    // Remove the flag from localStorage
    try {
      if (typeof window !== 'undefined') {
        window.localStorage.removeItem('themeManuallySet');
        console.debug('[Theme] Reset to automatic mode');
      }
    } catch (e) {
      console.warn('[Theme] Failed to clear manual flag:', e);
    }
    
    // Get fresh system preference (in case it changed while in manual mode)
    const currentSystemPref = getSystemPreference();
    setSystemPreference(currentSystemPref); // Update tracked preference
    
    // Select a new random theme based on current system preference
    const newTheme = getRandomThemeByIntent(currentSystemPref);
    setTheme(newTheme);
    
    // Log the change with full context
    addLog(`THEME MODE: Switched to AUTOMATIC`);
    addLog(`AUTO THEME: Applied ${newTheme.toUpperCase()} (System: ${currentSystemPref})`);
    
    console.info(`[Theme] Reset to auto mode - applied ${newTheme} for ${currentSystemPref} system`);
  }, [addLog]);

  // Side-effects when theme changes: persist to localStorage and log the change
  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        window.localStorage.setItem('theme', theme);
        
        // Log additional context about theme mode
        const mode = isThemeManuallySet ? 'MANUAL' : 'AUTO';
        console.debug(`[Theme] Saved theme: ${theme} (Mode: ${mode})`);
      }
    } catch (e) {
      // Ignore storage write errors
      console.warn('[Theme] Failed to save theme to localStorage:', e);
    }

    // Add to system log with mode information
    const modeIndicator = isThemeManuallySet ? '🔒' : '🔄';
    addLog(`THEME CHANGED: ${String(theme).toUpperCase()} ${modeIndicator}`);
  }, [theme, isThemeManuallySet, addLog]);

  /**
   * Listen for system theme preference changes
   * Automatically update theme when system preference changes (only in auto mode)
   */
  useEffect(() => {
    // Skip on server-side rendering
    if (typeof window === 'undefined') return;
    
    // Check if browser supports matchMedia
    if (!window.matchMedia) {
      console.warn('[Theme] matchMedia not supported - system theme monitoring disabled');
      return;
    }
    
    // Create media query for dark mode preference
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    /**
     * Handle system theme preference change
     * This fires when user changes their OS theme settings
     */
    const handleSystemThemeChange = (e) => {
      const newSystemPref = e.matches ? 'dark' : 'light';
      const oldSystemPref = systemPreference;
      
      // Update the tracked system preference
      setSystemPreference(newSystemPref);
      
      console.debug(`[Theme] System preference changed: ${oldSystemPref} → ${newSystemPref}`);
      
      // Only auto-switch theme if user hasn't manually selected one
      if (!isThemeManuallySet) {
        // Select a random theme matching the new system preference
        const newRandomTheme = getRandomThemeByIntent(newSystemPref);
        setTheme(newRandomTheme);
        
        // Log the automatic change
        addLog(`AUTO THEME: System changed to ${newSystemPref.toUpperCase()}`);
        addLog(`AUTO THEME: Applied ${newRandomTheme.toUpperCase()} theme`);
        
        console.info(`[Theme] Auto-switched to ${newRandomTheme} (system: ${newSystemPref})`);
      } else {
        // User has manual control - just log that we detected the change
        addLog(`SYSTEM: Detected ${newSystemPref.toUpperCase()} mode (manual override active)`);
        console.info(`[Theme] System changed to ${newSystemPref} but keeping manual theme`);
      }
    };
    
    // Modern browsers support addEventListener for MediaQueryList
    // Using both methods for maximum compatibility
    try {
      // Modern approach (all current browsers)
      mediaQuery.addEventListener('change', handleSystemThemeChange);
    } catch (e1) {
      try {
        // Legacy approach for older browsers (deprecated but still works)
        mediaQuery.addListener(handleSystemThemeChange);
        console.debug('[Theme] Using legacy addListener for compatibility');
      } catch (e2) {
        console.warn('[Theme] Could not attach system theme listener:', e2);
      }
    }
    
    // Cleanup function - CRITICAL for preventing memory leaks
    return () => {
      try {
        // Try modern removal first
        mediaQuery.removeEventListener('change', handleSystemThemeChange);
      } catch (e1) {
        try {
          // Fallback to legacy removal
          mediaQuery.removeListener(handleSystemThemeChange);
        } catch (e2) {
          // Silent fail - component is unmounting anyway
        }
      }
    };
  }, [isThemeManuallySet, systemPreference, addLog]); // Re-run if manual flag or system pref changes

  // ========== UI small helpers ==========
  const toggleSection = useCallback((sectionId) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
    addLog(`SECTION ${expandedSections[sectionId] ? 'COLLAPSED' : 'EXPANDED'}: ${sectionId}`);
  }, [expandedSections, addLog]);

  const setTab = useCallback((screenId, tabId) => {
    setActiveTab(prev => ({
      ...prev,
      [screenId]: tabId
    }));
    addLog(`TAB SELECTED: ${tabId} on ${screenId}`);
  }, [addLog]);

  // ========== SESSION FUNCTIONS ==========
  const endSession = useCallback(() => {
    // Set flag BEFORE clearing session
    setLogoutInProgress(true);
    
    // Clear session data
    setSessionData(null);
    setAutoFillCode(null);
    
    // Reset page.js tracking refs to prevent demo mode auto-login
    // This calls a global function that page.js exposes to reset its internal refs
    // Without this, hasProcessedDemoModeRef remains true and demo mode can re-trigger
    if (typeof window !== 'undefined' && window.__resetPageRefs) {
      console.log('[SESSION CONTEXT] Resetting page.js tracking refs');
      window.__resetPageRefs();
    }
    
    // NEW: Clear Web3/WalletConnect data from localStorage
    // This prevents "Already connected" issues on subsequent visits
    if (typeof window !== 'undefined') {
      addLog('CLEARING WEB3 DATA');
      
      // Collect keys to remove (can't modify localStorage while iterating)
      const keysToRemove = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && (
          key.startsWith('wc@') ||           // WalletConnect v2 sessions
          key.startsWith('reown') ||         // Reown SDK data
          key.includes('walletconnect') ||   // Legacy WalletConnect
          key.includes('@appkit') ||         // AppKit/Web3Modal data
          key.includes('wagmi') ||            // Wagmi connection state
          key.includes('W3M') ||              // Web3Modal legacy
          key.includes('appKit')              // AppKit variants
        )) {
          keysToRemove.push(key);
        }
      }
      
      // Remove collected keys
      keysToRemove.forEach(key => {
        console.log('[SESSION] Removing Web3 localStorage key:', key);
        localStorage.removeItem(key);
      });
      
      // Also clear sessionStorage for Web3 data
      for (let i = sessionStorage.length - 1; i >= 0; i--) {
        const key = sessionStorage.key(i);
        if (key && (
          key.includes('wc') || 
          key.includes('reown') || 
          key.includes('wagmi') ||
          key.includes('appkit') ||
          key.includes('W3M')
        )) {
          console.log('[SESSION] Removing Web3 sessionStorage key:', key);
          sessionStorage.removeItem(key);
        }
      }
    }
    
    // Clear URL using browser API (NOT router, it's not available here)
    if (typeof window !== 'undefined') {
      // Use replaceState to clear URL without navigation
      const cleanUrl = window.location.origin + window.location.pathname;
      window.history.replaceState({}, '', cleanUrl);
    }
    
    // Navigate to Entry
    navigate('Entry', false);
    
    // Increased delay to ensure all components properly see the logout flag
    // This gives page.js more time to check logoutInProgress before processing any URL params
    // Previously 500ms was not enough in some race conditions
    setTimeout(() => {
      setLogoutInProgress(false);
    }, 1000); // Increased from 500ms to 1000ms for better reliability
    
  }, [navigate, addLog]);
  
  // Track logout intent
  const [logoutInProgress, setLogoutInProgress] = useState(false);

  // ========== INITIALIZATION ==========
  useEffect(() => {
    addLog('SYSTEM INITIALIZED');
    addLog(`PORTFOLIO v${packageInfo.version} LOADED`);
  }, [addLog]);

  // ========== CONTEXT VALUE ==========
  const value = {
    // Session data
    sessionData,
    setSessionData,
    isTerminating,

    // Domain
    currentDomain,
    domainData,
    domainConfigLoading,

    // Navigation
    currentScreen,
    navigationHistory,
    setNavigationHistory,
    navigate,
    goBack,
    goHome,
    goUp,
    screenHierarchy,

    // Selected items
    selectedCase,
    setSelectedCase,
    selectedRole,
    setSelectedRole,
    selectedSkill,
    setSelectedSkill,

    // UI state
    theme,
    themes,
    toggleTheme,
    setThemeExplicit,
    getThemeIntent,
    isThemeManuallySet,
    resetToAutoTheme,
    systemPreference,
    expandedSections,
    toggleSection,
    activeTab,
    setTab,

    // System log
    logEntries,
    addLog,
    screensVisitedCount,

    // Session management
    logoutInProgress,
    endSession,
    
    // Auth error state
    authError,
    setAuthError,
    
    // Web3 logout state
    // These are exposed to Entry.js for direct state-based communication
    // This is more reliable than browser events which can be missed
    web3LogoutPending,
    setWeb3LogoutPending,

    // Auto-fill code state
    // This is used to pass access codes for auto-fill animation
    autoFillCode,
    setAutoFillCode,
  };

  return (
    <SessionContext.Provider value={value}>
      {children}
    </SessionContext.Provider>
  );
}

// Hook for using context
export function useSession() {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error('useSession must be used within a SessionProvider');
  }
  return context;
}