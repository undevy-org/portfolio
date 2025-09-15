'use client';

export default function Input({ 
  type = 'text',
  error = false,
  className = '',
  ...props 
}) {
  const baseClasses = 'input-base';
  const errorClasses = error ? 'input-error' : '';
  
  return (
    <input
      type={type}
      className={`${baseClasses} ${errorClasses} ${className}`}
      aria-invalid={error ? 'true' : 'false'}
      {...props}
    />
  );
}