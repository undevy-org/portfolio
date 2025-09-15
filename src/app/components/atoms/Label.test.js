import React from 'react';
import { render, screen } from '@testing-library/react';
import Label from './Label';

describe('Label', () => {
  test('renders with required text prop', () => {
    render(<Label text="Test Label" />);
    const label = screen.getByText('Test Label');
    expect(label).toBeInTheDocument();
    expect(label).toHaveClass('label-base');
  });

  test('renders with htmlFor attribute', () => {
    render(<Label text="Test Label" htmlFor="test-input" />);
    const label = screen.getByText('Test Label');
    expect(label).toHaveAttribute('for', 'test-input');
  });

  test('renders with required indicator', () => {
    render(<Label text="Test Label" required={true} />);
    const label = screen.getByText('Test Label');
    const requiredIndicator = screen.getByText('*');
    expect(label).toBeInTheDocument();
    expect(requiredIndicator).toBeInTheDocument();
    expect(requiredIndicator).toHaveClass('text-error');
  });

  test('renders with custom className', () => {
    render(<Label text="Test Label" className="custom-class" />);
    const label = screen.getByText('Test Label');
    expect(label).toHaveClass('custom-class');
  });
});