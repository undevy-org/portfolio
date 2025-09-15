'use client';

export default function CommandTitle({ 
  text,
  level = 'h3',
  className = '' 
}) {
  const Component = level; // Dynamic component based on level
  
  // Ensure the $ prefix is always present
  const displayText = text.startsWith('$') ? text : `$${text}`;
  
  return (
    <Component className={`title-command ${className}`}>
      {displayText}
    </Component>
  );
}