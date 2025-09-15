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
      {required && <span className="text-error ml-1">*</span>}
    </label>
  );
}