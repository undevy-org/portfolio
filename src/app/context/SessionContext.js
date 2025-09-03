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

/* NEW: Theme intent configuration - defines the fundamental nature of each theme */
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

// Domain configuration is now fetched dynamically from the API
// This ensures full portability and no personal data in the code

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
  
  // ========== WEB3 LOGOUT STATE (ADDED) ==========
  // This state provides a direct communication channel between SessionContext and Entry.js
  // for Web3 logout. It's more reliable than browser events which can be missed if the
  // component isn't mounted yet. When true, Entry.js knows it needs to disconnect the wallet.
  const [web3LogoutPending, setWeb3LogoutPending] = useState(false);
  
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
  const [systemPreference, setSystemPreference] = useState(() => {
    return getSystemPreference();
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
      return themes[nextIndex];
    });
  }, []);

  const setThemeExplicit = useCallback((newTheme) => {
    if (themes.includes(newTheme)) {
      setTheme(newTheme);
    } else {
      console.warn(`SessionProvider: attempt to set unknown theme "${newTheme}"`);
    }
  }, []);

  /* NEW: Helper function to get the intent for the current theme */
  const getThemeIntent = useCallback(() => {
    return themeConfig[theme]?.intent || 'dark';
  }, [theme]);

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
    addLog('SESSION TERMINATING');

    // WHY: This is the core fix. It removes the `?code=` or `?web3=` parameter from the URL
    // instantly. This prevents the authentication logic in `page.js` from triggering a
    // re-login, thus solving the race condition.
    if (typeof window !== 'undefined') {
      const currentUrl = new URL(window.location.href);
      currentUrl.searchParams.delete('code');
      currentUrl.searchParams.delete('web3');
      currentUrl.hash = '';
      window.history.replaceState({}, '', currentUrl.toString());
    }
    
    setIsTerminating(true);
    
    const wasWeb3User = sessionData?.isWeb3User;
    
    if (wasWeb3User) {
      // Set the direct state flag - this is the PRIMARY logout signal
      setWeb3LogoutPending(true);
      addLog('WEB3 LOGOUT PENDING FLAG SET');
      
      // Also dispatch browser event as a backup
      if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('web3-logout-requested'));
    }
    }
    
    // Clear session data after a small delay to ensure flag propagates
    setTimeout(() => {
      setSessionData(null);
      setNavigationHistory([]);
      setCurrentScreen('Entry');
      setSelectedCase(null);
      setSelectedRole(null);
      setSelectedSkill(null);
      setExpandedSections({});
      setActiveTab({});
      setScreensVisitedCount(1);
      setAuthError(null);
      
      setTimeout(() => {
        setIsTerminating(false);
        addLog('SESSION TERMINATION COMPLETE');
      }, 1000);
    }, 100);
    
  }, [addLog, sessionData]);

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
    getThemeIntent, // NEW: Export the helper function
    expandedSections,
    toggleSection,
    activeTab,
    setTab,

    // System log
    logEntries,
    addLog,
    screensVisitedCount,

    // Session management
    endSession,
    
    // Auth error state
    authError,
    setAuthError,
    
    // Web3 logout state (ADDED)
    // These are exposed to Entry.js for direct state-based communication
    // This is more reliable than browser events which can be missed
    web3LogoutPending,
    setWeb3LogoutPending,
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
