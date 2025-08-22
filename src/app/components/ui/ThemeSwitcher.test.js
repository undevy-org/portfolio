// src/app/components/ui/ThemeSwitcher.test.js
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ThemeSwitcher from './ThemeSwitcher';
import { MockSessionProvider } from '../../../../test-utils/providers';

describe('ThemeSwitcher', () => {
  const renderComponent = (initialTheme = 'terminal', currentScreen = 'Entry') => {
    return render(
      <MockSessionProvider 
        theme={initialTheme}
        currentScreen={currentScreen}
        setThemeExplicit={jest.fn()}
        addLog={jest.fn()}
      >
        <ThemeSwitcher />
      </MockSessionProvider>
    );
  };

  it('should render theme switcher button grid on Entry screen', async () => {
    renderComponent('terminal', 'Entry');
    
    await waitFor(() => {
      const buttons = screen.getAllByRole('button');
      expect(buttons.length).toBeGreaterThan(0);
    });
  });

  it('should not render on non-Entry/ProfileBoot screens', () => {
    renderComponent('terminal', 'MainHub');
    
    const buttons = screen.queryAllByRole('button');
    expect(buttons).toHaveLength(0);
  });

  it('should render on ProfileBoot screen', async () => {
    renderComponent('terminal', 'ProfileBoot');
    
    await waitFor(() => {
      const buttons = screen.getAllByRole('button');
      expect(buttons.length).toBeGreaterThan(0);
    });
  });

  it('should highlight current theme', async () => {
    renderComponent('dark', 'Entry');
    
    await waitFor(() => {
      const darkButton = screen.getByRole('button', { pressed: true });
      expect(darkButton).toBeInTheDocument();
      expect(darkButton).toHaveAttribute('aria-label', expect.stringContaining('DARK'));
    });
  });

  it('should handle theme selection', async () => {
    const mockSetThemeExplicit = jest.fn();
    const mockAddLog = jest.fn();
    
    render(
      <MockSessionProvider 
        theme="dark"
        currentScreen="Entry"
        setThemeExplicit={mockSetThemeExplicit}
        addLog={mockAddLog}
      >
        <ThemeSwitcher />
      </MockSessionProvider>
    );
    
    await waitFor(() => {
      // First make sure component is rendered
      const buttons = screen.getAllByRole('button');
      expect(buttons.length).toBeGreaterThan(0);
      
      // Let's find the button differently - through getAllByRole and filtering
      const lightButton = buttons.find(button => 
        button.getAttribute('aria-label') === 'Switch to LIGHT theme'
      );
      
      // Check that button is found
      expect(lightButton).toBeDefined();
      
      // Now click
      if (lightButton) {
        fireEvent.click(lightButton);
        
        // Check the call
        expect(mockSetThemeExplicit).toHaveBeenCalledWith('light');
      }
    });
  });

  it('should not trigger theme change when clicking current theme', async () => {
    const mockSetThemeExplicit = jest.fn();
    
    render(
      <MockSessionProvider 
        theme="dark"
        currentScreen="Entry"
        setThemeExplicit={mockSetThemeExplicit}
        addLog={jest.fn()}
      >
        <ThemeSwitcher />
      </MockSessionProvider>
    );
    
    await waitFor(() => {
      const darkButton = screen.getByRole('button', { pressed: true });
      fireEvent.click(darkButton);
      
      expect(mockSetThemeExplicit).not.toHaveBeenCalled();
    });
  });

  it('should have proper accessibility attributes', async () => {
    renderComponent('terminal', 'Entry');
    
    await waitFor(() => {
      const buttons = screen.getAllByRole('button');
      
      buttons.forEach(button => {
        expect(button).toHaveAttribute('aria-label');
        expect(button).toHaveAttribute('aria-pressed');
      });
    });
  });

  it('should display theme icons', async () => {
    renderComponent('dark', 'Entry');
    
    await waitFor(() => {
      const buttons = screen.getAllByRole('button');
      expect(buttons[0].textContent).toBeTruthy();
    });
  });

  // Add debug test to understand structure
  it('DEBUG: should show button structure', async () => {
    renderComponent('dark', 'Entry');
    
    await waitFor(() => {
      const buttons = screen.getAllByRole('button');
      console.log('Total buttons found:', buttons.length);
      
      buttons.forEach((button, index) => {
        console.log(`Button ${index}:`, {
          ariaLabel: button.getAttribute('aria-label'),
          ariaPressed: button.getAttribute('aria-pressed'),
          textContent: button.textContent,
        });
      });
      
      // This test always passes - it's only for debugging
      expect(buttons.length).toBeGreaterThan(0);
    });
  });
});