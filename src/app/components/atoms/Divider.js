'use client';

export default function Divider({ 
  variant = 'solid',
  spacing = 'my-2',
  className = '' 
}) {
  const baseClasses = 'border-t border-secondary';
  const variantClasses = variant === 'dashed' ? 'border-dashed' : '';
  
  return (
    <div 
      className={`${baseClasses} ${variantClasses} ${spacing} ${className}`}
      role="separator"
      aria-hidden="true"
    />
  );
}