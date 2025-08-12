/* eslint-env jest */

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProfileDataPanel from './ProfileDataPanel';
import { SessionContext } from '../context/SessionContext';

// Mock SessionProvider that can be configured for each test
const MockSessionProvider = ({ children, sessionData, theme = 'dark' }) => (
  <SessionContext.Provider value={{ sessionData, theme }}>
    {children}
  </SessionContext.Provider>
);

describe('ProfileDataPanel Component', () => {
  const mockSessionData = {
    profile_data: {
      title: 'Senior Software Engineer',
      specialization: 'Frontend & Web3',
      background: 'Computer Science'
    }
  };

  it('renders nothing if sessionData is not present', () => {
    const { container } = render(
      <MockSessionProvider sessionData={null}>
        <ProfileDataPanel />
      </MockSessionProvider>
    );
    expect(container).toBeEmptyDOMElement();
  });

  it('renders nothing if profile_data is not in sessionData', () => {
    const { container } = render(
      <MockSessionProvider sessionData={{ some_other_data: {} }}>
        <ProfileDataPanel />
      </MockSessionProvider>
    );
    expect(container).toBeEmptyDOMElement();
  });

  it('renders profile data correctly when sessionData is present', () => {
    render(
      <MockSessionProvider sessionData={mockSessionData}>
        <ProfileDataPanel />
      </MockSessionProvider>
    );

    expect(screen.getByText('Senior Software Engineer')).toBeInTheDocument();
    expect(screen.getByText('Frontend & Web3')).toBeInTheDocument();
    expect(screen.getByText('Computer Science')).toBeInTheDocument();
    expect(screen.getByText('$profile_data')).toBeInTheDocument();
  });
});
