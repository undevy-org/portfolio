// src/app/components/molecules/LabelValuePair.js
'use client';

export default function LabelValuePair({
  label,
  value,
  responsive = false,
  className = ''
}) {
  // Support responsive grid for screens like AnalyticsPanel
  const gridClasses = responsive
    ? 'grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1'
    : 'grid grid-cols-2 gap-x-4';

  return (
    <div className={`${gridClasses} text-sm ${className}`}>
      <span className="text-primary">{label}:</span>
      <span className="text-secondary">{value}</span>
    </div>
  );
}
