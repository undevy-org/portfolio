'use client';

import { forwardRef } from 'react';

const Input = forwardRef(function Input({ 
  type = 'text',
  error = false,
  className = '',
  ...props 
}, ref) {
  // Hybrid CSS variables + Tailwind approach
  const baseClasses = [
    'w-full',
    'px-3',
    'py-2',
    'bg-surface', // Theme-aware background
    'text-text', // Theme-aware text
    'border',
    'border-border', // Theme-aware border
    'rounded',
    'font-mono', // Monospace font
    'text-sm',
    'placeholder:text-text-tertiary', // Theme-aware placeholder
    'transition-colors',
    'duration-200',
    'focus:outline-none',
    'focus:ring-2',
    'focus:ring-accent', // Theme-aware focus ring
    'focus:border-transparent',
    'disabled:opacity-50',
    'disabled:cursor-not-allowed'
  ];

  const errorClasses = error ? [
    'border-error', // Theme-aware error border
    'focus:ring-error' // Theme-aware error focus ring
  ] : [];

  const allClasses = [...baseClasses, ...errorClasses, className].filter(Boolean).join(' ');

  return (
    <input
      ref={ref}
      type={type}
      className={allClasses}
      aria-invalid={error ? 'true' : 'false'}
      {...props}
    />
  );
});

export default Input;
