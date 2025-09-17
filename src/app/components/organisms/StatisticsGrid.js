// src/app/components/organisms/StatisticsGrid.js
'use client';

import { LabelValuePair } from '../molecules';

export default function StatisticsGrid({
  stats = {}, // Object or array of stat objects
  columns = 2, // 1 | 2 | 3
  responsive = true,
  className = ''
}) {
  // Convert to array if object
  const statsArray = Array.isArray(stats)
    ? stats
    : Object.entries(stats).map(([label, value]) => ({ label, value }));

  if (statsArray.length === 0) {
    return null;
  }

  const getGridClasses = () => {
    if (!responsive) {
      return `grid grid-cols-${columns} gap-x-4 gap-y-1`;
    }
    switch(columns) {
      case 1: return 'flex flex-col space-y-1';
      case 3: return 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-1';
      default: return 'space-y-1'; // For responsive LabelValuePair
    }
  };

  return (
    <div className={`${getGridClasses()} text-sm ${className}`}>
      {statsArray.map((stat, index) => (
        <LabelValuePair
          key={stat.label || index}
          label={stat.label.startsWith('$') ? stat.label : `$${stat.label}`}
          value={stat.value}
          responsive={responsive && columns === 2}
        />
      ))}
    </div>
  );
}
