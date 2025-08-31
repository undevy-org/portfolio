// src/app/components/ui/HyperspaceTunnel.test.js
'use strict';

import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MockSessionProvider } from '../../../../test-utils/providers';
import HyperspaceTunnel from './HyperspaceTunnel';

/**
 * Test Suite for HyperspaceTunnel Component (Updated Version)
 * 
 * This component creates an animated SVG background effect with expanding rings
 * and flying particles. It's used as a visual transition effect during loading.
 * 
 * Key changes in the new version:
 * - Dynamic viewBox based on window dimensions
 * - No ID attributes on elements (only keys)
 * - Removed special theme handling for Kyoto/Radar
 * - Removed centerOffset prop
 * - Auto-calculated center position with 10% upward offset
 */

describe('HyperspaceTunnel Component', () => {
  // Store original Math.random and window dimensions to restore after tests
  const originalRandom = Math.random;
  const originalInnerWidth = window.innerWidth;
  const originalInnerHeight = window.innerHeight;
  
  /**
   * Helper function to render HyperspaceTunnel with all necessary providers
   * Now simpler since centerOffset prop was removed
   */
  const renderHyperspaceTunnel = (props = {}, sessionOverrides = {}) => {
    // Default props that represent the most common usage
    const defaultProps = {
      isActive: true,
      progress: 0,
      duration: 6000,
      onComplete: jest.fn()
    };
    
    return render(
      <MockSessionProvider 
        theme="terminal" 
        {...sessionOverrides}
      >
        <HyperspaceTunnel {...defaultProps} {...props} />
      </MockSessionProvider>
    );
  };
  
  /**
   * Helper to set window dimensions for testing
   * The component now uses window.innerWidth/innerHeight dynamically
   */
  const setWindowDimensions = (width, height) => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: width
    });
    Object.defineProperty(window, 'innerHeight', {
      writable: true,
      configurable: true,
      value: height
    });
    
    // Trigger resize event to update component state
    window.dispatchEvent(new Event('resize'));
  };
  
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
    
    /**
     * Mock Math.random for predictable particle generation
     * This ensures tests are deterministic
     */
    jest.spyOn(Math, 'random').mockReturnValue(0.5);
    
    // Use fake timers to control setTimeout behavior
    jest.useFakeTimers();
    
    /**
     * Set consistent window dimensions for testing
     * Using 1920x1080 to match the original expected dimensions
     */
    setWindowDimensions(1920, 1080);
  });
  
  afterEach(() => {
    // Restore original Math.random
    Math.random = originalRandom;
    
    // Clear all timers
    jest.clearAllTimers();
    jest.useRealTimers();
    
    // Restore original window dimensions
    window.innerWidth = originalInnerWidth;
    window.innerHeight = originalInnerHeight;
  });
  
  describe('Rendering Behavior', () => {
    /**
     * Test 1: Component should not render when inactive
     */
    test('should not render anything when isActive is false', () => {
      const { container } = renderHyperspaceTunnel({ isActive: false });
      
      expect(container.firstChild).toBeNull();
      const svg = container.querySelector('svg');
      expect(svg).not.toBeInTheDocument();
    });
    
    /**
     * Test 2: Component renders the main container and SVG structure
     * Updated to check for dynamic viewBox
     */
    test('should render container and SVG when active', () => {
      const { container } = renderHyperspaceTunnel({ isActive: true });
      
      // Check for the main container
      const mainContainer = container.querySelector('.fixed.inset-0');
      expect(mainContainer).toBeInTheDocument();
      expect(mainContainer).toHaveClass('overflow-hidden', 'pointer-events-none');
      
      // Check SVG with dynamic viewBox based on window dimensions
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
      expect(svg).toHaveAttribute('viewBox', '0 0 1920 1080');
      expect(svg).toHaveAttribute('preserveAspectRatio', 'none');
    });
    
    /**
     * Test 3: Component generates correct number of ring elements
     * Updated to check for circles without relying on ID attributes
     */
    test('should create exactly 15 ring elements', () => {
      const { container } = renderHyperspaceTunnel();
      
      // Find the transform group that contains the rings
      const transformGroup = container.querySelector('g[transform]');
      expect(transformGroup).toBeInTheDocument();
      
      // Rings are circles with stroke and no fill
      // They have opacity animations and are after the center vortex circle
      const allCircles = transformGroup.querySelectorAll('circle[stroke][fill="none"]');
      
      // Should have exactly 15 rings
      expect(allCircles).toHaveLength(15);
      
      // Each ring should have the expected attributes
      allCircles.forEach(circle => {
        expect(circle).toHaveAttribute('cx', '0');
        expect(circle).toHaveAttribute('cy', '0');
        expect(circle).toHaveAttribute('stroke', 'var(--color-text-primary)');
        expect(circle).toHaveAttribute('fill', 'none');
      });
    });
    
    /**
     * Test 4: Component generates correct number of particle elements
     * Updated to find particles by their characteristics
     */
    test('should create exactly 30 particle elements', () => {
      const { container } = renderHyperspaceTunnel();
      
      const transformGroup = container.querySelector('g[transform]');
      expect(transformGroup).toBeInTheDocument();
      
      // Particles are small circles with r="0.5"
      const particles = transformGroup.querySelectorAll('circle[r="0.5"]');
      
      // Should have exactly 30 particles
      expect(particles).toHaveLength(30);
      
      // Each particle should have expected attributes
      particles.forEach(particle => {
        expect(particle).toHaveAttribute('fill', 'var(--color-text-primary)');
        expect(particle).toHaveAttribute('opacity', '0');
        
        // Should have animation children
        const animateTransform = particle.querySelector('animateTransform');
        expect(animateTransform).toBeInTheDocument();
        
        const animateOpacity = particle.querySelector('animate[attributeName="opacity"]');
        expect(animateOpacity).toBeInTheDocument();
      });
    });
    
    /**
     * Test 5: SVG definitions are properly created
     */
    test('should create necessary SVG definitions for gradients and filters', () => {
      const { container } = renderHyperspaceTunnel();
      
      // Check gradients
      const centerGlow = container.querySelector('#hyperspace-center-glow');
      expect(centerGlow).toBeInTheDocument();
      expect(centerGlow.tagName.toLowerCase()).toBe('radialgradient');
      
      const pulseGradient = container.querySelector('#hyperspace-pulse-gradient');
      expect(pulseGradient).toBeInTheDocument();
      expect(pulseGradient.tagName.toLowerCase()).toBe('radialgradient');
      
      // Check filter
      const glowFilter = container.querySelector('#hyperspace-glow');
      expect(glowFilter).toBeInTheDocument();
      expect(glowFilter.tagName.toLowerCase()).toBe('filter');
    });
    
    /**
     * Test 6: Dynamic viewBox updates with window resize
     */
    test('should update viewBox when window resizes', async () => {
      const { container } = renderHyperspaceTunnel();
      
      // Initial viewBox
      let svg = container.querySelector('svg');
      expect(svg).toHaveAttribute('viewBox', '0 0 1920 1080');
      
      // Resize window
      act(() => {
        setWindowDimensions(1024, 768);
      });
      
      // Wait for state update
      await waitFor(() => {
        svg = container.querySelector('svg');
        expect(svg).toHaveAttribute('viewBox', '0 0 1024 768');
      });
    });
  });
  
  describe('Background and Theme Handling', () => {
    /**
     * Test 7: All themes now use the same background treatment
     * The special handling for Kyoto/Radar was removed
     */
    test('should always render background rect with theme color', () => {
      const themes = ['terminal', 'dark', 'kyoto', 'radar', 'matrix'];
      
      themes.forEach(theme => {
        const { container } = renderHyperspaceTunnel({}, { theme });
        
        // Should always have a background rect with var(--color-bg)
        const svg = container.querySelector('svg');
        const backgroundRect = svg.querySelector('rect[fill="var(--color-bg)"]');
        expect(backgroundRect).toBeInTheDocument();
        expect(backgroundRect).toHaveAttribute('width', '100%');
        expect(backgroundRect).toHaveAttribute('height', '100%');
        expect(backgroundRect).toHaveAttribute('opacity', '1');
      });
    });
    
    /**
     * Test 8: Container styles are consistent across themes
     */
    test('should have consistent container styles regardless of theme', () => {
      const { container } = renderHyperspaceTunnel({}, { theme: 'kyoto' });
      
      const mainContainer = container.querySelector('.fixed.inset-0');
      
      // Check inline styles
      expect(mainContainer).toHaveStyle({
        zIndex: '-1',
        width: '100vw',
        height: '100vh',
        top: '0',
        left: '0'
      });
    });
  });
  
  describe('Progress Tracking and Completion', () => {
    /**
     * Test 9: onComplete callback is triggered when progress reaches 100
     */
    test('should call onComplete when progress reaches 100', async () => {
      const mockOnComplete = jest.fn();
      const { rerender } = renderHyperspaceTunnel({ 
        progress: 50,
        onComplete: mockOnComplete 
      });
      
      expect(mockOnComplete).not.toHaveBeenCalled();
      
      // Update progress to 100
      act(() => {
        rerender(
          <MockSessionProvider theme="terminal">
            <HyperspaceTunnel
              isActive={true}
              progress={100}
              duration={6000}
              onComplete={mockOnComplete}
            />
          </MockSessionProvider>
        );
      });
      
      // Component waits 1000ms before calling onComplete
      expect(mockOnComplete).not.toHaveBeenCalled();
      
      act(() => {
        jest.advanceTimersByTime(1000);
      });
      
      expect(mockOnComplete).toHaveBeenCalledTimes(1);
    });
    
    /**
     * Test 10: onComplete is not called for progress less than 100
     */
    test('should not call onComplete when progress is less than 100', () => {
      const mockOnComplete = jest.fn();
      const { rerender } = renderHyperspaceTunnel({ 
        progress: 0,
        onComplete: mockOnComplete 
      });
      
      const progressValues = [25, 50, 75, 99, 99.9];
      
      progressValues.forEach(progress => {
        act(() => {
          rerender(
            <MockSessionProvider theme="terminal">
              <HyperspaceTunnel
                isActive={true}
                progress={progress}
                duration={6000}
                onComplete={mockOnComplete}
              />
            </MockSessionProvider>
          );
        });
        
        act(() => {
          jest.advanceTimersByTime(2000);
        });
        
        expect(mockOnComplete).not.toHaveBeenCalled();
      });
    });
    
    /**
     * Test 11: Completion state affects opacity classes
     */
    test('should apply opacity-0 class when animation completes', async () => {
      const { container, rerender } = renderHyperspaceTunnel({ progress: 0 });
      
      const mainContainer = container.querySelector('.fixed.inset-0');
      expect(mainContainer).toHaveClass('opacity-100');
      expect(mainContainer).not.toHaveClass('opacity-0');
      
      // Set progress to 100
      act(() => {
        rerender(
          <MockSessionProvider theme="terminal">
            <HyperspaceTunnel
              isActive={true}
              progress={100}
              duration={6000}
              onComplete={jest.fn()}
            />
          </MockSessionProvider>
        );
      });
      
      act(() => {
        jest.advanceTimersByTime(1000);
      });
      
      expect(mainContainer).toHaveClass('opacity-0');
      expect(mainContainer).not.toHaveClass('opacity-100');
    });
    
    /**
     * Test 12: onComplete is only called once
     */
    test('should only call onComplete once even with multiple 100% updates', () => {
      const mockOnComplete = jest.fn();
      const { rerender } = renderHyperspaceTunnel({ 
        progress: 100,
        onComplete: mockOnComplete 
      });
      
      act(() => {
        jest.advanceTimersByTime(1000);
      });
      
      expect(mockOnComplete).toHaveBeenCalledTimes(1);
      
      // Update with 100% again
      act(() => {
        rerender(
          <MockSessionProvider theme="terminal">
            <HyperspaceTunnel
              isActive={true}
              progress={100}
              duration={6000}
              onComplete={mockOnComplete}
            />
          </MockSessionProvider>
        );
      });
      
      act(() => {
        jest.advanceTimersByTime(1000);
      });
      
      // Should still only be called once
      expect(mockOnComplete).toHaveBeenCalledTimes(1);
    });
  });
  
  describe('Center Position Calculation', () => {
    /**
     * Test 13: Transform is calculated correctly based on window dimensions
     * Center should be at width/2, height/2 - height*0.1
     */
    test('should calculate center position with 10% upward offset', () => {
      const { container } = renderHyperspaceTunnel();
      
      const transformedGroup = container.querySelector('g[transform]');
      
      // For 1920x1080: centerX = 960, centerY = 540 - 108 = 432
      expect(transformedGroup).toHaveAttribute('transform', 'translate(960, 432)');
    });
    
    /**
     * Test 14: Center position updates with window resize
     */
    test('should update center position when window resizes', async () => {
      const { container } = renderHyperspaceTunnel();
      
      let transformedGroup = container.querySelector('g[transform]');
      expect(transformedGroup).toHaveAttribute('transform', 'translate(960, 432)');
      
      // Resize window
      act(() => {
        setWindowDimensions(1024, 768);
      });
      
      // Wait for update
      await waitFor(() => {
        transformedGroup = container.querySelector('g[transform]');
        // For 1024x768: centerX = 512, centerY = 384 - 76.8 = 307.2
        expect(transformedGroup).toHaveAttribute('transform', 'translate(512, 307.2)');
      });
    });
  });
  
  describe('Props Handling', () => {
    /**
     * Test 15: Default props are applied correctly
     */
    test('should use default prop values when not provided', () => {
      const { container } = render(
        <MockSessionProvider theme="terminal">
          <HyperspaceTunnel isActive={true} />
        </MockSessionProvider>
      );
      
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
      
      // Should have opacity-100 (not completed)
      const mainContainer = container.querySelector('.fixed.inset-0');
      expect(mainContainer).toHaveClass('opacity-100');
    });
    
    /**
     * Test 16: Duration prop is accepted
     */
    test('should accept custom duration prop', () => {
      const { container } = renderHyperspaceTunnel({ duration: 10000 });
      
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
      
      // Component should function normally
      const rings = container.querySelectorAll('circle[stroke][fill="none"]');
      expect(rings.length).toBeGreaterThan(0);
    });
  });
  
  describe('Edge Cases and Error Handling', () => {
    /**
     * Test 17: Component handles missing theme gracefully
     */
    test('should handle missing theme from context', () => {
      const { container } = render(
        <MockSessionProvider theme={undefined}>
          <HyperspaceTunnel isActive={true} progress={0} />
        </MockSessionProvider>
      );
      
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
      
      // Should still have background rect
      const backgroundRect = svg.querySelector('rect[fill="var(--color-bg)"]');
      expect(backgroundRect).toBeInTheDocument();
    });
    
    /**
     * Test 18: Component handles rapid progress updates
     */
    test('should handle rapid progress updates without errors', () => {
      const { rerender } = renderHyperspaceTunnel({ progress: 0 });
      
      const progressValues = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
      
      progressValues.forEach(progress => {
        act(() => {
          rerender(
            <MockSessionProvider theme="terminal">
              <HyperspaceTunnel
                isActive={true}
                progress={progress}
                duration={6000}
                onComplete={jest.fn()}
              />
            </MockSessionProvider>
          );
        });
      });
      
      const { container } = renderHyperspaceTunnel({ progress: 100 });
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });
    
    /**
     * Test 19: Component unmounts cleanly
     */
    test('should unmount without errors or warnings', () => {
      const { unmount } = renderHyperspaceTunnel({ progress: 50 });
      
      expect(() => {
        unmount();
      }).not.toThrow();
    });
    
    /**
     * Test 20: Window resize listener is cleaned up on unmount
     */
    test('should remove resize listener on unmount', () => {
      const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener');
      const { unmount } = renderHyperspaceTunnel();
      
      unmount();
      
      expect(removeEventListenerSpy).toHaveBeenCalledWith('resize', expect.any(Function));
      removeEventListenerSpy.mockRestore();
    });
  });
  
  describe('Animation Elements Structure', () => {
    /**
     * Test 21: Ring elements have required animations
     */
    test('should create rings with proper animation elements', () => {
      const { container } = renderHyperspaceTunnel();
      
      const rings = container.querySelectorAll('circle[stroke][fill="none"]');
      const firstRing = rings[0];
      
      // Each ring should have animate children
      const animations = firstRing.querySelectorAll('animate');
      
      // Should have animations for: r, opacity, stroke-width, stroke
      expect(animations.length).toBeGreaterThanOrEqual(4);
      
      const animatedAttributes = Array.from(animations).map(
        anim => anim.getAttribute('attributeName')
      );
      
      expect(animatedAttributes).toContain('r');
      expect(animatedAttributes).toContain('opacity');
      expect(animatedAttributes).toContain('stroke-width');
      expect(animatedAttributes).toContain('stroke');
    });
    
    /**
     * Test 22: Particle elements have required animations
     */
    test('should create particles with proper animation elements', () => {
      const { container } = renderHyperspaceTunnel();
      
      const particles = container.querySelectorAll('circle[r="0.5"]');
      const firstParticle = particles[0];
      
      // Should have animateTransform for movement
      const transformAnim = firstParticle.querySelector('animateTransform');
      expect(transformAnim).toBeInTheDocument();
      expect(transformAnim).toHaveAttribute('attributeName', 'transform');
      expect(transformAnim).toHaveAttribute('type', 'translate');
      
      // Should have animate for opacity
      const opacityAnim = firstParticle.querySelector('animate[attributeName="opacity"]');
      expect(opacityAnim).toBeInTheDocument();
      expect(opacityAnim).toHaveAttribute('values', '0;0.6;0');
    });
    
    /**
     * Test 23: Center vortex point exists and animates
     */
    test('should create animated center vortex point', () => {
      const { container } = renderHyperspaceTunnel();
      
      const transformGroup = container.querySelector('g[transform]');
      
      // Find the center vortex (first circle with r="2")
      const vortex = transformGroup.querySelector('circle[r="2"]');
      expect(vortex).toBeInTheDocument();
      expect(vortex).toHaveAttribute('fill', 'var(--color-text-primary)');
      expect(vortex).toHaveAttribute('filter', 'url(#hyperspace-glow)');
      
      // Should have animations for pulsing effect
      const radiusAnim = vortex.querySelector('animate[attributeName="r"]');
      expect(radiusAnim).toBeInTheDocument();
      expect(radiusAnim).toHaveAttribute('values', '2;4;2');
      
      const opacityAnim = vortex.querySelector('animate[attributeName="opacity"]');
      expect(opacityAnim).toBeInTheDocument();
      expect(opacityAnim).toHaveAttribute('values', '0.5;1;0.5');
    });
  });
});