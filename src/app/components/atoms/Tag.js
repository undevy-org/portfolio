'use client';

export default function Tag({
  text,
  variant = 'default',
  size = 'sm',
  className = ''
}) {
  if (!text) {
    console.warn('Tag component: text prop is required');
    return null;
  }
  // Use the semantic class from globals.css
  const baseClasses = 'tag-badge';
  const sizeClasses = size === 'md' ? 'text-sm px-3 py-1' : '';
  const variantClasses = variant === 'secondary' ? 'opacity-80' : '';
  
  return (
    <span className={`${baseClasses} ${sizeClasses} ${variantClasses} ${className}`}>
      {text}
    </span>
  );
}
