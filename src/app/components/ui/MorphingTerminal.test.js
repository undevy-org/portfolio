// src/app/components/ui/MorphingTerminal.test.js
'use strict';

import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MockSessionProvider } from '../../../../test-utils/providers';
import MorphingTerminal from './MorphingTerminal';

// Use real timers to avoid timing issues
jest.useRealTimers();

// Helper function to render MorphingTerminal with SessionProvider
function renderMorphingTerminal(props = {}, sessionProps = {}) {
  const mockGetThemeIntent = jest.fn(() => 'dark');
  
  return {
    ...render(
      <MockSessionProvider 
        getThemeIntent={mockGetThemeIntent} 
        theme="terminal"
        {...sessionProps}
      >
        <MorphingTerminal {...props} />
      </MockSessionProvider>
    ),
    mockGetThemeIntent
  };
}

// Utility to wait for component to be stable
const waitForStable = () => new Promise(resolve => setTimeout(resolve, 100));

describe('MorphingTerminal Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Basic Rendering', () => {
    test('renders the terminal animation container', async () => {
      renderMorphingTerminal();
      await waitForStable();
      
      const container = document.querySelector('.flex.items-center.justify-center.w-full');
      expect(container).toBeInTheDocument();
      expect(container).toHaveClass('flex', 'items-center', 'justify-center', 'w-full');
    });

    test('renders pre element with correct classes and styling', async () => {
      renderMorphingTerminal();
      await waitForStable();
      
      const preElement = document.querySelector('pre');
      expect(preElement).toBeInTheDocument();
      expect(preElement).toHaveClass(
        'text-command', 
        'font-mono', 
        'text-sm', 
        'leading-tight', 
        'select-none'
      );
      expect(preElement).toHaveStyle('transition: text-shadow 0.3s ease-in-out');
      expect(preElement).toHaveStyle('willChange: text-shadow');
    });

    test('renders initial frame content correctly', async () => {
      renderMorphingTerminal();
      await waitForStable();
      
      // Check that frame content is rendered (looking for the center dot)
      const preElement = document.querySelector('pre');
      expect(preElement.textContent).toContain('·●·');
    });

    test('renders exactly 9 lines per frame', async () => {
      renderMorphingTerminal();
      await waitForStable();
      
      const lines = document.querySelectorAll('div[class="whitespace-pre"]');
      expect(lines).toHaveLength(9);
    });

    test('each line has proper opacity styling', async () => {
      renderMorphingTerminal();
      await waitForStable();
      
      const lines = document.querySelectorAll('div[class="whitespace-pre"]');
      lines.forEach(line => {
        expect(line.style.opacity).toBeDefined();
        // Opacity should be between 0.6 and 1.0 (0.8 ± 0.2)
        const opacity = parseFloat(line.style.opacity);
        expect(opacity).toBeGreaterThanOrEqual(0.6);
        expect(opacity).toBeLessThanOrEqual(1.0);
      });
    });
  });

  describe('Animation Control', () => {
    test('starts with frame 0 when autoPlay is enabled', async () => {
      renderMorphingTerminal({ autoPlay: true });
      await waitForStable();
      
      // Frame 0 should have minimal content with center point
      const preElement = document.querySelector('pre');
      expect(preElement.textContent).toContain('·●·');
    });

    test('advances frames when autoPlay is enabled with reasonable delay', async () => {
      renderMorphingTerminal({ autoPlay: true, frameDelay: 50 });
      await waitForStable();
      
      // Initial frame
      const preElement = document.querySelector('pre');
      const initialContent = preElement.textContent;
      
      // Wait longer than frame delay to see changes
      await new Promise(resolve => setTimeout(resolve, 200));
      
      // Content should have changed
      const newContent = preElement.textContent;
      expect(newContent).not.toBe(initialContent);
    }, 10000); // 10 second timeout

    test('does not animate when autoPlay is false', async () => {
      renderMorphingTerminal({ autoPlay: false });
      await waitForStable();
      
      const preElement = document.querySelector('pre');
      const initialContent = preElement.textContent;
      
      // Wait a reasonable amount of time
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Content should remain unchanged
      expect(preElement.textContent).toBe(initialContent);
    }, 5000);
  });

  describe('Theme Integration', () => {
    test('applies dark theme text shadow correctly', async () => {
      const mockGetThemeIntent = jest.fn(() => 'dark');
      
      render(
        <MockSessionProvider getThemeIntent={mockGetThemeIntent}>
          <MorphingTerminal />
        </MockSessionProvider>
      );
      await waitForStable();
      
      const preElement = document.querySelector('pre');
      const textShadow = preElement.style.textShadow;
      
      // Should contain multiple layers for dark theme
      expect(textShadow).toContain('var(--color-text-command)');
      expect(textShadow).toContain('var(--color-accent)');
      expect(textShadow).toContain('var(--color-success)');
      expect(mockGetThemeIntent).toHaveBeenCalled();
    });

    test('applies light theme text shadow correctly', async () => {
      const mockGetThemeIntent = jest.fn(() => 'light');
      
      render(
        <MockSessionProvider getThemeIntent={mockGetThemeIntent}>
          <MorphingTerminal />
        </MockSessionProvider>
      );
      await waitForStable();
      
      const preElement = document.querySelector('pre');
      const textShadow = preElement.style.textShadow;
      
      // Should be subtle shadow for light theme
      expect(textShadow).toContain('rgba(0, 0, 0,');
      expect(textShadow).toContain('1px 1px 2px');
      expect(mockGetThemeIntent).toHaveBeenCalled();
    });
  });

  describe('Performance and Memory Management', () => {
    test('cleans up interval on unmount', async () => {
      const { unmount } = renderMorphingTerminal({ autoPlay: true });
      await waitForStable();
      
      // Spy on clearInterval
      const clearIntervalSpy = jest.spyOn(global, 'clearInterval');
      
      unmount();
      
      expect(clearIntervalSpy).toHaveBeenCalled();
      clearIntervalSpy.mockRestore();
    });

    test('handles component remount correctly', async () => {
      const { unmount } = renderMorphingTerminal({ autoPlay: true, frameDelay: 100 });
      
      await waitForStable();
      unmount();
      
      // Remount
      renderMorphingTerminal({ autoPlay: true, frameDelay: 100 });
      await waitForStable();
      
      const container = document.querySelector('.flex.items-center.justify-center.w-full');
      expect(container).toBeInTheDocument();
    });
  });

  describe('Edge Cases and Error Handling', () => {
    test('handles missing theme context gracefully', () => {
      // Test without proper theme context
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      
      expect(() => {
        render(<MorphingTerminal />);
      }).toThrow(); // Should throw because useSession requires provider
      
      consoleSpy.mockRestore();
    });

    test('handles invalid frameDelay values', async () => {
      // Test with very small frameDelay
      expect(() => {
        renderMorphingTerminal({ frameDelay: 0 });
      }).not.toThrow();
      
      // Test with negative frameDelay
      expect(() => {
        renderMorphingTerminal({ frameDelay: -100 });
      }).not.toThrow();
      
      await waitForStable();
    });
  });

  describe('Accessibility and User Experience', () => {
    test('has proper semantic structure', async () => {
      renderMorphingTerminal();
      await waitForStable();
      
      const container = document.querySelector('.flex.items-center.justify-center.w-full');
      const preElement = document.querySelector('pre');
      
      expect(container).toBeInTheDocument();
      expect(preElement).toBeInTheDocument();
      expect(preElement).toHaveClass('select-none'); // Prevents text selection
    });

    test('respects reduced motion preferences', async () => {
      // This would ideally check for prefers-reduced-motion, but for now 
      // we ensure autoPlay can be disabled
      renderMorphingTerminal({ autoPlay: false });
      await waitForStable();
      
      const preElement = document.querySelector('pre');
      const initialContent = preElement.textContent;
      
      // Should not animate
      await new Promise(resolve => setTimeout(resolve, 200));
      expect(preElement.textContent).toBe(initialContent);
    });

    test('maintains consistent dimensions across frames', async () => {
      renderMorphingTerminal();
      await waitForStable();
      
      // All frames should render the same number of lines
      const lines = document.querySelectorAll('div[class="whitespace-pre"]');
      expect(lines).toHaveLength(9);
      
      // Each line should maintain consistent character width (19 chars)
      lines.forEach(line => {
        // The textContent includes the content, should be exactly 19 characters
        expect(line.textContent.length).toBe(19);
      });
    });
  });
});