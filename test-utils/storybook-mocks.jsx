// test-utils/storybook-mocks.jsx
/** @jsxImportSource react */
import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

const MockSessionContext = createContext({});

// Mock theme and navigation state
const mockThemes = ['dark', 'light', 'amber', 'bsod', 'synthwave', 'operator', 'kyoto', 'radar'];

export const MockSessionProvider = ({ children, mockSession = {} }) => {
  // Session state
  const [sessionData] = useState(mockSession.sessionData || {
    id: 'storybook-session',
    accessCode: 'DEMO123',
    walletAddress: null,
    company: 'Storybook User',
    role: 'Developer',
    startTime: new Date().toISOString(),
    isDemoUser: true
  });

  // Navigation state
  const [currentScreen, setCurrentScreen] = useState('Storybook');
  const [navigationHistory, setNavigationHistory] = useState(['Storybook']);
  const [screensVisitedCount, setScreensVisitedCount] = useState(1);

  // Theme state and management
  const [theme, setTheme] = useState(mockSession.theme || 'dark');
  const [themes] = useState(mockThemes);
  const [isThemeManuallySet, setIsThemeManuallySet] = useState(false);
  const [isThemeManuallySetState, setIsThemeManuallySetState] = useState(false);

  // UI state
  const [selectedCase] = useState(null);
  const [selectedRole] = useState(null);
  const [selectedSkill] = useState(null);
  const [expandedSections, setExpandedSections] = useState({});
  const [activeTab, setActiveTab] = useState({});

  // Domain state
  const [currentDomain] = useState('storybook.dev');
  const [domainData] = useState({
    brandingToken: '$storybook_portfolio',
    email: 'storybook@example.com',
    telegram: 'https://t.me/storybook-example',
    website: 'https://storybook.dev',
  });
  const [domainConfigLoading] = useState(false);

  // System log state
  const [logEntries, setLogEntries] = useState([
    `[${new Date().toLocaleTimeString()}] STORYBOOK INITIALIZED`,
    `[${new Date().toLocaleTimeString()}] SESSION STARTED`
  ]);

  // Auth state
  const [authError] = useState(null);
  const [logoutInProgress] = useState(false);

  // Web3 logout state
  const [web3LogoutPending] = useState(false);

  // Auto-fill code state
  const [autoFillCode] = useState(mockSession.autoFillCode || null);

  // Theme management functions
  const toggleTheme = useCallback(() => {
    setTheme(prevTheme => {
      const currentIndex = themes.indexOf(prevTheme);
      const nextIndex = (currentIndex + 1) % themes.length;
      const newTheme = themes[nextIndex];

      addLog(`THEME CHANGED: ${newTheme.toUpperCase()}`);
      console.log('Mock theme toggle:', prevTheme, '→', newTheme);

      return newTheme;
    });

    setIsThemeManuallySet(true);
    setIsThemeManuallySetState(true);
  }, [themes]);

  const setThemeExplicit = useCallback((newTheme) => {
    if (themes.includes(newTheme)) {
      setTheme(newTheme);
      setIsThemeManuallySet(true);
      setIsThemeManuallySetState(true);

      addLog(`THEME SELECTED: ${newTheme.toUpperCase()} (Manual)`);
      console.log('Mock theme set:', newTheme);
    }
  }, [themes]);

  const resetToAutoTheme = useCallback(() => {
    setIsThemeManuallySet(false);
    setIsThemeManuallySetState(false);

    const newTheme = 'dark';
    setTheme(newTheme);

    addLog(`THEME MODE: Switched to AUTOMATIC`);
    console.log('Mock theme reset to auto mode');
  }, []);

  // Navigation functions
  const navigate = useCallback((screen, addToHistory = true) => {
    console.log('Mock navigate:', screen, 'from:', currentScreen);

    if (currentScreen === screen) return;

    if (addToHistory && currentScreen !== 'Entry') {
      setNavigationHistory(prev => [...prev, currentScreen]);
    }

    setCurrentScreen(screen);
    setScreensVisitedCount(prev => prev + 1);
    addLog(`NAVIGATE: ${currentScreen} → ${screen}`);

    if (['MainHub', 'Entry'].includes(screen)) {
      // Reset selections for hub screens
    }
  }, [currentScreen]);

  const goBack = useCallback(() => {
    console.log('Mock goBack called');

    if (navigationHistory.length > 0) {
      const newHistory = [...navigationHistory];
      const previousScreen = newHistory.pop();
      setNavigationHistory(newHistory);
      setCurrentScreen(previousScreen);
      setScreensVisitedCount(prev => prev + 1);
      addLog(`NAVIGATE BACK: ${currentScreen} → ${previousScreen}`);
    }
  }, [navigationHistory, currentScreen]);

  const goHome = useCallback(() => {
    console.log('Mock goHome called');

    setNavigationHistory([]);
    setCurrentScreen('MainHub');
    setScreensVisitedCount(prev => prev + 1);
    addLog('NAVIGATE HOME');
  }, []);

  const goUp = useCallback(() => {
    console.log('Mock goUp called');

    // For mock, goUp behaves like goBack
    goBack();
  }, [goBack]);

  // UI helpers
  const toggleSection = useCallback((sectionId) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));

    addLog(`SECTION ${expandedSections[sectionId] ? 'COLLAPSED' : 'EXPANDED'}: ${sectionId}`);
  }, [expandedSections]);

  const setTab = useCallback((screenId, tabId) => {
    setActiveTab(prev => ({
      ...prev,
      [screenId]: tabId
    }));

    addLog(`TAB SELECTED: ${tabId} on ${screenId}`);
  }, []);

  // Session management
  const endSession = useCallback(() => {
    console.log('Mock endSession called');

    setNavigationHistory([]);
    setCurrentScreen('Entry');
    setScreensVisitedCount(prev => prev + 1);
    addLog('SESSION ENDED');

    if (typeof window !== 'undefined') {
      const cleanUrl = window.location.origin + window.location.pathname;
      window.history.replaceState({}, '', cleanUrl);
    }
  }, []);

  // Utility functions
  function getThemeIntent() {
    const themeConfig = {
      dark: { intent: 'dark' },
      light: { intent: 'light' },
      amber: { intent: 'dark' },
    };
    return themeConfig[theme]?.intent || 'dark';
  }

  function getSystemPreference() {
    return 'dark';
  }

  function addLog(message) {
    const timestamp = new Date().toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });

    const newEntry = `[${timestamp}] ${message}`;
    setLogEntries(prev => [...prev, newEntry].slice(-20));
    console.log('Mock log:', newEntry);
  }

  // Update session function for consistency
  const updateSession = useCallback((updates) => {
    console.log('Mock updateSession:', updates);
  }, []);

  const logInteraction = useCallback((action) => {
    console.log('Mock logInteraction:', action);
  }, []);

  // Effect to simulate logging when theme changes
  useEffect(() => {
    const modeIndicator = isThemeManuallySetState ? '🔒' : '🔄';
    addLog(`THEME CHANGED: ${theme.toUpperCase()} ${modeIndicator}`);
  }, [theme, isThemeManuallySetState]);

  // Navigation screen hierarchy (mock)
  const screenHierarchy = {
    'RoleDetail': 'Timeline',
    'CaseDetail': 'CaseList',
    'SkillDetail': 'SkillsGrid',
    'Timeline': 'MainHub',
    'CaseList': 'MainHub',
    'SkillsGrid': 'MainHub',
  };

  // Context value
  const contextValue = {
    // Session data
    sessionData,
    setSessionData: setSessionData => console.log('Mock setSessionData:', setSessionData),

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

    // UI state
    theme,
    themes,
    toggleTheme,
    setThemeExplicit,
    getThemeIntent,
    isThemeManuallySet: isThemeManuallySetState,
    resetToAutoTheme,
    systemPreference: getSystemPreference(),
    expandedSections,
    toggleSection,
    activeTab,
    setTab,

    // System log
    logEntries,
    addLog,

    // Auth state
    authError,
    setAuthError: (error) => console.log('Mock setAuthError:', error),

    // Session management
    logoutInProgress,
    endSession,

    // Web3 logout state
    web3LogoutPending,
    setWeb3LogoutPending: (pending) => console.log('Mock setWeb3LogoutPending:', pending),

    // Auto-fill code state
    autoFillCode,
    setAutoFillCode: (code) => console.log('Mock setAutoFillCode:', code),

    isTerminating: false,
    selectedCase,
    setSelectedCase: (caseItem) => console.log('Mock setSelectedCase:', caseItem),
    selectedRole,
    setSelectedRole: (role) => console.log('Mock setSelectedRole:', role),
    selectedSkill,
    setSelectedSkill: (skill) => console.log('Mock setSelectedSkill:', skill),
    screensVisitedCount,

    // Legacy compatibility
    session: {
      id: 'storybook-session',
      theme,
      interactions: 0,
      startTime: new Date().toISOString()
    },
    updateSession,
    logInteraction
  };

  return React.createElement(
    MockSessionContext.Provider,
    { value: contextValue },
    children
  );
};

export const useSession = () => useContext(MockSessionContext);
