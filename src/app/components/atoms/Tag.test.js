import React from 'react';
import { render, screen } from '@testing-library/react';
import Tag from './Tag';

describe('Tag', () => {
  test('renders with required text prop', () => {
    render(<Tag text="Test Tag" />);
    const tag = screen.getByText('Test Tag');
    expect(tag).toBeInTheDocument();
    expect(tag).toHaveClass('tag-badge');
  });

  test('renders with secondary variant', () => {
    render(<Tag text="Test Tag" variant="secondary" />);
    const tag = screen.getByText('Test Tag');
    expect(tag).toHaveClass('opacity-80');
  });

  test('renders with md size', () => {
    render(<Tag text="Test Tag" size="md" />);
    const tag = screen.getByText('Test Tag');
    expect(tag).toHaveClass('text-sm', 'px-3', 'py-1');
  });

  test('renders with custom className', () => {
    render(<Tag text="Test Tag" className="custom-class" />);
    const tag = screen.getByText('Test Tag');
    expect(tag).toHaveClass('custom-class');
  });
});