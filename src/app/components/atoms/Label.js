'use client';

export default function Label({ 
  text,
  htmlFor,
  required = false,
  className = '' 
}) {
  return (
    <label 
      htmlFor={htmlFor}
      className={`label-base ${className}`}
    >
      {text}
      {required && <span className="ml-1 text-error">*</span>}
    </label>
  );
}
