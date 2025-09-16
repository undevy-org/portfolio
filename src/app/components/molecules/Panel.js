// src/app/components/molecules/Panel.js
'use client';

export default function Panel({
  children,
  noPadding = false,
  className = ''
}) {
  // panel-base provides: border rounded-md
  // panel-theme provides: bg-main border-secondary
  const baseClasses = 'panel-base panel-theme';
  const paddingClasses = noPadding ? '' : 'p-4';

  return (
    <div className={`${baseClasses} ${paddingClasses} ${className}`}>
      {children}
    </div>
  );
}
