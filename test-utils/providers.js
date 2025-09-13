// test-utils/providers.js
// Mock providers for testing React components with context

import React, { useState, useCallback, useMemo } from 'react';
import { SessionContext } from '../src/app/context/SessionContext';
import { MOCK_SESSION_DATA } from './mocks';

/**
 * MockSessionProvider
 * 
 * A mock implementation of SessionContext for testing.
 * Provides controllable session state and methods for tests.
 */
export function MockSessionProvider({ 
  children, 
  // Default values that can be overridden
  sessionData = MOCK_SESSION_DATA,
  currentScreen = 'MainHub',
  isAuthenticated = true,
  authMethod = 'code',
  theme: initialTheme = 'terminal', // Renamed for clarity
  systemLogs = [],
  navigationHistory = [],
  screensVisitedCount = 1,
  // Mock functions
  navigate = jest.fn(),
  goBack = jest.fn(),
  goHome = jest.fn(),
  goUp = jest.fn(),
  addLog = jest.fn(),
  setSelectedCase = jest.fn(),
  setSelectedSkill = jest.fn(),
  setSelectedRole = jest.fn(),
  setThemeExplicit: mockSetThemeExplicit = jest.fn(), // Important!
  toggleTheme = jest.fn(),
  endSession = jest.fn(),
  // Enhanced mock functions for better testing
  clearLogs = jest.fn(),
  exportLogs = jest.fn(),
  toggleSection = jest.fn(),
  setTab = jest.fn(),
  resetSession = jest.fn(),
  updateSessionData = jest.fn(),
  setSessionData = jest.fn(),
  // Web3 specific
  setWeb3LogoutPending = jest.fn(),
  // Auto-fill specific
  autoFillCode = null,
  setAutoFillCode = jest.fn(),
  // Additional overrides
  ...overrides
}) {
  // Use state for theme
  const [currentTheme, setCurrentTheme] = useState(initialTheme);
  const [logs, setLogs] = useState(systemLogs);
  const [navHistory, setNavHistory] = useState(navigationHistory);
  
  // Handler for setThemeExplicit
  // Important: update local state AND call the mock function
  const handleSetThemeExplicit = useCallback((newTheme) => {
    setCurrentTheme(newTheme);
    mockSetThemeExplicit(newTheme);
  }, [mockSetThemeExplicit]);
  
  // Handler for toggleTheme
  const handleToggleTheme = useCallback(() => {
    const themes = ['terminal', 'dark', 'light', 'amber', 'bsod', 'synthwave', 'operator', 'kyoto', 'radar'];
    const currentIndex = themes.indexOf(currentTheme);
    const nextIndex = (currentIndex + 1) % themes.length;
    const newTheme = themes[nextIndex];
    setCurrentTheme(newTheme);
    toggleTheme();
  }, [currentTheme, toggleTheme]);
  
  // Handler for logs
  const handleAddLog = useCallback((message, type = 'info') => {
    const newLog = {
      timestamp: Date.now(),
      message,
      type
    };
    setLogs(prev => [...prev, newLog]);
    addLog(message, type);
  }, [addLog]);
  
  // Handler for navigation
  const handleNavigate = useCallback((screen, addToHistory = true) => {
    if (addToHistory) {
      setNavHistory(prev => [...prev, currentScreen]);
    }
    navigate(screen, addToHistory);
  }, [navigate, currentScreen]);
  
  // Create context value
  const contextValue = useMemo(() => ({
    // Session data
    sessionData,
    globalData: sessionData,
    domainData: {
      domain: 'test.com',
      terminalTitle: 'test-portfolio',
      brandName: 'TestBrand',
      brandingToken: '$test_portfolio'
    },
    domainConfigLoading: false,
    
    // Authentication
    isAuthenticated,
    authMethod,
    authError: null,
    setAuthError: jest.fn(),
    isTerminating: false,
    
    // Navigation
    currentScreen,
    navigationHistory: navHistory,
    setNavigationHistory: setNavHistory,
    navigate: handleNavigate,
    goBack,
    goHome,
    goUp,
    screenHierarchy: {
      'RoleDetail': 'Timeline',
      'CaseDetail': 'CaseList',
      'SkillDetail': 'SkillsGrid',
      'Timeline': 'MainHub',
      'CaseList': 'MainHub',
      'SkillsGrid': 'MainHub',
      'Introduction': 'MainHub',
      'SideProjects': 'MainHub',
      'Contact': 'MainHub',
      'AccessManager': 'MainHub', // Added for master code feature
    },
    screensVisitedCount,
    
    // Theme - IMPORTANT: use currentTheme from state!
    theme: currentTheme,
    themes: ['dark', 'light', 'amber', 'bsod', 'synthwave', 'operator', 'kyoto', 'radar'],
    toggleTheme: handleToggleTheme,
    setThemeExplicit: handleSetThemeExplicit, // Use wrapper
    getThemeIntent: () => {
      const lightThemes = ['light', 'bsod', 'kyoto'];
      return lightThemes.includes(currentTheme) ? 'light' : 'dark';
    },
    
    // Logging
    logEntries: logs,
    addLog: handleAddLog,
    
    // Selection handlers
    selectedCase: null,
    setSelectedCase,
    selectedRole: null,
    setSelectedRole,
    selectedSkill: null,
    setSelectedSkill,
    
    // UI state
    expandedSections: {},
    toggleSection,
    activeTab: {},
    setTab,
    
    // Session management
    endSession,
    resetSession,
    updateSessionData,
    setSessionData: jest.fn(),
    
    // Enhanced logging capabilities
    clearLogs,
    exportLogs,
    logEntries: logs,
    systemLogCount: logs.length,
    
    // Web3 specific
    web3LogoutPending: false,
    setWeb3LogoutPending,
    
    // Auto-fill specific
    autoFillCode,
    setAutoFillCode,
    
    // Any additional overrides
    ...overrides
  }), [
    sessionData,
    isAuthenticated,
    authMethod,
    currentScreen,
    navHistory,
    handleNavigate,
    goBack,
    goHome,
    goUp,
    screensVisitedCount,
    currentTheme, // Important: use actual theme value
    handleToggleTheme,
    handleSetThemeExplicit,
    logs,
    handleAddLog,
    setSelectedCase,
    setSelectedRole,
    setSelectedSkill,
    endSession,
    resetSession,
    updateSessionData,
    clearLogs,
    exportLogs,
    toggleSection,
    setTab,
    setWeb3LogoutPending,
    autoFillCode,
    setAutoFillCode,
    overrides
  ]);
  
  return (
    <SessionContext.Provider value={contextValue}>
      {children}
    </SessionContext.Provider>
  );
}

/**
 * Helper to create a custom mock provider with specific overrides
 */
export function createMockProvider(overrides = {}) {
  return function CustomMockProvider({ children }) {
    return <MockSessionProvider {...overrides}>{children}</MockSessionProvider>;
  };
}