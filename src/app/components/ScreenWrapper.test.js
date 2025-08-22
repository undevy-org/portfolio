// src/app/components/ScreenWrapper.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ScreenWrapper from './ScreenWrapper';
import { MockSessionProvider } from '../../../test-utils/providers';

describe('ScreenWrapper', () => {
  const renderComponent = (props = {}, currentScreen = 'MainHub') => {
    return render(
      <MockSessionProvider currentScreen={currentScreen}>
        <ScreenWrapper {...props}>
          <div data-testid="child-content">Test Content</div>
        </ScreenWrapper>
      </MockSessionProvider>
    );
  };

  it('should render children correctly', () => {
    renderComponent();
    expect(screen.getByTestId('child-content')).toBeInTheDocument();
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('should apply default padding', () => {
    renderComponent();
    const wrapper = screen.getByTestId('screen-wrapper');
    expect(wrapper).toHaveClass('p-4');
  });

  it('should remove padding when noPadding is true', () => {
    renderComponent({ noPadding: true });
    const wrapper = screen.getByTestId('screen-wrapper');
    expect(wrapper).not.toHaveClass('p-4');
  });

  it('should apply custom className', () => {
    renderComponent({ className: 'custom-class' });
    const wrapper = screen.getByTestId('screen-wrapper');
    expect(wrapper).toHaveClass('custom-class');
  });

  it('should apply screen-specific classes for Entry screen', () => {
    renderComponent({}, 'Entry');
    const wrapper = screen.getByTestId('screen-wrapper');
    expect(wrapper).toHaveClass('flex', 'items-center', 'justify-center');
  });

  it('should apply screen-specific classes for detail screens', () => {
    renderComponent({}, 'CaseDetail');
    const wrapper = screen.getByTestId('screen-wrapper');
    expect(wrapper).toHaveClass('space-y-4');
  });

  it('should have correct data attributes', () => {
    renderComponent({}, 'MainHub');
    const wrapper = screen.getByTestId('screen-wrapper');
    expect(wrapper).toHaveAttribute('data-screen', 'MainHub');
    expect(wrapper).toHaveAttribute('data-mounted', 'true');
  });

  it('should use custom testId when provided', () => {
    renderComponent({ testId: 'custom-wrapper' });
    expect(screen.getByTestId('custom-wrapper')).toBeInTheDocument();
  });
});