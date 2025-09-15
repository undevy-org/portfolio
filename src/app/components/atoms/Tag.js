'use client';

import { forwardRef } from 'react';

const Tag = forwardRef(function Tag({ 
  text,
  variant = 'default',
  size = 'sm',
  status = 'default',
  className = '' 
}, ref) {
  const baseClasses = 'tag-badge';
  
  // Handle visual variants
  const variantClasses = variant === 'secondary' ? 'opacity-80' : '';
  const sizeClasses = size === 'md' ? 'text-sm px-3 py-1' : '';
  
  // Handle status variants (for semantic meaning)
  const statusClasses = {
    default: '',
    success: 'border-success text-success',
    warning: 'border-warning text-warning',
    error: 'border-error text-error',
    info: 'border-info text-info',
    command: 'border-command text-command'
  }[status] || '';
  
  // Handle tech variant for brackets
  const isTechVariant = variant === 'tech';
  const content = isTechVariant ? `[${text}]` : text;
  
  return (
    <span 
      ref={ref}
      className={`${baseClasses} ${variantClasses} ${sizeClasses} ${statusClasses} ${className}`}
    >
      {content}
    </span>
  );
});

export default Tag;