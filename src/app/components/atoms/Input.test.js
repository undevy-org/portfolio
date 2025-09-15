import React from 'react';
import { render, screen } from '@testing-library/react';
import Input from './Input';

describe('Input', () => {
  test('renders with default props', () => {
    render(<Input />);
    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
    expect(input).toHaveClass('input-base');
  });

  test('renders with custom type', () => {
    render(<Input type="password" />);
    const input = screen.getByDisplayValue('');
    expect(input).toHaveAttribute('type', 'password');
  });

  test('renders with placeholder', () => {
    render(<Input placeholder="Enter text" />);
    const input = screen.getByPlaceholderText('Enter text');
    expect(input).toBeInTheDocument();
  });

  test('renders with error state', () => {
    render(<Input error={true} />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveClass('input-error');
    expect(input).toHaveAttribute('aria-invalid', 'true');
  });

  test('renders with custom className', () => {
    render(<Input className="custom-class" />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveClass('custom-class');
  });

  test('renders with id and name attributes', () => {
    render(<Input id="test-id" name="test-name" />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('id', 'test-id');
    expect(input).toHaveAttribute('name', 'test-name');
  });
});