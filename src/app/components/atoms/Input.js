'use client';

import { forwardRef } from 'react';

const Input = forwardRef(function Input({ 
  type = 'text',
  error = false,
  className = '',
  ...props 
}, ref) {
  const baseClasses = 'input-base';
  const errorClasses = error ? 'input-error' : '';
  
  return (
    <input
      ref={ref}
      type={type}
      className={`${baseClasses} ${errorClasses} ${className}`}
      aria-invalid={error ? 'true' : 'false'}
      {...props}
    />
  );
});

export default Input;