import React from 'react';
import { render, screen } from '@testing-library/react';
import CommandTitle from './CommandTitle';

describe('CommandTitle', () => {
  test('renders with required text prop and default level', () => {
    render(<CommandTitle text="test command" />);
    const title = screen.getByText('$test command');
    expect(title).toBeInTheDocument();
    expect(title.tagName).toBe('H3');
    expect(title).toHaveClass('title-command');
  });

  test('renders with custom level', () => {
    render(<CommandTitle text="test command" level="h2" />);
    const title = screen.getByText('$test command');
    expect(title.tagName).toBe('H2');
  });

  test('preserves $ prefix if already present', () => {
    render(<CommandTitle text="$test command" />);
    const title = screen.getByText('$test command');
    expect(title).toBeInTheDocument();
  });

  test('renders with custom className', () => {
    render(<CommandTitle text="test command" className="custom-class" />);
    const title = screen.getByText('$test command');
    expect(title).toHaveClass('custom-class');
  });
});