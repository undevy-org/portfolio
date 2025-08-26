// src/app/components/AnimatedScreenTransition.test.js
'use strict';

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MockSessionProvider } from '../../../test-utils/providers';
import AnimatedScreenTransition from './AnimatedScreenTransition';

// Use real timers for animation testing
jest.useRealTimers();

function renderAnimatedTransition(sessionProps = {}, children = <div data-testid="test-content">Test Content</div>) {
  return render(
    <MockSessionProvider
      currentScreen="MainHub"
      {...sessionProps}
    >
      <AnimatedScreenTransition>
        {children}
      </AnimatedScreenTransition>
    </MockSessionProvider>
  );
}

describe('AnimatedScreenTransition Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Basic Rendering', () => {
    test('renders children correctly', () => {
      renderAnimatedTransition();
      
      expect(screen.getByTestId('test-content')).toBeInTheDocument();
      expect(screen.getByText('Test Content')).toBeInTheDocument();
    });

    test('renders container with correct classes', () => {
      renderAnimatedTransition();
      
      const container = screen.getByTestId('test-content').parentElement;
      expect(container).toHaveClass('transition-container', 'w-full', 'h-full');
    });

    test('has initial opacity of 1', () => {
      renderAnimatedTransition();
      
      const container = screen.getByTestId('test-content').parentElement;
      expect(container).toHaveStyle('opacity: 1');
    });
  });

  describe('Animation States', () => {
    test('maintains content when screen does not change', async () => {
      const { rerender } = renderAnimatedTransition({ currentScreen: 'MainHub' });
      
      expect(screen.getByTestId('test-content')).toBeInTheDocument();
      
      // Re-render with same screen
      rerender(
        <MockSessionProvider currentScreen="MainHub">
          <AnimatedScreenTransition>
            <div data-testid="test-content">Test Content</div>
          </AnimatedScreenTransition>
        </MockSessionProvider>
      );
      
      expect(screen.getByTestId('test-content')).toBeInTheDocument();
    });

    test('triggers animation when screen changes', async () => {
      const { rerender } = renderAnimatedTransition({ currentScreen: 'MainHub' });
      
      const container = screen.getByTestId('test-content').parentElement;
      expect(container).toHaveStyle('opacity: 1');
      
      // Change screen to trigger animation
      rerender(
        <MockSessionProvider currentScreen="Timeline">
          <AnimatedScreenTransition>
            <div data-testid="test-content">New Content</div>
          </AnimatedScreenTransition>
        </MockSessionProvider>
      );
      
      // Animation should start
      expect(container).toHaveStyle('transition: opacity 150ms ease-in-out');
    });

    test('handles rapid screen changes', async () => {
      const { rerender } = renderAnimatedTransition({ currentScreen: 'MainHub' });
      
      // Rapid screen changes
      const screens = ['Timeline', 'Contact', 'Introduction'];
      
      for (const screenName of screens) {
        rerender(
          <MockSessionProvider currentScreen={screenName}>
            <AnimatedScreenTransition>
              <div data-testid="test-content">{screenName} Content</div>
            </AnimatedScreenTransition>
          </MockSessionProvider>
        );
        
        // Allow small delay for animation
        await new Promise(resolve => setTimeout(resolve, 50));
      }
      
      expect(screen.getByText('Introduction Content')).toBeInTheDocument();
    }, 10000);
  });

  describe('SessionContext Integration', () => {
    test('reads currentScreen from SessionContext', () => {
      renderAnimatedTransition({ currentScreen: 'Contact' });
      
      expect(screen.getByTestId('test-content')).toBeInTheDocument();
    });

    test('handles missing SessionContext gracefully', () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      
      expect(() => {
        render(
          <AnimatedScreenTransition>
            <div>Test</div>
          </AnimatedScreenTransition>
        );
      }).toThrow();
      
      consoleSpy.mockRestore();
    });
  });

  describe('Performance and Optimization', () => {
    test('applies transitions only during animation', () => {
      renderAnimatedTransition();
      
      const container = screen.getByTestId('test-content').parentElement;
      
      // Initially no transition
      expect(container).toHaveStyle('transition: none');
    });

    test('preserves container reference across renders', () => {
      const { rerender } = renderAnimatedTransition();
      
      const initialContainer = screen.getByTestId('test-content').parentElement;
      
      rerender(
        <MockSessionProvider currentScreen="MainHub">
          <AnimatedScreenTransition>
            <div data-testid="test-content">Updated Content</div>
          </AnimatedScreenTransition>
        </MockSessionProvider>
      );
      
      const updatedContainer = screen.getByTestId('test-content').parentElement;
      expect(updatedContainer).toBe(initialContainer);
    });
  });

  describe('Edge Cases', () => {
    test('handles null children gracefully', () => {
      render(
        <MockSessionProvider currentScreen="MainHub">
          <AnimatedScreenTransition>
            {null}
          </AnimatedScreenTransition>
        </MockSessionProvider>
      );
      
      const container = document.querySelector('.transition-container');
      expect(container).toBeInTheDocument();
    });

    test('handles multiple children', () => {
      render(
        <MockSessionProvider currentScreen="MainHub">
          <AnimatedScreenTransition>
            <div data-testid="child1">Child 1</div>
            <div data-testid="child2">Child 2</div>
          </AnimatedScreenTransition>
        </MockSessionProvider>
      );
      
      expect(screen.getByTestId('child1')).toBeInTheDocument();
      expect(screen.getByTestId('child2')).toBeInTheDocument();
    });

    test('handles component unmounting during animation', () => {
      const { unmount } = renderAnimatedTransition();
      
      // Unmount during potential animation
      expect(() => unmount()).not.toThrow();
    });
  });

  describe('Accessibility', () => {
    test('maintains accessible structure during transitions', () => {
      renderAnimatedTransition({}, 
        <button data-testid="accessible-button">Accessible Button</button>
      );
      
      const button = screen.getByTestId('accessible-button');
      expect(button).toBeInTheDocument();
      expect(button).toBeVisible();
    });

    test('preserves ARIA attributes during animation', async () => {
      const { rerender } = renderAnimatedTransition({}, 
        <div data-testid="aria-content" role="main" aria-label="Main content">
          ARIA Content
        </div>
      );
      
      let ariaContent = screen.getByTestId('aria-content');
      expect(ariaContent).toHaveAttribute('role', 'main');
      expect(ariaContent).toHaveAttribute('aria-label', 'Main content');
      
      // Trigger animation with screen change
      rerender(
        <MockSessionProvider currentScreen="Timeline">
          <AnimatedScreenTransition>
            <div data-testid="aria-content" role="main" aria-label="Main content">
              Updated ARIA Content
            </div>
          </AnimatedScreenTransition>
        </MockSessionProvider>
      );
      
      ariaContent = screen.getByTestId('aria-content');
      expect(ariaContent).toHaveAttribute('role', 'main');
      expect(ariaContent).toHaveAttribute('aria-label', 'Main content');
    });
  });
});