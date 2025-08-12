/* eslint-env jest */

import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import TerminalProgress from './TerminalProgress';
import { SessionContext } from '../../context/SessionContext';

// Mock SessionProvider for testing
const MockSessionProvider = ({ children, theme = 'dark' }) => (
  <SessionContext.Provider value={{ theme }}>
    {children}
  </SessionContext.Provider>
);

describe('TerminalProgress Component', () => {
  it('renders nothing when isLoading is false', () => {
    const { container } = render(
      <MockSessionProvider>
        <TerminalProgress isLoading={false} />
      </MockSessionProvider>
    );
    expect(container).toBeEmptyDOMElement();
  });

  it('displays the label and percentage when animation is disabled', async () => {
    render(
      <MockSessionProvider>
        <TerminalProgress isLoading={true} label="Loading..." progress={50} animateProgress={false} />
      </MockSessionProvider>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
    // With animation disabled, the progress should be set directly.
    // findByText will wait for the useEffect to run and update the DOM.
    // We use a specific regex to avoid matching the "[50% complete]" text.
    expect(await screen.findByText(/^50%$/)).toBeInTheDocument();
  });

  it('animates progress smoothly', async () => {
    jest.useFakeTimers();
    const { rerender } = render(
        <MockSessionProvider>
            <TerminalProgress isLoading={true} progress={0} />
        </MockSessionProvider>
    );

    rerender(
        <MockSessionProvider>
            <TerminalProgress isLoading={true} progress={100} />
        </MockSessionProvider>
    );

    // Wrap the timer advancement in act
    act(() => {
        jest.advanceTimersByTime(1000);
    });

    // Wait for the assertion to pass, giving React time to re-render
    await waitFor(() => {
        const progressText = screen.getByText(/% complete/);
        const percentage = parseInt(progressText.textContent.match(/(\d+)/)[0], 10);
        expect(percentage).toBeGreaterThan(0);
    });

    jest.useRealTimers();
  });
});
