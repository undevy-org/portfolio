'use client';

export default function Tag({ 
  text,
  variant = 'default',
  size = 'sm',
  className = '' 
}) {
  const baseClasses = 'tag-badge';
  const variantClasses = variant === 'secondary' ? 'opacity-80' : '';
  const sizeClasses = size === 'md' ? 'text-sm px-3 py-1' : '';
  
  return (
    <span className={`${baseClasses} ${variantClasses} ${sizeClasses} ${className}`}>
      {text}
    </span>
  );
}