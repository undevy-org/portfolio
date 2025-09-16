// src/app/components/molecules/ListItem.js
'use client';

export default function ListItem({
  text,
  marker = '•',
  className = ''
}) {
  // Determine marker styling based on type
  const getMarkerClass = () => {
    switch(marker) {
      case '✓':
      case '✔':
        return 'text-success';
      case '•':
      case '-':
        return 'text-secondary';
      default:
        // Numbers or bracketed items
        if (typeof marker === 'number' || (typeof marker === 'string' && marker.includes('['))) {
          return 'text-command';
        }
        return 'text-secondary';
    }
  };

  return (
    <div className={`text-sm flex items-start ${className}`}>
      <span className={`mr-2 ${getMarkerClass()}`}>{marker}</span>
      <span className="text-secondary">{text}</span>
    </div>
  );
}
