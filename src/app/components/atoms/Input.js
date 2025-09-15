import { forwardRef } from 'react';

const Input = forwardRef(function Input({ 
  type = 'text',
  placeholder,
  value,
  onChange,
  onKeyDown,
  error = false,
  disabled = false,
  autoComplete,
  id,
  name,
  className = ''
}, ref) {
  const errorClasses = error ? 'input-error' : '';
  
  return (
    <input
      ref={ref}
      type={type}
      id={id}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      disabled={disabled}
      autoComplete={autoComplete}
      className={`input-base ${errorClasses} ${className}`}
      aria-invalid={error}
      aria-describedby={error && id ? `${id}-error` : undefined}
    />
  );
});

export default Input;