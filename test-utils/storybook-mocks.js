// test-utils/storybook-mocks.js
import React, { createContext, useContext, useState } from 'react';

const MockSessionContext = createContext({});

export const MockSessionProvider = ({ children, mockSession = {} }) => {
  const [session] = useState({
    id: 'storybook-session',
    theme: 'dark',
    interactions: 0,
    startTime: new Date().toISOString(),
    ...mockSession
  });

  const contextValue = {
    session,
    updateSession: (updates) => console.log('Mock updateSession:', updates),
    logInteraction: (action) => console.log('Mock interaction:', action)
  };

  return (
    <MockSessionContext.Provider value={contextValue}>
      {children}
    </MockSessionContext.Provider>
  );
};

export const useSession = () => useContext(MockSessionContext);