// src/app/context/SessionContext.js
'use client';

import { createContext, useContext, useState, useCallback, useEffect } from 'react';

const SessionContext = createContext(null);

// Helper function for timestamp formatting
const getTimestamp = () => {
  return new Date().toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
};

// Optional: mapping per domain
const domainConfigs = {
  'undevy.com': {
    brandingToken: '$undevy_portfolio',
    telegram: 'https://t.me/undevy',
  },
  'foxous.design': {
    brandingToken: '$foxous_design',
    telegram: 'https://t.me/foxous',
  },
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

  // ========== SESSION STATE ==========
  const [sessionData, setSessionData] = useState(null);
  const [authError, setAuthError] = useState(null);
  
  // ========== NAVIGATION ==========
  const [currentScreen, setCurrentScreen] = useState('Entry');
  const [navigationHistory, setNavigationHistory] = useState([]);
  const [screensVisitedCount, setScreensVisitedCount] = useState(1);
  
  // ========== SELECTED ITEMS ==========
  const [selectedCase, setSelectedCase] = useState(null);
  const [selectedRole, setSelectedRole] = useState(null);
  const [selectedSkill, setSelectedSkill] = useState(null);
  
  // ========== UI STATE ==========
  const [theme, setTheme] = useState('dark');
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
      if (domainConfigs[hostname]) {
        setDomainData(domainConfigs[hostname]);
        addLog(`DOMAIN DETECTED: ${hostname}`);
      } else {
        // Default config for unknown domains
        setDomainData({
          brandingToken: '$portfolio',
          telegram: 'https://t.me/undevy',
        });
        addLog(`UNKNOWN DOMAIN: ${hostname}`);
      }
    }
  }, [addLog]);

  // ========== DYNAMIC DOCUMENT TITLE ==========
  useEffect(() => {
    if (currentDomain) {
      if (currentDomain.includes('foxous')) {
        document.title = "$foxous_design";
      } else if (currentDomain.includes('undevy')) {
        document.title = "$undevy_portfolio";
      } else {
        // Fallback for localhost or other domains
        document.title = "$terminal_portfolio";
      }
      addLog(`TITLE SET: ${document.title}`);
    }
  }, [currentDomain, addLog]);
  
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

  // ADDED: New function for hierarchical "up" navigation
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

  // ========== UI FUNCTIONS ==========
  const toggleTheme = useCallback(() => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    addLog(`THEME CHANGED: ${newTheme.toUpperCase()}`);
  }, [theme, addLog]);

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
    addLog('SESSION TERMINATED');
    setSessionData(null);
    setNavigationHistory([]);
    setCurrentScreen('Entry');
    setSelectedCase(null);
    setSelectedRole(null);
    setSelectedSkill(null);
    setExpandedSections({});
    setActiveTab({});
    setScreensVisitedCount(1);
    setAuthError(null); // Clear any auth errors
    if (typeof window !== 'undefined') {
      const currentUrl = new URL(window.location.href);
      currentUrl.searchParams.delete('code');
      currentUrl.hash = '';
      window.history.replaceState({}, '', currentUrl.toString());
    }
  }, [addLog]);

  // ========== INITIALIZATION ==========
  useEffect(() => {
    addLog('SYSTEM INITIALIZED');
    addLog('PORTFOLIO v2.1.0 LOADED');
  }, [addLog]);

  // ========== CONTEXT VALUE ==========
  const value = {
    // Session data
    sessionData,
    setSessionData,

    // Domain
    currentDomain,
    domainData,

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
    toggleTheme,
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
