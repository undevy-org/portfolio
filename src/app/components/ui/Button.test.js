/* eslint-env jest */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Button from './Button';
import { SessionContext } from '../../context/SessionContext';

// Mock SessionProvider for testing
const MockSessionProvider = ({ children, theme = 'dark' }) => (
  <SessionContext.Provider value={{ theme }}>
    {children}
  </SessionContext.Provider>
);

describe('Button Component', () => {
  it('renders with the correct text content', () => {
    render(
      <MockSessionProvider>
        <Button>Click Me</Button>
      </MockSessionProvider>
    );
    expect(screen.getByText('Click Me')).toBeInTheDocument();
  });

  it('calls the onClick handler when clicked', () => {
    const handleClick = jest.fn();
    render(
      <MockSessionProvider>
        <Button onClick={handleClick}>Clickable</Button>
      </MockSessionProvider>
    );
    fireEvent.click(screen.getByText('Clickable'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('does not call onClick handler when disabled', () => {
    const handleClick = jest.fn();
    render(
      <MockSessionProvider>
        <Button onClick={handleClick} disabled>
          Disabled
        </Button>
      </MockSessionProvider>
    );
    fireEvent.click(screen.getByText('Disabled'));
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('renders an icon when passed as a prop', () => {
    const Icon = () => <svg data-testid="icon" />;
    render(
      <MockSessionProvider>
        <Button icon={Icon}>With Icon</Button>
      </MockSessionProvider>
    );
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });
});
