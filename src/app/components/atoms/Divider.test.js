import React from 'react';
import { render, screen } from '@testing-library/react';
import Divider from './Divider';

describe('Divider', () => {
  test('renders with default props', () => {
    render(<Divider />);
    const divider = screen.getByRole('separator', { hidden: true });
    expect(divider).toBeInTheDocument();
    expect(divider).toHaveClass('border-t', 'border-secondary', 'my-2');
  });

  test('renders with dashed variant', () => {
    render(<Divider variant="dashed" />);
    const divider = screen.getByRole('separator', { hidden: true });
    expect(divider).toHaveClass('border-dashed');
  });

  test('renders with custom spacing', () => {
    render(<Divider spacing="my-4" />);
    const divider = screen.getByRole('separator', { hidden: true });
    expect(divider).toHaveClass('my-4');
  });

  test('renders with custom className', () => {
    render(<Divider className="custom-class" />);
    const divider = screen.getByRole('separator', { hidden: true });
    expect(divider).toHaveClass('custom-class');
  });
});